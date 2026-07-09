import React from "react";
import { 
  Download, 
  Smartphone, 
  ShieldCheck, 
  Share2, 
  Link2, 
  Github, 
  Award,
  Sparkles,
  Users
} from "lucide-react";
import { motion } from "motion/react";
import { apkConfig } from "../config/apkConfig";

interface HeroProps {
  totalDownloads: number;
  isLoadingDownloads: boolean;
  onDownloadClick: () => void;
  onShareClick: () => void;
  onCopyLinkClick: () => void;
}

export default function Hero({ 
  totalDownloads, 
  isLoadingDownloads, 
  onDownloadClick, 
  onShareClick, 
  onCopyLinkClick 
}: HeroProps) {
  
  return (
    <section className="relative pt-24 pb-16 px-4 overflow-hidden border-b border-white/5 bg-[#09090b]">
      
      {/* Background Decorative Mesh Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,#14532d,transparent_50%)] opacity-30 pointer-events-none"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-3xl -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-green-700/5 rounded-full blur-3xl translate-x-1/2 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-10 items-center relative z-10">
        
        {/* Left Side Content */}
        <div className="lg:col-span-7 flex flex-col items-start gap-5 text-left">
          
          {/* Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 text-green-400 rounded-full text-xs font-bold uppercase tracking-widest"
          >
            <Award className="w-3.5 h-3.5" />
            <span>v{apkConfig.version} • Android Hub</span>
          </motion.div>

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight font-sans">
              Bunk<span className="text-green-500 relative">Safe<span className="absolute bottom-1.5 left-0 w-full h-1 bg-green-500/20 rounded-md"></span></span>
            </h1>
            <h2 className="text-xl sm:text-2xl font-bold tracking-wide text-slate-300 mt-2">
              Smart Attendance Tracker for College Students
            </h2>
          </motion.div>

          {/* Description */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-xl"
          >
            Tired of manually computing when you can safely skip a lecture? BunkSafe is an elegant, offline-first application that dynamically simulates sessional attendance metrics to keep you safe from detentions.
          </motion.p>

          {/* Metadata Badges */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="flex flex-wrap gap-x-5 gap-y-2.5 font-mono text-[11px] sm:text-xs text-slate-400 py-2 border-y border-white/5 w-full max-w-lg mt-1"
          >
            <div className="flex items-center gap-1.5">
              <span className="text-green-500">●</span> Size: <strong className="text-slate-200">{apkConfig.fileSize}</strong>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-green-500">●</span> Req: <strong className="text-slate-200">{apkConfig.minAndroidVersion}</strong>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-green-500">●</span> Platform: <strong className="text-slate-200">Android 8.0+</strong>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center w-full sm:w-auto mt-2"
          >
            <button
              onClick={onDownloadClick}
              id="hero-download-btn"
              className="group flex items-center justify-center gap-2.5 bg-green-500 hover:bg-green-400 text-black font-extrabold px-6 py-3.5 rounded-xl shadow-lg shadow-green-500/10 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 text-sm w-full sm:w-auto"
            >
              <Download className="w-4.5 h-4.5 transition-transform duration-200 group-hover:translate-y-0.5" />
              Download Latest APK
            </button>
          </motion.div>

          {/* Utility buttons & Telemetry */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap items-center gap-4 text-slate-400 text-xs sm:text-sm mt-1"
          >
            <button 
              onClick={onShareClick} 
              className="flex items-center gap-1.5 hover:text-green-400 transition"
              title="Share Website"
            >
              <Share2 className="w-4 h-4" /> Share App
            </button>
            <button 
              onClick={onCopyLinkClick} 
              className="flex items-center gap-1.5 hover:text-green-400 transition"
              title="Copy APK Link"
            >
              <Link2 className="w-4 h-4" /> Copy Link
            </button>
            <a 
              href="https://github.com/kaifahmadkhan/BunkSafe" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-1.5 hover:text-green-400 transition"
            >
              <Github className="w-4 h-4" /> Source Code
            </a>
          </motion.div>

          {/* Download Count Widget */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex items-center gap-3 bg-[#18181b]/60 border border-white/5 px-4 py-2.5 rounded-xl mt-3 backdrop-blur-sm"
          >
            <div className="w-8.5 h-8.5 rounded-full bg-green-500/10 flex items-center justify-center border border-green-500/20">
              <Users className="w-4.5 h-4.5 text-green-400" />
            </div>
            <div>
              <div className="text-[10px] text-slate-400 font-semibold leading-none">Trusted Attendance Tool</div>
              <div className="text-sm font-bold text-slate-100 flex items-center gap-1.5 mt-1 leading-none">
                {isLoadingDownloads ? (
                  <span className="w-12 h-4 bg-zinc-800 rounded animate-pulse inline-block"></span>
                ) : (
                  <span className="text-green-500 font-mono font-bold">
                    {totalDownloads.toLocaleString()}+
                  </span>
                )}
                <span>students registered</span>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Right Side Mockup (Static preview of BunkSafe Home Screen) */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
            className="relative w-full max-w-[280px]"
          >
            {/* Glowing Accent Ring behind phone mockup */}
            <div className="absolute inset-0 bg-green-500/10 blur-3xl rounded-[48px] scale-95 -z-10 animate-pulse"></div>
            
            {/* Elegant Static Mockup Border */}
            <div className="relative w-full aspect-[9/18.5] bg-[#18181b] rounded-[36px] border-4 border-zinc-800 shadow-2xl overflow-hidden ring-4 ring-green-500/10">
              {/* Camera Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 h-4 w-24 bg-zinc-800 rounded-b-xl z-50"></div>
              
              {/* Static Screen Render */}
              <div className="absolute inset-0 bg-[#09090b] pt-4 select-none flex flex-col justify-between">
                <div className="w-full h-full bg-[#09090b] flex flex-col text-slate-200 overflow-y-auto font-sans p-3 text-[11px] scrollbar-none">
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
                  <div className="bg-[#18181b]/60 border border-white/5 rounded-xl p-2.5 mb-2 shrink-0 text-left">
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
                        <p className="text-[8.5px] font-bold text-green-400 leading-none mt-0.5 font-mono">75% Goal</p>
                      </div>
                    </div>
                  </div>

                  {/* Danger Zone banner */}
                  <div className="bg-[#18181b]/50 border-l-2 border-red-500 p-2 rounded-r-xl rounded-l-md flex gap-2 mb-2 shrink-0 text-left">
                    <div className="w-3.5 h-3.5 rounded-full bg-red-500/15 flex items-center justify-center shrink-0 mt-0.5 text-red-400 font-bold text-[8px]">!</div>
                    <div>
                      <p className="text-[8.5px] font-bold text-white leading-tight">Attend next 11 classes to reach 75%.</p>
                      <p className="text-[7px] text-slate-400 leading-tight mt-0.5">Protect yourself from semester shortage.</p>
                    </div>
                  </div>

                  {/* Daily Entry - 09/07/2026 */}
                  <div className="bg-[#18181b]/40 border border-white/5 rounded-xl p-2.5 flex-1 flex flex-col justify-between text-left">
                    <div>
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="font-extrabold text-white text-[9px]">Daily Entry <span className="text-slate-500 font-medium">— 09/07</span></span>
                        <span className="text-[6px] font-mono text-slate-400 bg-zinc-900 px-1 py-0.5 rounded">REGULAR</span>
                      </div>

                      {/* Total classes slider layout */}
                      <div className="bg-[#09090b]/40 border border-white/2 rounded-lg p-1.5 mb-1.5">
                        <div className="flex justify-between items-center text-[7.5px] font-semibold text-slate-300">
                          <span>Available Classes Today</span>
                          <span className="text-white font-extrabold text-[9px]">7</span>
                        </div>
                        <div className="flex gap-1 mt-1 justify-between">
                          {[1, 2, 3, 4, 5, 6].map(n => (
                            <span key={n} className={`flex-1 text-center py-0.5 rounded text-[7px] font-bold ${n === 6 ? "bg-zinc-800 text-slate-300" : "bg-zinc-900/60 text-slate-600"}`}>{n}</span>
                          ))}
                        </div>
                      </div>

                      {/* Classes Attended slider layout */}
                      <div className="bg-[#09090b]/40 border border-white/2 rounded-lg p-1.5">
                        <div className="flex justify-between items-center text-[7.5px] font-semibold text-slate-300">
                          <span>Classes Attended</span>
                          <span className="text-green-400 font-extrabold text-[9px]">5</span>
                        </div>
                        <div className="flex gap-1 mt-1 justify-between">
                          {[0, 1, 2, 3, 4, 5].map(n => (
                            <span key={n} className={`flex-1 text-center py-0.5 rounded text-[7px] font-bold ${n === 5 ? "bg-green-500 text-black font-black" : "bg-zinc-900 text-slate-500"}`}>{n}</span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Save / Holiday buttons */}
                    <div className="space-y-1 mt-2">
                      <div className="w-full bg-[#a3e635] text-black font-extrabold py-1 rounded-md text-[8px] text-center shadow select-none">
                        Holiday Tracker Active
                      </div>
                      <div className="w-full bg-zinc-800 text-slate-300 font-bold py-1 rounded-md text-[8px] text-center select-none">
                        Logged Remotely
                      </div>
                    </div>
                  </div>

                  {/* Bottom active indicators */}
                  <div className="flex justify-between items-center mt-2 pt-1.5 border-t border-white/5 text-[6px] text-slate-500 font-bold uppercase tracking-wider shrink-0">
                    <span className="flex items-center gap-1"><span className="w-1 h-1 bg-green-500 rounded-full"></span> 450 LIVE USERS</span>
                    <span className="text-[6.5px] text-slate-400">HOME PREVIEW</span>
                  </div>
                </div>

                {/* Bottom Bar Indicator */}
                <div className="h-4 flex items-center justify-center pb-1.5 bg-[#09090b]">
                  <div className="w-16 h-0.5 bg-zinc-800 rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Static Hint Bubble */}
            <div className="absolute -bottom-3 -left-4 bg-[#18181b]/95 border border-green-500/20 p-2.5 rounded-xl max-w-[120px] text-[9px] text-slate-300 shadow-xl backdrop-blur-md flex items-start gap-1 z-40 select-none">
              <Sparkles className="w-3.5 h-3.5 text-green-400 shrink-0 mt-0.5" />
              <span>Sessional attendance tracking built-in!</span>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
