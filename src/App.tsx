import React, { useEffect, useState } from "react";
import { Download } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Components
import Hero from "./components/Hero";
import Features from "./components/Features";
import SpecialFeatures from "./components/SpecialFeatures";
import WhatsNew from "./components/WhatsNew";
import Screenshots from "./components/Screenshots";
import AboutDeveloper from "./components/AboutDeveloper";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";

import DownloadProgress from "./components/DownloadProgress";
import Toast from "./components/Toast";
import AdminDashboard from "./components/AdminDashboard";

// Configuration & Utilities
import { apkConfig } from "./config/apkConfig";
import { getDownloadCount, incrementDownloadCount } from "./lib/firebase";
import { initializeGA, trackEvent } from "./lib/analytics";
import { 
  incrementVisit, 
  incrementAPKDownload, 
  incrementCopyLink, 
  trackUniqueVisitor, 
  updatePresence, 
  listenToLiveUsers 
} from "./firebase";

export default function App() {
  // Navigation / Routing state for /admin
  const [currentView, setCurrentView] = useState<"home" | "admin">(() => {
    return typeof window !== "undefined" && window.location.pathname === "/admin" ? "admin" : "home";
  });

  // Stats state
  const [totalDownloads, setTotalDownloads] = useState<number>(1428);
  const [isLoadingDownloads, setIsLoadingDownloads] = useState<boolean>(true);
  const [liveUsers, setLiveUsers] = useState<number>(1);

  // Modal / UX state
  const [isDownloading, setIsDownloading] = useState(false);

  // Toast state
  const [toastMessage, setToastMessage] = useState("");
  const [toastOpen, setToastOpen] = useState(false);
  const [toastType, setToastType] = useState<"success" | "info">("success");

  // PWA Install prompt state
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallBtn, setShowInstallBtn] = useState(false);

  // Handle popstate for /admin route transitions cleanly
  useEffect(() => {
    const handlePopState = () => {
      setCurrentView(window.location.pathname === "/admin" ? "admin" : "home");
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigateTo = (view: "home" | "admin") => {
    setCurrentView(view);
    const path = view === "admin" ? "/admin" : "/";
    window.history.pushState({}, "", path);
  };

  // Initialize and load Firebase download count stats on mount
  useEffect(() => {
    // 1. Initialize Google Analytics
    try {
      initializeGA();
    } catch (e) {
      console.warn("Analytics initialization skipped in preview context.");
    }

    // 2. Fetch Firestore download count
    const fetchDownloads = async () => {
      try {
        const count = await getDownloadCount();
        setTotalDownloads(count);
      } catch (err) {
        console.error("Failed to query download stats from Firebase:", err);
      } finally {
        setIsLoadingDownloads(false);
      }
    };
    fetchDownloads();

    // 3. Telemetry statistics increments
    incrementVisit();
    trackUniqueVisitor();

    // 4. Live presence heartbeat updates (run every 30 seconds)
    updatePresence();
    const presenceInterval = setInterval(() => {
      updatePresence();
    }, 30000);

    // 5. Live users realtime subscription
    const unsubscribeLive = listenToLiveUsers((count) => {
      setLiveUsers(count);
    });

    // 6. Handle PWA BeforeInstallPrompt
    const handleInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallBtn(true);
      trackEvent("pwa_install_prompt_available");
    };
    window.addEventListener("beforeinstallprompt", handleInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleInstallPrompt);
      clearInterval(presenceInterval);
      unsubscribeLive();
    };
  }, []);

  const triggerToast = (message: string, type: "success" | "info" = "success") => {
    setToastMessage(message);
    setToastType(type);
    setToastOpen(true);
  };

  // Click handler to initiate APK download
  const handleDownloadApk = async () => {
    setIsDownloading(true);
    trackEvent("apk_download_initiated", { version: apkConfig.version });
    
    // Log new Firebase APK Download telemetry
    incrementAPKDownload();

    // Increment legacy download metrics in Firebase Firestore (downloads/stats)
    try {
      const newCount = await incrementDownloadCount();
      setTotalDownloads(newCount);
    } catch (e) {
      console.error("Firestore update failed, skipping sync:", e);
      setTotalDownloads(prev => prev + 1);
    }
  };

  // Callback when APK download progress emulation hits 100%
  const handleDownloadComplete = () => {
    setIsDownloading(false);
    triggerToast("BunkSafe.apk download started successfully!", "success");
    trackEvent("apk_download_complete", { version: apkConfig.version });

    // Trigger the actual browser download of our static APK file with cache-busting
    const downloadLink = document.createElement("a");
    downloadLink.href = `${apkConfig.downloadUrl}?t=${Date.now()}`;
    downloadLink.download = `BunkSafe_${apkConfig.version}.apk`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  // Copy download url link to clipboard
  const handleCopyApkLink = () => {
    const fullUrl = `${window.location.origin}${apkConfig.downloadUrl}`;
    navigator.clipboard.writeText(fullUrl);
    triggerToast("APK Download link copied to clipboard!", "success");
    trackEvent("copy_apk_link", { url: fullUrl });

    // Record copy link telemetry in Firestore
    incrementCopyLink();
  };

  // Web sharing API
  const handleShareWebsite = async () => {
    const shareData = {
      title: "BunkSafe - Smart Attendance Tracker",
      text: "Check out BunkSafe! A smart attendance tracker for college students.",
      url: window.location.href
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        triggerToast("Shared successfully!", "success");
        trackEvent("share_website_success");
      } else {
        navigator.clipboard.writeText(window.location.href);
        triggerToast("Website URL copied for sharing!", "success");
        trackEvent("share_website_fallback_copy");
        
        // Treat copying share URL as copy link metric too
        incrementCopyLink();
      }
    } catch (err) {
      console.warn("Share operation cancelled or not supported:", err);
    }
  };

  // Trigger PWA installation sequence
  const handleInstallPWA = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    trackEvent("pwa_install_outcome", { outcome });
    setDeferredPrompt(null);
    setShowInstallBtn(false);
  };

  // Render Admin Dashboard layout if route matches /admin
  if (currentView === "admin") {
    return <AdminDashboard onBackToHome={() => navigateTo("home")} />;
  }

  return (
    <div className="min-h-screen bg-[#09090b] text-slate-200 flex flex-col font-sans selection:bg-green-500/30 selection:text-green-300">
      
      {/* 1. SECTIONS FLOW */}
      <Hero 
        totalDownloads={totalDownloads}
        isLoadingDownloads={isLoadingDownloads}
        onDownloadClick={handleDownloadApk}
        onShareClick={handleShareWebsite}
        onCopyLinkClick={handleCopyApkLink}
        liveUsers={liveUsers}
      />

      <Features />

      <SpecialFeatures />

      <WhatsNew />

      <Screenshots />

      <AboutDeveloper />

      <FAQ />

      <Footer />

      {/* 2. MOBILE FLOATING ACTION CTA (Displayed primarily on small screens) */}
      <div className="sm:hidden fixed bottom-5 left-0 w-full px-4 z-40">
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-[#141416]/95 border border-zinc-800 p-3.5 rounded-2xl shadow-2xl backdrop-blur-md flex items-center justify-between gap-4 max-w-md mx-auto"
        >
          <div className="min-w-0 text-left">
            <div className="text-xs font-black text-white flex items-center gap-1">
              BunkSafe <span className="text-[9px] px-1.5 py-0.5 bg-green-500/10 text-green-400 rounded-md border border-green-500/15 font-bold">APK</span>
            </div>
            <p className="text-[10px] text-slate-400 truncate mt-0.5">Version {apkConfig.version} • {apkConfig.fileSize} Stable</p>
          </div>
          
          <div className="flex items-center gap-2 shrink-0">
            {showInstallBtn && (
              <button
                onClick={handleInstallPWA}
                className="bg-zinc-900 border border-zinc-800 text-slate-300 px-3 py-2 rounded-xl text-[10px] font-bold active:scale-95 transition"
              >
                Install
              </button>
            )}
            <button
              onClick={handleDownloadApk}
              className="bg-green-500 text-black px-4 py-2.5 rounded-xl text-[10px] font-black shadow-md shadow-green-500/10 active:scale-95 transition flex items-center gap-1"
            >
              <Download className="w-3.5 h-3.5" /> Download
            </button>
          </div>
        </motion.div>
      </div>

      {/* 3. REUSEABLE MODALS & TOAST ALERTS */}
      <AnimatePresence>
        {isDownloading && (
          <DownloadProgress 
            isOpen={isDownloading}
            onClose={() => setIsDownloading(false)}
            onComplete={handleDownloadComplete}
          />
        )}
      </AnimatePresence>

      <Toast 
        message={toastMessage}
        isOpen={toastOpen}
        onClose={() => setToastOpen(false)}
        type={toastType}
      />

    </div>
  );
}
