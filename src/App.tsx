import React, { useEffect, useState } from "react";
import { 
  Download, 
  Smartphone, 
  Sparkles, 
  Wifi, 
  Share2, 
  Menu, 
  X,
  ShieldAlert,
  ArrowUp,
  Award
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Components
import Hero from "./components/Hero";
import Features from "./components/Features";
import Screenshots from "./components/Screenshots";
import WhatsNew from "./components/WhatsNew";
import FAQ from "./components/FAQ";
import AboutDeveloper from "./components/AboutDeveloper";
import Footer from "./components/Footer";
import DownloadProgress from "./components/DownloadProgress";
import Toast from "./components/Toast";

// Configuration & Utilities
import { apkConfig } from "./config/apkConfig";
import { getDownloadCount, incrementDownloadCount } from "./lib/firebase";
import { initializeGA, trackEvent } from "./lib/analytics";

export default function App() {
  // Stats state
  const [totalDownloads, setTotalDownloads] = useState<number>(1428);
  const [isLoadingDownloads, setIsLoadingDownloads] = useState<boolean>(true);

  // Modal / UX state
  const [isDownloading, setIsDownloading] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Toast state
  const [toastMessage, setToastMessage] = useState("");
  const [toastOpen, setToastOpen] = useState(false);
  const [toastType, setToastType] = useState<"success" | "info">("success");

  // PWA Install prompt state
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallBtn, setShowInstallBtn] = useState(false);

  // Sync download counts on mount & initialize GA
  useEffect(() => {
    // 1. Initialize Analytics
    try {
      initializeGA();
    } catch (e) {
      console.warn("Analytics initialization skipped in preview context.");
    }

    // 2. Fetch Firestore download stats
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

    // 3. Monitor scroll for Back-To-Top button
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);

    // 4. Handle PWA BeforeInstallPrompt
    const handleInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallBtn(true);
      trackEvent("pwa_install_prompt_available");
    };
    window.addEventListener("beforeinstallprompt", handleInstallPrompt);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("beforeinstallprompt", handleInstallPrompt);
    };
  }, []);

  const triggerToast = (message: string, type: "success" | "info" = "success") => {
    setToastMessage(message);
    setToastType(type);
    setToastOpen(true);
  };

  // Click handler to initiate APK download
  const handleDownloadApk = async () => {
    // 1. Trigger animated progress overlay
    setIsDownloading(true);
    trackEvent("apk_download_initiated", { version: apkConfig.version });

    // 2. Increment stats in Firebase Firestore
    try {
      const newCount = await incrementDownloadCount();
      // Update local state instantly for active feedback
      setTotalDownloads(newCount);
    } catch (e) {
      console.error("Firestore update failed, skipping sync:", e);
      // Fallback local update
      setTotalDownloads(prev => prev + 1);
    }
  };

  // Final callback when APK download reaches 100%
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

  // Handles copying the download link to clipboard
  const handleCopyApkLink = () => {
    const fullUrl = `${window.location.origin}${apkConfig.downloadUrl}`;
    navigator.clipboard.writeText(fullUrl);
    triggerToast("APK Download link copied to clipboard!", "success");
    trackEvent("copy_apk_link", { url: fullUrl });
  };

  // Handles web sharing API
  const handleShareWebsite = async () => {
    const shareData = {
      title: "BunkSafe - Smart Attendance Tracker",
      text: "Checkout BunkSafe! An amazing smart attendance tracker & simulator for college students.",
      url: window.location.href
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        triggerToast("Shared successfully!", "success");
        trackEvent("share_website_success");
      } else {
        // Fallback copy website link
        navigator.clipboard.writeText(window.location.href);
        triggerToast("Website URL copied to clipboard for sharing!", "success");
        trackEvent("share_website_fallback_copy");
      }
    } catch (err) {
      console.warn("Share operation cancelled or not supported:", err);
    }
  };

  // Triggers PWA install sequence
  const handleInstallPWA = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    trackEvent("pwa_install_outcome", { outcome });
    setDeferredPrompt(null);
    setShowInstallBtn(false);
  };

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-slate-200 flex flex-col font-sans selection:bg-green-500/30 selection:text-green-300">
      
      {/* 1. STICKY BLURRY HEADER / NAVBAR */}
      <header className="fixed top-0 left-0 w-full z-40 bg-[#09090b]/80 backdrop-blur-md border-b border-white/5 transition-all duration-200">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          
          {/* Brand Logo */}
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2.5 text-left group"
          >
            <div className="w-8 h-8 rounded-lg bg-green-500 flex items-center justify-center text-black font-black text-base shadow-[0_0_15px_rgba(34,197,94,0.4)] group-hover:scale-[1.05] transition-all duration-200">
              B
            </div>
            <div>
              <span className="font-extrabold text-white tracking-tight text-base block leading-none">BunkSafe</span>
              <span className="text-[9px] text-green-400 font-bold font-mono tracking-wider">ONLINE & PRIVATE</span>
            </div>
          </button>

          {/* Desktop Nav Actions */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-semibold uppercase tracking-wider text-slate-400">
            <button onClick={() => scrollToSection("features")} className="hover:text-green-400 transition">Features</button>
            <button onClick={() => scrollToSection("screenshots")} className="hover:text-green-400 transition">Gallery</button>
            <button onClick={() => scrollToSection("whats-new")} className="hover:text-green-400 transition">Changelog</button>
            <button onClick={() => scrollToSection("faq")} className="hover:text-green-400 transition">FAQ</button>
            <button onClick={() => scrollToSection("developer")} className="hover:text-green-400 transition">Developer</button>
          </nav>

          {/* Right Action buttons */}
          <div className="hidden md:flex items-center gap-3">
            {/* PWA Install Button */}
            {showInstallBtn && (
              <button
                onClick={handleInstallPWA}
                className="bg-green-950/40 hover:bg-green-900/60 text-green-400 border border-green-500/20 px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition"
              >
                <Smartphone className="w-4 h-4" /> Install App
              </button>
            )}

            <button
              onClick={handleDownloadApk}
              className="bg-green-500 hover:bg-green-400 text-black font-extrabold px-5 py-2.5 rounded-xl text-xs shadow-md shadow-green-500/10 hover:shadow-[0_0_15px_rgba(34,197,94,0.4)] active:scale-[0.98] transition flex items-center gap-1.5"
            >
              <Download className="w-4 h-4" /> Get APK
            </button>
          </div>

          {/* Hamburger button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-slate-400 hover:text-white transition p-1 rounded-lg"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-t border-white/5 bg-[#09090b]/95 backdrop-blur-lg px-4 py-6 flex flex-col gap-5 text-sm font-bold uppercase tracking-widest text-slate-400"
            >
              <button onClick={() => scrollToSection("features")} className="text-left py-1 hover:text-green-400">Features</button>
              <button onClick={() => scrollToSection("screenshots")} className="text-left py-1 hover:text-green-400">Gallery</button>
              <button onClick={() => scrollToSection("whats-new")} className="text-left py-1 hover:text-green-400">Changelog</button>
              <button onClick={() => scrollToSection("faq")} className="text-left py-1 hover:text-green-400">FAQ</button>
              <button onClick={() => scrollToSection("developer")} className="text-left py-1 hover:text-green-400">Developer</button>
              
              <div className="flex flex-col gap-2.5 border-t border-white/5 pt-5">
                {showInstallBtn && (
                  <button
                    onClick={handleInstallPWA}
                    className="w-full bg-[#18181b] text-green-400 py-3 rounded-xl border border-green-500/10 flex items-center justify-center gap-2 font-bold"
                  >
                    <Smartphone className="w-5 h-5" /> Install PWA
                  </button>
                )}
                <button
                  onClick={handleDownloadApk}
                  className="w-full bg-green-500 text-black py-3.5 rounded-xl flex items-center justify-center gap-2 font-black shadow-lg shadow-green-500/10"
                >
                  <Download className="w-5 h-5" /> Download APK ({apkConfig.fileSize})
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </header>

      {/* 2. BODY SECTIONS */}
      <main className="flex-1">
        
        {/* Hero Area */}
        <Hero 
          totalDownloads={totalDownloads}
          isLoadingDownloads={isLoadingDownloads}
          onDownloadClick={handleDownloadApk}
          onShareClick={handleShareWebsite}
          onCopyLinkClick={handleCopyApkLink}
        />

        {/* Feature Grid Section */}
        <Features />

        {/* Gallery Section */}
        <Screenshots />

        {/* Update Changelog Section */}
        <WhatsNew />

        {/* Accordion FAQ Section */}
        <FAQ />

        {/* Author / Contact Section */}
        <AboutDeveloper />

      </main>

      {/* 3. FOOTER COMPONENT */}
      <Footer />

      {/* 4. DOWNLOAD PROGRESS MODAL OVERLAY */}
      <AnimatePresence>
        {isDownloading && (
          <DownloadProgress 
            isOpen={isDownloading}
            onClose={() => setIsDownloading(false)}
            onComplete={handleDownloadComplete}
          />
        )}
      </AnimatePresence>

      {/* 5. FLOATING TOAST FEEDBACKS */}
      <Toast 
        message={toastMessage}
        isOpen={toastOpen}
        onClose={() => setToastOpen(false)}
      />

      {/* 6. SQUEEZED BACK TO TOP UTILITY */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 15 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 left-6 z-40 w-11 h-11 rounded-full bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-300 hover:text-white flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-all"
            title="Scroll to top"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  );
}
