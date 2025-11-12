
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import {
  Phone,
  ArrowRight,
  Leaf,
  Heart,
  Users,
  Award,
  Clock,
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

/* =================== CIRCULAR PROGRESS RING (LEFT) =================== */
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

/* =================== MAIN ABOUT PAGE =================== */
export default function About() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -250]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.25]);

  const stats = [
    { icon: Heart, value: "20,000+", label: "Happy Patients" },
    { icon: Users, value: "22", label: "Years of Healing" },
    { icon: Award, value: "15", label: "Expert Doctors" },
    { icon: Clock, value: "99%", label: "Success Rate" },
  ];

  const timeline = [
    { year: "2003", title: "Founded in Rishikesh", desc: "Began as a small clinic by the Ganges" },
    { year: "2010", title: "Introduced Panchakarma", desc: "First center in North India" },
    { year: "2018", title: "Digital Wellness", desc: "Launched online consultations" },
    { year: "2025", title: "Global Reach", desc: "Healing patients in 40+ countries" },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-gradient-to-b from-emerald-50 via-white to-cyan-50 overflow-hidden"
    >
      {/* Floating Leaves Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {[...Array(12)].map((_, i) => (
          <FloatingLeaf key={i} delay={i * 1.3} />
        ))}
      </div>

      {/* Scroll Progress Ring (LEFT) */}
      <ScrollProgressRing />

      {/* Hero */}
      <motion.div
        style={{ y: y1 }}
        className="relative py-32 px-6 text-center"
      >
        {/* Blurred Orbs */}
        <motion.div
          style={{ y: y2, scale }}
          className="absolute top-16 -left-48 w-96 h-96 bg-emerald-200/40 rounded-full blur-3xl"
        />
        <motion.div
          style={{ y: y2, scale }}
          className="absolute bottom-16 -right-48 w-80 h-80 bg-cyan-200/40 rounded-full blur-3xl"
        />

        <div className="relative z-10 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="space-y-8"
          >
            {/* Leaf Icon */}
            <motion.div
              animate={{ rotate: [0, 6, -6, 0] }}
              transition={{ duration: 7, repeat: Infinity }}
              className="flex justify-center"
            >
              <div className="relative p-6 bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl">
                <Leaf className="w-24 h-24 text-emerald-600" />
                <motion.div
                  className="absolute inset-0 blur-2xl bg-emerald-400/50 rounded-3xl"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
            </motion.div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600">
              Healing Since 2003
            </h1>

            <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed font-light">
              Rooted in the sacred foothills of the Himalayas, <strong>Ananda Ayurveda</strong> blends 5000-year-old wisdom with modern care to restore your natural balance.
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Stats Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ staggerChildren: 0.12 }}
        className="py-24 px-6 bg-white/90 backdrop-blur-sm"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15, type: "spring", stiffness: 120 }}
                className="group"
              >
                <div className="relative p-6 bg-gradient-to-br from-emerald-50 to-cyan-50 rounded-3xl shadow-lg group-hover:shadow-2xl transition-all">
                  <stat.icon className="w-14 h-14 mx-auto mb-3 text-emerald-600 group-hover:scale-110 transition-transform" />
                  <div className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 mt-1 font-medium">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Timeline */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="py-28 px-6"
      >
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-20 bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-cyan-600">
            Our Journey Through Time
          </h2>

          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-emerald-300 to-cyan-300 rounded-full opacity-30" />

            <div className="space-y-16">
              {timeline.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -60 : 60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.2, duration: 0.8 }}
                  className={`flex items-center gap-8 ${i % 2 === 1 ? "flex-row-reverse" : ""}`}
                >
                  {/* Content */}
                  <div className="flex-1">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="bg-white p-8 rounded-3xl shadow-xl border border-emerald-100"
                    >
                      <div className="text-3xl font-bold text-emerald-600">{item.year}</div>
                      <h3 className="text-xl font-semibold mt-1 text-gray-800">{item.title}</h3>
                      <p className="text-gray-600 mt-2 text-sm leading-relaxed">{item.desc}</p>
                    </motion.div>
                  </div>

                  {/* Dot */}
                  <div className="relative z-10">
                    <motion.div
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ repeat: Infinity, duration: 2, delay: i * 0.3 }}
                      className="w-5 h-5 bg-emerald-500 rounded-full shadow-lg ring-8 ring-emerald-200"
                    />
                  </div>

                  <div className="flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Final CTA */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="py-32 px-6 text-center bg-gradient-to-t from-emerald-50/50 to-white"
      >
        <div className="max-w-4xl mx-auto space-y-8">
          <h2 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600">
            Begin Your Healing Journey
          </h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
            One consultation can transform your life. Let nature guide you back to balance.
          </p>

          <motion.a
            href="/contact"
            className="inline-flex items-center gap-4 px-14 py-6 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-xl font-bold rounded-full shadow-2xl hover:shadow-emerald-500/60 transition-all group"
            whileHover={{ scale: 1.08, y: -6 }}
            whileTap={{ scale: 0.95 }}
          >
            <Phone className="w-7 h-7 group-hover:animate-pulse" />
            Book Your Session
            <motion.div
              animate={{ x: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <ArrowRight className="w-6 h-6" />
            </motion.div>
          </motion.a>
        </div>
      </motion.div>

      {/* =================== FLOATING CTAs =================== */}

      {/* 1. Book Healing — CENTERED */}
     <StickyButton/>

      {/* 2. WhatsApp — RIGHT */}
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