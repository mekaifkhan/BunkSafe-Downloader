import React, { useState, useEffect } from "react";
import { 
  Plus, 
  Minus, 
  Check, 
  X, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  Info,
  Calendar,
  BookOpen,
  PieChart as ChartIcon,
  HelpCircle,
  Wifi,
  Settings,
  ChevronRight,
  RefreshCw,
  Mail,
  Github,
  MapPin,
  GraduationCap,
  Send,
  Smartphone,
  ShieldCheck,
  User,
  Sliders,
  Database,
  Lock,
  ArrowLeft
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { apkConfig } from "../config/apkConfig";

export interface Course {
  id: string;
  name: string;
  attended: number;
  total: number;
  minRequired: number;
}

interface InteractiveMockupProps {
  overrideTab?: string;
  onTabChange?: (tab: string) => void;
  onDownloadTrigger?: () => void;
}

export default function InteractiveMockup({ 
  overrideTab, 
  onTabChange, 
  onDownloadTrigger 
}: InteractiveMockupProps) {
  
  // Simulator Navigation State
  // "dashboard" | "calculator" | "calendar" | "settings" | "features-detail" | "changelog" | "faq" | "developer"
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [lastTab, setLastTab] = useState<string>("dashboard");
  const [selectedFeatureDetail, setSelectedFeatureDetail] = useState<any>(null);

  // Sync with parent overrideTab if present
  useEffect(() => {
    if (overrideTab) {
      if (overrideTab.startsWith("features-")) {
        const featureId = overrideTab.replace("features-", "");
        const feat = DETAILED_FEATURES.find(f => f.id === featureId);
        if (feat) {
          setSelectedFeatureDetail(feat);
          setActiveTab("features-detail");
        }
      } else {
        setActiveTab(overrideTab);
      }
    }
  }, [overrideTab]);

  const handleTabTransition = (tab: string) => {
    setLastTab(activeTab);
    setActiveTab(tab);
    if (onTabChange) {
      onTabChange(tab);
    }
  };

  // 1. Core Attendance State (retained in memory for live updates)
  const [courses, setCourses] = useState<Course[]>([
    { id: "1", name: "Mathematics - IV", attended: 18, total: 24, minRequired: 75 },
    { id: "2", name: "Analog Electronics", attended: 22, total: 25, minRequired: 75 },
    { id: "3", name: "Electromagnetics", attended: 14, total: 20, minRequired: 75 },
    { id: "4", name: "Digital Signal Proc.", attended: 15, total: 21, minRequired: 75 },
  ]);

  // Add course state
  const [showAddCourse, setShowAddCourse] = useState(false);
  const [newCourseName, setNewCourseName] = useState("");
  const [newCourseAttended, setNewCourseAttended] = useState(12);
  const [newCourseTotal, setNewCourseTotal] = useState(16);

  // Calculator Projection State
  const [selectedCourseId, setSelectedCourseId] = useState<string>("1");
  const [simulateBunks, setSimulateBunks] = useState<number>(1);
  const [simulateAttends, setSimulateAttends] = useState<number>(0);

  // System update state
  const [isCheckingUpdates, setIsCheckingUpdates] = useState(false);
  const [updateStatus, setUpdateStatus] = useState<"idle" | "checking" | "up-to-date">("idle");

  // Contact form state
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMsg, setContactMsg] = useState("");
  const [isSendingMsg, setIsSendingMsg] = useState(false);
  const [msgSentSuccessfully, setMsgSentSuccessfully] = useState(false);

  // Calendar State
  const [selectedDay, setSelectedDay] = useState<number | null>(9); // Default today (July 9)
  const [calendarHolidays, setCalendarHolidays] = useState<number[]>([5, 12, 19, 26, 17]); // Sundays + Summer Holiday

  // Reset simulator stats to default
  const resetSimulatorData = () => {
    setCourses([
      { id: "1", name: "Mathematics - IV", attended: 18, total: 24, minRequired: 75 },
      { id: "2", name: "Analog Electronics", attended: 22, total: 25, minRequired: 75 },
      { id: "3", name: "Electromagnetics", attended: 14, total: 20, minRequired: 75 },
      { id: "4", name: "Digital Signal Proc.", attended: 15, total: 21, minRequired: 75 },
    ]);
    setSelectedCourseId("1");
    setSimulateBunks(1);
    setSimulateAttends(0);
    setShowAddCourse(false);
    setSelectedDay(9);
    setContactName("");
    setContactEmail("");
    setContactMsg("");
    setMsgSentSuccessfully(false);
    setUpdateStatus("idle");
  };

  const calculatePercentage = (attended: number, total: number): number => {
    if (total === 0) return 0;
    return Math.round((attended / total) * 1000) / 10;
  };

  const handleMarkAttendance = (courseId: string, action: "present" | "absent") => {
    setCourses(prev => prev.map(c => {
      if (c.id !== courseId) return c;
      const newAttended = action === "present" ? c.attended + 1 : c.attended;
      const newTotal = c.total + 1;
      return { ...c, attended: newAttended, total: newTotal };
    }));
  };

  const handleAddCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCourseName.trim()) return;
    const newCourse: Course = {
      id: Date.now().toString(),
      name: newCourseName,
      attended: Number(newCourseAttended),
      total: Number(newCourseTotal),
      minRequired: 75
    };
    setCourses(prev => [...prev, newCourse]);
    setNewCourseName("");
    setShowAddCourse(false);
  };

  const triggerCheckUpdates = () => {
    setIsCheckingUpdates(true);
    setUpdateStatus("checking");
    setTimeout(() => {
      setIsCheckingUpdates(false);
      setUpdateStatus("up-to-date");
    }, 1500);
  };

  const handleSendFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactMsg.trim()) return;
    setIsSendingMsg(true);
    setTimeout(() => {
      setIsSendingMsg(false);
      setMsgSentSuccessfully(true);
      setContactName("");
      setContactEmail("");
      setContactMsg("");
      setTimeout(() => setMsgSentSuccessfully(false), 4000);
    }, 1200);
  };

  // Resolve current calculator subject
  const currentCalcCourse = courses.find(c => c.id === selectedCourseId) || courses[0];

  // Computes maximum safe bunks or required attends
  const getCourseAdvice = (c: Course) => {
    const pct = calculatePercentage(c.attended, c.total);
    if (pct < c.minRequired) {
      let needed = 0;
      let currAttended = c.attended;
      let currTotal = c.total;
      while ((currAttended / currTotal) * 100 < c.minRequired && needed < 60) {
        currAttended++;
        currTotal++;
        needed++;
      }
      return {
        isSafe: false,
        text: `Short by ${Math.round((c.minRequired - pct) * 10) / 10}%. Attend next ${needed} class${needed > 1 ? "es" : ""}!`,
        color: "text-red-400 bg-red-950/40 border-red-900/30",
        badge: "DANGER ZONE"
      };
    } else {
      let safeBunks = 0;
      let currTotal = c.total;
      while ((c.attended / (currTotal + 1)) * 100 >= c.minRequired && safeBunks < 60) {
        currTotal++;
        safeBunks++;
      }
      if (safeBunks === 0) {
        return {
          isSafe: true,
          text: "Strict Boundary! Bunking the next lecture will fail your eligibility.",
          color: "text-amber-400 bg-amber-950/40 border-amber-900/30",
          badge: "ON LIMIT"
        };
      }
      return {
        isSafe: true,
        text: `Safe. You can bunk the next ${safeBunks} class${safeBunks > 1 ? "es" : ""} safely.`,
        color: "text-green-400 bg-green-950/40 border-green-900/30",
        badge: "SAFE MARGIN"
      };
    }
  };

  // Detailed Feature Descriptions for Material Settings drawers
  const DETAILED_FEATURES = [
    {
      id: "calc",
      title: "Smart Attendance Calculator",
      subtitle: "Scenario Projection Engine",
      desc: "Instantly projects how any skip/bunk choices affect your credentials. Allows custom parameters, consecutive misses, or long-term holiday simulations without altering your real-time log records.",
      icon: <Sliders className="w-5 h-5 text-green-400" />
    },
    {
      id: "timetable",
      title: "Lecture Timetable Manager",
      subtitle: "Weekly Sync System",
      desc: "Synchronizes JMI digital timetables directly to your weekly calendar. Automatically detects lecture time blocks, practical slots, and flags periods that are active, upcoming, or cancelled by professors.",
      icon: <Calendar className="w-5 h-5 text-emerald-400" />
    },
    {
      id: "exams",
      title: "Exam & Sessional Planner",
      subtitle: "Focus Safeguard",
      desc: "Links sessional dates and final theory schedules with your attendance metrics. Know exactly how much lecture flexibility you have during intensive preparation days.",
      icon: <GraduationCap className="w-5 h-5 text-blue-400" />
    },
    {
      id: "stats",
      title: "Attendance Trend Charts",
      subtitle: "Academic Progress Curves",
      desc: "Renders visual reports of your attendance statistics over time. Checks peak bunk schedules, weekly lecture presence ratios, and overall semester status trends per course.",
      icon: <ChartIcon className="w-5 h-5 text-purple-400" />
    },
    {
      id: "history",
      title: "Semester Archival System",
      subtitle: "Multi-semester Records",
      desc: "Preserves your past college semesters, sessional grades, and cumulative attendance. Holds a clean historic ledger of your central university career in one dashboard.",
      icon: <Database className="w-5 h-5 text-amber-400" />
    },
    {
      id: "offline",
      title: "Local SQLite Integration",
      subtitle: "Full Network Autonomy",
      desc: "BunkSafe's core functions work with full speed on your phone. Timetable configurations sync via light online calls, saving battery life and data costs.",
      icon: <Wifi className="w-5 h-5 text-sky-400" />
    },
    {
      id: "speed",
      title: "200ms Fast Startup",
      subtitle: "Ultra-Light Performance",
      desc: "Zero splash panels, slow loadings, or heavy dependencies. Built on a fully native-optimized container structure that loads immediately in under 200 milliseconds.",
      icon: <Sparkles className="w-5 h-5 text-yellow-400" />
    },
    {
      id: "privacy",
      title: "Absolute Data Privacy First",
      subtitle: "Zero Server Logs",
      desc: "We strictly value academic confidentiality. None of your attendance logs, course details, bunk records, or timetables are uploaded to any external database servers. Everything is stored purely inside your device's sandbox.",
      icon: <Lock className="w-5 h-5 text-rose-400" />
    }
  ];

  // FAQ Database
  const SIMULATOR_FAQS = [
    {
      q: "Is BunkSafe free to use?",
      a: "Yes, BunkSafe is 100% free with absolutely no premium features, subscription plans, or intrusive ads. It is designed as a student utility tool."
    },
    {
      q: "Is it safe to install this APK?",
      a: "Absolutely. The BunkSafe APK has zero trackers, telemetry, or spyware. The entire code is fully transparent and hosted open-source on GitHub for verification."
    },
    {
      q: "Does BunkSafe require internet?",
      a: "BunkSafe needs basic internet connection to sync digital schedules and fetch academic updates, but your custom logging database is saved securely offline on your device storage."
    },
    {
      q: "How to bypass unknown source warning?",
      a: "It is a standard security warning for apps downloaded outside Google Play Store. Go to Android Settings > Security > toggle 'Install from Unknown Sources' to allow BunkSafe.apk installation."
    },
    {
      q: "Can I change the 75% target?",
      a: "Yes, inside the real app you can customize sessional target thresholds per-subject. In this emulator, courses default to the JMI standard 75% threshold."
    }
  ];

  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  return (
    <div className="relative mx-auto max-w-[350px] w-full aspect-[9/19] bg-[#121214] rounded-[52px] border-[10px] border-zinc-800 shadow-2xl overflow-hidden ring-4 ring-green-500/15">
      
      {/* 1. Android Speakers Notch and Camera Punch Hole */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-7 w-38 bg-zinc-800 rounded-b-3xl z-50 flex items-center justify-center gap-2.5">
        <div className="w-12 h-1 bg-zinc-700 rounded-full"></div>
        <div className="w-3 h-3 bg-[#09090b] rounded-full border-2 border-zinc-800"></div>
      </div>

      {/* 2. Device App Glass Screen Layer */}
      <div className="absolute inset-0 bg-[#09090b] flex flex-col justify-between pt-7 text-slate-100 select-none overflow-hidden font-sans">
        
        {/* Android Status Bar */}
        <div className="px-5 pt-1.5 pb-2 flex justify-between items-center text-[10px] font-mono text-slate-400 z-30 bg-[#09090b]">
          <span>09:41 AM</span>
          <div className="flex items-center gap-1.5">
            <Wifi className="w-3 h-3 text-green-400" />
            <span className="text-green-400 text-[8px] bg-green-500/10 border border-green-500/20 px-1 rounded font-bold">5G LTE</span>
            <div className="w-4 h-2.5 border border-slate-500 rounded-sm p-0.5 flex items-center">
              <div className="w-2.5 h-full bg-green-400 rounded-2xs"></div>
            </div>
          </div>
        </div>

        {/* 3. Main Screen Router Area with slide/fade animation */}
        <div className="flex-1 overflow-y-auto px-4 py-2 scrollbar-none flex flex-col relative z-10 bg-[#09090b]">
          
          <AnimatePresence mode="wait">
            
            {/* VIEW A: TRACKER DASHBOARD */}
            {activeTab === "dashboard" && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, x: lastTab === "calculator" || lastTab === "calendar" ? -30 : 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.25 }}
                className="flex-1 flex flex-col gap-3.5 pb-4"
              >
                {/* Header Widget */}
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-[9px] text-green-400 font-bold uppercase tracking-widest font-mono">My Attendance</span>
                    <h3 className="text-base font-extrabold text-white flex items-center gap-1">
                      Dashboard Hub
                      <Sparkles className="w-4 h-4 text-green-400 fill-green-400/15" />
                    </h3>
                  </div>
                  <button 
                    onClick={resetSimulatorData}
                    className="text-[9px] font-mono bg-zinc-900 border border-zinc-800 text-slate-300 px-2.5 py-1 rounded-xl hover:bg-zinc-800 active:scale-95 transition"
                  >
                    Reset Data
                  </button>
                </div>

                {/* Subjects Cards */}
                <div className="flex flex-col gap-3">
                  {courses.map((course) => {
                    const pct = calculatePercentage(course.attended, course.total);
                    const bInfo = getCourseAdvice(course);

                    return (
                      <div 
                        key={course.id}
                        className="bg-[#151518] border border-white/5 rounded-2xl p-3.5 flex flex-col gap-2.5 hover:border-green-500/10 transition duration-250 shadow-md"
                      >
                        {/* Title and stats summary */}
                        <div className="flex justify-between items-start gap-2">
                          <div className="min-w-0">
                            <h4 className="text-xs font-bold text-slate-100 truncate">{course.name}</h4>
                            <span className="text-[10px] text-slate-400 font-mono block mt-0.5">
                              Presence: <strong className="text-slate-200">{course.attended}</strong> / {course.total} classes
                            </span>
                          </div>
                          
                          <div className="text-right shrink-0">
                            <span className={`text-sm font-black font-mono tracking-tight ${pct >= course.minRequired ? "text-green-400" : "text-red-400"}`}>
                              {pct}%
                            </span>
                            <div className="text-[7px] text-slate-500 font-bold uppercase tracking-wider block">
                              Goal: {course.minRequired}%
                            </div>
                          </div>
                        </div>

                        {/* Progress slider line */}
                        <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full transition-all duration-500 ${pct >= course.minRequired ? "bg-green-400" : "bg-red-400"}`}
                            style={{ width: `${Math.min(pct, 100)}%` }}
                          ></div>
                        </div>

                        {/* Action status note */}
                        <div className={`px-2.5 py-1.5 rounded-xl text-[9px] leading-snug flex items-center justify-between border ${bInfo.color}`}>
                          <span className="font-medium line-clamp-1">{bInfo.text}</span>
                          <span className="text-[7px] font-bold px-1.5 py-0.5 bg-black/30 rounded-md shrink-0 uppercase tracking-wider font-mono">
                            {bInfo.badge}
                          </span>
                        </div>

                        {/* Attendance Toggles */}
                        <div className="grid grid-cols-2 gap-2 pt-0.5">
                          <button
                            onClick={() => handleMarkAttendance(course.id, "present")}
                            className="bg-green-500/10 hover:bg-green-500/20 text-green-400 border border-green-500/15 rounded-xl py-1.5 text-[10px] font-bold flex items-center justify-center gap-1 active:scale-95 transition"
                          >
                            <Check className="w-3.5 h-3.5" /> Present
                          </button>
                          <button
                            onClick={() => handleMarkAttendance(course.id, "absent")}
                            className="bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/15 rounded-xl py-1.5 text-[10px] font-bold flex items-center justify-center gap-1 active:scale-95 transition"
                          >
                            <X className="w-3.5 h-3.5" /> Bunked
                          </button>
                        </div>

                      </div>
                    );
                  })}
                </div>

                {/* In-app dynamic Add Subject form */}
                {showAddCourse ? (
                  <form onSubmit={handleAddCourse} className="bg-[#151518] border border-green-500/25 rounded-2xl p-4 flex flex-col gap-3">
                    <h5 className="text-[10px] font-bold text-green-400 uppercase tracking-widest">Register New Course</h5>
                    
                    <div className="flex flex-col gap-1">
                      <label className="text-[8px] text-slate-500 font-bold uppercase">Subject Title</label>
                      <input 
                        type="text" 
                        placeholder="e.g. Computer Networks"
                        value={newCourseName}
                        onChange={(e) => setNewCourseName(e.target.value)}
                        className="bg-[#09090b] border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-green-500 w-full"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="flex flex-col gap-1">
                        <label className="text-[8px] text-slate-500 font-bold uppercase">Attended</label>
                        <input 
                          type="number" 
                          min="0"
                          value={newCourseAttended}
                          onChange={(e) => setNewCourseAttended(Math.max(0, Number(e.target.value)))}
                          className="bg-[#09090b] border border-zinc-800 rounded-xl px-3 py-1.5 text-center text-white"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[8px] text-slate-500 font-bold uppercase">Total Classes</label>
                        <input 
                          type="number" 
                          min={newCourseAttended}
                          value={newCourseTotal}
                          onChange={(e) => setNewCourseTotal(Math.max(newCourseAttended, Number(e.target.value)))}
                          className="bg-[#09090b] border border-zinc-800 rounded-xl px-3 py-1.5 text-center text-white"
                        />
                      </div>
                    </div>

                    <div className="flex gap-2 justify-end mt-1 text-[10px]">
                      <button 
                        type="button" 
                        onClick={() => setShowAddCourse(false)}
                        className="px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-slate-400"
                      >
                        Cancel
                      </button>
                      <button 
                        type="submit" 
                        className="px-4.5 py-1.5 rounded-xl bg-green-500 text-black font-extrabold"
                      >
                        Add Subject
                      </button>
                    </div>

                  </form>
                ) : (
                  <button
                    onClick={() => setShowAddCourse(true)}
                    className="w-full py-3.5 rounded-2xl border border-dashed border-zinc-800 hover:border-green-500/30 hover:bg-green-500/2 text-slate-400 hover:text-green-400 flex items-center justify-center gap-1.5 text-xs font-semibold transition mt-0.5"
                  >
                    <Plus className="w-4 h-4" /> Add Lecture Course
                  </button>
                )}

              </motion.div>
            )}

            {/* VIEW B: PROJECTION CALCULATOR */}
            {activeTab === "calculator" && (
              <motion.div
                key="calculator"
                initial={{ opacity: 0, x: lastTab === "dashboard" ? 30 : -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.25 }}
                className="flex-1 flex flex-col gap-3.5 pb-4"
              >
                <div>
                  <span className="text-[9px] text-green-400 font-bold uppercase tracking-widest font-mono">Bunk Projection Simulator</span>
                  <h3 className="text-base font-extrabold text-white flex items-center gap-1.5">
                    Smart Calculator
                    <Sliders className="w-4 h-4 text-green-400" />
                  </h3>
                </div>

                <div className="bg-[#151518] border border-white/5 rounded-2xl p-4 flex flex-col gap-3.5 shadow-lg">
                  
                  {/* Subject Pick list */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[8px] text-slate-500 font-bold uppercase">Select Subject</label>
                    <select
                      value={selectedCourseId}
                      onChange={(e) => {
                        setSelectedCourseId(e.target.value);
                        setSimulateBunks(1);
                        setSimulateAttends(0);
                      }}
                      className="bg-[#09090b] border border-zinc-800 rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-green-500 font-bold w-full"
                    >
                      {courses.map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>

                  {/* Dynamic Simulation Controls */}
                  <div className="grid grid-cols-2 gap-3.5 mt-1">
                    
                    {/* Bunks Slider */}
                    <div className="flex flex-col gap-1.5 bg-[#09090b] border border-zinc-850 p-2.5 rounded-xl">
                      <span className="text-[8px] text-red-400 font-black uppercase tracking-wider">Simulate Bunks</span>
                      <div className="flex items-center justify-between gap-1.5 mt-1">
                        <button 
                          onClick={() => setSimulateBunks(p => Math.max(0, p - 1))}
                          className="w-6 h-6 bg-[#151518] rounded-lg flex items-center justify-center text-slate-300 hover:bg-zinc-800"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-xs font-bold font-mono text-white">{simulateBunks}</span>
                        <button 
                          onClick={() => setSimulateBunks(p => p + 1)}
                          className="w-6 h-6 bg-[#151518] rounded-lg flex items-center justify-center text-slate-300 hover:bg-zinc-800"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <span className="text-[7px] text-slate-500 mt-1 block leading-tight">Miss future lectures</span>
                    </div>

                    {/* Attends Slider */}
                    <div className="flex flex-col gap-1.5 bg-[#09090b] border border-zinc-850 p-2.5 rounded-xl">
                      <span className="text-[8px] text-green-400 font-black uppercase tracking-wider">Simulate Attends</span>
                      <div className="flex items-center justify-between gap-1.5 mt-1">
                        <button 
                          onClick={() => setSimulateAttends(p => Math.max(0, p - 1))}
                          className="w-6 h-6 bg-[#151518] rounded-lg flex items-center justify-center text-slate-300 hover:bg-zinc-800"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-xs font-bold font-mono text-white">{simulateAttends}</span>
                        <button 
                          onClick={() => setSimulateAttends(p => p + 1)}
                          className="w-6 h-6 bg-[#151518] rounded-lg flex items-center justify-center text-slate-300 hover:bg-zinc-800"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <span className="text-[7px] text-slate-500 mt-1 block leading-tight">Attend next classes</span>
                    </div>

                  </div>
                </div>

                {/* Projection Outcome Widget */}
                {currentCalcCourse && (
                  <div className="bg-[#151518] border border-white/5 rounded-2xl p-4 flex flex-col gap-3 shadow-lg">
                    <span className="text-[9px] uppercase tracking-widest text-amber-400 font-bold font-mono">Dynamic Analysis</span>
                    
                    {(() => {
                      const baseAttended = currentCalcCourse.attended;
                      const baseTotal = currentCalcCourse.total;
                      const finalAttended = baseAttended + simulateAttends;
                      const finalTotal = baseTotal + simulateAttends + simulateBunks;
                      const currentPct = calculatePercentage(baseAttended, baseTotal);
                      const projectedPct = calculatePercentage(finalAttended, finalTotal);
                      const isProjectedSafe = projectedPct >= currentCalcCourse.minRequired;

                      return (
                        <div className="flex flex-col gap-2.5">
                          
                          <div className="flex justify-between items-center text-[10px] text-slate-400">
                            <span>Current Rating:</span>
                            <span className="font-mono font-bold text-slate-200">{currentPct}%</span>
                          </div>

                          <div className="flex justify-between items-center text-xs border-t border-zinc-850 pt-2 font-bold">
                            <span className="text-slate-200">Projected Rating:</span>
                            <span className={`font-mono font-extrabold ${isProjectedSafe ? "text-green-400" : "text-red-400"}`}>
                              {projectedPct}%
                            </span>
                          </div>

                          {/* Dual comparison bar chart */}
                          <div className="w-full h-2.5 bg-zinc-900 rounded-full overflow-hidden mt-1 flex">
                            {/* Base rating */}
                            <div 
                              className={`h-full ${currentPct >= currentCalcCourse.minRequired ? "bg-green-600" : "bg-red-600"}`}
                              style={{ width: `${Math.min((baseAttended / finalTotal) * 100, 100)}%` }}
                            ></div>
                            
                            {/* Gained percentage */}
                            {simulateAttends > 0 && (
                              <div className="h-full bg-green-400 animate-pulse" style={{ width: `${Math.min((simulateAttends / finalTotal) * 100, 100)}%` }}></div>
                            )}

                            {/* Lost percentage */}
                            {simulateBunks > 0 && (
                              <div className="h-full bg-red-400/50 animate-pulse" style={{ width: `${Math.min((simulateBunks / finalTotal) * 100, 100)}%` }}></div>
                            )}
                          </div>

                          {/* Dynamic recommendation card */}
                          <div className={`p-2.5 rounded-xl border text-[9px] leading-relaxed mt-1 ${isProjectedSafe ? "text-green-400 bg-green-950/20 border-green-800/20" : "text-red-400 bg-red-950/20 border-red-800/20"}`}>
                            {isProjectedSafe ? (
                              <div className="flex items-start gap-1.5">
                                <CheckCircle2 className="w-3.5 h-3.5 text-green-400 shrink-0 mt-0.5" />
                                <span>
                                  <strong>Safe Projection!</strong> After {simulateAttends} extra sessions and {simulateBunks} skip{simulateBunks > 1 ? "s" : ""}, your level is <strong>{projectedPct}%</strong>, staying above target.
                                </span>
                              </div>
                            ) : (
                              <div className="flex items-start gap-1.5">
                                <AlertTriangle className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />
                                <span>
                                  <strong>Detention Risk!</strong> This simulation drops you to <strong>{projectedPct}%</strong>, failing the JMI BTech target. Do not bunk!
                                </span>
                              </div>
                            )}
                          </div>

                        </div>
                      );
                    })()}

                  </div>
                )}

              </motion.div>
            )}

            {/* VIEW C: ACADEMIC CALENDAR & SCHEDULE */}
            {activeTab === "calendar" && (
              <motion.div
                key="calendar"
                initial={{ opacity: 0, x: lastTab === "dashboard" || lastTab === "calculator" ? 30 : -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.25 }}
                className="flex-1 flex flex-col gap-3.5 pb-4"
              >
                <div>
                  <span className="text-[9px] text-green-400 font-bold uppercase tracking-widest font-mono">Academic Timetable Grid</span>
                  <h3 className="text-base font-extrabold text-white flex items-center gap-1.5">
                    Schedule Logger
                    <Calendar className="w-4 h-4 text-green-400" />
                  </h3>
                </div>

                {/* Calendar Layout */}
                <div className="bg-[#151518] border border-white/5 rounded-2xl p-3.5 shadow-lg flex flex-col gap-3">
                  
                  {/* Calendar Month Header */}
                  <div className="flex justify-between items-center px-1">
                    <span className="text-[11px] font-bold text-slate-100 font-sans">July 2026</span>
                    <span className="text-[8px] text-green-400 font-mono uppercase bg-green-500/10 border border-green-500/20 px-2 py-0.5 rounded-lg">Today: July 9</span>
                  </div>

                  {/* Calendar Grid of Month */}
                  <div className="grid grid-cols-7 gap-1 text-center text-[9px] font-mono mt-1">
                    
                    {/* Days Name Row */}
                    {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d, idx) => (
                      <span key={idx} className="text-slate-500 font-bold uppercase text-[8px] py-1">{d}</span>
                    ))}

                    {/* Pre-spaces for July 2026 starting on Wednesday */}
                    <span></span>
                    <span></span>
                    
                    {/* July Days */}
                    {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => {
                      const isToday = day === 9;
                      const isSelected = selectedDay === day;
                      const isHoliday = calendarHolidays.includes(day);
                      const isPresentLog = day < 9 && day % 3 !== 0 && !isHoliday;
                      const isAbsentLog = day < 9 && day % 3 === 0 && !isHoliday;

                      return (
                        <button
                          key={day}
                          onClick={() => setSelectedDay(day)}
                          className={`aspect-square rounded-xl flex flex-col items-center justify-center relative transition duration-150 active:scale-95 border ${isSelected ? "border-green-500 bg-green-500/10 text-white font-bold" : isToday ? "border-zinc-700 bg-zinc-800 text-green-400" : "border-transparent hover:bg-zinc-900 text-slate-300"}`}
                        >
                          <span>{day}</span>
                          
                          {/* Event Dot markers */}
                          <div className="flex gap-0.5 absolute bottom-1">
                            {isHoliday && <span className="w-1 h-1 rounded-full bg-amber-400"></span>}
                            {isPresentLog && <span className="w-1 h-1 rounded-full bg-green-400"></span>}
                            {isAbsentLog && <span className="w-1 h-1 rounded-full bg-red-400"></span>}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Custom Dot Legend */}
                  <div className="flex justify-around items-center text-[7px] font-mono border-t border-zinc-850 pt-2.5 text-slate-500 font-bold uppercase mt-1">
                    <div className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span> Present
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span> Absent
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span> Holiday
                    </div>
                  </div>

                </div>

                {/* Day Details Card */}
                {selectedDay !== null && (
                  <div className="bg-[#151518] border border-white/5 rounded-2xl p-3.5 shadow-md flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                      <span className="text-[9px] text-slate-400 font-mono font-bold uppercase">Lectures on July {selectedDay}, 2026</span>
                      {calendarHolidays.includes(selectedDay) && (
                        <span className="text-[7px] font-mono bg-amber-950/60 text-amber-400 border border-amber-800/20 px-1.5 py-0.5 rounded">Holiday</span>
                      )}
                    </div>

                    <div className="flex flex-col gap-1.5 mt-1">
                      {selectedDay % 2 === 0 ? (
                        <>
                          <div className="bg-[#09090b] p-2 rounded-xl border border-white/5 flex justify-between items-center text-[10px]">
                            <div>
                              <div className="font-bold text-slate-200">09:00 AM - 10:00 AM</div>
                              <div className="text-[9px] text-slate-400">Mathematics - IV (Room 302)</div>
                            </div>
                            <span className="text-[8px] bg-green-950/60 text-green-400 border border-green-500/20 px-1.5 py-0.5 rounded font-bold uppercase">Attended</span>
                          </div>
                          <div className="bg-[#09090b] p-2 rounded-xl border border-white/5 flex justify-between items-center text-[10px]">
                            <div>
                              <div className="font-bold text-slate-200">11:30 AM - 12:30 PM</div>
                              <div className="text-[9px] text-slate-400">Electromagnetics (Room 305)</div>
                            </div>
                            <span className="text-[8px] bg-red-950/60 text-red-400 border border-red-500/20 px-1.5 py-0.5 rounded font-bold uppercase">Bunked</span>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="bg-[#09090b] p-2 rounded-xl border border-white/5 flex justify-between items-center text-[10px]">
                            <div>
                              <div className="font-bold text-slate-200">10:00 AM - 11:00 AM</div>
                              <div className="text-[9px] text-slate-400">Analog Electronics (Lab 1)</div>
                            </div>
                            <span className="text-[8px] bg-green-950/60 text-green-400 border border-green-500/20 px-1.5 py-0.5 rounded font-bold uppercase">Attended</span>
                          </div>
                          <div className="bg-[#09090b] p-2 rounded-xl border border-white/5 flex justify-between items-center text-[10px]">
                            <div>
                              <div className="font-bold text-slate-200">02:00 PM - 03:00 PM</div>
                              <div className="text-[9px] text-slate-400">Digital Signal Proc. (Room 101)</div>
                            </div>
                            <span className="text-[8px] bg-zinc-800 text-slate-400 border border-zinc-700 px-1.5 py-0.5 rounded font-bold uppercase">Upcoming</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )}

              </motion.div>
            )}

            {/* VIEW D: SYSTEM SETTINGS HUB */}
            {activeTab === "settings" && (
              <motion.div
                key="settings"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.25 }}
                className="flex-1 flex flex-col gap-3.5 pb-4"
              >
                <div>
                  <span className="text-[9px] text-green-400 font-bold uppercase tracking-widest font-mono">BunkSafe Central Menu</span>
                  <h3 className="text-base font-extrabold text-white flex items-center gap-1.5">
                    System Control
                    <Settings className="w-4 h-4 text-green-400" />
                  </h3>
                </div>

                {/* Sub Menu Index Group */}
                <div className="bg-[#151518] border border-white/5 rounded-2xl overflow-hidden shadow-lg flex flex-col">
                  
                  {/* Option 1: App Specs */}
                  <button 
                    onClick={() => handleTabTransition("features")}
                    className="w-full p-3.5 flex items-center justify-between border-b border-zinc-850 hover:bg-zinc-900/40 text-left transition"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-green-500/10 border border-green-500/15 flex items-center justify-center">
                        <Sliders className="w-4 h-4 text-green-400" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-slate-100 block">App Features & Specs</span>
                        <span className="text-[9px] text-slate-500">View 8 key developer guidelines</span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-500" />
                  </button>

                  {/* Option 2: Updates */}
                  <button 
                    onClick={() => handleTabTransition("changelog")}
                    className="w-full p-3.5 flex items-center justify-between border-b border-zinc-850 hover:bg-zinc-900/40 text-left transition"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-blue-500/10 border border-blue-500/15 flex items-center justify-center">
                        <Smartphone className="w-4 h-4 text-blue-400" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-slate-100 block">System Updates</span>
                        <span className="text-[9px] text-slate-500">Build changelog • v{apkConfig.version}</span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-500" />
                  </button>

                  {/* Option 3: FAQ */}
                  <button 
                    onClick={() => handleTabTransition("faq")}
                    className="w-full p-3.5 flex items-center justify-between border-b border-zinc-850 hover:bg-zinc-900/40 text-left transition"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-purple-500/10 border border-purple-500/15 flex items-center justify-center">
                        <HelpCircle className="w-4 h-4 text-purple-400" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-slate-100 block">Help Accordion FAQs</span>
                        <span className="text-[9px] text-slate-500">Security & installation advice</span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-500" />
                  </button>

                  {/* Option 4: About Phone Owner */}
                  <button 
                    onClick={() => handleTabTransition("developer")}
                    className="w-full p-3.5 flex items-center justify-between hover:bg-zinc-900/40 text-left transition"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/15 flex items-center justify-center">
                        <User className="w-4 h-4 text-amber-400" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-slate-100 block">About Phone & Owner</span>
                        <span className="text-[9px] text-slate-500">Kaif Khan profile & messaging form</span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-500" />
                  </button>

                </div>

                {/* Simulated APK download trigger badge */}
                <div className="bg-green-500/5 border border-green-500/10 rounded-2xl p-4 flex flex-col gap-2.5">
                  <h4 className="text-xs font-bold text-green-400 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4" /> Download Hub
                  </h4>
                  <p className="text-[9px] leading-relaxed text-slate-400">
                    Test the live interface of BunkSafe right here, and tap the trigger button to download the true Android APK package immediately on your phone!
                  </p>
                  <button
                    onClick={onDownloadTrigger}
                    className="w-full bg-green-500 hover:bg-green-400 text-black font-extrabold py-2 px-4 rounded-xl text-[10px] shadow-md flex items-center justify-center gap-1.5 active:scale-95 transition"
                  >
                    Download APK Build ({apkConfig.fileSize})
                  </button>
                </div>

              </motion.div>
            )}

            {/* VIEW E: APP FEATURES SPECIFICATIONS */}
            {activeTab === "features" && (
              <motion.div
                key="features"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.25 }}
                className="flex-1 flex flex-col gap-3.5 pb-4"
              >
                <div className="flex items-center gap-1">
                  <button 
                    onClick={() => handleTabTransition("settings")}
                    className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-zinc-900"
                  >
                    <ArrowLeft className="w-4.5 h-4.5" />
                  </button>
                  <div>
                    <span className="text-[8px] text-green-400 font-bold uppercase tracking-widest font-mono">BunkSafe settings</span>
                    <h3 className="text-sm font-extrabold text-white">App Features & Specs</h3>
                  </div>
                </div>

                {/* Features settings index */}
                <div className="bg-[#151518] border border-white/5 rounded-2xl overflow-hidden shadow-lg flex flex-col">
                  {DETAILED_FEATURES.map((feat) => (
                    <button
                      key={feat.id}
                      onClick={() => {
                        setSelectedFeatureDetail(feat);
                        handleTabTransition("features-detail");
                      }}
                      className="w-full p-3 flex items-center justify-between border-b border-zinc-850 last:border-b-0 hover:bg-zinc-900/40 text-left transition"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-8 h-8 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0">
                          {feat.icon}
                        </div>
                        <div className="min-w-0">
                          <span className="text-xs font-bold text-slate-100 block truncate">{feat.title}</span>
                          <span className="text-[9px] text-slate-400 block truncate mt-0.5">{feat.subtitle}</span>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-500 shrink-0" />
                    </button>
                  ))}
                </div>

              </motion.div>
            )}

            {/* VIEW F: FEATURE DETAIL SUB-DRAWER */}
            {activeTab === "features-detail" && selectedFeatureDetail && (
              <motion.div
                key="features-detail"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex-1 flex flex-col gap-3.5 pb-4"
              >
                <div className="flex items-center gap-1">
                  <button 
                    onClick={() => handleTabTransition("features")}
                    className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-zinc-900"
                  >
                    <ArrowLeft className="w-4.5 h-4.5" />
                  </button>
                  <div>
                    <span className="text-[8px] text-green-400 font-bold uppercase tracking-widest font-mono">Feature details</span>
                    <h3 className="text-sm font-extrabold text-white">System Specification</h3>
                  </div>
                </div>

                {/* Detail card */}
                <div className="bg-[#151518] border border-green-500/10 rounded-2xl p-5 shadow-lg flex flex-col gap-4 text-left">
                  <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center shadow-inner">
                    {selectedFeatureDetail.icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-white">{selectedFeatureDetail.title}</h4>
                    <span className="text-[10px] text-green-400 font-mono font-bold uppercase tracking-wider block mt-1">{selectedFeatureDetail.subtitle}</span>
                  </div>
                  <p className="text-xs leading-relaxed text-slate-300 font-medium pt-2 border-t border-zinc-850">
                    {selectedFeatureDetail.desc}
                  </p>
                </div>

              </motion.div>
            )}

            {/* VIEW G: SYSTEM UPDATE & CHANGELOG */}
            {activeTab === "changelog" && (
              <motion.div
                key="changelog"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.25 }}
                className="flex-1 flex flex-col gap-3.5 pb-4 text-left"
              >
                <div className="flex items-center gap-1">
                  <button 
                    onClick={() => handleTabTransition("settings")}
                    className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-zinc-900"
                  >
                    <ArrowLeft className="w-4.5 h-4.5" />
                  </button>
                  <div>
                    <span className="text-[8px] text-green-400 font-bold uppercase tracking-widest font-mono">BunkSafe update</span>
                    <h3 className="text-sm font-extrabold text-white">System Updates</h3>
                  </div>
                </div>

                {/* Update info panel */}
                <div className="bg-[#151518] border border-white/5 rounded-2xl p-4 flex flex-col gap-4 shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/15 flex items-center justify-center">
                      <Smartphone className="w-5.5 h-5.5 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-100">Android System Update</h4>
                      <p className="text-[9px] text-slate-400">Firmware Build Level Verified</p>
                    </div>
                  </div>

                  {/* Status readouts */}
                  <div className="flex flex-col gap-2 border-t border-zinc-850 pt-3 text-[10px] font-mono text-slate-400">
                    <div className="flex justify-between">
                      <span>App Version:</span>
                      <strong className="text-slate-100">{apkConfig.version}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Release Date:</span>
                      <strong className="text-slate-100">{apkConfig.releaseDate}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Package Size:</span>
                      <strong className="text-slate-100">{apkConfig.fileSize}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Patch Rating:</span>
                      <strong className="text-green-400 flex items-center gap-0.5">Play Protect Safe</strong>
                    </div>
                  </div>

                  {/* Changelog list inside emulator */}
                  <div className="flex flex-col gap-2 mt-1">
                    <span className="text-[8px] font-bold uppercase tracking-widest text-green-400">What's New</span>
                    <ul className="space-y-2 text-[9px] leading-relaxed text-slate-400">
                      {apkConfig.changelog.slice(0, 3).map((change, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-green-500 mt-0.5 shrink-0">•</span>
                          <span>{change}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Check Updates triggers */}
                  <div className="pt-2">
                    {updateStatus === "up-to-date" ? (
                      <div className="p-2.5 bg-green-950/40 border border-green-500/20 text-green-400 rounded-xl text-[9px] flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 shrink-0" />
                        <span><strong>Build up-to-date!</strong> v{apkConfig.version} is currently the latest stable package.</span>
                      </div>
                    ) : (
                      <button
                        onClick={triggerCheckUpdates}
                        disabled={isCheckingUpdates}
                        className="w-full bg-[#09090b] hover:bg-zinc-900 text-slate-300 border border-zinc-800 font-bold py-2 px-4 rounded-xl text-[10px] flex items-center justify-center gap-1.5 transition"
                      >
                        {isCheckingUpdates ? (
                          <>
                            <RefreshCw className="w-3.5 h-3.5 animate-spin text-green-400" />
                            Checking signatures...
                          </>
                        ) : (
                          "Check for Updates"
                        )}
                      </button>
                    )}
                  </div>

                </div>

              </motion.div>
            )}

            {/* VIEW H: SUPPORT ACCORDION FAQs */}
            {activeTab === "faq" && (
              <motion.div
                key="faq"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.25 }}
                className="flex-1 flex flex-col gap-3.5 pb-4 text-left"
              >
                <div className="flex items-center gap-1">
                  <button 
                    onClick={() => handleTabTransition("settings")}
                    className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-zinc-900"
                  >
                    <ArrowLeft className="w-4.5 h-4.5" />
                  </button>
                  <div>
                    <span className="text-[8px] text-green-400 font-bold uppercase tracking-widest font-mono">Help center</span>
                    <h3 className="text-sm font-extrabold text-white">Help & Accordion FAQs</h3>
                  </div>
                </div>

                {/* FAQ Accordion block */}
                <div className="flex flex-col gap-2.5">
                  {SIMULATOR_FAQS.map((faq, idx) => {
                    const isOpen = openFaqIdx === idx;
                    return (
                      <div 
                        key={idx}
                        className={`bg-[#151518] border rounded-xl overflow-hidden transition-all duration-200 ${isOpen ? "border-green-500/20 bg-[#151518]" : "border-white/5"}`}
                      >
                        <button
                          onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                          className="w-full p-3.5 flex items-center justify-between text-left gap-2"
                        >
                          <span className="text-[10px] font-bold text-slate-100">{faq.q}</span>
                          <span className={`text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`}>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </span>
                        </button>
                        {isOpen && (
                          <div className="px-3.5 pb-3.5 text-[9px] leading-relaxed text-slate-400 border-t border-zinc-850 pt-2 whitespace-pre-line">
                            {faq.a}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

              </motion.div>
            )}

            {/* VIEW I: DEVELOPER ABOUT PHONE PROFILE & CONTACT */}
            {activeTab === "developer" && (
              <motion.div
                key="developer"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.25 }}
                className="flex-1 flex flex-col gap-3.5 pb-4 text-left"
              >
                <div className="flex items-center gap-1">
                  <button 
                    onClick={() => handleTabTransition("settings")}
                    className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-zinc-900"
                  >
                    <ArrowLeft className="w-4.5 h-4.5" />
                  </button>
                  <div>
                    <span className="text-[8px] text-green-400 font-bold uppercase tracking-widest font-mono">Device specifications</span>
                    <h3 className="text-sm font-extrabold text-white">About Phone & Owner</h3>
                  </div>
                </div>

                {/* Profile card */}
                <div className="bg-[#151518] border border-white/5 rounded-2xl p-4 flex flex-col gap-3.5 shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-green-500 to-green-300 flex items-center justify-center text-black font-black text-sm shadow-md">
                      KK
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white flex items-center gap-1">
                        Kaif Ahmad Khan
                        <Sparkles className="w-3 h-3 text-green-400" />
                      </h4>
                      <p className="text-[8px] text-slate-400 font-mono">Owner • Jamia Millia Islamia</p>
                    </div>
                  </div>

                  {/* Academic / Bio widgets */}
                  <div className="flex flex-col gap-2 border-t border-zinc-850 pt-3 text-[9px] text-slate-400">
                    <div className="flex items-start gap-2">
                      <GraduationCap className="w-3.5 h-3.5 text-green-400 shrink-0" />
                      <div>
                        <strong className="text-slate-200 block">B.Tech Electronics & Communication</strong>
                        <span className="text-[8px] text-slate-500">Central University, New Delhi</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-green-400 shrink-0" />
                      <span>Based in New Delhi, India</span>
                    </div>
                  </div>
                </div>

                {/* Developer Feedback Messaging Form */}
                <div className="bg-[#151518] border border-white/5 rounded-2xl p-4 flex flex-col gap-3 shadow-lg">
                  <h4 className="text-[10px] font-bold text-white flex items-center gap-1.5 uppercase tracking-wider">
                    <Send className="w-3.5 h-3.5 text-green-400" /> Send Broadcast Msg
                  </h4>
                  
                  {msgSentSuccessfully ? (
                    <div className="p-3 bg-green-950/40 border border-green-500/20 text-green-400 rounded-xl text-[9px] flex flex-col gap-1 text-center animate-bounce">
                      <CheckCircle2 className="w-6 h-6 mx-auto text-green-400" />
                      <strong className="text-white block">Broadcast Synced!</strong>
                      <span>Message successfully dispatched to <strong>mekhankaif@gmail.com</strong>. Kaif will reply soon!</span>
                    </div>
                  ) : (
                    <form onSubmit={handleSendFeedback} className="flex flex-col gap-2">
                      <input 
                        type="text" 
                        placeholder="Your Name (e.g. Kaif Khan)"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        className="bg-[#09090b] border border-zinc-850 rounded-xl px-2.5 py-1.5 text-[10px] text-white focus:outline-none focus:border-green-500 placeholder:text-zinc-600 w-full"
                        required
                      />
                      <input 
                        type="email" 
                        placeholder="Your Email (e.g. name@jmi.edu)"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        className="bg-[#09090b] border border-zinc-850 rounded-xl px-2.5 py-1.5 text-[10px] text-white focus:outline-none focus:border-green-500 placeholder:text-zinc-600 w-full"
                        required
                      />
                      <textarea 
                        rows={3}
                        placeholder="Type sessional feedback..."
                        value={contactMsg}
                        onChange={(e) => setContactMsg(e.target.value)}
                        className="bg-[#09090b] border border-zinc-850 rounded-xl px-2.5 py-1.5 text-[10px] text-white focus:outline-none focus:border-green-500 placeholder:text-zinc-600 w-full resize-none"
                        required
                      ></textarea>
                      <button
                        type="submit"
                        disabled={isSendingMsg}
                        className="w-full bg-green-500 hover:bg-green-400 disabled:bg-zinc-850 text-black font-extrabold py-2 px-4 rounded-xl text-[9px] flex items-center justify-center gap-1 active:scale-95 transition"
                      >
                        {isSendingMsg ? "Dispatching..." : "Send Message"}
                      </button>
                    </form>
                  )}
                </div>

              </motion.div>
            )}

          </AnimatePresence>

        </div>

        {/* 4. Bottom Simulated Tab Navigation Bar */}
        <div className="h-14 bg-[#141416] border-t border-white/5 flex items-center justify-around px-2 z-20">
          
          {/* Tab 1: Tracker */}
          <button 
            onClick={() => handleTabTransition("dashboard")} 
            className={`flex flex-col items-center gap-1 w-14 transition active:scale-90 ${activeTab === "dashboard" ? "text-green-400" : "text-slate-500 hover:text-slate-300"}`}
          >
            <ChartIcon className="w-4.5 h-4.5" />
            <span className="text-[7.5px] font-bold uppercase tracking-wider">Tracker</span>
          </button>
          
          {/* Tab 2: Calculator */}
          <button 
            onClick={() => handleTabTransition("calculator")} 
            className={`flex flex-col items-center gap-1 w-14 transition active:scale-90 ${activeTab === "calculator" ? "text-green-400" : "text-slate-500 hover:text-slate-300"}`}
          >
            <BookOpen className="w-4.5 h-4.5" />
            <span className="text-[7.5px] font-bold uppercase tracking-wider">Simulator</span>
          </button>
          
          {/* Tab 3: Calendar Schedule */}
          <button 
            onClick={() => handleTabTransition("calendar")} 
            className={`flex flex-col items-center gap-1 w-14 transition active:scale-90 ${activeTab === "calendar" ? "text-green-400" : "text-slate-500 hover:text-slate-300"}`}
          >
            <Calendar className="w-4.5 h-4.5" />
            <span className="text-[7.5px] font-bold uppercase tracking-wider">Schedule</span>
          </button>

          {/* Tab 4: Settings Central Menu */}
          <button 
            onClick={() => handleTabTransition("settings")} 
            className={`flex flex-col items-center gap-1 w-14 transition active:scale-90 ${activeTab === "settings" || activeTab === "features" || activeTab === "features-detail" || activeTab === "changelog" || activeTab === "faq" || activeTab === "developer" ? "text-green-400" : "text-slate-500 hover:text-slate-300"}`}
          >
            <Settings className="w-4.5 h-4.5" />
            <span className="text-[7.5px] font-bold uppercase tracking-wider">System</span>
          </button>
          
        </div>

      </div>

    </div>
  );
}
