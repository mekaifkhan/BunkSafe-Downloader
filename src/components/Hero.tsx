import React from "react";
import { 
  Download, 
  Smartphone, 
  ShieldCheck, 
  Share2, 
  Link2, 
  Github, 
  Play,
  Award,
  Sparkles,
  Users
} from "lucide-react";
import { motion } from "motion/react";
import { apkConfig } from "../config/apkConfig";
import InteractiveMockup from "./InteractiveMockup";

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
    <section className="relative pt-32 pb-24 px-4 overflow-hidden border-b border-white/5 bg-[#09090b]">
      
      {/* Background Decorative Mesh Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,#14532d,transparent_50%)] opacity-30 pointer-events-none"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-3xl -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-green-700/5 rounded-full blur-3xl translate-x-1/2 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Side Content */}
        <div className="lg:col-span-7 flex flex-col items-start gap-6 text-left">
          
          {/* Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 text-green-400 rounded-full text-xs font-bold uppercase tracking-widest"
          >
            <Award className="w-3.5 h-3.5" />
            <span>v{apkConfig.version} • Latest Update</span>
          </motion.div>

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white leading-tight font-sans">
              Bunk<span className="text-green-500 relative">Safe<span className="absolute bottom-1.5 left-0 w-full h-1 bg-green-500/20 rounded-md"></span></span>
            </h1>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-wide text-slate-300 mt-2">
              Smart Attendance Tracker for College Students
            </h2>
          </motion.div>

          {/* Description */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-400 text-lg leading-relaxed max-w-xl"
          >
            Tired of manually computing when you can safely skip a lecture? BunkSafe is an elegant, internet-enabled application that dynamically simulates and manages your attendance rules to keep you safe from detentions while keeping your data completely private.
          </motion.p>

          {/* Metadata Badges */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="flex flex-wrap gap-x-6 gap-y-3 font-mono text-xs text-slate-400 py-2 border-y border-white/5 w-full max-w-lg mt-2"
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
            className="flex flex-wrap gap-4 items-center w-full sm:w-auto mt-2"
          >
            <button
              onClick={onDownloadClick}
              id="hero-download-btn"
              className="group flex items-center justify-center gap-3 bg-green-500 hover:bg-green-400 text-black font-bold px-8 py-4 rounded-xl shadow-lg shadow-green-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 text-base w-full sm:w-auto"
            >
              <Download className="w-5 h-5 transition-transform duration-200 group-hover:translate-y-0.5" />
              Download Latest APK
            </button>

            <button
              onClick={() => {
                const element = document.getElementById("interactive-demo");
                element?.scrollIntoView({ behavior: "smooth" });
              }}
              className="flex items-center justify-center gap-2 bg-[#18181b] hover:bg-zinc-800 text-slate-200 border border-white/5 font-semibold px-6 py-4 rounded-xl transition duration-200 w-full sm:w-auto"
            >
              <Play className="w-4 h-4 text-green-500 fill-green-500/10" />
              Try App Simulator
            </button>
          </motion.div>

          {/* Utility buttons & Telemetry */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap items-center gap-4 text-slate-400 text-sm mt-1"
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
            className="flex items-center gap-3.5 bg-[#18181b]/60 border border-white/5 px-5 py-3 rounded-2xl mt-4 backdrop-blur-sm"
          >
            <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center border border-green-500/20">
              <Users className="w-5 h-5 text-green-400 animate-pulse" />
            </div>
            <div>
              <div className="text-xs text-slate-400 font-medium">Trusted Attendance Tool</div>
              <div className="text-base font-bold text-slate-100 flex items-center gap-1.5">
                {isLoadingDownloads ? (
                  <span className="w-16 h-5 bg-zinc-800 rounded animate-pulse inline-block"></span>
                ) : (
                  <span className="text-green-500 font-mono text-lg font-extrabold tracking-tight">
                    {totalDownloads.toLocaleString()}+
                  </span>
                )}
                <span>students registered</span>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Right Side Mockup */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
            className="relative w-full max-w-[340px]"
          >
            {/* Glowing Accent Ring behind phone mockup */}
            <div className="absolute inset-0 bg-green-500/10 blur-3xl rounded-[48px] scale-95 -z-10 animate-pulse"></div>
            
            <InteractiveMockup />

            {/* Float hint bubble */}
            <div className="absolute -bottom-4 -left-6 bg-[#18181b]/95 border border-green-500/20 p-3 rounded-2xl max-w-[140px] text-[10px] text-slate-300 shadow-xl backdrop-blur-md hidden sm:flex items-start gap-1.5 animate-bounce">
              <Sparkles className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
              <span>Tap the buttons inside the phone to test the live simulator!</span>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
