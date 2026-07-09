import React from "react";
import { 
  Sparkles, 
  ChevronRight, 
  Zap, 
  ShieldAlert, 
  History 
} from "lucide-react";
import { motion } from "motion/react";
import { apkConfig } from "../config/apkConfig";

export default function WhatsNew() {
  return (
    <section id="whats-new" className="py-24 px-4 bg-[#09090b] relative border-b border-white/5">
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-green-500/2 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-green-400">Updates History</span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mt-3 font-sans">
            What's New in {apkConfig.version}
          </h2>
          <p className="text-slate-400 mt-4 max-w-lg mx-auto text-sm leading-relaxed">
            Latest release notes and features packed into our latest stable builds. Released on <strong className="text-slate-200">{apkConfig.releaseDate}</strong>.
          </p>
        </div>

        {/* Release Box */}
        <div className="relative bg-[#18181b]/40 border border-white/5 rounded-3xl p-6 sm:p-10 backdrop-blur-sm overflow-hidden shadow-xl">
          
          {/* Subtle Accent Glow */}
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-green-500/5 rounded-full blur-2xl pointer-events-none"></div>

          {/* Version / Date Line */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-850 pb-6 mb-8">
            <div className="flex items-center gap-3">
              <span className="px-3.5 py-1.5 bg-green-500 text-black font-extrabold text-sm rounded-xl font-mono">
                {apkConfig.version}
              </span>
              <div>
                <h4 className="text-base font-bold text-slate-100">Official Production Build</h4>
                <p className="text-xs text-slate-400">Stable, verified, and safe to deploy</p>
              </div>
            </div>
            <div className="text-left sm:text-right font-mono text-xs text-slate-400">
              Released: <strong className="text-slate-200">{apkConfig.releaseDate}</strong>
            </div>
          </div>

          {/* Release Changes */}
          <div className="space-y-6">
            <h5 className="text-sm font-semibold tracking-wide text-slate-300 uppercase flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-green-400" /> Key Enhancements & Fixes
            </h5>
            
            <ul className="space-y-4 text-left">
              {apkConfig.changelog.map((change, idx) => {
                // Parse out Title vs details if possible
                const [title, description] = change.split(": ");

                return (
                  <motion.li 
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    className="flex items-start gap-3 text-slate-400 text-sm"
                  >
                    <div className="w-5 h-5 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center shrink-0 mt-0.5">
                      <ChevronRight className="w-3.5 h-3.5 text-green-400" />
                    </div>
                    <div>
                      {description ? (
                        <span>
                          <strong className="text-slate-200">{title}:</strong> {description}
                        </span>
                      ) : (
                        <span>{change}</span>
                      )}
                    </div>
                  </motion.li>
                );
              })}
            </ul>
          </div>

          {/* Quick Stats banner */}
          <div className="grid sm:grid-cols-3 gap-4 bg-[#09090b]/60 border border-white/5 rounded-2xl p-4 mt-8 font-mono text-xs text-slate-400 text-center">
            <div className="flex flex-col gap-1 py-1 sm:border-r border-zinc-800">
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">File Size</span>
              <strong className="text-slate-200 text-sm">{apkConfig.fileSize}</strong>
            </div>
            <div className="flex flex-col gap-1 py-1 sm:border-r border-zinc-800">
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Signature SHA256</span>
              <strong className="text-slate-200 text-sm truncate px-4" title="Verified secure signature matches Google Play Integrity guidelines">SHA-256 Verified</strong>
            </div>
            <div className="flex flex-col gap-1 py-1">
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Play Protect</span>
              <strong className="text-green-400 text-sm flex items-center justify-center gap-1">
                <Zap className="w-3.5 h-3.5 text-green-400 fill-green-400/10" /> Safe
              </strong>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
