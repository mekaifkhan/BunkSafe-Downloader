import React, { useState, useEffect } from "react";
import { 
  Chrome, 
  ExternalLink, 
  Copy, 
  Check, 
  Compass, 
  AlertTriangle,
  Smartphone,
  Instagram,
  X
} from "lucide-react";
import { motion } from "motion/react";
import { apkConfig } from "../config/apkConfig";

interface InAppBrowserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCopyLink: () => void;
}

export function isInAppBrowser(): boolean {
  if (typeof window === "undefined") return false;
  const ua = navigator.userAgent || navigator.vendor || (window as any).opera || "";
  
  // Pattern match for popular in-app webviews
  const inAppPatterns = [
    /instagram/i,
    /fban/i,
    /fbav/i,
    /fb_iab/i,
    /messenger/i,
    /snapchat/i,
    /twitter/i,
    /linkedinapp/i,
    /wv/i, // General android webview
    /gsa/i // Google Search App webview
  ];
  
  const matchesPattern = inAppPatterns.some(pattern => pattern.test(ua));
  
  // Android webviews often contain '; wv)' in their user agent
  const isAndroidWebview = /android/i.test(ua) && /; wv\)/.test(ua);
  
  return matchesPattern || isAndroidWebview;
}

export default function InAppBrowserModal({ isOpen, onClose, onCopyLink }: InAppBrowserModalProps) {
  const [copied, setCopied] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsAndroid(/android/i.test(navigator.userAgent));
    }
  }, []);

  if (!isOpen) return null;

  // Generate Chrome Intent URL for Android devices
  const getChromeIntentUrl = () => {
    if (typeof window === "undefined") return "#";
    const host = window.location.host;
    const path = window.location.pathname;
    return `intent://${host}${path}#Intent;scheme=https;package=com.android.chrome;end`;
  };

  const handleCopy = () => {
    if (typeof window !== "undefined") {
      const fullUrl = window.location.href;
      navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      onCopyLink();
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-md bg-[#18181b] border border-white/5 rounded-3xl p-6 shadow-2xl text-left overflow-hidden"
      >
        {/* Glow Accent */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-green-500/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-2 text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/15">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span className="text-[10px] font-bold uppercase tracking-wider font-mono">In-App Browser Detected</span>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-500 hover:text-slate-300 transition p-1.5 rounded-xl hover:bg-zinc-800"
            title="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Icon & Title */}
        <div className="mb-5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-500/20 to-emerald-500/5 border border-green-500/20 flex items-center justify-center text-green-400 mb-3.5">
            <Instagram className="w-6 h-6 animate-pulse" />
          </div>
          <h3 className="text-lg font-black text-white tracking-tight leading-snug">
            Download Blocked by Instagram
          </h3>
          <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
            In-app browsers (like Instagram or Facebook) strictly block downloading APK/installer files to protect their sandbox. To install <strong className="text-green-400">BunkSafe v{apkConfig.version}</strong>, you need to open this page in a real browser.
          </p>
        </div>

        {/* Guidance section based on OS */}
        <div className="space-y-3 mb-6">
          {isAndroid ? (
            <div className="bg-[#0f0f11] border border-white/5 rounded-2xl p-4">
              <div className="flex items-start gap-3">
                <Chrome className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Android Automated Fix</h4>
                  <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                    Tap the button below to instantly trigger Chrome and open BunkSafe outside Instagram.
                  </p>
                  
                  <a 
                    href={getChromeIntentUrl()}
                    className="inline-flex items-center justify-center gap-2 w-full mt-3 bg-green-500 hover:bg-green-400 text-black font-black text-xs py-2.5 px-4 rounded-xl transition shadow-md shadow-green-500/10 active:scale-95"
                  >
                    <Chrome className="w-4 h-4" /> Open in Google Chrome
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-[#0f0f11] border border-white/5 rounded-2xl p-4">
              <div className="flex items-start gap-3">
                <Compass className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">How to Open in Safari / Chrome</h4>
                  <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                    1. Tap the <strong className="text-white">three dots (...)</strong> or share icon at the top-right / bottom of your Instagram screen.
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                    2. Select <strong className="text-green-400">"Open in Browser"</strong> or <strong className="text-green-400">"Open in Safari/Chrome"</strong>.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Copy Direct Link */}
          <div className="bg-[#0f0f11] border border-white/5 rounded-2xl p-4">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0 flex-1">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Manual Option</h4>
                <p className="text-[11px] text-slate-400 mt-0.5 truncate">
                  Copy this website link and open in Chrome.
                </p>
              </div>
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 shrink-0 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-slate-300 active:scale-95 transition-all text-xs font-bold px-3 py-2 rounded-xl"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-green-400" /> Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" /> Copy Link
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex justify-end gap-2.5">
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition text-xs font-bold px-4 py-2"
          >
            Stay & Browse anyway
          </button>
        </div>
      </motion.div>
    </div>
  );
}
