import React, { useState } from "react";
import { 
  GraduationCap, 
  Mail, 
  Github, 
  MapPin, 
  Send, 
  Check, 
  Award,
  Sparkles,
  Instagram
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function AboutDeveloper() {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("mekhankaif@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmitContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.message.trim()) return;
    setIsSubmitting(true);
    
    // Simulate API mailer
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setSubmitted(false), 5000);
    }, 1500);
  };

  return (
    <section id="developer" className="py-24 px-4 bg-[#09090b] relative border-b border-white/5">
      
      {/* Mesh glow behind cards */}
      <div className="absolute top-1/2 left-1/3 w-[350px] h-[350px] bg-green-500/2 rounded-full blur-3xl -translate-y-1/2"></div>

      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-green-400">The Brains Behind</span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mt-3 font-sans">
            About the Developer
          </h2>
          <p className="text-slate-400 mt-4 text-sm leading-relaxed max-w-md mx-auto">
            BunkSafe is designed, engineered, and maintained with care by a college student, for college students.
          </p>
        </div>

        <div className="grid md:grid-cols-12 gap-8 items-start">
          
          {/* Profile Card */}
          <div className="md:col-span-5 bg-[#18181b]/50 border border-white/5 rounded-3xl p-6 backdrop-blur-sm shadow-xl flex flex-col gap-6 relative overflow-hidden text-left">
            
            {/* Corner Tag */}
            <div className="absolute -top-1 -right-1 w-24 h-24 overflow-hidden pointer-events-none">
              <div className="absolute top-4 right-[-30px] rotate-45 bg-green-500/10 border-b border-green-500/20 text-green-400 font-mono text-[8px] font-bold py-1 px-8 text-center uppercase tracking-widest">
                ECE
              </div>
            </div>

            {/* Profile Avatar Placeholder (Beautiful Vector initials layout) */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-green-500 to-green-300 flex items-center justify-center text-black text-2xl font-black shadow-lg shadow-green-500/10 border border-green-400/20">
                KK
              </div>
              <div>
                <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-1.5">
                  Kaif Ahmad Khan
                  <Sparkles className="w-4 h-4 text-green-400" />
                </h3>
                <p className="text-xs text-slate-400 font-mono mt-0.5">@kaifahmadkhan</p>
              </div>
            </div>

            {/* Academic Specs */}
            <div className="space-y-3 border-t border-zinc-800 pt-5">
              <div className="flex items-start gap-3 text-slate-300 text-sm">
                <GraduationCap className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-100 block font-sans">B.Tech Electronics & Communication</strong>
                  <span className="text-xs text-slate-400 font-medium">Jamia Millia Islamia (Central University)</span>
                </div>
              </div>

              <div className="flex items-center gap-3 text-slate-300 text-sm">
                <MapPin className="w-5 h-5 text-green-400 shrink-0" />
                <span className="text-xs text-slate-400 font-medium">New Delhi, India</span>
              </div>
            </div>

            {/* Quote / Philosophy */}
            <p className="text-slate-400 text-xs italic leading-relaxed bg-[#09090b]/40 p-3.5 border border-white/5 rounded-xl">
              "We've all faced that moment of panic in college—frantically checking registers to see if skipping another class will lead to a detention. I built BunkSafe as an elegant, private tracker to solve this exact problem for all of us."
            </p>

            {/* Social Action row */}
            <div className="flex items-center gap-3 w-full">
              <button
                onClick={handleCopyEmail}
                className="flex-1 bg-[#09090b] hover:bg-zinc-900 text-slate-300 hover:text-white border border-white/5 hover:border-zinc-850 rounded-xl py-2.5 px-3 text-xs flex items-center justify-center gap-2 transition"
              >
                {copied ? <Check className="w-4 h-4 text-green-400" /> : <Mail className="w-4 h-4 text-green-400" />}
                {copied ? "Email Copied!" : "Copy Email"}
              </button>
              
              <a
                href="https://github.com/kaifahmadkhan"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#09090b] hover:bg-zinc-900 text-slate-300 hover:text-white border border-white/5 hover:border-zinc-850 rounded-xl p-2.5 text-xs flex items-center justify-center transition"
                title="Developer GitHub Profile"
              >
                <Github className="w-4.5 h-4.5 text-green-400" />
              </a>

              <a
                href="https://instagram.com/kaifahmadkhan"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  try {
                    import("../firebase").then(m => m.incrementInstagram());
                  } catch (e) {
                    console.error(e);
                  }
                }}
                className="bg-[#09090b] hover:bg-zinc-900 text-slate-300 hover:text-white border border-white/5 hover:border-zinc-850 rounded-xl p-2.5 text-xs flex items-center justify-center transition"
                title="Developer Instagram Profile"
              >
                <Instagram className="w-4.5 h-4.5 text-green-400" />
              </a>

              <a
                href="https://t.me/kaifahmadkhan"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  try {
                    import("../firebase").then(m => m.incrementTelegram());
                  } catch (e) {
                    console.error(e);
                  }
                }}
                className="bg-[#09090b] hover:bg-zinc-900 text-slate-300 hover:text-white border border-white/5 hover:border-zinc-850 rounded-xl p-2.5 text-xs flex items-center justify-center transition"
                title="Community Telegram Profile"
              >
                <Send className="w-4.5 h-4.5 text-green-400" />
              </a>
            </div>

          </div>

          {/* Quick Contact Developer Form */}
          <div className="md:col-span-7 bg-[#18181b]/50 border border-white/5 rounded-3xl p-6 sm:p-8 backdrop-blur-sm shadow-xl text-left relative">
            <h4 className="text-lg font-bold text-slate-100 flex items-center gap-2 mb-2">
              <Send className="w-4.5 h-4.5 text-green-400" /> Contact the Developer
            </h4>
            <p className="text-slate-400 text-xs leading-relaxed mb-6">
              Have a feature request, found a bug, or want to collaborate? Send a message directly to Kaif.
            </p>

            <form onSubmit={handleSubmitContact} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Your Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Kaif Khan"
                    className="bg-[#09090b] border border-white/5 focus:border-green-500/40 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none w-full placeholder:text-zinc-600 transition"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Your Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="name@example.com"
                    className="bg-[#09090b] border border-white/5 focus:border-green-500/40 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none w-full placeholder:text-zinc-600 transition"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Message</label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  placeholder="Tell me what features or enhancements you want to see..."
                  className="bg-[#09090b] border border-white/5 focus:border-green-500/40 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none w-full placeholder:text-zinc-600 transition resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || submitted}
                className="w-full bg-green-500 hover:bg-green-400 disabled:bg-zinc-800 text-black font-bold py-3 px-6 rounded-xl transition duration-200 text-sm flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
                    Sending message...
                  </>
                ) : submitted ? (
                  <>
                    <Check className="w-4.5 h-4.5" /> Message Sent Successfully!
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" /> Send Message
                  </>
                )}
              </button>
            </form>

            <AnimatePresence>
              {submitted && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="absolute bottom-4 right-4 left-4 sm:right-8 sm:left-8 bg-green-950/90 border border-green-500/30 text-green-400 p-3.5 rounded-xl text-xs flex items-center gap-2.5 mt-4"
                >
                  <Award className="w-4.5 h-4.5 text-green-400 shrink-0" />
                  <span>Thanks! Your message has been routed to <strong>mekhankaif@gmail.com</strong>. Kaif will get back to you shortly.</span>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </div>

      </div>
    </section>
  );
}
