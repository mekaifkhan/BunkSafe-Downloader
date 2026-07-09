import React, { useEffect } from "react";
import { Info, X, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ToastProps {
  message: string;
  isOpen: boolean;
  onClose: () => void;
  type?: "info" | "success";
}

export default function Toast({ message, isOpen, onClose, type = "success" }: ToastProps) {
  useEffect(() => {
    if (!isOpen) return;
    
    const timer = setTimeout(() => {
      onClose();
    }, 4000); // Dismiss after 4s

    return () => clearTimeout(timer);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-slate-900 border border-emerald-500/20 text-slate-100 px-5 py-3.5 rounded-2xl shadow-2xl backdrop-blur-md max-w-sm"
        >
          {/* Accent Indicator */}
          <div className="absolute left-0 top-1/4 h-1/2 w-1 bg-emerald-400 rounded-r-full"></div>

          <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
            {type === "success" ? (
              <CheckCircle className="w-4.5 h-4.5 text-emerald-400" />
            ) : (
              <Info className="w-4.5 h-4.5 text-emerald-400" />
            )}
          </div>
          
          <span className="text-xs font-semibold leading-snug">{message}</span>
          
          <button 
            onClick={onClose}
            className="text-slate-500 hover:text-slate-300 transition shrink-0 ml-2"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
