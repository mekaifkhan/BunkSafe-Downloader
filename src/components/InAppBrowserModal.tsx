import React, { useState, useEffect } from "react";
import { 
  Chrome, 
  Copy, 
  Check, 
  Globe,
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="relative w-full max-w-sm bg-[#18181b] border border-white/10 rounded-2xl p-6 shadow-2xl text-center"
      >
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-200 p-1.5 rounded-lg hover:bg-zinc-800 transition"
          title="Dismiss"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Brand Icon */}
        <div className="mx-auto w-12 h-12 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400 mb-4">
          <Globe className="w-6 h-6 text-green-400" />
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-white tracking-tight">
          Please use Chrome to Download
        </h3>
        
        {/* Description */}
        <p className="text-xs text-slate-300 mt-2 leading-relaxed px-1">
          To download and install <strong className="text-green-400">BunkSafe v{apkConfig.version}</strong>, please open this link in your standard phone browser (like Chrome or Safari).
        </p>

        {/* Main actions */}
        <div className="mt-5 space-y-2.5">
          {isAndroid ? (
            <a 
              href={getChromeIntentUrl()}
              className="inline-flex items-center justify-center gap-2 w-full bg-green-500 hover:bg-green-400 text-black font-bold text-xs py-2.5 px-4 rounded-xl transition active:scale-95 shadow-md shadow-green-500/10"
            >
              <Chrome className="w-4 h-4" /> Open in Google Chrome
            </a>
          ) : (
            <div className="text-left bg-zinc-900/60 border border-white/5 rounded-xl p-3 text-[11px] text-slate-400 leading-normal">
              <span className="font-semibold text-white">How to open:</span> Tap the <span className="text-white">three dots (...)</span> or Share icon and choose <span className="text-green-400">"Open in Browser"</span>.
            </div>
          )}

          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className="inline-flex items-center justify-center gap-2 w-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-slate-300 active:scale-95 transition text-xs font-bold py-2.5 px-4 rounded-xl"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-green-400" /> Link Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" /> Copy Website Link
              </>
            )}
          </button>
        </div>

        {/* Secondary Action */}
        <button
          onClick={onClose}
          className="mt-4 text-slate-500 hover:text-slate-400 transition text-[11px] font-medium"
        >
          Stay & read details
        </button>
      </motion.div>
    </div>
  );
}
