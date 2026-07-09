import React from "react";
import { 
  Calculator, 
  CalendarRange, 
  GraduationCap, 
  History, 
  BarChart3, 
  Wifi, 
  Zap, 
  Lock,
  Sparkles
} from "lucide-react";
import { motion } from "motion/react";
import { FeatureItem } from "../types";

// Features configuration matching the user requirements
const FEATURES: FeatureItem[] = [
  {
    id: "calc",
    title: "Smart Attendance Calculator",
    description: "Simulate any class bunking scenario before making a choice. Know exactly what your attendance percentage will drop to or how many classes you must attend to recover.",
    iconName: "Calculator"
  },
  {
    id: "timetable",
    title: "Timetable Management",
    description: "Keep your weekly college lecture schedule fully mapped. Synchronize lectures dynamically and view current, upcoming, or cancelled periods at a glance.",
    iconName: "CalendarRange"
  },
  {
    id: "exams",
    title: "Exam Planner",
    description: "Schedule your sessional tests, practicals, and final theory papers. Align exam prep routines directly next to your attendance margins to save focus.",
    iconName: "GraduationCap"
  },
  {
    id: "stats",
    title: "Attendance Statistics",
    description: "Rich, historical statistical charting of your attendance trends. Visualize weekly curves, peak bunk rates, and overall status breakdowns per course.",
    iconName: "BarChart3"
  },
  {
    id: "history",
    title: "Semester History",
    description: "Archive past semester records, grades, and cumulative attendance. Maintain a clean progressive track record of all your academic periods in one local hub.",
    iconName: "History"
  },
  {
    id: "offline",
    title: "Works with Internet",
    description: "BunkSafe seamlessly integrates internet capabilities to dynamically sync class timetables and schedules, ensuring you have the latest updates on hand.",
    iconName: "Wifi"
  },
  {
    id: "speed",
    title: "Blazing Fast Performance",
    description: "Designed with optimized local SQL and lightweight layouts. Boots up in under 200ms with zero loading screens, spinners, or network latencies.",
    iconName: "Zap"
  },
  {
    id: "privacy",
    title: "Absolute Privacy First",
    description: "We don't keep your personal attendance or schedule data on any servers! Everything is saved directly in your phone so your privacy is fully maintained.",
    iconName: "Lock"
  }
];

// Helper to resolve icon by key
const getIcon = (iconName: string) => {
  const props = { className: "w-6 h-6 text-green-400" };
  switch (iconName) {
    case "Calculator": return <Calculator {...props} />;
    case "CalendarRange": return <CalendarRange {...props} />;
    case "GraduationCap": return <GraduationCap {...props} />;
    case "History": return <History {...props} />;
    case "BarChart3": return <BarChart3 {...props} />;
    case "Wifi": return <Wifi {...props} />;
    case "Zap": return <Zap {...props} />;
    case "Lock": return <Lock {...props} />;
    default: return <Sparkles {...props} />;
  }
};

export default function Features() {
  return (
    <section id="features" className="py-24 px-4 bg-[#09090b] relative border-b border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(34,197,94,0.02),transparent_40%)] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs font-bold uppercase tracking-widest text-green-400">Core Features</span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mt-3 font-sans">
            Engineered to Help You Balance Lectures & College Life
          </h2>
          <p className="text-slate-400 mt-4 leading-relaxed text-base">
            No more Excel sheets, notebook tally marks, or head scratching. Everything you need to track lectures and secure your attendance marks is built-in.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((feature, idx) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="group relative bg-[#18181b]/40 border border-white/5 hover:border-green-500/20 p-6 rounded-2xl backdrop-blur-sm hover:bg-[#18181b]/80 hover:scale-[1.01] transition-all duration-300 flex flex-col justify-between"
            >
              {/* Hover Glow Edge effect */}
              <div className="absolute inset-0 bg-green-500/2 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

              <div>
                {/* Icon Container */}
                <div className="w-12 h-12 bg-[#09090b]/60 border border-white/5 group-hover:border-green-500/20 group-hover:bg-[#09090b] rounded-xl flex items-center justify-center mb-5 shadow-inner transition-all duration-300">
                  {getIcon(feature.iconName)}
                </div>

                <h3 className="text-lg font-bold text-slate-100 mb-3 group-hover:text-green-300 transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-slate-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
              
              <div className="h-1 w-8 bg-zinc-800 group-hover:bg-green-500 rounded-full mt-6 transition-all duration-300"></div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
