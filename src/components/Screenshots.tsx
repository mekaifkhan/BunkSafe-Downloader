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
  mockupType: "home" | "calendar" | "exams" | "history";
  customImageUrl?: string; // Standard PNG/JPG path, easily swappable
}

const SLIDES: ScreenshotSlide[] = [
  {
    id: "screen-1",
    title: "The Zero-Noise Home Hub",
    subtitle: "Check attendance standings instantly. Green cards mean you are safe; orange/red cards signal action thresholds.",
    tag: "Tracker Interface",
    mockupType: "home",
    customImageUrl: "/screenshots/home.png"
  },
  {
    id: "screen-2",
    title: "Calendar & Timetable Sync",
    subtitle: "A frictionless visual planner of your day. See your classes, color-coded by present, bunked, or free intervals.",
    tag: "Lectures Map",
    mockupType: "calendar",
    customImageUrl: "/screenshots/calendar.png"
  },
  {
    id: "screen-3",
    title: "Semester Grade Record",
    subtitle: "Track cumulative CGPA and average attendance statistics of past academic periods. A permanent ledger on your device.",
    tag: "Grades Ledger",
    mockupType: "history",
    customImageUrl: "/screenshots/stats.png"
  },
  {
    id: "screen-4",
    title: "Exam & Sessional Planner",
    subtitle: "Save testing calendars and practical records right inside BunkSafe. Link course syllabus stats to current sessional days.",
    tag: "Academic Board",
    mockupType: "exams",
    customImageUrl: "/screenshots/exams.png"
  },
  {
    id: "screen-5",
    title: "Developer & Profile Board",
    subtitle: "View student credentials, configure sessional bounds, manage academic settings, and read developer notes directly.",
    tag: "Profile Info",
    mockupType: "home",
    customImageUrl: "/screenshots/profile.png"
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
          <div className="w-full h-full bg-[#09090b] flex flex-col p-4 text-slate-200">
            <div className="flex justify-between items-center mb-4">
              <div>
                <span className="text-[9px] text-green-400 font-bold uppercase tracking-wider">Tracker</span>
                <h4 className="text-xs font-bold text-white">My Attendance</h4>
              </div>
              <span className="text-[8px] bg-[#18181b] border border-white/5 text-slate-400 px-1.5 py-0.5 rounded font-mono">BunkSafe</span>
            </div>
            {/* Mock cards */}
            <div className="space-y-2.5">
              <div className="bg-[#18181b]/80 border border-white/5 p-2.5 rounded-lg">
                <div className="flex justify-between text-[10px] font-bold">
                  <span className="text-slate-100">Math IV</span>
                  <span className="text-green-400 font-mono">82%</span>
                </div>
                <div className="w-full h-1 bg-zinc-800 rounded-full mt-1.5 overflow-hidden">
                  <div className="h-full bg-green-400 rounded-full" style={{ width: "82%" }}></div>
                </div>
                <div className="text-[7.5px] text-green-500 font-semibold mt-1">✓ Safe to bunk 2 classes</div>
              </div>

              <div className="bg-[#18181b]/80 border border-white/5 p-2.5 rounded-lg">
                <div className="flex justify-between text-[10px] font-bold">
                  <span className="text-slate-100">Analog ECE</span>
                  <span className="text-green-400 font-mono">78%</span>
                </div>
                <div className="w-full h-1 bg-zinc-800 rounded-full mt-1.5 overflow-hidden">
                  <div className="h-full bg-green-400 rounded-full" style={{ width: "78%" }}></div>
                </div>
                <div className="text-[7.5px] text-green-500 font-semibold mt-1">✓ Safe to bunk 1 class</div>
              </div>

              <div className="bg-[#18181b]/80 border border-white/5 p-2.5 rounded-lg border-l-red-500">
                <div className="flex justify-between text-[10px] font-bold">
                  <span className="text-slate-100">Electromagnetics</span>
                  <span className="text-red-400 font-mono">68%</span>
                </div>
                <div className="w-full h-1 bg-zinc-800 rounded-full mt-1.5 overflow-hidden">
                  <div className="h-full bg-red-400 rounded-full" style={{ width: "68%" }}></div>
                </div>
                <div className="text-[7.5px] text-red-400 font-semibold mt-1">⚠ Critical! Must attend next 3 classes</div>
              </div>
            </div>
          </div>
        );
      case "calendar":
        return (
          <div className="w-full h-full bg-[#09090b] flex flex-col p-4 text-slate-200">
            <div className="flex justify-between items-center mb-3">
              <div>
                <span className="text-[9px] text-green-400 font-bold uppercase tracking-wider">Timetable</span>
                <h4 className="text-xs font-bold text-white">Lecture Roadmap</h4>
              </div>
              <span className="text-[8px] bg-[#18181b] px-1.5 py-0.5 rounded text-slate-400">July 9</span>
            </div>
            {/* Calendar list */}
            <div className="space-y-2">
              <div className="border border-white/5 bg-[#18181b]/40 p-2 rounded flex justify-between items-center text-[9px]">
                <div>
                  <span className="font-bold text-white block">09:00 - 10:00</span>
                  <span className="text-slate-400">Math IV (Room 302)</span>
                </div>
                <span className="text-[7.5px] bg-green-950/40 text-green-400 px-1 py-0.5 rounded">Present</span>
              </div>

              <div className="border border-white/5 bg-[#18181b]/40 p-2 rounded flex justify-between items-center text-[9px]">
                <div>
                  <span className="font-bold text-white block">10:00 - 11:00</span>
                  <span className="text-slate-400">Analog Lab (Lab 2)</span>
                </div>
                <span className="text-[7.5px] bg-green-950/40 text-green-400 px-1 py-0.5 rounded">Present</span>
              </div>

              <div className="border border-white/5 bg-[#18181b]/40 p-2 rounded flex justify-between items-center text-[9px] border-l-amber-500">
                <div>
                  <span className="font-bold text-white block">11:30 - 12:30</span>
                  <span className="text-slate-400">Electromagnetics</span>
                </div>
                <span className="text-[7.5px] bg-amber-950/40 text-amber-400 px-1 py-0.5 rounded">Cancelled</span>
              </div>

              <div className="border border-white/5 bg-[#18181b]/10 p-2 rounded flex justify-between items-center text-[9px] opacity-40">
                <div>
                  <span className="font-bold text-slate-300 block">14:00 - 15:00</span>
                  <span className="text-slate-400">Digital Signals</span>
                </div>
                <span className="text-[7.5px] bg-zinc-900 text-slate-500 px-1 py-0.5 rounded">Upcoming</span>
              </div>
            </div>
          </div>
        );
      case "exams":
        return (
          <div className="w-full h-full bg-[#09090b] flex flex-col p-4 text-slate-200">
            <div className="flex justify-between items-center mb-4">
              <div>
                <span className="text-[9px] text-green-400 font-bold uppercase tracking-wider">Planner</span>
                <h4 className="text-xs font-bold text-white">Sessional & Exams</h4>
              </div>
              <span className="text-[8px] text-green-400 bg-green-500/10 px-1 py-0.5 rounded">JMI</span>
            </div>
            {/* Exam cards */}
            <div className="space-y-2.5">
              <div className="bg-[#18181b]/80 border border-white/5 p-2.5 rounded-lg flex gap-3">
                <div className="bg-green-500/10 text-green-400 rounded px-2 py-1 text-center font-mono shrink-0">
                  <div className="text-[12px] font-bold">14</div>
                  <div className="text-[7px]">JULY</div>
                </div>
                <div>
                  <h5 className="text-[10px] font-bold text-white">Mathematics IV (Sessional 1)</h5>
                  <p className="text-[8px] text-slate-400 mt-0.5">Syllabus: Complex variables, calculus limits.</p>
                </div>
              </div>

              <div className="bg-[#18181b]/80 border border-white/5 p-2.5 rounded-lg flex gap-3">
                <div className="bg-green-500/10 text-green-400 rounded px-2 py-1 text-center font-mono shrink-0">
                  <div className="text-[12px] font-bold">16</div>
                  <div className="text-[7px]">JULY</div>
                </div>
                <div>
                  <h5 className="text-[10px] font-bold text-white">Analog Circuits (Sessional 1)</h5>
                  <p className="text-[8px] text-slate-400 mt-0.5">Syllabus: OP-Amps & feedback amplifiers.</p>
                </div>
              </div>
            </div>
          </div>
        );
      case "history":
        return (
          <div className="w-full h-full bg-[#09090b] flex flex-col p-4 text-slate-200">
            <div className="flex justify-between items-center mb-4">
              <div>
                <span className="text-[9px] text-green-400 font-bold uppercase tracking-wider">Performance</span>
                <h4 className="text-xs font-bold text-white">Semester Records</h4>
              </div>
              <span className="text-[8px] bg-[#18181b] border border-white/5 text-slate-400 px-1.5 py-0.5 rounded">History</span>
            </div>
            {/* Semesters list */}
            <div className="space-y-2 font-mono text-[9px]">
              <div className="bg-[#18181b]/80 p-2 rounded border border-white/5 flex justify-between items-center">
                <div>
                  <span className="font-bold text-slate-100">Semester III</span>
                  <div className="text-[7.5px] text-slate-400 mt-0.5">ECE Section A</div>
                </div>
                <div className="text-right">
                  <span className="text-green-400 font-bold block">8.42 CGPA</span>
                  <span className="text-[7.5px] text-slate-400">81.2% Attendance</span>
                </div>
              </div>

              <div className="bg-[#18181b]/80 p-2 rounded border border-white/5 flex justify-between items-center">
                <div>
                  <span className="font-bold text-slate-100">Semester II</span>
                  <div className="text-[7.5px] text-slate-400 mt-0.5">ECE Section A</div>
                </div>
                <div className="text-right">
                  <span className="text-green-400 font-bold block">8.10 CGPA</span>
                  <span className="text-[7.5px] text-slate-400">79.5% Attendance</span>
                </div>
              </div>

              <div className="bg-[#18181b]/80 p-2 rounded border border-white/5 flex justify-between items-center">
                <div>
                  <span className="font-bold text-slate-100">Semester I</span>
                  <div className="text-[7.5px] text-slate-400 mt-0.5">ECE Section A</div>
                </div>
                <div className="text-right">
                  <span className="text-green-400 font-bold block">8.54 CGPA</span>
                  <span className="text-[7.5px] text-slate-400">84.0% Attendance</span>
                </div>
              </div>
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
