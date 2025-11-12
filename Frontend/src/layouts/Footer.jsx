'use client';

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Leaf,
  Heart,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Linkedin,
  MessageCircle,
  Star,
  Send,
  CheckCircle,
} from "lucide-react";

// ──────────────────────────────────────────────────────────────
// FloatingLeaf – SSR Safe & Responsive
// ──────────────────────────────────────────────────────────────
const FloatingLeaf = ({ delay = 0 }) => {
  const [mounted, setMounted] = useState(false);
  const [size, setSize] = useState({ width: 800, height: 600 });

  useEffect(() => {
    setMounted(true);
    const updateSize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  if (!mounted) return null;

  // Adjust leaf size based on screen
  const leafSize = size.width < 640 ? "w-5 h-5" : "w-8 h-8";

  return (
    <motion.div
      className="absolute text-emerald-500/10 pointer-events-none z-0"
      initial={{ y: -100, x: Math.random() * size.width, rotate: 0 }}
      animate={{
        y: size.height + 100,
        x: (Math.random() - 0.5) * size.width * 0.8 + size.width * 0.1,
        rotate: 360,
      }}
      transition={{
        duration: 12 + Math.random() * 8,
        repeat: Infinity,
        delay,
        ease: "linear",
      }}
    >
      <Leaf className={leafSize} />
    </motion.div>
  );
};

// ──────────────────────────────────────────────────────────────
// Footer – Fully Responsive
// ──────────────────────────────────────────────────────────────
export default function Footer() {
  const [year] = useState(new Date().getFullYear());
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.includes("@") && email.includes(".")) {
      setStatus("success");
      setTimeout(() => {
        setEmail("");
        setStatus("idle");
      }, 3000);
    } else {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  const socialLinks = [
    { Icon: Facebook, href: "#", label: "Facebook" },
    { Icon: Instagram, href: "#", label: "Instagram" },
    { Icon: Twitter, href: "#", label: "Twitter" },
    { Icon: Youtube, href: "#", label: "YouTube" },
    { Icon: Linkedin, href: "#", label: "LinkedIn" },
  ];

  const quickLinks = ["Home", "About Us", "Treatments", "Doctors", "Blog", "Contact"];
  const treatments = [
    "Panchakarma",
    "Abhyanga",
    "Shirodhara",
    "Nasya",
    "Kati Basti",
    "Herbal Steam",
  ];

  const contactInfo = [
    { Icon: MapPin, text: "abc,def,Slovakia" },
    { Icon: Phone, text: "+91 1234567890" },
    { Icon: Mail, text: "demo@ayurveda.com" },
  ];

  return (
    <footer className="relative mt-20 overflow-hidden bg-gradient-to-t from-emerald-50 via-cyan-50 to-white">
      {/* Floating Leaves – Only on md+ screens */}
      <div className="fixed inset-0 pointer-events-none z-0 hidden md:block">
        {Array.from({ length: 10 }, (_, i) => (
          <FloatingLeaf key={i} delay={i * 1.5} />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-center sm:text-left">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-5"
          >
            <motion.div
              className="flex justify-center sm:justify-start items-center gap-3"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                animate={{ rotateY: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-xl"
              >
                <Leaf className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
              </motion.div>
              <h2 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-600">
                Aura Ayurvedic
              </h2>
            </motion.div>

            <p className="text-sm sm:text-base text-gray-600 max-w-xs mx-auto sm:mx-0 leading-relaxed">
              Reconnecting your mind, body, and spirit through the ancient wisdom of Ayurveda.
            </p>

            {/* Reviews */}
            <motion.div
              className="flex justify-center sm:justify-start items-center gap-2 bg-white p-2 sm:p-3 rounded-xl shadow-md mx-auto sm:mx-0 w-fit"
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-xs sm:text-sm font-bold text-emerald-700">4.9 (1,240+)</span>
            </motion.div>

            {/* Social Links */}
            <div className="flex justify-center sm:justify-start gap-2 sm:gap-3">
              {socialLinks.map(({ Icon, href, label }, i) => (
                <motion.a
                  key={i}
                  href={href}
                  aria-label={label}
                  className="p-2 sm:p-2.5 rounded-xl bg-white/70 backdrop-blur-sm shadow-md hover:shadow-xl transition-all group"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 group-hover:text-emerald-500" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-3"
          >
            <h3 className="text-base sm:text-lg font-bold text-emerald-700">Quick Links</h3>
            <ul className="space-y-1.5 text-xs sm:text-sm text-gray-600">
              {quickLinks.map((link, i) => (
                <motion.li
                  key={i}
                  whileHover={{ x: 6, color: "#059669" }}
                  className="hover:text-emerald-600 transition-all cursor-pointer"
                >
                  {link}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Treatments */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-3"
          >
            <h3 className="text-base sm:text-lg font-bold text-emerald-700">Popular Therapies</h3>
            <ul className="space-y-1.5 text-xs sm:text-sm text-gray-600">
              {treatments.map((treatment, i) => (
                <motion.li
                  key={i}
                  whileHover={{ x: 6, color: "#059669" }}
                  className="hover:text-emerald-600 transition-all cursor-pointer"
                >
                  {treatment}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter & Contact */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-base sm:text-lg font-bold text-emerald-700 mb-2">Stay Connected</h3>
              <p className="text-xs sm:text-sm text-gray-600 mb-3">
                Get wellness tips, offers, and healing insights in your inbox.
              </p>

              <form onSubmit={handleSubscribe} className="space-y-3">
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="flex-1 px-3 py-2.5 sm:px-4 sm:py-3 rounded-xl bg-white/70 backdrop-blur-sm border border-emerald-200 focus:border-emerald-500 focus:outline-none transition-all text-sm"
                    required
                  />
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2.5 sm:px-5 sm:py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-medium rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-1.5 text-sm"
                  >
                    <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span className="hidden xxs:inline">Subscribe</span>
                  </motion.button>
                </div>

                <AnimatePresence>
                  {status === "success" && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-xs text-emerald-600 flex items-center gap-1 justify-center sm:justify-start"
                    >
                      <CheckCircle className="w-3 h-3" /> Thank you!
                    </motion.p>
                  )}
                  {status === "error" && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-xs text-red-600 text-center sm:text-left"
                    >
                      Please enter a valid email.
                    </motion.p>
                  )}
                </AnimatePresence>
              </form>
            </div>

            <div className="space-y-2 text-xs sm:text-sm text-gray-600">
              {contactInfo.map(({ Icon, text }, i) => (
                <p key={i} className="flex items-center justify-center sm:justify-start gap-2">
                  <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 flex-shrink-0" />
                  <span className="truncate">{text}</span>
                </p>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 pt-6 border-t border-emerald-200 text-center text-xs text-gray-500"
        >
          <p className="flex items-center justify-center gap-1 flex-wrap">
            ©
            <motion.span
              key={year}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-medium text-emerald-600 mx-1"
            >
              {year}
            </motion.span>
             Aura Ayurvedic. All rights reserved.
            <Heart className="w-3 h-3 text-emerald-500 inline-block ml-1 animate-pulse" />
          </p>
          <p className="mt-1">Crafted with nature & love</p>
        </motion.div>
      </div>

      {/* Glowing Orb – Hidden on mobile */}
      <motion.div
        className="hidden md:block absolute bottom-0 left-1/2 -translate-x-1/2 w-80 h-80 sm:w-96 sm:h-96 bg-gradient-to-t from-emerald-400/30 to-transparent rounded-full blur-3xl pointer-events-none"
        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

    </footer>
  );
}