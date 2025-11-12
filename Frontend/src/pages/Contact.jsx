'use client';

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import {
  Leaf,
  Droplets,
  Phone,
  MapPin,
  Send,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import StickyButton from "../components/StickyButton";

/* =================== FLOATING LEAF =================== */
const FloatingLeaf = ({ delay = 0 }) => (
  <motion.div
    className="absolute text-emerald-400/20 pointer-events-none"
    initial={{ y: -100, x: Math.random() * window.innerWidth, rotate: 0 }}
    animate={{
      y: window.innerHeight + 100,
      x: Math.random() * window.innerWidth,
      rotate: 360,
    }}
    transition={{
      duration: 18 + Math.random() * 8,
      repeat: Infinity,
      delay,
      ease: "linear",
    }}
  >
    <Leaf className="w-10 h-10" />
  </motion.div>
);

/* =================== SCROLL PROGRESS RING (Same as Treatments.jsx) =================== */
const ScrollProgressRing = () => {
  const { scrollYProgress } = useScroll();
  const [percentage, setPercentage] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setPercentage(Math.round(v * 100));
  });

  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = useTransform(scrollYProgress, [0, 1], [circumference, 0]);

  return (
    <motion.div
      className="fixed bottom-8 left-8 z-50"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.2, type: "spring", stiffness: 150 }}
    >
      <motion.div
        className="absolute inset-0 rounded-full bg-emerald-400 blur-2xl opacity-60"
        animate={{ scale: [1, 1.4, 1] }}
        transition={{ repeat: Infinity, duration: 2.5 }}
      />

      <div className="relative w-24 h-24">
        <svg className="absolute inset-0 w-full h-full -rotate-90">
          <circle cx="48" cy="48" r={radius} stroke="#e6f3f0" strokeWidth="7" fill="none" />
        </svg>

        <motion.svg className="absolute inset-0 w-full h-full -rotate-90">
          <motion.circle
            cx="48"
            cy="48"
            r={radius}
            stroke="url(#ringGradient)"
            strokeWidth="7"
            fill="none"
            strokeLinecap="round"
            style={{ strokeDasharray: circumference, strokeDashoffset }}
          />
          <defs>
            <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
          </defs>
        </motion.svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            key={percentage}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold text-emerald-700"
          >
            {percentage}
          </motion.span>
          <span className="text-xs text-emerald-600 -mt-1">%</span>
        </div>
      </div>
    </motion.div>
  );
};

