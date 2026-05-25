"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { clsx } from "clsx";
import { ChevronDown, ChevronUp } from "lucide-react";

const routes = [
  "/about",
  "/skills",
  "/projects",
  "/certificates",
  "/contact",
  "/resume"
];

type ScrollPhase = "IDLE" | "SCROLLING" | "READY" | "NAVIGATING";

export default function PageTransitionScroller({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const [navigatingTo, setNavigatingTo] = useState<string | null>(null);
  const [readyBoundary, setReadyBoundary] = useState<"top" | "bottom" | null>(null);

  const currentIndex = routes.indexOf(pathname);
  const nextRoute = currentIndex !== -1 && currentIndex < routes.length - 1 ? routes[currentIndex + 1] : null;
  const prevRoute = currentIndex > 0 ? routes[currentIndex - 1] : null;

  const phase = useRef<ScrollPhase>("IDLE");
  const boundaryDir = useRef<"top" | "bottom" | null>(null);
  const isNavigating = useRef(false);
  const lastDeltaY = useRef(0);
  const settleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // FIX 1: Timestamp when READY state was entered.
  // Trackpads fire tiny inertia/momentum wheel events for ~300-500ms after the
  // finger lifts. The 100ms settle timer can fire *between* two of those events,
  // setting phase=READY, and then the very next micro-event (deltaY≈2) immediately
  // triggers navigation — the user never got a chance to "scroll again".
  // Solution: record when READY was entered, and in the READY handler require
  // either (a) enough time has passed for inertia to die, OR (b) the delta is
  // large enough to be a genuine intentional scroll.
  const readyEnteredAt = useRef<number>(0);

  // Touch refs
  const touchStartY = useRef<number>(0);
  const touchPhaseSnap = useRef<ScrollPhase>("IDLE");
  const touchBoundarySnap = useRef<"top" | "bottom" | null>(null);

  const topLoaderRef = useRef<HTMLDivElement>(null);
  const bottomLoaderRef = useRef<HTMLDivElement>(null);

  const reset = () => {
    phase.current = "IDLE";
    boundaryDir.current = null;
    lastDeltaY.current = 0;
    readyEnteredAt.current = 0;
    if (settleTimer.current) {
      clearTimeout(settleTimer.current);
      settleTimer.current = null;
    }
    setReadyBoundary(null);
  };

  useEffect(() => {
    setNavigatingTo(null);
    isNavigating.current = false;
    reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    if (!nextRoute && !prevRoute) return;

    const checkAtBottom = () =>
      Math.ceil(window.innerHeight + window.scrollY) >= document.body.offsetHeight - 10;
    const checkAtTop = () => window.scrollY <= 10;

    const triggerNavigation = (route: string) => {
      if (isNavigating.current) return;
      isNavigating.current = true;
      phase.current = "NAVIGATING";
      setNavigatingTo(route);
      setReadyBoundary(null);

      setTimeout(() => {
        if (route === nextRoute && bottomLoaderRef.current) {
          bottomLoaderRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
        } else if (route === prevRoute && topLoaderRef.current) {
          topLoaderRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 50);

      setTimeout(() => {
        router.push(route);
      }, 900);
    };

    const handleWheel = (e: WheelEvent) => {
      if (isNavigating.current) return;

      const isBottom = checkAtBottom();
      const isTop = checkAtTop();
      lastDeltaY.current = e.deltaY;

      // ── Phase: READY ──
      if (phase.current === "READY") {
        const dir = boundaryDir.current;

        // Scrolled away from the boundary → full reset, fall through to SCROLLING
        if (
          (dir === "bottom" && (!isBottom || e.deltaY < 0)) ||
          (dir === "top" && (!isTop || e.deltaY > 0))
        ) {
          reset();
          // intentional fall-through
        } else if (e.deltaY > 0 && dir === "bottom" && nextRoute) {
          // FIX 1 APPLIED: Only treat this as "deliberate second scroll" if either:
          //   (a) ≥250ms have passed since entering READY — inertia events die off by then
          //   (b) deltaY > 30 — clearly intentional, not a micro-inertia tick
          // Without this check, a trackpad momentum event of deltaY=3 navigates
          // immediately right after the settle timer fires.
          const timeSinceReady = Date.now() - readyEnteredAt.current;
          if (timeSinceReady >= 250 || Math.abs(e.deltaY) > 30) {
            triggerNavigation(nextRoute);
          }
          // If the time/delta check fails, just return — stay in READY, wait for a real scroll.
          return;
        } else {
          return;
        }
      }

      // ── Phase: SCROLLING ──
      phase.current = "SCROLLING";

      // FIX 2: Immediate backward navigation.
      //
      // OLD BEHAVIOUR: waited for the settle timer to fire, then checked if
      // the user had stopped at the top. Problem: the timer fires between scroll
      // gestures while scrollY is still mid-page → stoppedAtTop=false → resets
      // to IDLE. User has to already be at the top AND then do one more scroll.
      // It's a race condition the user keeps losing.
      //
      // NEW BEHAVIOUR: if the user is already at the top and sends any upward
      // wheel input, navigate immediately — no settle timer needed.
      // This matches the original design intent ("one-phase immediate navigate").
      if (isTop && e.deltaY < -5 && prevRoute) {
        triggerNavigation(prevRoute);
        return;
      }

      // Restart the settle timer on every wheel event.
      // FIX 1 SUPPORT: increased from 100ms → 200ms.
      // Trackpad inertia streams can have 80-120ms gaps between events. At 100ms
      // the timer occasionally fires inside an inertia stream, setting READY while
      // momentum events are still coming. 200ms reliably outlasts most inertia.
      if (settleTimer.current) clearTimeout(settleTimer.current);
      settleTimer.current = setTimeout(() => {
        settleTimer.current = null;

        const stoppedAtBottom = checkAtBottom();
        const wasScrollingDown = lastDeltaY.current > 0;

        if (wasScrollingDown && stoppedAtBottom && nextRoute) {
          // Enter READY — record timestamp for the inertia filter above
          phase.current = "READY";
          boundaryDir.current = "bottom";
          readyEnteredAt.current = Date.now(); // ← FIX 1: stamp when READY was set
          setReadyBoundary("bottom");
        } else {
          // Stopped mid-page — idle
          phase.current = "IDLE";
          boundaryDir.current = null;
          setReadyBoundary(null);
        }
        // NOTE: prev-page case removed from settle timer entirely (see FIX 2 above).
      }, 150);
    };

    // ── TOUCH HANDLERS ──
    // Logic unchanged — touch events are gesture-level (no inertia problem),
    // but readyEnteredAt stamp added for consistency.
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
      touchPhaseSnap.current = phase.current;
      touchBoundarySnap.current = boundaryDir.current;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (isNavigating.current) return;

      const endY = e.changedTouches[0].clientY;
      const deltaY = touchStartY.current - endY; // positive = swipe up = scroll down
      const SWIPE_MIN = 40;

      if (Math.abs(deltaY) < SWIPE_MIN) return;

      const isBottom = checkAtBottom();
      const isTop = checkAtTop();
      const swipingDown = deltaY > 0;
      const swipingUp = deltaY < 0;

      if (touchPhaseSnap.current === "IDLE" || touchPhaseSnap.current === "SCROLLING") {
        if (swipingDown && isBottom && nextRoute) {
          phase.current = "READY";
          boundaryDir.current = "bottom";
          readyEnteredAt.current = Date.now();
          setReadyBoundary("bottom");
        } else if (swipingUp && isTop && prevRoute) {
          // Touch prev-page: still one-swipe immediate (no inertia issue on touch)
          triggerNavigation(prevRoute);
        }
        return;
      }

      if (touchPhaseSnap.current === "READY") {
        const snap = touchBoundarySnap.current;
        if (swipingDown && snap === "bottom" && nextRoute) {
          triggerNavigation(nextRoute);
        } else {
          reset();
        }
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
      if (settleTimer.current) clearTimeout(settleTimer.current);
    };
  }, [nextRoute, prevRoute, router]);

  return (
    <div className="w-full relative">

      {/* ── Top Loader ── */}
      <div
        ref={topLoaderRef}
        className={clsx(
          "flex w-full justify-center items-center overflow-hidden transition-all duration-500 ease-in-out",
          navigatingTo && navigatingTo === prevRoute ? "h-32 opacity-100 py-6" : "h-0 opacity-0"
        )}
      >
        <div className="flex flex-col items-center">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-blue-500 mb-3 shadow-[0_0_10px_rgba(59,130,246,0.6)]" />
          <span className="text-sm font-oswald text-white tracking-widest uppercase animate-pulse">
            Loading {prevRoute ? prevRoute.replace("/", "") : ""}...
          </span>
        </div>
      </div>

      <div className={clsx("w-full transition-opacity duration-500", navigatingTo ? "opacity-40" : "opacity-100")}>
        {children}

        {/* ── Scroll Down Indicator ── */}
        {nextRoute && !navigatingTo && (
          <div className="w-full flex justify-center pt-8 pb-20">
            <div className="flex flex-col items-center">
              <span
                className={clsx(
                  "text-xs font-oswald tracking-[0.2em] uppercase mb-4 transition-all duration-500",
                  readyBoundary === "bottom"
                    ? "text-neon-main opacity-100"
                    : "text-neutral-500 opacity-40"
                )}
              >
                {readyBoundary === "bottom" ? "Scroll Again → Next Page" : "Scroll for Next"}
              </span>

              <div className={clsx(
                "flex flex-col items-center transition-transform duration-500",
                readyBoundary === "bottom" ? "animate-bounce scale-125" : "animate-bounce scale-100"
              )}>
                <ChevronDown className={clsx(
                  "w-6 h-6 transition-all duration-500",
                  readyBoundary === "bottom" ? "opacity-100 text-neon-main" : "opacity-60 text-neon-main"
                )} />
                <ChevronDown className={clsx(
                  "w-6 h-6 -mt-3 transition-all duration-500",
                  readyBoundary === "bottom" ? "opacity-50 text-neon-main" : "opacity-20 text-neon-main"
                )} />
              </div>
            </div>
          </div>
        )}

        {/* ── Scroll Up Indicator ── */}
        {prevRoute && !navigatingTo && readyBoundary === "top" && (
          <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center
                          bg-black/70 backdrop-blur-sm px-5 py-3 rounded-2xl
                          border border-neon-main/40 shadow-[0_0_16px_rgba(0,255,200,0.15)]
                          animate-bounce pointer-events-none">
            <ChevronUp className="w-5 h-5 text-neon-main" />
            <span className="text-xs font-oswald text-neon-main tracking-widest uppercase mt-1">
              Scroll Again → Go Back
            </span>
          </div>
        )}
      </div>

      {/* ── Bottom Loader ── */}
      <div
        ref={bottomLoaderRef}
        className={clsx(
          "flex w-full justify-center items-center overflow-hidden transition-all duration-500 ease-in-out",
          navigatingTo && navigatingTo === nextRoute ? "h-40 opacity-100 py-8" : "h-0 opacity-0"
        )}
      >
        <div className="flex flex-col items-center">
          <div className="h-10 w-10 animate-spin rounded-full border-b-2 border-t-2 border-blue-500 mb-4 shadow-[0_0_10px_rgba(59,130,246,0.6)]" />
          <span className="text-sm font-oswald text-white tracking-widest uppercase animate-pulse">
            Loading {nextRoute ? nextRoute.replace("/", "") : ""}...
          </span>
        </div>
      </div>
    </div>
  );
}