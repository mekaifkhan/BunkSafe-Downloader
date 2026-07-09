import React, { useState } from "react";
import { 
  ShieldCheck, 
  Scale, 
  Mail, 
  Github, 
  X, 
  CheckCircle2, 
  Sparkles,
  ExternalLink
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function Footer() {
  const [activeModal, setActiveModal] = useState<"privacy" | "terms" | null>(null);

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#09090b] border-t border-white/5 py-16 px-4 relative overflow-hidden">
      
      {/* Background flare */}
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-green-500/1 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-8 relative z-10 text-left">
        
        {/* Brand details */}
        <div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-green-500 flex items-center justify-center text-black font-black text-xs">
              B
            </div>
            <span className="font-bold text-white tracking-tight">BunkSafe</span>
          </div>
          <p className="text-slate-500 text-xs mt-2 max-w-sm leading-relaxed">
            Smart attendance tracking, forecasting, and timetable planners for college students. Made offline-first and absolute privacy-focused.
          </p>
        </div>

        {/* Links Column */}
        <div className="flex flex-wrap items-center gap-x-8 gap-y-4 text-xs font-medium text-slate-400">
          <button 
            onClick={() => setActiveModal("privacy")} 
            className="hover:text-green-400 transition flex items-center gap-1.5 cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4 text-slate-500" /> Privacy Policy
          </button>
          
          <button 
            onClick={() => setActiveModal("terms")} 
            className="hover:text-green-400 transition flex items-center gap-1.5 cursor-pointer"
          >
            <Scale className="w-4 h-4 text-slate-500" /> Terms of Use
          </button>
          
          <a 
            href="mailto:mekhankaif@gmail.com" 
            className="hover:text-green-400 transition flex items-center gap-1.5"
          >
            <Mail className="w-4 h-4 text-slate-500" /> Support Email
          </a>
          
          <a 
            href="https://github.com/kaifahmadkhan/BunkSafe" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-green-400 transition flex items-center gap-1.5"
          >
            <Github className="w-4 h-4 text-slate-500" /> GitHub Source
          </a>
        </div>

        {/* Copyright notice */}
        <div className="text-xs text-slate-500 border-t border-white/5 md:border-0 pt-6 md:pt-0">
          <span>&copy; {currentYear} BunkSafe. Apache-2.0 License.</span>
        </div>

      </div>

      {/* MODAL SYSTEM */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-2xl max-h-[80vh] overflow-y-auto bg-[#18181b] border border-white/5 rounded-3xl p-6 sm:p-8 shadow-2xl text-left"
            >
              {/* Close Button */}
              <button 
                onClick={() => setActiveModal(null)}
                className="absolute top-5 right-5 text-slate-500 hover:text-slate-300 p-1.5 rounded-lg hover:bg-zinc-800 transition cursor-pointer"
                title="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>

              {activeModal === "privacy" ? (
                <>
                  <div className="flex items-center gap-2.5 text-green-400 mb-5">
                    <ShieldCheck className="w-6 h-6" />
                    <h3 className="text-xl font-bold text-white tracking-tight">Privacy Policy</h3>
                  </div>

                  <div className="space-y-4 text-slate-400 text-sm leading-relaxed font-sans">
                    <p className="text-slate-300 font-semibold text-xs uppercase tracking-wider">
                      Effective Date: July 09, 2026
                    </p>
                    <p>
                      At BunkSafe, privacy is not a feature—it is our absolute architectural foundation. Because your academic records are private, our application is engineered with an uncompromising zero-tracking model.
                    </p>
                    
                    <h4 className="text-white font-bold mt-4">1. Zero Information Collection</h4>
                    <p>
                      BunkSafe does not collect, record, transmit, or monetize any of your data. This includes:
                    </p>
                    <ul className="list-disc pl-5 space-y-1.5">
                      <li>Your personal identity, email, or device IDs.</li>
                      <li>Your course schedules, lectures, or timetables.</li>
                      <li>Your marked attendance logs, present counts, or absent stats.</li>
                    </ul>

                    <h4 className="text-white font-bold mt-4">2. Local Storage and Client database</h4>
                    <p>
                      All database tables, course registries, and simulation rules are compiled and saved strictly inside your Android device's local memory using an embedded storage module. Even though the app connects to the internet to fetch and sync public class timetables, we do not keep or upload any of your personal attendance logs or schedule details onto external servers. Your personal records never leave your physical device.
                    </p>

                    <h4 className="text-white font-bold mt-4">3. Device Permissions</h4>
                    <p>
                      BunkSafe requests standard Android permissions to provide visual alarms and schedule notifications. It does not request camera, contacts, microphone, location, or sensitive storage access.
                    </p>

                    <div className="bg-green-950/20 border border-green-500/10 p-4 rounded-2xl flex items-start gap-3 mt-4 text-xs">
                      <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                      <span>
                        <strong>Summary:</strong> By utilizing BunkSafe, you certify that you have read and agree to our zero-tracking policy. Your data is owned solely by you.
                      </span>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-2.5 text-green-400 mb-5">
                    <Scale className="w-6 h-6" />
                    <h3 className="text-xl font-bold text-white tracking-tight">Terms of Use</h3>
                  </div>

                  <div className="space-y-4 text-slate-400 text-sm leading-relaxed font-sans">
                    <p className="text-slate-300 font-semibold text-xs uppercase tracking-wider">
                      Last Updated: July 09, 2026
                    </p>
                    <p>
                      Please review these simple Terms of Use before installing BunkSafe. By downloading and running BunkSafe, you agree to these conditions.
                    </p>
                    
                    <h4 className="text-white font-bold mt-4">1. Apache-2.0 Open Source License</h4>
                    <p>
                      BunkSafe is distributed freely as an open-source product under the Apache-2.0 License. You are free to view, customize, modify, and distribute the repository files.
                    </p>

                    <h4 className="text-white font-bold mt-4">2. Accuracy and Forecaster Disclaimer</h4>
                    <p>
                      BunkSafe is designed as a quick calculator and record-keeping utility to assist students in tracking class schedules. However:
                    </p>
                    <ul className="list-disc pl-5 space-y-1.5">
                      <li>BunkSafe does not synchronize automatically with your university's official registration database or portal.</li>
                      <li>You are solely responsible for double-checking official rosters or files provided by your academic office.</li>
                      <li>The developer assumes zero liability for any grade penalties, exam barriers, or detention choices arising from use of this application.</li>
                    </ul>

                    <h4 className="text-white font-bold mt-4">3. Fair Use</h4>
                    <p>
                      This applet does not support, endorse, or promote chronic class skipping. Its purpose is to assist busy students, ECE majors, and athletes in managing their complex calendars safely while respecting mandatory thresholds.
                    </p>
                  </div>
                </>
              )}

              {/* Close footer button */}
              <button 
                onClick={() => setActiveModal(null)}
                className="w-full bg-[#09090b] hover:bg-zinc-900 text-slate-300 font-bold py-3 px-6 rounded-xl border border-white/5 transition text-sm mt-6 text-center cursor-pointer"
              >
                Close Dialog
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </footer>
  );
}