/* =================== MAIN CONTACT PAGE =================== */
export default function Contact() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-gradient-to-b from-emerald-50 via-white to-cyan-50 overflow-hidden"
    >
      {/* Floating Leaves */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {[...Array(20)].map((_, i) => (
          <FloatingLeaf key={i} delay={i * 1.2} />
        ))}
      </div>

      <ScrollProgressRing />

      {/* Hero */}
      <motion.div style={{ y: y1 }} className="relative py-32 px-6 text-center">
        <motion.div
          style={{ y: y2 }}
          className="absolute top-20 -left-64 w-96 h-96 bg-emerald-200/40 rounded-full blur-3xl"
        />
        <motion.div
          style={{ y: y2 }}
          className="absolute bottom-20 -right-64 w-80 h-80 bg-cyan-200/40 rounded-full blur-3xl"
        />

        <div className="relative z-10 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="space-y-10"
          >
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 8, repeat: Infinity }}
              className="flex justify-center"
            >
              <div className="relative p-8 bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl">
                <Droplets className="w-28 h-28 text-emerald-600" />
                <motion.div
                  className="absolute inset-0 blur-3xl bg-emerald-400/50 rounded-3xl"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                />
              </div>
            </motion.div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600">
              Let’s Begin Your Healing
            </h1>

            <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed font-light">
              Share your story. Our doctors in Rishikesh will craft your personalized Ayurvedic journey.
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Contact Form + Info */}
      <div className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-br from-emerald-400/20 to-cyan-400/20 rounded-3xl blur-3xl opacity-70" />
            
            <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-emerald-100 p-10">
              <h2 className="text-4xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-cyan-600">
                Send Us a Message
              </h2>

              <form className="space-y-6">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-6 py-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl focus:ring-4 focus:ring-emerald-400 focus:border-emerald-500 outline-none transition-all text-gray-800 placeholder-gray-500"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-6 py-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl focus:ring-4 focus:ring-emerald-400 focus:border-emerald-500 outline-none transition-all text-gray-800 placeholder-gray-500"
                />
                <input
                  type="tel"
                  placeholder="Your Phone (with country code)"
                  className="w-full px-6 py-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl focus:ring-4 focus:ring-emerald-400 focus:border-emerald-500 outline-none transition-all text-gray-800 placeholder-gray-500"
                />
                <textarea
                  rows="5"
                  placeholder="Tell us about your health concerns..."
                  className="w-full px-6 py-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl focus:ring-4 focus:ring-emerald-400 focus:border-emerald-500 outline-none transition-all text-gray-800 placeholder-gray-500 resize-none"
                />

                <motion.button
                  type="submit"
                  className="w-full py-5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold text-xl rounded-2xl shadow-xl hover:shadow-emerald-500/70 transition-all flex items-center justify-center gap-3 group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Send Message
                  <motion.div
                    animate={{ x: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    <Send className="w-6 h-6" />
                  </motion.div>
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Contact Info & Map */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-10"
          >
            <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-emerald-100 p-10">
              <h3 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-cyan-600">
                Visit Us in Rishikesh
              </h3>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="p-4 bg-emerald-100 rounded-2xl">
                    <MapPin className="w-8 h-8 text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Ananda Ayurveda Retreat</p>
                    <p className="text-gray-600">Tapovan, Near Laxman Jhula, Rishikesh, Uttarakhand 249192</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-4 bg-cyan-100 rounded-2xl">
                    <Phone className="w-8 h-8 text-cyan-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Call Us</p>
                    <p className="text-gray-600">+91 98765 43210</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-4 bg-teal-100 rounded-2xl">
                    <FaWhatsapp className="w-8 h-8 text-teal-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">WhatsApp</p>
                    <p className="text-gray-600">+91 98765 43210 (24/7)</p>
                  </div>
                </div>
              </div>

              {/* Mini Map */}
              <div className="mt-8 rounded-2xl overflow-hidden shadow-xl">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3452.432109876543!2d78.32165431545678!3d30.129945981789012!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3908d3d7b8f8c7a1%3A0x4b8f8c7a1b8f8c7a!2sRishikesh%2C%20Uttarakhand!5e0!3m2!1sen!2sin!4v1698765432100"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Final CTA */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="py-32 px-6 text-center bg-gradient-to-t from-emerald-50/80 to-white"
      >
        <div className="max-w-4xl mx-auto space-y-10">
          <h2 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600">
            Healing Begins with One Message
          </h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
            98% of our patients feel relief within 7 days. Your transformation starts now.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <motion.a
              href="tel:+919876543210"
              className="inline-flex items-center gap-4 px-16 py-6 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-xl font-bold rounded-full shadow-2xl hover:shadow-emerald-500/60 transition-all group"
              whileHover={{ scale: 1.08, y: -6 }}
              whileTap={{ scale: 0.95 }}
            >
              <Phone className="w-7 h-7 group-hover:animate-pulse" />
              Call Now
              <Sparkles className="w-6 h-6" />
            </motion.a>

            <motion.a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-10 py-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xl font-bold rounded-full shadow-2xl hover:shadow-green-500/60 transition-all group"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaWhatsapp className="w-7 h-7 group-hover:animate-pulse" />
              Start Chat on WhatsApp
            </motion.a>
          </div>
        </div>
      </motion.div>

      {/* Floating CTAs */}
     <StickyButton />

       <motion.a
                  href="https://wa.me/1234567890" // Replace with your WhatsApp number
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Chat on WhatsApp"
                  className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 flex flex-col items-center gap-2"
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  {/* 👇 Animated label (mobile only) */}
                  <motion.span
                    className="text-xs font-medium text-white bg-green-600 px-2 py-1 rounded-md shadow-md sm:hidden"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{
                      opacity: 1,
                      y: [0, -4, 0],
                    }}
                    transition={{
                      delay: 1,
                      duration: 1.5,
                      repeat: Infinity,
                      repeatType: "loop",
                      ease: "easeInOut",
                    }}
                  >
                    Any Queries
                  </motion.span>
            
                  {/* 🔵 Circular WhatsApp Button */}
                  <motion.div
                    className="relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full shadow-xl border border-white/20 backdrop-blur-md transition-all active:scale-95 group"
                    whileHover={{ scale: 1.08 }}
                  >
                    {/* Glowing animated ring */}
                    <motion.div
                      className="absolute inset-0 rounded-full bg-green-400/30 blur-md opacity-0 group-hover:opacity-100 transition-opacity"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    />
                    <FaWhatsapp className="w-7 h-7 sm:w-8 sm:h-8 relative z-10 group-hover:animate-pulse" />
                  </motion.div>
                </motion.a>
    </section>
  );
}