"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { clsx } from "clsx";

const routes = [
  "/about",
  "/skills",
  "/projects",
  "/certificates",
  "/contact",
  "/resume"
];

export default function PageTransitionScroller({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [navigatingTo, setNavigatingTo] = useState<string | null>(null);

  const currentIndex = routes.indexOf(pathname);
  const nextRoute = currentIndex !== -1 && currentIndex < routes.length - 1 ? routes[currentIndex + 1] : null;
  const prevRoute = currentIndex > 0 ? routes[currentIndex - 1] : null;

  const scrollAccumulator = useRef(0);
  const touchStartY = useRef<number>(0);
  const isNavigating = useRef(false);
  const topLoaderRef = useRef<HTMLDivElement>(null);
  const bottomLoaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setNavigatingTo(null);
    isNavigating.current = false;
    scrollAccumulator.current = 0;
  }, [pathname]);

  useEffect(() => {
    if (!nextRoute && !prevRoute) return;

    const SCROLL_THRESHOLD = 180; // Amount of scroll past the boundaries to trigger navigation

    const handleWheel = (e: WheelEvent) => {
      if (isNavigating.current) return;

      const isAtBottom = Math.ceil(window.innerHeight + window.scrollY) >= document.body.offsetHeight - 10;
      const isAtTop = window.scrollY <= 10;

      if (e.deltaY > 0 && isAtBottom) {
        scrollAccumulator.current += e.deltaY;
        if (scrollAccumulator.current > SCROLL_THRESHOLD && nextRoute) {
          triggerNavigation(nextRoute);
        }
      } else if (e.deltaY < 0 && isAtTop) {
        scrollAccumulator.current -= e.deltaY; // e.deltaY is negative, so subtracting adds to the accumulator
        if (scrollAccumulator.current > SCROLL_THRESHOLD && prevRoute) {
          triggerNavigation(prevRoute);
        }
      } else {
        // Reset if moving away from boundaries
        scrollAccumulator.current = 0;
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
      scrollAccumulator.current = 0;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isNavigating.current) return;

      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY.current - touchY;

      const isAtBottom = Math.ceil(window.innerHeight + window.scrollY) >= document.body.offsetHeight - 10;
      const isAtTop = window.scrollY <= 10;

      // deltaY > 0 means swiping up (scrolling down the page)
      if (deltaY > 0 && isAtBottom) {
        if (deltaY > SCROLL_THRESHOLD && nextRoute) {
          triggerNavigation(nextRoute);
        }
      } else if (deltaY < 0 && isAtTop) {
        if (Math.abs(deltaY) > SCROLL_THRESHOLD && prevRoute) {
          triggerNavigation(prevRoute);
        }
      }
    };

    const triggerNavigation = (route: string) => {
      isNavigating.current = true;
      setNavigatingTo(route);

      // Force scroll to reveal the loader by scrolling into view
      setTimeout(() => {
        if (route === nextRoute && bottomLoaderRef.current) {
          bottomLoaderRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
        } else if (route === prevRoute && topLoaderRef.current) {
          topLoaderRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 50);

      // Wait for loader transition before pushing the new route
      setTimeout(() => {
        router.push(route);
      }, 900);
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [nextRoute, prevRoute, router]);

  const routeName = navigatingTo ? navigatingTo.replace("/", "") : "";

  return (
    <div className="w-full relative">
      {/* Top Loader */}
      <div
        ref={topLoaderRef}
        className={clsx(
          "flex w-full justify-center items-center overflow-hidden transition-all duration-500 ease-in-out",
          navigatingTo && navigatingTo === prevRoute ? "h-32 opacity-100 py-6" : "h-0 opacity-0"
        )}
      >
        <div className="flex flex-col items-center">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-blue-500 mb-3 shadow-[0_0_10px_rgba(59,130,246,0.6)]"></div>
          <span className="text-sm font-oswald text-white tracking-widest uppercase animate-pulse">
            Loading {prevRoute ? prevRoute.replace("/", "") : ""}...
          </span>
        </div>
      </div>

      <div className={clsx("w-full transition-opacity duration-500", navigatingTo ? "opacity-40" : "opacity-100")}>
        {children}
      </div>

      {/* Bottom Loader */}
      <div
        ref={bottomLoaderRef}
        className={clsx(
          "flex w-full justify-center items-center overflow-hidden transition-all duration-500 ease-in-out",
          navigatingTo && navigatingTo === nextRoute ? "h-40 opacity-100 py-8" : "h-0 opacity-0"
        )}
      >
        <div className="flex flex-col items-center">
          <div className="h-10 w-10 animate-spin rounded-full border-b-2 border-t-2 border-blue-500 mb-4 shadow-[0_0_10px_rgba(59,130,246,0.6)]"></div>
          <span className="text-sm font-oswald text-white tracking-widest uppercase animate-pulse">
            Loading {nextRoute ? nextRoute.replace("/", "") : ""}...
          </span>
        </div>
      </div>
    </div>
  );
}
