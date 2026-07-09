import React, { useState } from "react";
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
  Wifi
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Course {
  id: string;
  name: string;
  attended: number;
  total: number;
  minRequired: number; // e.g. 75
}

export default function InteractiveMockup() {
  const [activeTab, setActiveTab] = useState<"dashboard" | "calculator" | "timetable">("dashboard");
  const [courses, setCourses] = useState<Course[]>([
    { id: "1", name: "Mathematics - IV", attended: 18, total: 24, minRequired: 75 },
    { id: "2", name: "Analog Electronics", attended: 22, total: 25, minRequired: 75 },
    { id: "3", name: "Electromagnetics", attended: 14, total: 20, minRequired: 75 },
    { id: "4", name: "Digital Signal Proc.", attended: 15, total: 21, minRequired: 75 },
  ]);

  // States for interactive calculator
  const [selectedCourse, setSelectedCourse] = useState<string>("1");
  const [simulateBunks, setSimulateBunks] = useState<number>(1);
  const [simulateAttends, setSimulateAttends] = useState<number>(0);

  // States for adding a new course in-simulator
  const [showAddCourse, setShowAddCourse] = useState(false);
  const [newCourseName, setNewCourseName] = useState("");
  const [newCourseAttended, setNewCourseAttended] = useState(12);
  const [newCourseTotal, setNewCourseTotal] = useState(16);

  // Constants
  const minRequiredThreshold = 75;

  const handleAttendanceChange = (courseId: string, action: "attend" | "bunk" | "undo_attend" | "undo_bunk") => {
    setCourses(prev => prev.map(c => {
      if (c.id !== courseId) return c;
      let newAttended = c.attended;
      let newTotal = c.total;

      if (action === "attend") {
        newAttended++;
        newTotal++;
      } else if (action === "bunk") {
        newTotal++;
      }
      return { ...c, attended: newAttended, total: newTotal };
    }));
  };

  const resetSimulator = () => {
    setCourses([
      { id: "1", name: "Mathematics - IV", attended: 18, total: 24, minRequired: 75 },
      { id: "2", name: "Analog Electronics", attended: 22, total: 25, minRequired: 75 },
      { id: "3", name: "Electromagnetics", attended: 14, total: 20, minRequired: 75 },
      { id: "4", name: "Digital Signal Proc.", attended: 15, total: 21, minRequired: 75 },
    ]);
    setSimulateBunks(1);
    setSimulateAttends(0);
  };

  const handleAddCourseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCourseName.trim()) return;
    const newCourse: Course = {
      id: Date.now().toString(),
      name: newCourseName,
      attended: Number(newCourseAttended),
      total: Number(newCourseTotal),
      minRequired: minRequiredThreshold
    };
    setCourses(prev => [...prev, newCourse]);
    setNewCourseName("");
    setShowAddCourse(false);
  };

  const calculatePercentage = (attended: number, total: number): number => {
    if (total === 0) return 0;
    return Math.round((attended / total) * 1000) / 10;
  };

  const currentSimCourse = courses.find(c => c.id === selectedCourse) || courses[0];

  // Helper calculation for Bunks
  const getBunkStatus = (c: Course) => {
    const percent = calculatePercentage(c.attended, c.total);
    if (percent < c.minRequired) {
      // Must attend how many classes to reach target
      let targetAttends = 0;
      let currentAttended = c.attended;
      let currentTotal = c.total;
      while ((currentAttended / currentTotal) * 100 < c.minRequired && targetAttends < 50) {
        currentAttended++;
        currentTotal++;
        targetAttends++;
      }
      return { status: "danger", message: `Short attendance. Must attend next ${targetAttends} class${targetAttends > 1 ? "es" : ""}!`, color: "text-red-400 bg-red-950/40 border-red-800/30" };
    } else {
      // How many classes can be bunked safely
      let safeBunks = 0;
      let currentTotal = c.total;
      while ((c.attended / (currentTotal + 1)) * 100 >= c.minRequired && safeBunks < 50) {
        currentTotal++;
        safeBunks++;
      }
      if (safeBunks === 0) {
        return { status: "boundary", message: "On boundary! You cannot bunk the next class.", color: "text-amber-400 bg-amber-950/40 border-amber-800/30" };
      }
      return { status: "safe", message: `Safe! You can bunk the next ${safeBunks} class${safeBunks > 1 ? "es" : ""} safely.`, color: "text-emerald-400 bg-emerald-950/40 border-emerald-800/30" };
    }
  };

  return (
    <div id="interactive-demo" className="relative mx-auto max-w-[340px] w-full aspect-[9/19] bg-[#18181b] rounded-[48px] border-8 border-zinc-800 shadow-2xl overflow-hidden ring-4 ring-green-500/20">
      {/* Speaker grill and camera notch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-6 w-36 bg-zinc-800 rounded-b-2xl z-50 flex items-center justify-center gap-2">
        <div className="w-10 h-1 bg-zinc-700 rounded-full"></div>
        <div className="w-2.5 h-2.5 bg-[#09090b] rounded-full border border-zinc-800"></div>
      </div>

      {/* Screen Container */}
      <div className="absolute inset-0 bg-[#09090b] flex flex-col justify-between pt-6 text-slate-100 select-none">
        
        {/* Status Bar */}
        <div className="px-5 pt-2 flex justify-between items-center text-[10px] text-slate-400 font-mono">
          <span>09:41</span>
          <div className="flex items-center gap-1.5">
            <Wifi className="w-3 h-3 text-green-400" />
            <span className="bg-green-500/10 text-green-400 px-1 rounded text-[8px] border border-green-500/20 font-bold">ONLINE</span>
            <div className="w-4 h-2.5 border border-slate-500 rounded-sm p-0.5 flex items-center">
              <div className="w-2 h-full bg-green-400 rounded-2xs"></div>
            </div>
          </div>
        </div>

        {/* Dynamic Simulator Screen Area */}
        <div className="flex-1 overflow-y-auto px-4 py-3 scrollbar-none flex flex-col">
          
          {/* Simulated App Header */}
          <div className="flex justify-between items-center mb-4">
            <div>
              <span className="text-[10px] text-green-400 uppercase tracking-widest font-bold">BunkSafe</span>
              <h4 className="text-sm font-semibold tracking-tight text-white flex items-center gap-1">
                Attendance Hub
                <Sparkles className="w-3.5 h-3.5 text-green-400 fill-green-400/20" />
              </h4>
            </div>
            <button 
              onClick={resetSimulator} 
              className="text-[9px] bg-zinc-800 text-slate-300 px-2 py-1 rounded-md hover:bg-zinc-700 transition font-mono border border-white/5"
            >
              Reset App
            </button>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === "dashboard" && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex-1 flex flex-col gap-3"
              >
                {/* Course List */}
                <div className="flex flex-col gap-2.5">
                  {courses.map((course) => {
                    const pct = calculatePercentage(course.attended, course.total);
                    const isSafe = pct >= course.minRequired;
                    const bInfo = getBunkStatus(course);

                    return (
                      <div 
                        key={course.id} 
                        className="bg-[#18181b]/80 border border-white/5 rounded-xl p-3 flex flex-col gap-2 shadow-lg"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h5 className="text-[11px] font-medium text-slate-200 line-clamp-1">{course.name}</h5>
                            <span className="text-[9px] text-slate-400 font-mono">
                              Attended: {course.attended}/{course.total} classes
                            </span>
                          </div>
                          
                          {/* Percentage Badge */}
                          <div className="text-right">
                            <span className={`text-xs font-bold font-mono ${isSafe ? "text-green-400" : "text-red-400"}`}>
                              {pct}%
                            </span>
                            <div className="text-[7px] text-slate-500 font-bold uppercase tracking-wider">
                              Target: {course.minRequired}%
                            </div>
                          </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full transition-all duration-500 ${isSafe ? "bg-green-400" : "bg-red-400"}`}
                            style={{ width: `${Math.min(pct, 100)}%` }}
                          ></div>
                        </div>

                        {/* Status notification */}
                        <div className={`px-2 py-1 rounded text-[8px] flex items-center gap-1 border ${bInfo.color}`}>
                          {bInfo.status === "danger" && <AlertTriangle className="w-2.5 h-2.5 shrink-0" />}
                          {bInfo.status === "boundary" && <Info className="w-2.5 h-2.5 shrink-0" />}
                          {bInfo.status === "safe" && <CheckCircle2 className="w-2.5 h-2.5 shrink-0" />}
                          <span className="line-clamp-1">{bInfo.message}</span>
                        </div>

                        {/* Quick Mark buttons inside emulator */}
                        <div className="grid grid-cols-2 gap-1.5 mt-1">
                          <button
                            onClick={() => handleAttendanceChange(course.id, "attend")}
                            className="bg-green-950/40 hover:bg-green-900/60 text-green-400 border border-green-500/20 rounded-md py-1 text-[9px] flex items-center justify-center gap-1 transition"
                          >
                            <Check className="w-3 h-3" /> Mark Present
                          </button>
                          <button
                            onClick={() => handleAttendanceChange(course.id, "bunk")}
                            className="bg-red-950/40 hover:bg-red-900/60 text-red-400 border border-red-500/20 rounded-md py-1 text-[9px] flex items-center justify-center gap-1 transition"
                          >
                            <X className="w-3 h-3" /> Mark Absent
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Simulated Add Course Feature */}
                {showAddCourse ? (
                  <form onSubmit={handleAddCourseSubmit} className="bg-[#18181b]/90 border border-green-500/20 rounded-xl p-3 flex flex-col gap-2 mt-1">
                    <h6 className="text-[10px] font-bold uppercase tracking-wider text-green-400">Add New Subject</h6>
                    <input 
                      type="text" 
                      placeholder="e.g., Computer Networks" 
                      value={newCourseName}
                      onChange={(e) => setNewCourseName(e.target.value)}
                      className="bg-[#09090b] border border-white/5 rounded px-2 py-1 text-[10px] text-white focus:outline-none focus:border-green-500 w-full"
                      required
                    />
                    <div className="grid grid-cols-2 gap-2 text-[9px]">
                      <div>
                        <label className="text-slate-400 block mb-0.5">Attended</label>
                        <input 
                          type="number" 
                          min="0"
                          value={newCourseAttended}
                          onChange={(e) => setNewCourseAttended(Math.max(0, Number(e.target.value)))}
                          className="bg-[#09090b] border border-white/5 rounded px-2 py-1 w-full text-white"
                        />
                      </div>
                      <div>
                        <label className="text-slate-400 block mb-0.5">Total Classes</label>
                        <input 
                          type="number" 
                          min={newCourseAttended}
                          value={newCourseTotal}
                          onChange={(e) => setNewCourseTotal(Math.max(newCourseAttended, Number(e.target.value)))}
                          className="bg-[#09090b] border border-white/5 rounded px-2 py-1 w-full text-white"
                        />
                      </div>
                    </div>
                    <div className="flex gap-1.5 justify-end mt-1">
                      <button 
                        type="button" 
                        onClick={() => setShowAddCourse(false)}
                        className="px-2.5 py-1 rounded bg-[#18181b] text-slate-400 text-[9px]"
                      >
                        Cancel
                      </button>
                      <button 
                        type="submit" 
                        className="px-2.5 py-1 rounded bg-green-500 text-black text-[9px] font-semibold"
                      >
                        Create
                      </button>
                    </div>
                  </form>
                ) : (
                  <button
                    onClick={() => setShowAddCourse(true)}
                    className="w-full py-2.5 rounded-xl border border-dashed border-zinc-800 hover:border-green-500/30 text-slate-400 hover:text-green-400 flex items-center justify-center gap-1.5 text-[10px] font-medium transition mt-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Course
                  </button>
                )}
              </motion.div>
            )}

            {activeTab === "calculator" && (
              <motion.div
                key="calculator"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex-1 flex flex-col gap-3"
              >
                {/* Simulator Selection */}
                <div className="bg-[#18181b] border border-white/5 rounded-xl p-3 flex flex-col gap-2.5 shadow-lg">
                  <span className="text-[9px] uppercase tracking-wider text-green-400 font-bold">Attendance Calculator</span>
                  
                  {/* Select Course dropdown */}
                  <div className="flex flex-col gap-1">
                    <label className="text-[8px] text-slate-400 font-bold uppercase">Select Course</label>
                    <select
                      value={selectedCourse}
                      onChange={(e) => {
                        setSelectedCourse(e.target.value);
                        setSimulateBunks(1);
                        setSimulateAttends(0);
                      }}
                      className="bg-[#09090b] border border-white/5 rounded px-2 py-1.5 text-[10px] text-slate-200 focus:outline-none focus:border-green-500 font-medium"
                    >
                      {courses.map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-1">
                    {/* Bunks Slider */}
                    <div className="flex flex-col gap-1 bg-[#09090b] border border-white/5 p-2 rounded-lg">
                      <span className="text-[8px] text-red-400 font-bold uppercase">Simulate Bunks</span>
                      <div className="flex items-center justify-between gap-1.5 mt-1">
                        <button 
                          onClick={() => setSimulateBunks(prev => Math.max(0, prev - 1))}
                          className="w-5 h-5 bg-[#18181b] rounded flex items-center justify-center text-slate-300 hover:bg-zinc-800"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-mono font-bold text-white">{simulateBunks}</span>
                        <button 
                          onClick={() => setSimulateBunks(prev => prev + 1)}
                          className="w-5 h-5 bg-[#18181b] rounded flex items-center justify-center text-slate-300 hover:bg-zinc-800"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <span className="text-[7px] text-slate-500 mt-1 block">Miss consecutive classes</span>
                    </div>

                    {/* Attends Slider */}
                    <div className="flex flex-col gap-1 bg-[#09090b] border border-white/5 p-2 rounded-lg">
                      <span className="text-[8px] text-green-400 font-bold uppercase">Simulate Attendance</span>
                      <div className="flex items-center justify-between gap-1.5 mt-1">
                        <button 
                          onClick={() => setSimulateAttends(prev => Math.max(0, prev - 1))}
                          className="w-5 h-5 bg-[#18181b] rounded flex items-center justify-center text-slate-300 hover:bg-zinc-800"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-mono font-bold text-white">{simulateAttends}</span>
                        <button 
                          onClick={() => setSimulateAttends(prev => prev + 1)}
                          className="w-5 h-5 bg-[#18181b] rounded flex items-center justify-center text-slate-300 hover:bg-zinc-800"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <span className="text-[7px] text-slate-500 mt-1 block">Attend consecutive classes</span>
                    </div>
                  </div>
                </div>

                {/* Calculation outcome */}
                {currentSimCourse && (
                  <div className="bg-[#18181b] border border-white/5 rounded-xl p-3 flex flex-col gap-2 shadow-lg">
                    <span className="text-[9px] uppercase tracking-wider text-amber-400 font-bold">Projection Analysis</span>
                    
                    {(() => {
                      const baseAttended = currentSimCourse.attended;
                      const baseTotal = currentSimCourse.total;
                      const finalAttended = baseAttended + simulateAttends;
                      const finalTotal = baseTotal + simulateAttends + simulateBunks;
                      const currentPct = calculatePercentage(baseAttended, baseTotal);
                      const projectedPct = calculatePercentage(finalAttended, finalTotal);
                      const isProjectedSafe = projectedPct >= currentSimCourse.minRequired;

                      return (
                        <div className="flex flex-col gap-2">
                          <div className="flex justify-between items-center text-[10px]">
                            <span className="text-slate-400">Current Attendance:</span>
                            <span className="font-mono font-bold text-slate-300">{currentPct}%</span>
                          </div>

                          <div className="flex justify-between items-center text-xs border-t border-zinc-800 pt-1.5">
                            <span className="text-slate-200 font-semibold">Projected Attendance:</span>
                            <span className={`font-mono font-bold ${isProjectedSafe ? "text-green-400" : "text-red-400"}`}>
                              {projectedPct}%
                            </span>
                          </div>

                          {/* Progress comparison */}
                          <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden mt-1 flex">
                            {/* Current progress */}
                            <div 
                              className={`h-full ${currentPct >= currentSimCourse.minRequired ? "bg-green-600" : "bg-red-600"}`}
                              style={{ width: `${Math.min((baseAttended / finalTotal) * 100, 100)}%` }}
                            ></div>
                            {/* Simulator change */}
                            {simulateAttends > 0 && (
                              <div className="h-full bg-green-400 animate-pulse" style={{ width: `${Math.min((simulateAttends / finalTotal) * 100, 100)}%` }}></div>
                            )}
                            {/* Simulator loss */}
                            {simulateBunks > 0 && (
                              <div className="h-full bg-red-400 opacity-60 animate-pulse" style={{ width: `${Math.min((simulateBunks / finalTotal) * 100, 100)}%` }}></div>
                            )}
                          </div>

                          {/* Descriptive alert */}
                          <div className={`p-2 rounded text-[9px] leading-relaxed border ${isProjectedSafe ? "text-green-400 bg-green-950/40 border-green-800/30" : "text-red-400 bg-red-950/40 border-red-800/30"}`}>
                            {isProjectedSafe ? (
                              <div className="flex items-start gap-1.5">
                                <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                                <span>
                                  <strong>Safe Scenario!</strong> Even with {simulateBunks} bunk{simulateBunks > 1 ? "s" : ""}, your attendance will remain above the {currentSimCourse.minRequired}% threshold.
                                </span>
                              </div>
                            ) : (
                              <div className="flex items-start gap-1.5">
                                <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                                <span>
                                  <strong>Attendance Drop Warning!</strong> This simulation drops you to <strong>{projectedPct}%</strong>, which is below the mandatory {currentSimCourse.minRequired}%!
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

            {activeTab === "timetable" && (
              <motion.div
                key="timetable"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex-1 flex flex-col gap-3"
              >
                {/* Timetable List */}
                <div className="bg-[#18181b] border border-white/5 rounded-xl p-3 flex flex-col gap-2 shadow-lg">
                  <span className="text-[9px] uppercase tracking-wider text-green-400 font-bold">Today's Lectures</span>
                  
                  <div className="flex flex-col gap-2 mt-1">
                    <div className="bg-[#09090b] p-2 rounded border border-white/5 flex justify-between items-center">
                      <div>
                        <div className="text-[10px] font-bold text-slate-100">09:00 AM - 10:00 AM</div>
                        <div className="text-[9px] text-slate-400">Mathematics - IV (Room 302)</div>
                      </div>
                      <span className="text-[8px] bg-green-950/60 text-green-400 border border-green-500/20 px-1.5 py-0.5 rounded">Attended</span>
                    </div>

                    <div className="bg-[#09090b] p-2 rounded border border-white/5 flex justify-between items-center">
                      <div>
                        <div className="text-[10px] font-bold text-slate-100">10:00 AM - 11:00 AM</div>
                        <div className="text-[9px] text-slate-400">Analog Electronics (Lab 1)</div>
                      </div>
                      <span className="text-[8px] bg-green-950/60 text-green-400 border border-green-500/20 px-1.5 py-0.5 rounded">Attended</span>
                    </div>

                    <div className="bg-[#09090b] p-2 rounded border border-white/5 flex justify-between items-center">
                      <div>
                        <div className="text-[10px] font-bold text-slate-100">11:30 AM - 12:30 PM</div>
                        <div className="text-[9px] text-slate-400">Electromagnetics (Room 305)</div>
                      </div>
                      <span className="text-[8px] bg-red-950/60 text-red-400 border border-red-500/20 px-1.5 py-0.5 rounded">Bunked</span>
                    </div>

                    <div className="bg-[#09090b] p-2 rounded border border-zinc-800 flex justify-between items-center opacity-60">
                      <div>
                        <div className="text-[10px] font-bold text-slate-300">02:00 PM - 03:00 PM</div>
                        <div className="text-[9px] text-slate-400">Digital Signal Proc. (Room 101)</div>
                      </div>
                      <span className="text-[8px] bg-zinc-900 text-slate-500 px-1.5 py-0.5 rounded">Upcoming</span>
                    </div>
                  </div>
                </div>

                <div className="bg-green-950/10 border border-green-500/10 rounded-xl p-3 flex flex-col gap-1.5">
                  <span className="text-[9px] uppercase tracking-wider text-green-400 font-bold flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-green-400" /> Auto Timetable Sync
                  </span>
                  <p className="text-[8px] leading-relaxed text-slate-400">
                    BunkSafe loads your college's digital timetables automatically. Marks class records directly into your calendar without complex keying.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

        {/* Bottom Tab Bar */}
        <div className="h-12 bg-[#18181b] border-t border-white/5 flex items-center justify-around px-2 z-10">
          <button 
            onClick={() => setActiveTab("dashboard")} 
            className={`flex flex-col items-center gap-0.5 transition ${activeTab === "dashboard" ? "text-green-400" : "text-slate-500 hover:text-slate-300"}`}
          >
            <ChartIcon className="w-4 h-4" />
            <span className="text-[7px] font-bold uppercase tracking-wider">Tracker</span>
          </button>
          
          <button 
            onClick={() => setActiveTab("calculator")} 
            className={`flex flex-col items-center gap-0.5 transition ${activeTab === "calculator" ? "text-green-400" : "text-slate-500 hover:text-slate-300"}`}
          >
            <BookOpen className="w-4 h-4" />
            <span className="text-[7px] font-bold uppercase tracking-wider">Calculator</span>
          </button>
          
          <button 
            onClick={() => setActiveTab("timetable")} 
            className={`flex flex-col items-center gap-0.5 transition ${activeTab === "timetable" ? "text-green-400" : "text-slate-500 hover:text-slate-300"}`}
          >
            <Calendar className="w-4 h-4" />
            <span className="text-[7px] font-bold uppercase tracking-wider">Schedule</span>
          </button>
        </div>

      </div>
    </div>
  );
}
