"use client"
import Image from 'next/image';
import { motion as m } from 'framer-motion';
import { MapPin, ArrowUpRight, Music, Lightbulb, ChevronDown, Trophy } from 'lucide-react';
import { useEffect, useState, memo } from 'react';

const Box = memo(function Box({ children, className = "", delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) {
    return (
        <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay }}
            whileHover={{ scale: 0.98, rotate: 0.5 }}
            className={`bg-white/5 border border-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 backdrop-blur-sm overflow-hidden relative group hover:border-neon-main/50 transition-colors ${className}`}
        >
            {children}
        </m.div>
    );
});

const GithubActivity = memo(function GithubActivity() {
    const weeks = 18;
    const daysPerWeek = 7;
    const totalDays = weeks * daysPerWeek;

    // State to hold data
    const [contributionData, setContributionData] = useState<{ level: number, date: string, count: number }[]>([]);
    const [totalContributions, setTotalContributions] = useState(0);

    const fetchData = async () => {
        try {
            const response = await fetch('https://github-contributions-api.jogruber.de/v4/ShubhamModi032006?y=last');
            if (!response.ok) throw new Error('Failed to fetch Github data');
            const data = await response.json();

            // Flatten the days from the API response
            /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
            const allDays = data.contributions.flat();
            const last16Weeks = allDays.slice(-totalDays); // Take last 112 days

            /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
            const processedData = last16Weeks.map((day: any) => ({
                level: day.level,
                date: new Date(day.date).toLocaleDateString(),
                count: day.count
            }))

            // Sum up total contributions for the displayed period
            /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
            const total = processedData.reduce((acc: number, curr: any) => acc + curr.count, 0);

            setContributionData(processedData);
            setTotalContributions(total);
        } catch (error) {
            console.error("Error fetching GitHub data:", error);
            // Fallback to mock data on error (using previous randomizer logic)
            const mockData = Array.from({ length: totalDays }, (_, i) => ({
                level: Math.random() > 0.6 ? Math.floor(Math.random() * 5) : 0,
                date: new Date(Date.now() - (totalDays - i) * 24 * 60 * 60 * 1000).toLocaleDateString(),
                count: 0
            }));
            setContributionData(mockData);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const getColor = (level: number) => {
        switch (level) {
            case 1: return '#7c2d12'; // Dark Orange
            case 2: return '#c2410c'; // Medium Orange
            case 3: return '#ea580c'; // Bright Orange
            case 4: return '#f97316'; // Neon Orange
            default: return '#2d2d2d'; // Empty
        }
    };

    if (contributionData.length === 0) return (
        <div className="w-full h-full flex items-center justify-center text-neutral-500 text-xs animate-pulse">Loading GitHub stats...</div>
    );

    const getWeekMonth = (weekIndex: number) => {
        if (contributionData.length === 0) return "";
        // Calculate based on the data index for the start of the week
        const dayIndex = weekIndex * 7;
        // Safety check
        if (dayIndex >= contributionData.length) return "";
        const dateStr = contributionData[dayIndex].date;
        return new Date(dateStr).toLocaleString('default', { month: 'short' });
    }

    return (
        <div className="w-full h-full flex flex-col justify-between min-h-[160px]">
            <div className="flex items-center justify-between mb-6 flex-wrap gap-1">
                <div className="flex items-center gap-1.5 sm:gap-2 text-white">
                    <Image
                        src="https://cdns.iconmonstr.com/wp-content/releases/preview/2012/240/iconmonstr-github-1.png"
                        width={20}
                        height={20}
                        className="w-4 h-4 sm:w-5 sm:h-5 invert opacity-80"
                        alt="GitHub"
                        unoptimized
                    />
                    <span className="font-bold text-xs sm:text-sm">GitHub Activity</span>
                </div>
                <span className="text-[9px] sm:text-[10px] text-neutral-400">{totalContributions} contributions (Last 4 Months)</span>
            </div>

            <div className="flex flex-col items-center w-full">
                {/* Month Labels */}
                <div className="flex gap-[2px] sm:gap-[3px] mb-1 w-full justify-center">
                    {Array.from({ length: weeks }).map((_, weekIndex) => {
                        const currentMonth = getWeekMonth(weekIndex);
                        const nextMonth = getWeekMonth(weekIndex + 1);
                        const prevMonth = weekIndex > 0 ? getWeekMonth(weekIndex - 1) : null;

                        // Logic: Show label if it's the start of a month in the grid (prev !== current),
                        // OR if it's the very first week and continues into the next (not a stub).
                        const isNewMonth = weekIndex > 0 && currentMonth !== prevMonth;
                        const isFirstWeekOfBlock = weekIndex === 0 && currentMonth === nextMonth;
                        const showLabel = isNewMonth || isFirstWeekOfBlock;

                        return (
                            <div key={weekIndex} className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 relative text-center flex-shrink-0">
                                {showLabel && (
                                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center pb-3">
                                        <span className="text-[9px] sm:text-[10px] text-neutral-400 font-medium leading-none tracking-tighter whitespace-nowrap mb-0.5">
                                            {currentMonth}
                                        </span>
                                        <ChevronDown className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-neutral-600/80" />
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>

                {/* Grid */}
                <div className="flex gap-[2px] sm:gap-[3px] justify-center w-full">
                    {Array.from({ length: weeks }).map((_, weekIndex) => (
                        <div key={weekIndex} className="flex flex-col gap-[2px] sm:gap-[3px] flex-shrink-0">
                            {Array.from({ length: daysPerWeek }).map((_, dayIndex) => {
                                const dataIndex = weekIndex * daysPerWeek + dayIndex;
                                const data = contributionData[dataIndex];

                                if (!data) return null;

                                return (
                                    <m.div
                                        key={dayIndex}
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: dataIndex * 0.005, duration: 0.2 }}
                                        className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-[1px] sm:rounded-[2px] relative group/cell"
                                        style={{ backgroundColor: getColor(data.level) }}
                                    >
                                        {/* Tooltip */}
                                        {data.count > 0 && (
                                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black/90 text-[9px] sm:text-[10px] text-white whitespace-nowrap rounded border border-white/10 opacity-0 group-hover/cell:opacity-100 pointer-events-none z-50 transition-opacity">
                                                {data.count} contributions on {data.date}
                                                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-black/90" />
                                            </div>
                                        )}
                                    </m.div>
                                )
                            })}
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2 mt-3 sm:mt-4 text-[9px] sm:text-[10px] text-neutral-400">
                <span>Less</span>
                <div className="flex gap-[1px] sm:gap-[2px]">
                    {[0, 1, 2, 3, 4].map(l => (
                        <div key={l} className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-[1px]" style={{ backgroundColor: getColor(l) }} />
                    ))}
                </div>
                <span>More</span>
            </div>
        </div>
    )
});

const LeetCodeDashboard = memo(function LeetCodeDashboard() {
    const [stats, setStats] = useState<any>(null);
    const [contest, setContest] = useState<any>(null);
    const [calendar, setCalendar] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWithCache = async (url: string, key: string) => {
            const cacheTimeKey = `${key}_last_fetch`;
            const cacheDuration = 3600000; // 1 hour in milliseconds
            const now = Date.now();

            try {
                const cachedData = localStorage.getItem(key);
                const lastFetch = localStorage.getItem(cacheTimeKey);

                if (cachedData && lastFetch && (now - parseInt(lastFetch, 10) < cacheDuration)) {
                    // console.log(`Using cached LeetCode data for ${key}`);
                    return JSON.parse(cachedData);
                }

                // console.log(`Fetching fresh LeetCode data for ${key}`);
                const response = await fetch(url);
                if (!response.ok) {
                    if (response.status === 404) {
                        // console.log(`LeetCode data not found for ${key} (404).`);
                        return null;
                    }
                    throw new Error(`API error: ${response.status}`);
                }
                const data = await response.json();

                localStorage.setItem(key, JSON.stringify(data));
                localStorage.setItem(cacheTimeKey, now.toString());

                return data;
            } catch (error) {
                // console.warn(`Error fetching ${key}:`, error);
                // Fallback to cached data if request fails, even if expired
                const cachedData = localStorage.getItem(key);
                if (cachedData) {
                    // console.log(`Falling back to cached data for ${key}`);
                    return JSON.parse(cachedData);
                }
                return null;
            }
        };

        const fetchData = async () => {
            const [statsData, contestData, calendarData] = await Promise.all([
                fetchWithCache('https://alfa-leetcode-api.onrender.com/ShubhamModi032006/profile', 'leetcode_stats'),
                fetchWithCache('https://alfa-leetcode-api.onrender.com/ShubhamModi032006/contest', 'leetcode_contest'),
                fetchWithCache('https://alfa-leetcode-api.onrender.com/ShubhamModi032006/submission-calendar', 'leetcode_calendar')
            ]);

            // If API fails (returns null), use fallback data
            if (!statsData || !contestData) {
                // Mock data fallback
                setStats({
                    totalSolved: 486,
                    easySolved: 195,
                    mediumSolved: 247,
                    hardSolved: 44,
                    ranking: "194,502"
                });
                setContest({
                    contestRating: 1584,
                    contestGlobalRanking: 52300,
                    totalParticipants: 400000
                });

                // create basic dummy calendar
                const dummyCal: Record<string, number> = {};
                const now = Math.floor(Date.now() / 1000);
                for (let i = 0; i < 50; i++) {
                    // Random submissions in last 100 days
                    const ts = now - Math.floor(Math.random() * 100 * 86400);
                    dummyCal[ts] = Math.floor(Math.random() * 5) + 1;
                }
                setCalendar(dummyCal);
            } else {
                setStats(statsData);
                setContest(contestData);
                if (calendarData) {
                    try {
                        let parsedCal = calendarData;
                        if (typeof calendarData === 'string') {
                            parsedCal = JSON.parse(calendarData);
                        }
                        if (parsedCal && parsedCal.submissionCalendar) {
                            const inner = typeof parsedCal.submissionCalendar === 'string'
                                ? JSON.parse(parsedCal.submissionCalendar)
                                : parsedCal.submissionCalendar;
                            setCalendar(inner);
                        } else {
                            setCalendar(parsedCal);
                        }
                    } catch (e) { console.error("Error parsing calendar", e); }
                }
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    const totalSolved = stats?.totalSolved || 0;
    const easy = stats?.easySolved || 0;
    const medium = stats?.mediumSolved || 0;
    const hard = stats?.hardSolved || 0;
    const rank = stats?.ranking || "N/A";
    const rating = contest?.contestRating ? Math.round(contest.contestRating) : "N/A";
    const topPercentage = contest?.contestGlobalRanking ?
        ((contest.contestGlobalRanking / contest.totalParticipants) * 100).toFixed(2)
        : "N/A";

    const radius = 60;
    const circumference = 2 * Math.PI * radius;
    const progressOffset = circumference - ((totalSolved % 2000) / 2000) * circumference;



    if (loading) return <Box className="w-full h-64 animate-pulse"><div className="text-neutral-500">Loading Leetcode...</div></Box>;

    return (
        <Box className="w-full !p-8 border-neutral-800">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 pb-6 border-b border-white/5 gap-4 sm:gap-0">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-[#FFA116]/10 rounded-xl border border-[#FFA116]/20">
                        <Image
                            src="https://assets.leetcode.com/static_assets/public/icons/favicon-192x192.png"
                            alt="LeetCode"
                            width={32}
                            height={32}
                            unoptimized
                        />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-1 font-display">LeetCode</h3>
                        <p className="text-sm text-neutral-400">Global Ranking: <span className="text-white font-mono font-medium">{rank}</span></p>
                    </div>
                </div>
                <a href="https://leetcode.com/ShubhamModi032006/" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 text-sm flex items-center gap-2 transition-colors text-white">
                    View Profile <ArrowUpRight className="w-4 h-4" />
                </a>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                {/* Donut */}
                <div className="col-span-1 bg-black/20 rounded-2xl p-6 flex flex-col items-center justify-center relative border border-white/5">
                    <div className="relative w-40 h-40">
                        <svg className="w-full h-full transform -rotate-90">
                            <circle cx="50%" cy="50%" r={radius} fill="transparent" stroke="#1e1e1e" strokeWidth="8" />
                            <circle cx="50%" cy="50%" r={radius} fill="transparent" stroke="#FFA116" strokeWidth="8" strokeDasharray={circumference} strokeDashoffset={progressOffset} strokeLinecap="round" />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <div className="text-3xl font-bold text-white">{totalSolved}</div>
                            <div className="text-[10px] text-neutral-500 uppercase tracking-widest mt-1">Solved</div>
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div className="col-span-1 lg:col-span-2 flex flex-col gap-4">
                    <div className="grid grid-cols-3 gap-4">
                        <div className="bg-[#00AF9B]/10 border border-[#00AF9B]/20 p-4 rounded-xl flex flex-col items-center justify-center">
                            <div className="text-xs text-[#00AF9B] uppercase font-bold mb-1">Easy</div>
                            <div className="text-2xl font-bold text-white">{easy}</div>
                        </div>
                        <div className="bg-[#FFB800]/10 border border-[#FFB800]/20 p-4 rounded-xl flex flex-col items-center justify-center">
                            <div className="text-xs text-[#FFB800] uppercase font-bold mb-1">Medium</div>
                            <div className="text-2xl font-bold text-white">{medium}</div>
                        </div>
                        <div className="bg-[#FF2D55]/10 border border-[#FF2D55]/20 p-4 rounded-xl flex flex-col items-center justify-center">
                            <div className="text-xs text-[#FF2D55] uppercase font-bold mb-1">Hard</div>
                            <div className="text-2xl font-bold text-white">{hard}</div>
                        </div>
                    </div>

                    <div className="flex-1 bg-[#FFF5E6] rounded-xl p-6 flex items-center justify-between border border-[#FFA116]/20 relative overflow-hidden">
                        <div className="z-10 text-neutral-900">
                            <div className="flex items-center gap-2 mb-2">
                                <Trophy className="w-4 h-4 text-[#FFA116]" />
                                <span className="font-bold text-xs uppercase text-[#FFA116]">Contest Rating</span>
                            </div>
                            <div className="text-4xl font-black text-neutral-900 mb-1">{rating}</div>
                            {topPercentage !== "N/A" && (
                                <div className="inline-flex items-center gap-1 bg-[#FFA116] text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                                    Top {topPercentage}%
                                </div>
                            )}
                        </div>
                        <Trophy className="absolute right-[-20px] bottom-[-20px] w-40 h-40 text-[#FFA116]/10 z-0 rotate-12" />
                    </div>
                </div>
            </div>

            {/* Heatmap */}

        </Box>
    );
});

export default function About() {
    return (
        <section id="about" className="min-h-screen py-24 bg-black relative">
            <div className="px-6 md:px-12 flex flex-col gap-8">
                {/* Top Section */}
                <div className="flex flex-col lg:flex-row gap-6">

                    {/* Photo Col */}
                    <Box className="w-full lg:w-[45%] relative min-h-[400px] lg:min-h-[500px] overflow-hidden !p-0">
                        <div className="absolute inset-0 bg-neutral-900 z-0">
                            <Image
                                src="/shubham copy.jpg"
                                alt="Shubham Modi"
                                fill
                                priority
                                sizes="(max-width: 768px) 100vw, 40vw"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 opacity-80" />
                        </div>
                        <div className="relative z-10 h-full flex flex-col justify-end p-8">
                            <h3 className="text-4xl font-display font-bold leading-none mb-2">Shubham<br />Modi</h3>
                            <p className="text-sm text-neon-main uppercase tracking-widest">Full Stack Learner</p>
                        </div>
                    </Box>

                    {/* Right Col */}
                    <div className="w-full lg:w-[55%] flex flex-col gap-6">
                        {/* Bio Box */}
                        <Box className="!p-6" delay={0.1}>
                            <div className="flex justify-between items-start mb-6 flex-wrap gap-2">
                                <div>
                                    <h2 className="text-2xl font-bold text-white break-words">About</h2>
                                    <div className="flex items-center gap-2 font-mono text-[10px] text-neon-main mt-1 opacity-80">
                                        <span className="w-1.5 h-1.5 bg-neon-main animate-pulse rounded-full" />
                                    // SYSTEM_LOG: BIO_DATA_FETCHED
                                    </div>
                                </div>
                                <div className="bg-neon-main/10 px-3 py-1 rounded-full text-neon-main text-[10px] font-bold uppercase tracking-widest border border-neon-main/20">
                                    Open to Work
                                </div>
                            </div>
                            <p className="text-base text-neutral-300 leading-relaxed font-sans font-light">
                                I'm a <span className="text-white font-medium">Full Stack Learner</span> passionate about building robust web applications. I transform ideas into complex <span className="text-white font-medium">MERN stack solutions</span> and treat every project as a piece of art.
                            </p>
                            <div className="mt-6 flex gap-4">
                                <div className="flex flex-col">
                                    <span className="text-2xl font-bold font-display text-white">#3</span>
                                    <span className="text-xs uppercase text-neutral-400 tracking-wider">Major Projects</span>
                                </div>
                                <div className="w-[1px] h-10 bg-white/10" />
                                <div className="flex flex-col">
                                    <span className="text-2xl font-bold font-display text-white">100%</span>
                                    <span className="text-xs uppercase text-neutral-400 tracking-wider">Commitment</span>
                                </div>
                            </div>
                        </Box>

                        {/* Github Activity Box */}
                        <Box className="flex-1 !p-6 flex flex-col justify-center min-h-[180px]" delay={0.2}>
                            <GithubActivity />
                        </Box>
                    </div>
                </div>

                {/* Bottom Section: LeetCode Dashboard */}
                <m.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <LeetCodeDashboard />
                </m.div>
            </div>
        </section>
    )
}
