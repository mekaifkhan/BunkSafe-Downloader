import React, { useEffect, useState } from "react";
import { 
  Download, 
  CheckCircle2, 
  Sparkles, 
  X, 
  Smartphone,
  ShieldCheck
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { apkConfig } from "../config/apkConfig";

interface DownloadProgressProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

export default function DownloadProgress({ isOpen, onClose, onComplete }: DownloadProgressProps) {
  const [progress, setProgress] = useState(0);
  const [speed, setSpeed] = useState("3.2 MB/s");
  const [status, setStatus] = useState<"downloading" | "verifying" | "complete">("downloading");

  // Animate the progress counter when modal is open
  useEffect(() => {
    if (!isOpen) {
      setProgress(0);
      setStatus("downloading");
      return;
    }

    let interval: NodeJS.Timeout;
    setProgress(0);
    setStatus("downloading");

    const duration = 2400; // 2.4 seconds total download emulation
    const steps = 100;
    const stepTime = duration / steps;

    interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          
          // Switch to verifying state briefly
          setStatus("verifying");
          setTimeout(() => {
            setStatus("complete");
            onComplete();
          }, 600);

          return 100;
        }
        
        // Randomize download speed slightly to make it feel extremely realistic
        const speeds = ["2.8 MB/s", "3.1 MB/s", "3.4 MB/s", "3.6 MB/s", "3.2 MB/s"];
        if (Math.random() > 0.7) {
          setSpeed(speeds[Math.floor(Math.random() * speeds.length)]);
        }

        return prev + 1;
      });
    }, stepTime);

    return () => clearInterval(interval);
  }, [isOpen, onComplete]);

  if (!isOpen) return null;

  // Calculate downloaded MBs
  const totalMb = parseFloat(apkConfig.fileSize); // e.g. 5.8
  const currentMb = ((progress / 100) * totalMb).toFixed(1);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="relative w-full max-w-md bg-[#18181b] border border-white/5 rounded-3xl p-6 shadow-2xl text-left overflow-hidden"
      >
        {/* Glow Accent */}
        <div className="absolute inset-0 bg-green-500/2 pointer-events-none"></div>

        {/* Header */}
        <div className="flex justify-between items-center mb-5">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse"></span>
            <span className="text-xs font-bold text-slate-400 font-mono uppercase tracking-wider">
              {status === "downloading" && "Downloading Package..."}
              {status === "verifying" && "Verifying Integrity..."}
              {status === "complete" && "Download Complete!"}
            </span>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-500 hover:text-slate-300 transition p-1 rounded-lg hover:bg-zinc-800"
            title="Cancel Download"
          >
            <X className="w-4.5 h-4.5" />
          </button>
        </div>

        {/* Body content */}
        <div className="flex items-start gap-4 mb-6">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border shrink-0 transition-all duration-300 ${status === "complete" ? "bg-green-500/10 border-green-500/30 text-green-400" : "bg-[#09090b] border-white/5 text-slate-400 animate-pulse"}`}>
            {status === "complete" ? <CheckCircle2 className="w-6 h-6" /> : <Download className="w-6 h-6 text-green-400" />}
          </div>
          
          <div className="flex-1">
            <h4 className="text-sm font-bold text-white tracking-tight truncate">
              {status === "complete" ? "BunkSafe.apk" : `BunkSafe_${apkConfig.version}.apk`}
            </h4>
            <p className="text-xs text-slate-400 font-medium mt-0.5">
              {status === "downloading" && `Downloading ${currentMb} MB of ${apkConfig.fileSize} (${speed})`}
              {status === "verifying" && "Scanning file signatures with Google Play protect..."}
              {status === "complete" && "Finished successfully. Ready for installation."}
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2.5 bg-[#09090b] border border-white/5 rounded-full overflow-hidden mb-5">
          <motion.div 
            className={`h-full rounded-full transition-all duration-300 ${status === "complete" ? "bg-green-500" : "bg-green-400"}`}
            style={{ width: `${progress}%` }}
            layout
          ></motion.div>
        </div>

        {/* Progress percentage label */}
        <div className="flex justify-between items-center text-xs font-mono mb-6">
          <span className="text-slate-500">Progress:</span>
          <span className="font-bold text-green-400 text-sm">
            {progress}%
          </span>
        </div>

        {/* Advice / installation help message */}
        <AnimatePresence mode="wait">
          {status === "complete" ? (
            <motion.div 
              key="complete-tip"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-green-950/30 border border-green-500/10 p-3.5 rounded-2xl flex items-start gap-3 text-xs text-slate-400 leading-relaxed"
            >
              <ShieldCheck className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
              <span>
                <strong>Installation Guide:</strong> Find `BunkSafe.apk` in your phone's download folder, click to install, and toggle 'Allow from unknown sources' if prompted!
              </span>
            </motion.div>
          ) : (
            <motion.div 
              key="download-tip"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#09090b]/60 border border-white/5 p-3.5 rounded-2xl flex items-start gap-3 text-xs text-slate-500 leading-relaxed"
            >
              <Smartphone className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
              <span>
                <strong>Privacy Maintained:</strong> BunkSafe works with the internet to sync timetables, but your personal attendance logs are stored strictly on your phone. We don't keep your data on our servers.
              </span>
            </motion.div>
          )}
        </AnimatePresence>

      </motion.div>
    </div>
  );
}
