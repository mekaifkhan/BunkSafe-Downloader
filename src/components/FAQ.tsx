import React, { useState } from "react";
import { 
  HelpCircle, 
  Plus, 
  Minus,
  FileCheck,
  Smartphone,
  ShieldCheck,
  ExternalLink
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { FAQItem } from "../types";

const FAQS: FAQItem[] = [
  {
    id: "free",
    question: "Is BunkSafe free to use?",
    answer: "Yes, BunkSafe is 100% free with absolutely no hidden charges, premium features, or subscription plans. It is built purely as a utility tool for college students."
  },
  {
    id: "safe",
    question: "Is it safe to install this APK?",
    answer: "Absolutely. The BunkSafe APK contains zero telemetry, trackers, or hidden analytics. The complete source code is transparently hosted on GitHub. If your phone shows a warning when downloading, it is a standard Android notice for files downloaded outside of the Google Play Store."
  },
  {
    id: "offline",
    question: "Does BunkSafe need internet, and where is my data saved?",
    answer: "BunkSafe works with the internet to sync class timetables and fetch updates automatically. However, we do not keep any of your personal data on our servers! All of your attendance logs and schedule selections are saved directly on your phone's secure local storage, ensuring your privacy is fully maintained."
  },
  {
    id: "install",
    question: "How do I install the APK file on Android?",
    answer: "Installing an APK is simple: \n1. Click 'Download APK' and wait for the file to finish.\n2. Tap the downloaded file in your notification bar or File Manager.\n3. If prompted, toggle 'Allow installation from unknown sources' in your Android Settings.\n4. Click 'Install' and launch the app!"
  },
  {
    id: "detention",
    question: "What is the attendance target threshold in BunkSafe?",
    answer: "By default, the attendance target is configured to 75%—the standard threshold across most colleges and universities (such as JMI). However, you can freely customize this target limit for each course individually inside the app settings."
  }
];

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>("free");

  const toggleFaq = (id: string) => {
    setOpenId(prev => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="py-24 px-4 bg-[#09090b] border-b border-white/5 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.01),transparent_40%)]"></div>

      <div className="max-w-4xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-green-400">Common Queries</span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mt-3 font-sans">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-400 mt-4 text-sm leading-relaxed max-w-md mx-auto">
            Everything you need to know about BunkSafe's security, privacy, and installation guidelines.
          </p>
        </div>

        {/* FAQs Accordion */}
        <div className="space-y-4">
          {FAQS.map((faq) => {
            const isOpen = openId === faq.id;

            return (
              <div 
                key={faq.id}
                className={`bg-[#18181b]/40 border rounded-2xl overflow-hidden transition-all duration-300 ${isOpen ? "border-green-500/20 bg-[#18181b]/70" : "border-white/5"}`}
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left gap-4 group"
                >
                  <span className="text-base font-bold text-slate-100 group-hover:text-green-400 transition-colors">
                    {faq.question}
                  </span>
                  <div className={`w-6 h-6 rounded-lg bg-[#09090b] border border-white/5 flex items-center justify-center text-slate-400 transition-transform duration-300 ${isOpen ? "rotate-180 border-green-500/20 text-green-400" : ""}`}>
                    {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 border-t border-zinc-800 pt-4 text-slate-400 text-sm leading-relaxed whitespace-pre-line">
                        {faq.answer}
                        {faq.id === "install" && (
                          <div className="mt-4 p-3.5 bg-[#09090b] rounded-xl border border-white/5 flex items-start gap-3 text-xs text-slate-500">
                            <ShieldCheck className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                            <span>
                              <strong>Pro Tip:</strong> All BunkSafe APK builds are scanned by Google Play Protect on device launch to certify absolute file safety before running.
                            </span>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
