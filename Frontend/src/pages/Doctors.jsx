
import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { Leaf, Droplets, Phone, ArrowRight, MessageCircle } from "lucide-react";
import DoctorCard from "../components/DoctorCard";
import StickyButton from "../components/StickyButton";

/* =================== FLOATING LEAF (Same as Treatments.jsx) =================== */
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

/* =================== EXACT SAME SCROLL RING FROM TREATMENTS.JSX =================== */
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
      {/* Glow */}
      <motion.div
        className="absolute inset-0 rounded-full bg-emerald-400 blur-2xl opacity-60"
        animate={{ scale: [1, 1.4, 1] }}
        transition={{ repeat: Infinity, duration: 2.5 }}
      />

      {/* Ring */}
      <div className="relative w-24 h-24">
        <svg className="absolute inset-0 w-full h-full -rotate-90">
          <circle
            cx="48"
            cy="48"
            r={radius}
            stroke="#e6f3f0"
            strokeWidth="7"
            fill="none"
          />
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

        {/* Center Text */}
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

/* =================== MAIN DOCTORS PAGE =================== */
export default function Doctors() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -250]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -120]);

  const doctors = [
    {
      image: "/doctors/vishnu.jpg",
      name: "Dr. Vishnu Sharma",
      specialization: "Panchakarma & Rasayana",
      experience: "22+",
      patients: "20,000+",
      rating: 5.0,
      highlight: true,
    },
    {
      image: "/doctors/priya.jpg",
      name: "Dr. Priya Menon",
      specialization: "Women’s Health & Fertility",
      experience: "18+",
      patients: "12,000+",
      rating: 4.9,
    },
    {
      image: "/doctors/arjun.jpg",
      name: "Dr. Arjun Rao",
      specialization: "Joint & Spine Care",
      experience: "15+",
      patients: "9,000+",
      rating: 4.8,
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-gradient-to-b from-emerald-50 via-white to-cyan-50 overflow-hidden"
    >
      {/* Floating Leaves Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {[...Array(18)].map((_, i) => (
          <FloatingLeaf key={i} delay={i * 1.3} />
        ))}
      </div>

      {/* Same Scroll Ring as Treatments.jsx */}
      <ScrollProgressRing />
      <StickyButton />

      {/* Hero */}
      <motion.div style={{ y: y1 }} className="relative py-32 px-6 text-center">
        <motion.div
          style={{ y: y2 }}
          className="absolute top-16 -left-48 w-96 h-96 bg-emerald-200/40 rounded-full blur-3xl"
        />
        <motion.div
          style={{ y: y2 }}
          className="absolute bottom-16 -right-48 w-80 h-80 bg-cyan-200/40 rounded-full blur-3xl"
        />

        <div className="relative z-10 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="space-y-8"
          >
            <motion.div
              animate={{ rotate: [0, 6, -6, 0] }}
              transition={{ duration: 7, repeat: Infinity }}
              className="flex justify-center"
            >
              <div className="relative p-6 bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl">
                <Droplets className="w-24 h-24 text-emerald-600" />
                <motion.div
                  className="absolute inset-0 blur-2xl bg-emerald-400/50 rounded-3xl"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
            </motion.div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600">
              Our Master Healers
            </h1>

            <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed font-light">
              Third-generation Ayurvedic doctors from Rishikesh, blending 5000-year-old wisdom with modern care.
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Doctors Grid */}
      <div className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-5xl md:text-7xl font-bold text-center mb-20 bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-cyan-600"
          >
            Meet Your Guides to Wellness
          </motion.h2>

          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
            {doctors.map((doc, i) => (
              <DoctorCard key={i} {...doc} />
            ))}
          </div>
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
            Begin Your Healing Journey
          </h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
            One consultation can transform your life. Let nature guide you back to balance.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <motion.a
              href="/contact"
              className="inline-flex items-center gap-4 px-16 py-6 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-xl font-bold rounded-full shadow-2xl hover:shadow-emerald-500/60 transition-all group"
              whileHover={{ scale: 1.08, y: -6 }}
              whileTap={{ scale: 0.95 }}
            >
              <Phone className="w-7 h-7 group-hover:animate-pulse" />
              Book Consultation
              <motion.div animate={{ x: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                <ArrowRight className="w-6 h-6" />
              </motion.div>
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
              Chat on WhatsApp
            </motion.a>
          </div>
        </div>
      </motion.div>

      {/* Floating CTAs */}
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