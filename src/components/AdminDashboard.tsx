import React, { useState, useEffect } from "react";
import { 
  Lock, 
  Unlock, 
  TrendingUp, 
  Users, 
  Download, 
  Globe, 
  Instagram, 
  Send, 
  Link2, 
  LogOut, 
  Activity, 
  Clock,
  ArrowLeft
} from "lucide-react";
import { motion } from "motion/react";
import { listenToStats, listenToLiveUsers } from "../firebase";

interface AdminDashboardProps {
  onBackToHome: () => void;
}

export default function AdminDashboard({ onBackToHome }: AdminDashboardProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [adminPin, setAdminPin] = useState<string>("");
  const [pinError, setPinError] = useState<string>("");

  // Statistics State
  const [stats, setStats] = useState<any>({
    totalVisits: 0,
    uniqueVisitors: 0,
    apkDownloads: 0,
    webAppClicks: 0,
    instagramClicks: 0,
    telegramClicks: 0,
    copyLinkClicks: 0,
    lastVisit: null
  });

  const [liveUsers, setLiveUsers] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Authenticate Admin Pin
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPin === "8888" || adminPin === "bunksafe2026") {
      setIsAuthenticated(true);
      setPinError("");
      localStorage.setItem("bunksafe_admin_auth", "true");
    } else {
      setPinError("Invalid Admin Credentials. Please try again.");
    }
  };

  // Check existing session
  useEffect(() => {
    if (localStorage.getItem("bunksafe_admin_auth") === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  // Connect to realtime Firestore streams on authentication
  useEffect(() => {
    if (!isAuthenticated) return;

    setIsLoading(true);
    
    // Listen to statistics document
    const unsubscribeStats = listenToStats((data) => {
      if (data) {
        setStats(data);
      }
      setIsLoading(false);
    });

    // Listen to live presence
    const unsubscribeLive = listenToLiveUsers((count) => {
      setLiveUsers(count);
    });

    return () => {
      unsubscribeStats();
      unsubscribeLive();
    };
  }, [isAuthenticated]);

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("bunksafe_admin_auth");
    setAdminPin("");
  };

  // Render Login Gate
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#09090b] text-slate-200 flex flex-col justify-center items-center px-4">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#14532d,transparent_60%)] opacity-20 pointer-events-none"></div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-[#18181b]/80 border border-white/5 rounded-3xl p-8 backdrop-blur-md shadow-2xl relative z-10"
        >
          <div className="flex flex-col items-center mb-6">
            <div className="w-12 h-12 rounded-2xl bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400 mb-4 shadow-inner">
              <Lock className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight">Admin Gateway</h2>
            <p className="text-slate-400 text-xs text-center mt-2 leading-relaxed">
              Access the secure BunkSafe Analytics Dashboard. Enter your authorization PIN or Key.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="flex flex-col gap-1.5 text-left">
              <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Passcode or PIN</label>
              <input
                type="password"
                required
                value={adminPin}
                onChange={(e) => setAdminPin(e.target.value)}
                placeholder="••••"
                className="bg-[#09090b] border border-white/5 focus:border-green-500/40 rounded-xl px-4 py-3 text-center text-white text-lg tracking-widest font-mono focus:outline-none w-full placeholder:text-zinc-750 transition"
              />
            </div>

            {pinError && (
              <p className="text-red-400 text-xs text-center font-medium font-sans">
                {pinError}
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-400 text-black font-extrabold py-3 rounded-xl transition duration-200 text-xs uppercase tracking-wider flex items-center justify-center gap-1.5"
            >
              <Unlock className="w-4 h-4" /> Authenticate
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-white/5 flex justify-center">
            <button 
              onClick={onBackToHome}
              className="text-xs text-slate-400 hover:text-green-400 flex items-center gap-1.5 transition font-semibold"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Return to Website
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // Render Dashboard
  return (
    <div className="min-h-screen bg-[#09090b] text-slate-200 font-sans selection:bg-green-500/30 selection:text-green-300">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#14532d,transparent_50%)] opacity-20 pointer-events-none"></div>

      {/* Header Panel */}
      <header className="border-b border-white/5 bg-[#141416]/40 backdrop-blur-md sticky top-0 z-40 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-green-500 flex items-center justify-center text-black font-black text-sm">
              B
            </div>
            <div>
              <h1 className="font-extrabold text-white tracking-tight leading-none text-base">BunkSafe Admin</h1>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-1">Real-time Telemetry</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onBackToHome}
              className="px-4 py-2 border border-white/5 hover:border-zinc-800 rounded-xl text-xs font-bold text-slate-300 hover:text-white transition flex items-center gap-1.5 bg-zinc-900/40"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Return Site
            </button>
            <button
              onClick={handleLogout}
              className="p-2 border border-white/5 hover:border-red-950/40 bg-zinc-900/40 hover:bg-red-950/20 text-slate-400 hover:text-red-400 rounded-xl transition"
              title="Logout session"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Stats Body */}
      <main className="max-w-7xl mx-auto px-6 py-10 relative z-10">
        
        {/* Real-time Status Card banner */}
        <div className="bg-[#141416]/50 border border-white/5 rounded-3xl p-6 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6 backdrop-blur-sm">
          <div className="flex items-center gap-4 text-left">
            <div className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Live Monitoring Active</h2>
              <p className="text-xs text-slate-400 mt-0.5">Streaming direct from database clusters with sub-second synchronization.</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-[#09090b] px-4.5 py-2.5 rounded-2xl border border-white/2">
            <Activity className="w-4.5 h-4.5 text-green-400 animate-pulse" />
            <div className="text-left">
              <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block">Live Users</span>
              <strong className="text-white text-lg font-mono font-black">{liveUsers} Online</strong>
            </div>
          </div>
        </div>

        {/* Loading placeholder */}
        {isLoading ? (
          <div className="py-24 flex flex-col items-center justify-center gap-3">
            <span className="w-8 h-8 border-3 border-green-500 border-t-transparent rounded-full animate-spin"></span>
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-widest">Establishing secure streams...</p>
          </div>
        ) : (
          <div className="space-y-10">
            {/* Primary Engagement Grid */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-green-400 mb-4 text-left flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-green-400" /> Core Engagement Metrics
              </h3>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                
                {/* Total Visits Card */}
                <div className="bg-[#18181b]/40 border border-white/5 rounded-2xl p-5 text-left relative overflow-hidden group hover:border-green-500/20 transition duration-300">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/2 rounded-full blur-xl pointer-events-none group-hover:scale-150 transition duration-500"></div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-xs text-slate-400 font-semibold">Total Website Visits</span>
                    <Globe className="w-4.5 h-4.5 text-green-400" />
                  </div>
                  <div className="text-2xl font-mono font-black text-white">
                    {(stats.totalVisits || 0).toLocaleString()}
                  </div>
                  <p className="text-[10px] text-slate-500 mt-2 leading-none">Increments every session start</p>
                </div>

                {/* Unique Visitors */}
                <div className="bg-[#18181b]/40 border border-white/5 rounded-2xl p-5 text-left relative overflow-hidden group hover:border-green-500/20 transition duration-300">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/2 rounded-full blur-xl pointer-events-none group-hover:scale-150 transition duration-500"></div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-xs text-slate-400 font-semibold">Unique Visitors</span>
                    <Users className="w-4.5 h-4.5 text-green-400" />
                  </div>
                  <div className="text-2xl font-mono font-black text-white">
                    {(stats.uniqueVisitors || 0).toLocaleString()}
                  </div>
                  <p className="text-[10px] text-slate-500 mt-2 leading-none">Tracked via browser fingerprint</p>
                </div>

                {/* Total APK Downloads */}
                <div className="bg-[#18181b]/40 border border-white/5 rounded-2xl p-5 text-left relative overflow-hidden group hover:border-green-500/20 transition duration-300">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/2 rounded-full blur-xl pointer-events-none group-hover:scale-150 transition duration-500"></div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-xs text-slate-400 font-semibold">Total APK Downloads</span>
                    <Download className="w-4.5 h-4.5 text-green-400" />
                  </div>
                  <div className="text-2xl font-mono font-black text-white">
                    {(stats.apkDownloads || 0).toLocaleString()}
                  </div>
                  <p className="text-[10px] text-slate-500 mt-2 leading-none">Direct file pulls compiled</p>
                </div>

                {/* Total Web App Clicks */}
                <div className="bg-[#18181b]/40 border border-white/5 rounded-2xl p-5 text-left relative overflow-hidden group hover:border-green-500/20 transition duration-300">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/2 rounded-full blur-xl pointer-events-none group-hover:scale-150 transition duration-500"></div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-xs text-slate-400 font-semibold">Total Web App Clicks</span>
                    <Globe className="w-4.5 h-4.5 text-green-400" />
                  </div>
                  <div className="text-2xl font-mono font-black text-white">
                    {(stats.webAppClicks || 0).toLocaleString()}
                  </div>
                  <p className="text-[10px] text-slate-500 mt-2 leading-none">Simulations run directly</p>
                </div>

              </div>
            </div>

            {/* Link & Socials Tracking */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-green-400 mb-4 text-left flex items-center gap-2">
                <Link2 className="w-4 h-4 text-green-400" /> Social Links & Share Telemetry
              </h3>

              <div className="grid sm:grid-cols-3 gap-6">
                
                {/* Instagram Clicks */}
                <div className="bg-[#18181b]/40 border border-white/5 rounded-2xl p-5 text-left relative overflow-hidden group hover:border-green-500/20 transition duration-300">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-xs text-slate-400 font-semibold">Instagram Clicks</span>
                    <Instagram className="w-4.5 h-4.5 text-green-400" />
                  </div>
                  <div className="text-2xl font-mono font-black text-white">
                    {(stats.instagramClicks || 0).toLocaleString()}
                  </div>
                  <p className="text-[10px] text-slate-500 mt-2 leading-none">Developer Instagram page views</p>
                </div>

                {/* Telegram Clicks */}
                <div className="bg-[#18181b]/40 border border-white/5 rounded-2xl p-5 text-left relative overflow-hidden group hover:border-green-500/20 transition duration-300">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-xs text-slate-400 font-semibold">Telegram Clicks</span>
                    <Send className="w-4.5 h-4.5 text-green-400" />
                  </div>
                  <div className="text-2xl font-mono font-black text-white">
                    {(stats.telegramClicks || 0).toLocaleString()}
                  </div>
                  <p className="text-[10px] text-slate-500 mt-2 leading-none">Community Telegram clicks</p>
                </div>

                {/* Copy Link Clicks */}
                <div className="bg-[#18181b]/40 border border-white/5 rounded-2xl p-5 text-left relative overflow-hidden group hover:border-green-500/20 transition duration-300">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-xs text-slate-400 font-semibold">Copy Link Clicks</span>
                    <Link2 className="w-4.5 h-4.5 text-green-400" />
                  </div>
                  <div className="text-2xl font-mono font-black text-white">
                    {(stats.copyLinkClicks || 0).toLocaleString()}
                  </div>
                  <p className="text-[10px] text-slate-500 mt-2 leading-none">Direct link shares tracked</p>
                </div>

              </div>
            </div>

            {/* Metadata and Diagnostics Info */}
            <div className="bg-[#18181b]/20 border border-white/5 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-[10px] text-slate-400">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-slate-500" />
                <span>Last Visitor Ping:</span>
                <strong className="text-slate-200">
                  {stats.lastVisit ? (stats.lastVisit.toDate ? stats.lastVisit.toDate().toLocaleString() : new Date(stats.lastVisit).toLocaleString()) : "No data logged"}
                </strong>
              </div>
              <div className="text-left sm:text-right">
                Database Target: <strong className="text-green-400">downloader-5bf47</strong>
              </div>
            </div>

          </div>
        )}

      </main>
    </div>
  );
}
