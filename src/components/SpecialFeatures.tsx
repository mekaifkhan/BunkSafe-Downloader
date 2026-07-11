import React, { useState } from "react";
import { 
  Calculator, 
  Calendar, 
  Percent, 
  AlertTriangle, 
  CheckCircle2, 
  Plus, 
  Trash2, 
  RefreshCw, 
  Sliders, 
  TrendingUp,
  AlertCircle
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface MonthRow {
  id: string;
  name: string;
  attended: number;
  conducted: number;
}

export default function SpecialFeatures() {
  const [activeTab, setActiveTab] = useState<"combi" | "bunk">("combi");

  // State for Combined Month Estimator
  const [months, setMonths] = useState<MonthRow[]>([
    { id: "1", name: "Month 1 (e.g. Aug)", attended: 15, conducted: 20 },
    { id: "2", name: "Month 2 (e.g. Sep)", attended: 18, conducted: 24 },
    { id: "3", name: "Month 3 (e.g. Oct)", attended: 14, conducted: 20 },
  ]);
  const [combiTarget, setCombiTarget] = useState<number>(75);

  // State for Bunk/Recovery Planner
  const [currentAttended, setCurrentAttended] = useState<number>(22);
  const [currentConducted, setCurrentConducted] = useState<number>(30);
  const [bunkTarget, setBunkTarget] = useState<number>(75);

  // --- Calculations for Combined Month Estimator ---
  const totalAttended = months.reduce((sum, m) => sum + (Number(m.attended) || 0), 0);
  const totalConducted = months.reduce((sum, m) => sum + (Number(m.conducted) || 0), 0);
  const combiPercentage = totalConducted > 0 ? (totalAttended / totalConducted) * 100 : 0;
  const isCombiTargetMet = combiPercentage >= combiTarget;

  const handleAddMonth = () => {
    const nextNum = months.length + 1;
    setMonths([
      ...months,
      {
        id: Date.now().toString(),
        name: `Month ${nextNum}`,
        attended: 12,
        conducted: 16
      }
    ]);
  };

  const handleRemoveMonth = (id: string) => {
    if (months.length > 1) {
      setMonths(months.filter(m => m.id !== id));
    }
  };

  const handleUpdateMonth = (id: string, field: "name" | "attended" | "conducted", value: string | number) => {
    setMonths(months.map(m => {
      if (m.id === id) {
        if (field === "name") {
          return { ...m, name: String(value) };
        } else {
          const numVal = Math.max(0, Number(value) || 0);
          if (field === "attended") {
            // Can't attend more than conducted
            return { ...m, attended: numVal };
          } else {
            return { ...m, conducted: numVal };
          }
        }
      }
      return m;
    }));
  };

  // Ensure attended <= conducted inside months for strict logic on blur
  const handleMonthInputBlur = (id: string) => {
    setMonths(months.map(m => {
      if (m.id === id) {
        const correctAttended = Math.min(m.attended, m.conducted);
        return { ...m, attended: correctAttended };
      }
      return m;
    }));
  };

  // --- Calculations for Safe Bunk & Recovery Planner ---
  const safeCurrentPercentage = currentConducted > 0 ? (currentAttended / currentConducted) * 100 : 0;
  
  // Calculate bunk/attendance results
  let bunkStatusText = "";
  let bunkStatusType: "success" | "warning" | "neutral" = "neutral";
  let calculationValue = 0;

  const A = currentAttended;
  const C = currentConducted;
  const T = bunkTarget / 100;

  if (C === 0) {
    bunkStatusText = "Please enter conducted classes to evaluate your standings.";
    bunkStatusType = "neutral";
  } else if (safeCurrentPercentage >= bunkTarget) {
    // Above target: calculate safe bunks
    // Formula: B = floor((A - T*C) / T)
    const rawB = (A - T * C) / T;
    const safeBunks = Math.floor(rawB);
    calculationValue = Math.max(0, safeBunks);
    
    if (calculationValue > 0) {
      bunkStatusText = `You are in the Safe Zone! You can safely BUNK ${calculationValue} consecutive lecture${calculationValue > 1 ? "s" : ""} while remaining at or above your ${bunkTarget}% target.`;
      bunkStatusType = "success";
    } else {
      bunkStatusText = `You are exactly on the line! You cannot afford to bunk any classes right now without falling below your ${bunkTarget}% target.`;
      bunkStatusType = "warning";
    }
  } else {
    // Below target: calculate recovery classes needed
    // Formula: R = ceil((T*C - A) / (1 - T))
    if (T >= 1) {
      bunkStatusText = "A 100% attendance target cannot be reached if you have already missed a class!";
      bunkStatusType = "warning";
    } else {
      const rawR = (T * C - A) / (1 - T);
      const recoveryRequired = Math.ceil(rawR);
      calculationValue = Math.max(0, recoveryRequired);
      bunkStatusText = `Bunk Alert! Your current attendance is below target. You must ATTEND ${calculationValue} consecutive lecture${calculationValue > 1 ? "s" : ""} without bunking to recover to ${bunkTarget}%.`;
      bunkStatusType = "warning";
    }
  }

  return (
    <section id="special-features" className="py-24 px-4 bg-[#09090b] relative border-b border-white/5">
      {/* Decorative gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,197,94,0.02),transparent_40%)] pointer-events-none"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-green-400 bg-green-500/10 px-3 py-1 rounded-full border border-green-500/20">
            Interactive Playgrounds
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mt-4 font-sans">
            BunkSafe Interactive Calculators
          </h2>
          <p className="text-slate-400 mt-4 leading-relaxed text-sm sm:text-base">
            Try out our core simulator algorithms directly on the web. Plan combined months or map exactly how many lectures you can skip or must attend to stay safe.
          </p>
        </div>

        {/* Dynamic Navigation Tabs */}
        <div className="flex justify-center mb-10">
          <div className="bg-[#18181b]/60 p-1.5 border border-white/5 rounded-xl flex gap-1 backdrop-blur-sm">
            <button
              onClick={() => {
                setActiveTab("combi");
                try {
                  import("../firebase").then(m => m.incrementWebAppClick());
                } catch (e) {
                  console.error(e);
                }
              }}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
                activeTab === "combi"
                  ? "bg-green-500 text-black shadow-lg shadow-green-500/10"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Calendar className="w-4 h-4" />
              Monthly Combi Attendance
            </button>
            <button
              onClick={() => {
                setActiveTab("bunk");
                try {
                  import("../firebase").then(m => m.incrementWebAppClick());
                } catch (e) {
                  console.error(e);
                }
              }}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
                activeTab === "bunk"
                  ? "bg-green-500 text-black shadow-lg shadow-green-500/10"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Calculator className="w-4 h-4" />
              Bunk & Attend Planner
            </button>
          </div>
        </div>

        {/* Tab Contents */}
        <AnimatePresence mode="wait">
          {activeTab === "combi" ? (
            <motion.div
              key="combi"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid lg:grid-cols-12 gap-8 items-start"
            >
              {/* MONTH ROW EDITOR */}
              <div className="lg:col-span-7 bg-[#18181b]/40 border border-white/5 rounded-2xl p-6 sm:p-8 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                      <Sliders className="w-5 h-5 text-green-400" />
                      Month Breakdown
                    </h3>
                    <p className="text-slate-400 text-xs mt-1">
                      Enter attendance stats for individual calendar months.
                    </p>
                  </div>
                  
                  {/* Add Month Row */}
                  <button
                    onClick={handleAddMonth}
                    className="flex items-center gap-1 bg-green-500/10 text-green-400 hover:bg-green-500/20 px-3.5 py-1.5 rounded-xl border border-green-500/20 text-xs font-semibold transition-all hover:scale-[1.02]"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Add Month
                  </button>
                </div>

                {/* Input Month Rows */}
                <div className="space-y-4 max-h-[420px] overflow-y-auto pr-2 custom-scrollbar">
                  {months.map((month, index) => (
                    <motion.div
                      key={month.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="grid grid-cols-12 gap-3 bg-[#09090b]/40 p-4 border border-white/5 rounded-xl items-center group"
                    >
                      {/* Name field */}
                      <div className="col-span-5">
                        <label className="text-[10px] text-slate-500 uppercase font-bold tracking-wider block mb-1">
                          Month Title
                        </label>
                        <input
                          type="text"
                          value={month.name}
                          onChange={(e) => handleUpdateMonth(month.id, "name", e.target.value)}
                          className="w-full bg-[#18181b] border border-white/5 text-white placeholder-slate-600 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:border-green-500/30 transition-colors"
                        />
                      </div>

                      {/* Attended field */}
                      <div className="col-span-3">
                        <label className="text-[10px] text-slate-500 uppercase font-bold tracking-wider block mb-1">
                          Attended
                        </label>
                        <input
                          type="number"
                          value={month.attended === 0 ? "" : month.attended}
                          placeholder="0"
                          onChange={(e) => handleUpdateMonth(month.id, "attended", e.target.value)}
                          onBlur={() => handleMonthInputBlur(month.id)}
                          className="w-full bg-[#18181b] border border-white/5 text-white placeholder-slate-600 rounded-lg px-3 py-1.5 text-xs text-center focus:outline-none focus:border-green-500/30 transition-colors"
                        />
                      </div>

                      {/* Conducted field */}
                      <div className="col-span-3">
                        <label className="text-[10px] text-slate-500 uppercase font-bold tracking-wider block mb-1">
                          Conducted
                        </label>
                        <input
                          type="number"
                          value={month.conducted === 0 ? "" : month.conducted}
                          placeholder="0"
                          onChange={(e) => handleUpdateMonth(month.id, "conducted", e.target.value)}
                          onBlur={() => handleMonthInputBlur(month.id)}
                          className="w-full bg-[#18181b] border border-white/5 text-white placeholder-slate-600 rounded-lg px-3 py-1.5 text-xs text-center focus:outline-none focus:border-green-500/30 transition-colors"
                        />
                      </div>

                      {/* Delete Action button */}
                      <div className="col-span-1 flex justify-center pt-5">
                        <button
                          onClick={() => handleRemoveMonth(month.id)}
                          disabled={months.length <= 1}
                          className="text-slate-500 hover:text-red-400 disabled:opacity-30 disabled:hover:text-slate-500 p-1.5 rounded-lg hover:bg-red-500/5 transition-colors"
                          title="Delete Month"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Target Threshold Selector */}
                <div className="mt-8 pt-6 border-t border-white/5">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-semibold text-white flex items-center gap-1.5">
                      <Percent className="w-4 h-4 text-green-400" />
                      Target Attendance Threshold
                    </span>
                    <span className="text-sm font-bold text-green-400">{combiTarget}%</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="95"
                    step="5"
                    value={combiTarget}
                    onChange={(e) => setCombiTarget(Number(e.target.value))}
                    className="w-full h-1.5 bg-[#09090b] border border-white/5 rounded-lg appearance-none cursor-pointer accent-green-500"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 mt-1.5 font-bold uppercase">
                    <span>50% (Pass)</span>
                    <span>75% (Standard)</span>
                    <span>95% (Safe)</span>
                  </div>
                </div>
              </div>

              {/* ESTIMATION OUTCOMES PANEL */}
              <div className="lg:col-span-5 bg-[#18181b]/40 border border-white/5 rounded-2xl p-6 sm:p-8 backdrop-blur-sm h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-6">
                    <TrendingUp className="w-5 h-5 text-green-400" />
                    <h3 className="text-xl font-bold text-white">Estimation Results</h3>
                  </div>

                  {/* Combined Stats Indicators */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-[#09090b]/40 border border-white/5 p-4 rounded-xl">
                      <span className="text-[10px] text-slate-500 uppercase font-extrabold tracking-wider">Total Attended</span>
                      <p className="text-2xl font-extrabold text-white mt-1">{totalAttended}</p>
                    </div>
                    <div className="bg-[#09090b]/40 border border-white/5 p-4 rounded-xl">
                      <span className="text-[10px] text-slate-500 uppercase font-extrabold tracking-wider">Total Conducted</span>
                      <p className="text-2xl font-extrabold text-white mt-1">{totalConducted}</p>
                    </div>
                  </div>

                  {/* Combined Percentage Dial */}
                  <div className="bg-[#09090b]/40 border border-white/5 p-6 rounded-2xl text-center mb-6 relative overflow-hidden">
                    <span className="text-[10px] text-slate-500 uppercase font-extrabold tracking-widest block mb-1">
                      Combined Attendance
                    </span>
                    <p className={`text-4xl sm:text-5xl font-black ${isCombiTargetMet ? "text-green-400" : "text-red-400"} transition-colors`}>
                      {combiPercentage.toFixed(1)}%
                    </p>
                    
                    {/* Visual Progress Bar */}
                    <div className="w-full bg-zinc-900 h-2 rounded-full overflow-hidden mt-5 border border-white/5">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${isCombiTargetMet ? "bg-green-400" : "bg-red-500"}`}
                        style={{ width: `${Math.min(100, combiPercentage)}%` }}
                      ></div>
                    </div>
                    
                    {/* Minimalist target indicator marker */}
                    <div className="flex justify-between text-[10px] text-slate-500 mt-2 font-mono">
                      <span>0%</span>
                      <span className="text-green-400">Target: {combiTarget}%</span>
                      <span>100%</span>
                    </div>
                  </div>

                  {/* Status Verdict Statement */}
                  <div className={`p-4 rounded-xl border flex gap-3 ${
                    isCombiTargetMet 
                      ? "bg-green-500/5 border-green-500/20 text-green-300" 
                      : "bg-red-500/5 border-red-500/20 text-red-300"
                  }`}>
                    {isCombiTargetMet ? (
                      <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <h4 className="text-xs font-extrabold uppercase tracking-wider mb-1">
                        {isCombiTargetMet ? "Threshold Cleared" : "Shortage Warning"}
                      </h4>
                      <p className="text-xs leading-relaxed text-slate-300">
                        {isCombiTargetMet 
                          ? `Excellent! Your cumulative attendance reaches the ${combiTarget}% threshold. Keep skipping carefully.`
                          : `Warning! Your combined attendance fails to hit the ${combiTarget}% minimum target. You need to attend more sessions.`
                        }
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 text-[11px] text-slate-500 text-center leading-relaxed font-medium bg-[#09090b]/20 p-3 rounded-lg border border-white/2">
                  ℹ️ <strong>Combined Calculator</strong> joins multiple monthly semesters to test if you qualify for exams under college rules.
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="bunk"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid lg:grid-cols-12 gap-8 items-stretch"
            >
              {/* SLIDERS & CONTROLS CONTAINER */}
              <div className="lg:col-span-6 bg-[#18181b]/40 border border-white/5 rounded-2xl p-6 sm:p-8 backdrop-blur-sm flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-6">
                    <Sliders className="w-5 h-5 text-green-400" />
                    Scenario Parameters
                  </h3>

                  {/* Numerical input group for perfect precision */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-[#09090b]/40 border border-white/5 p-4 rounded-xl">
                      <label className="text-[10px] text-slate-500 uppercase font-extrabold tracking-wider block mb-1">
                        Classes Attended
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={currentAttended}
                        onChange={(e) => {
                          const val = Math.max(0, Number(e.target.value) || 0);
                          setCurrentAttended(val);
                          // Keep attended <= conducted
                          if (val > currentConducted) {
                            setCurrentConducted(val);
                          }
                        }}
                        className="bg-transparent text-2xl font-extrabold text-white border-b border-transparent focus:border-green-500/30 w-full focus:outline-none focus:ring-0 mt-1 transition-colors"
                      />
                    </div>

                    <div className="bg-[#09090b]/40 border border-white/5 p-4 rounded-xl">
                      <label className="text-[10px] text-slate-500 uppercase font-extrabold tracking-wider block mb-1">
                        Classes Conducted
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={currentConducted}
                        onChange={(e) => {
                          const val = Math.max(0, Number(e.target.value) || 0);
                          setCurrentConducted(val);
                          // Ensure attended <= conducted
                          if (currentAttended > val) {
                            setCurrentAttended(val);
                          }
                        }}
                        className="bg-transparent text-2xl font-extrabold text-white border-b border-transparent focus:border-green-500/30 w-full focus:outline-none focus:ring-0 mt-1 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Visual Sliders for instant interactive feedback */}
                  <div className="space-y-6 bg-[#09090b]/30 p-5 border border-white/5 rounded-xl">
                    <div>
                      <div className="flex justify-between text-xs mb-2">
                        <span className="text-slate-400 font-semibold">Attended Lectures Ratio</span>
                        <span className="text-white font-bold">{currentAttended} / {currentConducted}</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max={Math.max(1, currentConducted)}
                        value={currentAttended}
                        onChange={(e) => setCurrentAttended(Number(e.target.value))}
                        className="w-full h-1 bg-[#09090b] rounded-lg appearance-none cursor-pointer accent-green-500"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-2">
                        <span className="text-slate-400 font-semibold">Overall Course Targets</span>
                        <span className="text-green-400 font-bold">{bunkTarget}% Target</span>
                      </div>
                      <input
                        type="range"
                        min="50"
                        max="95"
                        step="5"
                        value={bunkTarget}
                        onChange={(e) => setBunkTarget(Number(e.target.value))}
                        className="w-full h-1 bg-[#09090b] rounded-lg appearance-none cursor-pointer accent-green-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-500/5 border border-yellow-500/10 p-4 rounded-xl flex gap-3 mt-6">
                  <AlertCircle className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    💡 <strong>Adjust Sliders:</strong> Move the sliders to test potential bunk scenarios. Watch how the consecutive class safety count instantly recalculates.
                  </p>
                </div>
              </div>

              {/* OUTCOMES & INTERACTIVE METRICS */}
              <div className="lg:col-span-6 bg-[#18181b]/40 border border-white/5 rounded-2xl p-6 sm:p-8 backdrop-blur-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                      <Percent className="w-5 h-5 text-green-400" />
                      Dynamic Calculations
                    </h3>
                    <div className="bg-green-500/10 border border-green-500/10 text-green-400 px-2.5 py-1 rounded-full text-[10px] font-extrabold tracking-wider uppercase">
                      Realtime Sync
                    </div>
                  </div>

                  {/* Current Standings */}
                  <div className="bg-[#09090b]/40 border border-white/5 p-6 rounded-2xl text-center mb-6">
                    <span className="text-[10px] text-slate-500 uppercase font-extrabold tracking-widest block mb-1">
                      Current Standings
                    </span>
                    <p className={`text-4xl sm:text-5xl font-black ${safeCurrentPercentage >= bunkTarget ? "text-green-400" : "text-red-400"} transition-colors`}>
                      {safeCurrentPercentage.toFixed(1)}%
                    </p>
                    <p className="text-slate-400 text-xs mt-2 font-medium">
                      Requires {bunkTarget}% minimum threshold
                    </p>
                  </div>

                  {/* Verdict Block */}
                  <div className="space-y-4">
                    {/* Big Action Metric Badge */}
                    <div className="bg-[#09090b]/60 border border-white/5 p-6 rounded-2xl text-center flex flex-col items-center justify-center relative overflow-hidden">
                      <span className="text-[10px] text-slate-500 uppercase font-extrabold tracking-widest block mb-2">
                        {safeCurrentPercentage >= bunkTarget ? "Safe Consecutive Bunks" : "Consecutive Attendance Required"}
                      </span>
                      <span className={`text-5xl sm:text-6xl font-black ${
                        bunkStatusType === "success" 
                          ? "text-green-400" 
                          : bunkStatusType === "warning" 
                            ? "text-yellow-400" 
                            : "text-slate-400"
                      }`}>
                        {calculationValue}
                      </span>
                      <span className="text-slate-400 text-xs mt-3.5 leading-relaxed max-w-md">
                        {bunkStatusText}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 text-[11px] text-slate-500 text-center leading-relaxed font-medium bg-[#09090b]/20 p-3 rounded-lg border border-white/2">
                  ℹ️ <strong>Bunk Planner</strong> implements standard modular division bounds to safeguard college credits.
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
