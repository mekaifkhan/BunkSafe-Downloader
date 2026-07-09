import React, { useState } from "react";
import { 
  ChevronLeft, 
  ChevronRight, 
  Layers, 
  Clock, 
  GraduationCap, 
  Smartphone,
  Eye
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ScreenshotSlide {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  // Dynamic CSS mockups can be rendered if no custom image is provided
  mockupType: "home" | "calendar" | "special" | "setup" | "profile";
  customImageUrl?: string; // Standard PNG/JPG path, easily swappable
}

const SLIDES: ScreenshotSlide[] = [
  {
    id: "screen-1",
    title: "Zero-Noise Home Dashboard",
    subtitle: "Check attendance standing instantly at 67.6% with clear indicators. Receive high-priority warnings when sessional attendance requirements are at risk.",
    tag: "Home Interface",
    mockupType: "home"
  },
  {
    id: "screen-2",
    title: "Frictionless Day Logger",
    subtitle: "Navigate days with a dense visual grid. Log exact theory classes or lab units held, mark local sessional holidays, and view real-time daily metrics.",
    tag: "Lectures Map",
    mockupType: "calendar"
  },
  {
    id: "screen-3",
    title: "Kaif's Special Strategy Section",
    subtitle: "Unlock smart calculated algorithms. See consecutive lectures to attend or bunk safely, accompanied by sessional exam schedules and consistency scores.",
    tag: "Special Board",
    mockupType: "special"
  },
  {
    id: "screen-4",
    title: "Instant College Onboarding",
    subtitle: "Choose custom configuration modes. Instantly auto-load Jamia Millia Islamia BTech dates and syllabi or setup your local college timetable manually.",
    tag: "Setup Screen",
    mockupType: "setup"
  },
  {
    id: "screen-5",
    title: "Personal Profile Settings",
    subtitle: "Manage student credentials, update your current semester, and fine-tune course goals in a secured local profile ledger.",
    tag: "Profile Info",
    mockupType: "profile"
  }
];

export default function Screenshots() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === SLIDES.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1));
  };

  // Helper to render high-fidelity interactive vector mockups for screenshots
  const renderVectorMockup = (type: string) => {
    switch (type) {
      case "home":
        return (
          <div className="w-full h-full bg-[#09090b] flex flex-col text-slate-200 overflow-y-auto font-sans p-3 text-[11px] select-none scrollbar-none">
            {/* Top Bar Info */}
            <div className="flex justify-between items-center mb-2 shrink-0">
              <div className="flex items-center gap-1.5">
                <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-black font-black text-[9px]">K</div>
                <div>
                  <p className="text-[7px] text-slate-500 leading-none">Good Evening</p>
                  <p className="font-extrabold text-white text-[9px] leading-tight">Kaif Ahmad Khan</p>
                </div>
              </div>
              <div className="flex gap-1 items-center">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-[7px] font-bold text-green-400 bg-green-500/10 px-1 py-0.5 rounded border border-green-500/10 uppercase tracking-wider font-mono">BunkSafe</span>
              </div>
            </div>

            {/* Attendance Card */}
            <div className="bg-[#18181b]/60 border border-white/5 rounded-xl p-2.5 mb-2 shrink-0">
              <span className="text-[7.5px] text-slate-500 uppercase font-extrabold tracking-wider">SEMESTER 5 ATTENDANCE</span>
              <div className="flex justify-between items-baseline mt-0.5">
                <p className="text-xl font-black text-white">67.6%</p>
                <p className="text-[8px] font-bold text-slate-400 font-mono">25 / 37</p>
              </div>
              <div className="w-full h-1 bg-zinc-900 rounded-full mt-1.5 overflow-hidden border border-white/5">
                <div className="h-full bg-red-500 rounded-full" style={{ width: "67.6%" }}></div>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-2 pt-1.5 border-t border-white/2">
                <div>
                  <span className="text-[6.5px] text-slate-500 uppercase font-bold">JULY STATUS</span>
                  <p className="text-[8.5px] font-bold text-white leading-none mt-0.5">67.6% <span className="text-slate-500 text-[7px] font-medium">(25/37)</span></p>
                </div>
                <div>
                  <span className="text-[6.5px] text-slate-500 uppercase font-bold">CURRENT GOAL</span>
                  <p className="text-[8.5px] font-bold text-green-400 leading-none mt-0.5">75% Target</p>
                </div>
              </div>
            </div>

            {/* Danger Zone banner */}
            <div className="bg-[#18181b]/50 border-l-2 border-red-500 p-2 rounded-r-xl rounded-l-md flex gap-2 mb-2 shrink-0">
              <div className="w-3.5 h-3.5 rounded-full bg-red-500/15 flex items-center justify-center shrink-0 mt-0.5 text-red-400 font-bold text-[8px]">!</div>
              <div>
                <p className="text-[8.5px] font-bold text-white leading-tight">Attend next 11 classes to reach 75%.</p>
                <p className="text-[7px] text-slate-400 leading-tight mt-0.5">Time to get serious and hit those lectures.</p>
              </div>
            </div>

            {/* Daily Entry - 09/07/2026 */}
            <div className="bg-[#18181b]/40 border border-white/5 rounded-xl p-2.5 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="font-extrabold text-white text-[9px]">Daily Entry <span className="text-slate-500 font-medium">— 09/07</span></span>
                  <span className="text-[6px] font-mono text-slate-400 bg-zinc-900 px-1 py-0.5 rounded">REGULAR</span>
                </div>

                {/* Total classes slider layout */}
                <div className="bg-[#09090b]/40 border border-white/2 rounded-lg p-1.5 mb-1.5">
                  <div className="flex justify-between items-center text-[7.5px] font-semibold text-slate-300">
                    <span>Total Available Classes Today</span>
                    <span className="text-white font-extrabold text-[10px]">7</span>
                  </div>
                  <div className="flex gap-1 mt-1.5 justify-between">
                    {[1, 2, 3, 4, 5, 6].map(n => (
                      <span key={n} className={`flex-1 text-center py-0.5 rounded text-[7px] font-bold ${n === 6 ? "bg-zinc-800 text-slate-300" : "bg-zinc-900/60 text-slate-600"}`}>{n}</span>
                    ))}
                  </div>
                </div>

                {/* Classes Attended slider layout */}
                <div className="bg-[#09090b]/40 border border-white/2 rounded-lg p-1.5">
                  <div className="flex justify-between items-center text-[7.5px] font-semibold text-slate-300">
                    <span>Classes Attended</span>
                    <span className="text-green-400 font-extrabold text-[10px]">5</span>
                  </div>
                  <div className="flex gap-1 mt-1.5 justify-between">
                    {[0, 1, 2, 3, 4, 5].map(n => (
                      <span key={n} className={`flex-1 text-center py-0.5 rounded text-[7px] font-bold ${n === 5 ? "bg-green-500 text-black" : "bg-zinc-900 text-slate-500"}`}>{n}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Save / Holiday buttons */}
              <div className="space-y-1 mt-2">
                <button className="w-full bg-[#a3e635] text-black font-extrabold py-1 rounded-lg text-[8px] text-center shadow">
                  Mark Today as Holiday
                </button>
                <button className="w-full bg-red-600 text-white font-extrabold py-1 rounded-lg text-[8px] text-center shadow">
                  Save Attendance
                </button>
              </div>
            </div>

            {/* Bottom active indicators */}
            <div className="flex justify-between items-center mt-2 pt-1.5 border-t border-white/5 text-[6px] text-slate-500 font-bold uppercase tracking-wider shrink-0">
              <span className="flex items-center gap-1"><span className="w-1 h-1 bg-green-500 rounded-full"></span> 450 LIVE USERS</span>
              <span className="text-[6.5px] text-slate-400">HOME ACTIVE</span>
            </div>
          </div>
        );
      case "calendar":
        return (
          <div className="w-full h-full bg-[#09090b] flex flex-col text-slate-200 overflow-y-auto font-sans p-3 text-[11px] select-none scrollbar-none">
            {/* Top Navigation */}
            <div className="flex justify-between items-center mb-2 shrink-0">
              <h4 className="font-extrabold text-white text-sm">Calendar</h4>
              <div className="flex items-center gap-1 bg-[#18181b]/80 border border-white/5 rounded-lg px-1.5 py-0.5">
                <span className="text-[8px] font-bold text-white">July 2026</span>
              </div>
            </div>

            {/* Weekday headers */}
            <div className="grid grid-cols-7 gap-1 text-center text-[6.5px] font-black text-slate-500 uppercase tracking-wider mb-1.5 shrink-0">
              <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
            </div>

            {/* July 2026 Grid */}
            <div className="grid grid-cols-7 gap-1 text-center mb-2 shrink-0">
              <span className="aspect-square"></span>
              <span className="aspect-square"></span>
              <span className="aspect-square"></span>
              
              {/* Day 1 */}
              <div className="aspect-square bg-amber-500/10 border border-amber-500/20 rounded flex flex-col justify-center items-center text-[8px] font-bold text-amber-400">
                <span>1</span><span className="text-[5.5px] font-mono leading-none opacity-80">3/4</span>
              </div>
              {/* Day 2 */}
              <div className="aspect-square bg-blue-500/10 border border-blue-500/20 rounded flex flex-col justify-center items-center text-[8px] font-bold text-blue-400">
                <span>2</span><span className="text-[5.5px] font-mono leading-none opacity-80">H</span>
              </div>
              {/* Day 3 */}
              <div className="aspect-square bg-amber-500/10 border border-amber-500/20 rounded flex flex-col justify-center items-center text-[8px] font-bold text-amber-400">
                <span>3</span><span className="text-[5.5px] font-mono leading-none opacity-80">1/5</span>
              </div>
              {/* Day 4 */}
              <div className="aspect-square bg-green-500/10 border border-green-500/20 rounded flex flex-col justify-center items-center text-[8px] font-bold text-green-400">
                <span>4</span><span className="text-[5.5px] font-mono leading-none opacity-80">6/6</span>
              </div>
              {/* Day 5 */}
              <div className="aspect-square bg-green-500/10 border border-green-500/20 rounded flex flex-col justify-center items-center text-[8px] font-bold text-green-400">
                <span>5</span><span className="text-[5.5px] font-mono leading-none opacity-80">4/4</span>
              </div>
              {/* Day 6 */}
              <div className="aspect-square bg-amber-500/10 border border-amber-500/20 rounded flex flex-col justify-center items-center text-[8px] font-bold text-amber-400">
                <span>6</span><span className="text-[5.5px] font-mono leading-none opacity-80">2/4</span>
              </div>
              {/* Day 7 */}
              <div className="aspect-square bg-amber-500/10 border border-amber-500/20 rounded flex flex-col justify-center items-center text-[8px] font-bold text-amber-400">
                <span>7</span><span className="text-[5.5px] font-mono leading-none opacity-80">3/4</span>
              </div>
              {/* Day 8 */}
              <div className="aspect-square bg-amber-500/10 border border-amber-500/20 rounded flex flex-col justify-center items-center text-[8px] font-bold text-amber-400">
                <span>8</span><span className="text-[5.5px] font-mono leading-none opacity-80">1/3</span>
              </div>
              {/* Day 9 - Circled */}
              <div className="aspect-square bg-amber-500/15 border-2 border-white rounded-md flex flex-col justify-center items-center text-[8px] font-extrabold text-amber-400 shadow-md">
                <span>9</span><span className="text-[5.5px] font-mono leading-none">5/7</span>
              </div>
              {/* Other calendar spaces */}
              {[10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21].map(d => (
                <div key={d} className="aspect-square bg-[#18181b]/30 rounded flex items-center justify-center text-[8px] font-bold text-slate-600">
                  {d}
                </div>
              ))}
            </div>

            {/* Selected day panel */}
            <div className="bg-[#18181b]/50 border border-white/5 rounded-xl p-2.5 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <div>
                    <h5 className="font-extrabold text-white text-[9.5px]">Thursday, 09/07/2026</h5>
                    <p className="text-[6.5px] text-green-400 font-bold uppercase tracking-wider mt-0.5">REGULAR CLASS DAY</p>
                  </div>
                  <button className="bg-[#18181b] border border-white/10 px-1.5 py-0.5 rounded text-[7px] font-bold text-slate-300">Edit</button>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-2">
                  <div className="bg-[#09090b]/40 border border-white/2 p-1.5 rounded-lg text-center">
                    <span className="text-[6.5px] text-slate-500 uppercase font-bold block">ATTENDED</span>
                    <span className="text-green-400 font-black text-xs block mt-0.5">5</span>
                  </div>
                  <div className="bg-[#09090b]/40 border border-white/2 p-1.5 rounded-lg text-center">
                    <span className="text-[6.5px] text-slate-500 uppercase font-bold block">TOTAL HELD</span>
                    <span className="text-white font-black text-xs block mt-0.5">7</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#09090b]/40 border border-white/2 p-1.5 rounded-lg flex justify-between items-center">
                <span className="text-[7.5px] text-slate-400 font-semibold">DAILY PERCENTAGE</span>
                <span className="text-green-400 font-extrabold text-[9px]">71.4%</span>
              </div>
            </div>

            {/* Legend & Users */}
            <div className="flex justify-between items-center mt-2 pt-1.5 border-t border-white/5 text-[6px] text-slate-500 font-bold uppercase shrink-0">
              <div className="flex gap-2">
                <span className="flex items-center gap-0.5"><span className="w-1 h-1 bg-green-500 rounded-full"></span> Full</span>
                <span className="flex items-center gap-0.5"><span className="w-1 h-1 bg-blue-500 rounded-full"></span> Hol</span>
              </div>
              <span className="text-[6.5px] text-slate-400">CALENDAR ACTIVE</span>
            </div>
          </div>
        );
      case "special":
        return (
          <div className="w-full h-full bg-[#09090b] flex flex-col text-slate-200 overflow-y-auto font-sans p-3 text-[11px] select-none scrollbar-none">
            {/* Top Title */}
            <div className="flex justify-between items-center mb-2 shrink-0">
              <div>
                <h4 className="font-extrabold text-white text-[11px] leading-tight">EXAM SCHEDULE</h4>
                <p className="text-[7px] text-slate-500">Academic calendars & milestones</p>
              </div>
              <span className="text-[7px] font-bold text-green-400 bg-green-500/10 border border-green-500/10 px-1 py-0.5 rounded">+ Add Exam</span>
            </div>

            {/* Exam cards list */}
            <div className="space-y-1.5 mb-2.5 shrink-0">
              <div className="bg-[#18181b]/50 border border-white/5 p-1.5 rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="w-6 h-6 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-500 flex flex-col items-center justify-center shrink-0">
                    <span className="text-[8px] font-black leading-none">14</span>
                    <span className="text-[5px] uppercase font-bold leading-none mt-0.5">SEP</span>
                  </div>
                  <div>
                    <h5 className="font-extrabold text-white text-[8px] leading-tight">1st Mid Sem</h5>
                    <p className="text-[6.5px] text-slate-500 leading-none mt-0.5">14/09/2026 - 18/09/2026</p>
                  </div>
                </div>
                <span className="text-[6.5px] text-slate-400 bg-zinc-900 px-1.5 py-0.5 rounded">EDIT</span>
              </div>

              <div className="bg-[#18181b]/50 border border-white/5 p-1.5 rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="w-6 h-6 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-500 flex flex-col items-center justify-center shrink-0">
                    <span className="text-[8px] font-black leading-none">02</span>
                    <span className="text-[5px] uppercase font-bold leading-none mt-0.5">NOV</span>
                  </div>
                  <div>
                    <h5 className="font-extrabold text-white text-[8px] leading-tight">2nd Mid Sem</h5>
                    <p className="text-[6.5px] text-slate-500 leading-none mt-0.5">02/11/2026 - 06/11/2026</p>
                  </div>
                </div>
                <span className="text-[6.5px] text-slate-400 bg-zinc-900 px-1.5 py-0.5 rounded">EDIT</span>
              </div>
            </div>

            {/* KAIF'S SPECIAL SECTION */}
            <div className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-xl p-3 shadow-lg relative overflow-hidden flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1.5 mb-1.5 shrink-0">
                  <span className="text-xs">⚡</span>
                  <h4 className="font-black text-white text-[10px] uppercase tracking-wider">Kaif's Special Section</h4>
                </div>

                {/* Bunk Strategy Card */}
                <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-lg p-2 mb-1.5">
                  <span className="text-[6.5px] font-black tracking-widest text-white/80 uppercase block">BUNK STRATEGY</span>
                  <p className="text-[8px] leading-normal text-purple-100 font-medium mt-0.5">
                    Focus mode active. You need to attend the next 7 classes to hit your 75% goal. Avoid any unnecessary bunks this week.
                  </p>
                </div>
              </div>

              {/* Consistency Score Card */}
              <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-lg p-2">
                <div className="flex justify-between items-baseline text-[7px] font-black text-white/90">
                  <span>CONSISTENCY SCORE</span>
                  <span className="font-mono text-[8.5px]">56/100</span>
                </div>
                <div className="w-full h-1 bg-purple-950/40 rounded-full mt-1.5 overflow-hidden">
                  <div className="h-full bg-cyan-300 rounded-full" style={{ width: "56%" }}></div>
                </div>
              </div>
            </div>

            {/* Bottom Navigation */}
            <div className="flex justify-between items-center mt-2 pt-1.5 border-t border-white/5 text-[6px] text-slate-500 font-bold uppercase tracking-wider shrink-0">
              <span className="flex items-center gap-1"><span className="w-1 h-1 bg-green-500 rounded-full"></span> 450 LIVE USERS</span>
              <span className="text-[6.5px] text-purple-400">SPECIAL ACTIVE</span>
            </div>
          </div>
        );
      case "setup":
        return (
          <div className="w-full h-full bg-[#09090b] flex flex-col text-slate-200 overflow-y-auto font-sans p-3 text-[11px] select-none scrollbar-none justify-between">
            <div className="flex flex-col items-center mt-2">
              {/* App logo */}
              <div className="w-10 h-10 rounded-xl bg-green-500 flex items-center justify-center text-black shadow-lg shadow-green-500/10 mb-2">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </div>
              <h3 className="text-lg font-black text-white tracking-tight">BunkSafe</h3>
              <p className="text-[7px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">SMART ATTENDANCE PLANNER</p>
            </div>

            <div className="space-y-2 my-2">
              <p className="text-center font-bold text-white text-[9px] mb-0.5">Choose Setup Option</p>
              
              {/* Option 1 */}
              <div className="bg-[#18181b]/60 border border-white/5 rounded-xl p-2 flex gap-2 items-start text-left">
                <div className="w-6.5 h-6.5 rounded-lg bg-green-500/10 text-green-400 flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                    <path d="M6 12v5c0 2 2.5 3 6 3s6-1 6-3v-5" />
                  </svg>
                </div>
                <div>
                  <h5 className="font-extrabold text-white text-[8.5px] leading-tight">Jamia BTech Student</h5>
                  <p className="text-[7px] text-slate-400 leading-tight mt-0.5">Auto-load Jamia academic calendar, mid-sems & end-sem dates instantly.</p>
                </div>
              </div>

              {/* Option 2 */}
              <div className="bg-[#18181b]/60 border border-white/5 rounded-xl p-2 flex gap-2 items-start text-left">
                <div className="w-6.5 h-6.5 rounded-lg bg-zinc-800 text-slate-400 flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="3" />
                    <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
                  </svg>
                </div>
                <div>
                  <h5 className="font-extrabold text-white text-[8.5px] leading-tight">Manual College Setup</h5>
                  <p className="text-[7px] text-slate-400 leading-tight mt-0.5">Manually enter your own semester start/end dates and customize attendance goals.</p>
                </div>
              </div>
            </div>

            {/* Splash footer */}
            <div className="flex flex-col items-center mb-1 shrink-0">
              <p className="text-[7px] text-slate-500 font-bold uppercase tracking-wider leading-none">BY KAIF KHAN</p>
              <div className="w-12 h-0.5 bg-green-500/40 rounded-full mt-1 overflow-hidden">
                <div className="h-full bg-green-500 rounded-full animate-pulse" style={{ width: "60%" }}></div>
              </div>
            </div>
          </div>
        );
      case "profile":
        return (
          <div className="w-full h-full bg-[#09090b] flex flex-col text-slate-200 overflow-y-auto font-sans p-3 text-[11px] select-none scrollbar-none">
            {/* Top header */}
            <div className="flex justify-between items-center mb-2.5 shrink-0">
              <h4 className="font-extrabold text-white text-sm">Profile</h4>
              <span className="text-[7px] font-bold text-green-400 bg-green-500/10 border border-green-500/10 px-1 py-0.5 rounded">Active</span>
            </div>

            {/* Avatar section */}
            <div className="flex flex-col items-center mb-3 text-center shrink-0">
              <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-black font-black text-lg shadow-lg relative">
                K
                <div className="absolute right-0 bottom-0 w-3.5 h-3.5 bg-zinc-900 border border-white/10 rounded-full flex items-center justify-center text-[6px] text-slate-400">✎</div>
              </div>
              <h5 className="font-black text-white text-[11px] mt-1.5">Kaif Ahmad Khan</h5>
              <p className="text-[7px] text-slate-500 font-bold uppercase tracking-wider leading-none mt-0.5">Jamia Millia Islamia</p>
            </div>

            {/* Form Fields */}
            <div className="space-y-1.5 flex-1">
              <div className="bg-[#18181b]/50 border border-white/5 rounded-lg p-1.5 text-left">
                <span className="text-[6px] text-slate-500 uppercase font-extrabold tracking-wider block">Full Name</span>
                <span className="text-[8.5px] text-white font-semibold mt-0.5 block leading-none">Kaif Ahmad Khan</span>
              </div>

              <div className="bg-[#18181b]/50 border border-white/5 rounded-lg p-1.5 text-left">
                <span className="text-[6px] text-slate-500 uppercase font-extrabold tracking-wider block">Email Address</span>
                <span className="text-[8.5px] text-slate-300 font-medium mt-0.5 block leading-none">kaif@example.com</span>
              </div>

              <div className="bg-[#18181b]/50 border border-white/5 rounded-lg p-1.5 text-left">
                <span className="text-[6px] text-slate-500 uppercase font-extrabold tracking-wider block">College</span>
                <span className="text-[8.5px] text-white font-semibold mt-0.5 block leading-none">Jamia Millia Islamia</span>
              </div>

              <div className="bg-[#18181b]/50 border border-white/5 rounded-lg p-1.5 text-left">
                <span className="text-[6px] text-slate-500 uppercase font-extrabold tracking-wider block">Department</span>
                <span className="text-[8.5px] text-white font-semibold mt-0.5 block leading-none">Electronics & Comm Engine</span>
              </div>

              <div className="bg-[#18181b]/50 border border-white/5 rounded-lg p-1.5 text-left">
                <span className="text-[6px] text-slate-500 uppercase font-extrabold tracking-wider block">Semester</span>
                <span className="text-[8.5px] text-white font-semibold mt-0.5 block leading-none font-mono">Semester 5</span>
              </div>
            </div>

            {/* Bottom active indicators */}
            <div className="flex justify-between items-center mt-2 pt-1.5 border-t border-white/5 text-[6px] text-slate-500 font-bold uppercase tracking-wider shrink-0">
              <span className="flex items-center gap-1"><span className="w-1 h-1 bg-green-500 rounded-full"></span> 450 LIVE USERS</span>
              <span className="text-[6.5px] text-slate-400">PROFILE ACTIVE</span>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const currentSlide = SLIDES[currentIndex];

  return (
    <section id="screenshots" className="py-24 px-4 bg-[#09090b] border-b border-white/5 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-green-500/2 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-green-400">App Interface</span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mt-3 font-sans">
            Minimalist Interface, Maximum Control
          </h2>
          <p className="text-slate-400 mt-4 leading-relaxed text-sm">
            BunkSafe's user experience is sculpted for ease, displaying critical information in dense, high-contrast, beautiful mobile card screens.
          </p>
        </div>

        {/* Carousel Content */}
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Text & Info */}
          <div className="lg:col-span-5 text-left flex flex-col gap-6">
            <span className="px-3 py-1 bg-green-500/10 border border-green-500/20 text-green-400 rounded-lg text-xs font-semibold uppercase tracking-wider self-start font-mono">
              {currentSlide.tag}
            </span>

            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {currentSlide.title}
            </h3>

            <p className="text-slate-400 leading-relaxed text-base">
              {currentSlide.subtitle}
            </p>

            {/* Slider Navigation Dots */}
            <div className="flex items-center gap-2 mt-2">
              {SLIDES.map((slide, idx) => (
                <button
                  key={slide.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${idx === currentIndex ? "w-8 bg-green-500" : "w-2 bg-zinc-800"}`}
                  title={`Go to slide ${idx + 1}`}
                ></button>
              ))}
            </div>

            {/* Arrow Buttons */}
            <div className="flex items-center gap-3 mt-4">
              <button
                onClick={prevSlide}
                className="w-10 h-10 rounded-full bg-[#18181b] border border-white/5 text-slate-300 hover:text-white hover:border-zinc-700 hover:bg-zinc-850 flex items-center justify-center transition"
                title="Previous Slide"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextSlide}
                className="w-10 h-10 rounded-full bg-[#18181b] border border-white/5 text-slate-300 hover:text-white hover:border-zinc-700 hover:bg-zinc-850 flex items-center justify-center transition"
                title="Next Slide"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Real Screenshots Tip */}
            <div className="bg-[#18181b]/50 p-4 border border-white/5 rounded-xl text-xs text-slate-500 flex items-center gap-3 mt-4">
              <Eye className="w-5 h-5 text-green-500 shrink-0" />
              <span>
                <strong>Production Build:</strong> Showing high-resolution screenshots loaded directly from BunkSafe's Android production release.
              </span>
            </div>
          </div>

          {/* Right: Phone Frame with Swappable screenshots */}
          <div className="lg:col-span-7 flex justify-center">
            <div className="relative w-full max-w-[280px] aspect-[9/18.5] bg-[#18181b] rounded-[36px] border-4 border-zinc-800 shadow-2xl overflow-hidden ring-4 ring-green-500/10">
              
              {/* Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 h-4 w-24 bg-zinc-800 rounded-b-xl z-50"></div>
              
              {/* Screen Content Wrapper */}
              <div className="absolute inset-0 bg-[#09090b] pt-4 select-none flex flex-col justify-between">
                
                {/* Dynamic Content */}
                <div className="flex-1 overflow-hidden relative">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentIndex}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0"
                    >
                      {currentSlide.customImageUrl ? (
                        <img 
                          src={currentSlide.customImageUrl} 
                          alt={currentSlide.title} 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        renderVectorMockup(currentSlide.mockupType)
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Bottom Bar indicator */}
                <div className="h-6 flex items-center justify-center pb-2 bg-[#09090b]">
                  <div className="w-20 h-1 bg-zinc-800 rounded-full"></div>
                </div>

              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
