

import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useMotionValueEvent,
} from "framer-motion";
import { useEffect, useState, useRef } from "react";
import {
  Leaf, Heart, Sparkles, ArrowRight, Phone, Shield, Users, Award, Clock,
  Star, MapPin, Calendar, ChevronRight, Flower2, Wind,
} from "lucide-react";
import {FaWhatsapp} from "react-icons/fa";

import clinic from "../assets/images/clinic.png";
import imgg1 from "../assets/images/imgg1.png";
import imgg2 from "../assets/images/imgg2.png";
import imgg3 from "../assets/images/imgg3.png";
import StickyButton from "../components/StickyButton";

/* ------------------- DATA ------------------- */
const testimonials = [
  { text: "After 10 years of back pain, I can finally sleep. Thank you!", author: "Priya Sharma", role: "Patient", rating: 5, image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop" },
  { text: "Lost 15kg naturally with their diet plan. No gym!", author: "Rajesh Kumar", role: "Patient", rating: 5, image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop" },
  { text: "My migraines are gone after 8 sessions. Unbelievable!", author: "Anita Desai", role: "Patient", rating: 5, image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?w=80&h=80&fit=crop" },
  { text: "Skin glows like never before. All natural!", author: "Vikram Singh", role: "Patient", rating: 5, image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop" },
  { text: "Post-pregnancy recovery was smooth and fast.", author: "Neha Patel", role: "Patient", rating: 5, image: "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?w=80&h=80&fit=crop" },
  { text: "Finally sleeping 8 hours! No more insomnia.", author: "Amit Roy", role: "Patient", rating: 5, image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop" },
];

const services = [
  { title: "Panchakarma Detox", desc: "Full-body purification with medicated oils", icon: Wind, duration: "5-21 days", glow: "from-emerald-400 to-teal-600" },
  { title: "Abhyanga Massage", desc: "Warm herbal oil full-body therapy", icon: Heart, duration: "60 mins", glow: "from-amber-400 to-orange-600" },
  { title: "Shirodhara", desc: "Calming oil pour on forehead", icon: Sparkles, duration: "45 mins", glow: "from-indigo-400 to-purple-600" },
  { title: "Nasya Therapy", desc: "Nasal cleansing for clarity", icon: Leaf, duration: "30 mins", glow: "from-lime-400 to-green-600" },
  { title: "Kati Basti", desc: "Lower back pain relief pool", icon: Shield, duration: "45 mins", glow: "from-rose-400 to-pink-600" },
  { title: "Herbal Steam", desc: "Detox through medicated steam", icon: Flower2, duration: "20 mins", glow: "from-cyan-400 to-blue-600" },
];

const doctors = [
  { name: "Dr. Anjali Verma", spec: "Panchakarma Specialist", exp: "18 years", image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop" },
  { name: "Dr. Rohan Mehta", spec: "Herbal Medicine Expert", exp: "15 years", image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop" },
  { name: "Dr. Kavya Nair", spec: "Women’s Wellness", exp: "12 years", image: "https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?w=400&h=400&fit=crop" },
];

const stats = [
  { value: "2000+", label: "Happy Patients" },
  { value: "22", label: "Years of Healing" },
  { value: "15", label: "Expert Doctors" },
  { value: "99%", label: "Success Rate" },
  { value: "8", label: "Clinic Branches" },
  { value: "4.9", label: "Google Rating" },
];

const dailyTips = [
  { icon: Leaf, title: "Morning Ritual", tip: "Drink warm water with lemon to kickstart digestion." },
  { icon: Heart, title: "Oil Pulling", tip: "Swish coconut oil for 10 mins to detox mouth & gums." },
  { icon: Sparkles, title: "Tongue Scraping", tip: "Removes toxins & improves taste sensitivity." },
  { icon: Wind, title: "Pranayama", tip: "5 mins of deep breathing balances mind & energy." },
];

const locations = [
  { city: "Mumbai", address: "Andheri West", phone: "+91 1234567890", map: "https://maps.google.com/?q=Andheri+West+Mumbai" },
  { city: "Delhi", address: "South Extension", phone: "+91 1234567890", map: "https://maps.google.com/?q=South+Extension+Delhi" },
  { city: "Bangalore", address: "Koramangala", phone: "+91 1234567890", map: "https://maps.google.com/?q=Koramangala+Bangalore" },
];

const blogPosts = [
  { title: "How Panchakarma Transforms Your Body in 21 Days", excerpt: "A complete guide to detoxification using ancient Ayurvedic science.", date: "Oct 28, 2025", readTime: "6 min", img: imgg1 },
  { title: "Top 7 Herbs for Immunity This Winter", excerpt: "Boost your natural defense with Tulsi, Ashwagandha, and more.", date: "Oct 25, 2025", readTime: "4 min", img: imgg2 },
  { title: "Why Abhyanga Should Be Your Self-Care Ritual", excerpt: "The science behind warm oil massage for stress relief.", date: "Oct 20, 2025", readTime: "5 min", img: imgg3 },
];

/* ------------------- FLOATING LEAF ------------------- */
const FloatingLeaf = ({ delay = 0 }) => (
  <motion.div
    className="absolute text-emerald-500/20 pointer-events-none"
    initial={{ y: -100, x: Math.random() * window.innerWidth, rotate: 0 }}
    animate={{ y: window.innerHeight + 100, x: Math.random() * window.innerWidth, rotate: 360 }}
    transition={{ duration: 15 + Math.random() * 10, repeat: Infinity, delay, ease: "linear" }}
  >
    <Leaf className="w-8 h-8" />
  </motion.div>
);

/* ------------------- CIRCULAR PROGRESS RING ------------------- */
const ScrollRing = () => {
  const { scrollYProgress } = useScroll();
  const [percent, setPercent] = useState(0);

  // Convert motion value → real number
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setPercent(Math.round(v * 100));
  });

  // SVG circle geometry
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = useTransform(scrollYProgress, [0, 1], [circumference, 0]);

  return (
<motion.div
  className="hidden md:fixed md:bottom-8 md:left-8 md:z-50 md:flex md:items-center md:justify-center"
  initial={{ scale: 0, opacity: 0 }}
  animate={{ scale: 1, opacity: 1 }}
  transition={{ delay: 1, type: 'spring', stiffness: 120 }}
>
  {/* Outer glow */}
  <motion.div
    className="absolute inset-0 rounded-full bg-emerald-400 blur-xl opacity-60"
    animate={{ scale: [1, 1.3, 1] }}
    transition={{ repeat: Infinity, duration: 2 }}
  />

  {/* Ring container */}
  <div className="relative w-20 h-20">
    {/* Background ring */}
    <svg className="absolute inset-0 w-full h-full -rotate-90">
      <circle cx="40" cy="40" r={radius} stroke="#e5e7eb" strokeWidth="6" fill="none" />
    </svg>

    {/* Progress ring */}
    <motion.svg className="absolute inset-0 w-full h-full -rotate-90">
      <motion.circle
        cx="40"
        cy="40"
        r={radius}
        stroke="url(#gradient)"
        strokeWidth="6"
        fill="none"
        strokeLinecap="round"
        style={{ strokeDasharray: circumference, strokeDashoffset }}
      />
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#14b8a6" />
        </linearGradient>
      </defs>
    </motion.svg>

    {/* Percentage text */}
    <div className="absolute inset-0 flex flex-col items-center justify-center">
      <motion.span
        key={percent}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-lg font-bold text-emerald-700"
      >
        {percent}
      </motion.span>
      <span className="text-xs text-emerald-600 -mt-1">%</span>
    </div>
  </div>
</motion.div>


  );
};

/* ------------------- MAIN COMPONENT ------------------- */
export default function Home() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const { scrollYProgress } = useScroll();
  const heroRef = useRef(null);

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.3]);

  useEffect(() => {
    const id = setInterval(() => {
      setCurrentTestimonial((p) => (p + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <main className="relative min-h-screen bg-gradient-to-b from-emerald-50 via-cyan-50 to-white text-gray-800 overflow-x-hidden">

      {/* ==== NEW CIRCULAR SCROLL INDICATOR ==== */}
      <ScrollRing />

      {/* Floating Leaves */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {[...Array(16)].map((_, i) => (
          <FloatingLeaf key={i} delay={i * 1.2} />
        ))}
      </div>

      {/* Floating CTA */}
    <StickyButton />


      {/* WhatsApp */}
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

      {/* HERO */}
      <section ref={heroRef} className="relative py-32 px-6 overflow-hidden">
        <img src={clinic} alt="Ayurveda Clinic" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/50"></div>

        <motion.div style={{ y: y1 }} className="absolute inset-0 bg-gradient-to-br from-white/5 via-teal-200/5 to-emerald-100/5" />
        <motion.div style={{ y: y2, scale }} className="absolute top-20 -left-40 w-96 h-96 bg-white/20 rounded-full blur-3xl animate-pulse" />
        <motion.div style={{ y: y2, scale }} className="absolute bottom-20 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse delay-700" />

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            <motion.div animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.1, 1.1, 1] }} transition={{ duration: 6, repeat: Infinity }} className="flex justify-center mb-8">
              <div className="relative">
                <Leaf className="w-20 h-20 text-white" />
                <motion.div className="absolute inset-0 blur-xl bg-white/40" animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 2, repeat: Infinity }} />
              </div>
            </motion.div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white drop-shadow-lg">
              Pure Healing, Naturally
            </h1>
            <p className="max-w-3xl mx-auto text-xl md:text-2xl text-white/90 mb-12 font-light leading-relaxed">
              Ancient Ayurvedic wisdom meets modern care. Rejuvenate your body, mind, and soul with personalized natural therapies.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <motion.a
                href="/treatments"
                className="group inline-flex items-center gap-3 px-10 py-5 bg-white text-emerald-700 font-bold text-lg rounded-2xl shadow-xl hover:bg-emerald-50 transition-all"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore Therapies
                <motion.div animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                  <ArrowRight className="w-6 h-6" />
                </motion.div>
              </motion.a>
              <motion.a
                href="/about"
                className="inline-flex items-center gap-3 px-10 py-5 border-2 border-white text-white font-bold text-lg rounded-2xl hover:bg-white/20 transition-all backdrop-blur-sm"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Sparkles className="w-6 h-6" /> Learn Ayurveda
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-20 px-6 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1, type: "spring", stiffness: 100 }}
                className="group"
              >
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform">
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm text-gray-600 mt-2 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold mb-16 bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-cyan-600"
          >
            Why Patients Trust Us
          </motion.h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: Shield, title: "100% Natural", desc: "No chemicals. Only pure herbs & oils." },
              { icon: Users, title: "Expert Team", desc: "BAMS & MD certified healers." },
              { icon: Award, title: "Proven Results", desc: "99% patient satisfaction rate." },
              { icon: Clock, title: "Flexible Hours", desc: "Morning, evening & weekend slots." },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10, scale: 1.05 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 to-teal-400/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all" />
                <div className="relative bg-white/70 backdrop-blur-xl p-8 rounded-3xl shadow-xl border border-white/20">
                  <item.icon className="w-14 h-14 text-emerald-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="font-bold text-xl mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-28 px-6 bg-gradient-to-b from-cyan-50/50 to-white">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-cyan-600">
              Signature Therapies
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Handcrafted from 5000 years of Ayurvedic science.</p>
          </motion.div>
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -15, rotateX: 10, rotateZ: -2 }}
                className="group relative"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div
                  className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl blur-xl"
                  style={{
                    backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-stops))`,
                    '--tw-gradient-from': service.glow.split(' ')[1],
                    '--tw-gradient-to': service.glow.split(' ')[3],
                  }}
                />
                <div className="relative bg-white p-8 rounded-3xl shadow-2xl border border-gray-100 backdrop-blur-sm">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.glow} p-3 mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                    <service.icon className="w-full h-full text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.desc}</p>
                  <p className="text-sm font-medium text-emerald-600">Clock {service.duration}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-16">
            <motion.a href="/treatments" className="inline-block text-emerald-600 font-bold text-lg hover:text-teal-600 transition" whileHover={{ x: 10 }}>
              View All Treatments <ChevronRight className="inline w-5 h-5" />
            </motion.a>
          </div>
        </div>
      </section>

      {/* DAILY TIPS */}
      <section className="py-28 px-6 bg-gradient-to-b from-white to-emerald-50">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-600">
            Ayurveda in Daily Life
          </motion.h2>
          <p className="text-lg text-gray-600 mb-16 max-w-3xl mx-auto">
            Simple habits rooted in 5000-year-old wisdom to keep you balanced every day.
          </p>
          <div className="grid md:grid-cols-4 gap-8">
            {dailyTips.map((tip, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all"
              >
                <tip.icon className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
                <h3 className="font-bold text-lg mb-2">{tip.title}</h3>
                <p className="text-sm text-gray-600">{tip.tip}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CLINIC LOCATIONS */}
      <section className="py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-5xl md:text-6xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-cyan-600">
            Our Healing Centers
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-10">
            {locations.map((loc, i) => (
              <motion.a
                key={i}
                href={loc.map}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                whileHover={{ y: -10, scale: 1.03 }}
                className="block group"
              >
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-8 rounded-3xl shadow-xl border border-emerald-200 transition-all group-hover:shadow-2xl">
                  <MapPin className="w-10 h-10 text-emerald-600 mb-4" />
                  <h3 className="text-2xl font-bold mb-2">{loc.city}</h3>
                  <p className="text-gray-600">{loc.address}</p>
                  <p className="text-sm font-medium text-emerald-600 mt-3 flex items-center gap-2">
                    <Phone className="w-4 h-4" /> {loc.phone}
                  </p>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-28 px-6 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 text-white">
        <div className="max-w-6xl mx-auto">
          <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-5xl md:text-6xl font-bold text-center mb-20">
            Real Stories, Real Healing
          </motion.h2>
          <div className="relative h-80 flex items-center justify-center overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, scale: 0.8, rotateY: -180 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.8, rotateY: 180 }}
                transition={{ duration: 0.8, type: "spring" }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="bg-white/20 backdrop-blur-xl rounded-3xl p-10 max-w-2xl text-center shadow-2xl border border-white/30">
                  <img src={testimonials[currentTestimonial].image} alt={testimonials[currentTestimonial].author} className="w-24 h-24 rounded-full mx-auto mb-6 object-cover ring-4 ring-white/50" />
                  <div className="flex justify-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-xl italic mb-6 leading-relaxed">"{testimonials[currentTestimonial].text}"</p>
                  <p className="text-lg font-bold">— {testimonials[currentTestimonial].author}</p>
                  <p className="text-sm opacity-80">{testimonials[currentTestimonial].role}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentTestimonial(i)}
                className={`w-2 h-2 rounded-full transition-all ${i === currentTestimonial ? 'bg-white w-8' : 'bg-white/50'}`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* DOCTORS */}
      <section className="py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-cyan-600">
              Meet Our Healers
            </h2>
            <p className="text-lg text-gray-600">Trained in classical Ayurveda with decades of wisdom.</p>
          </motion.div>
          <div className="grid gap-12 md:grid-cols-3">
            {doctors.map((doctor, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                whileHover={{ y: -20, scale: 1.05 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/30 to-teal-400/30 rounded-3xl blur-xl group-hover:blur-2xl transition-all" />
                <div className="relative bg-white rounded-3xl overflow-hidden shadow-2xl">
                  <div className="h-80 overflow-hidden">
                    <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="p-8 text-center">
                    <h3 className="text-2xl font-bold mb-1">{doctor.name}</h3>
                    <p className="text-emerald-600 font-medium">{doctor.spec}</p>
                    <p className="text-sm text-gray-600 mt-2">{doctor.exp} experience</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* BLOG */}
      <section className="py-28 px-6 bg-emerald-50">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-cyan-600">
              Healing Wisdom Blog
            </h2>
            <p className="text-lg text-gray-600">Latest insights from our Ayurvedic experts.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-10">
            {blogPosts.map((post, i) => (
              <motion.article
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all group"
              >
                <div className="relative overflow-hidden h-56">
                  <motion.img
                    src={post.img}
                    alt={post.title}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                    whileHover={{ scale: 1.1 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                    <Calendar className="w-4 h-4" /> {post.date}{" "}
                    <Clock className="w-4 h-4" /> {post.readTime}
                  </div>
                  <h3 className="text-xl font-bold mb-2 line-clamp-2 text-gray-800 group-hover:text-emerald-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                  <a href="#" className="text-emerald-600 font-medium flex items-center gap-1 hover:gap-2 transition-all">
                    Read More <ChevronRight className="w-4 h-4" />
                  </a>
                </div>
              </motion.article>
            ))}
          </div>

          <div className="text-center mt-16">
            <motion.a
              href="/blog"
              className="inline-block px-10 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all"
              whileHover={{ scale: 1.05 }}
            >
              View All Articles
            </motion.a>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-32 px-6 text-center bg-gradient-to-t from-emerald-50 to-white">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-cyan-600">
            Begin Your Healing Today
          </h2>
          <p className="text-xl text-gray-700 mb-12 max-w-2xl mx-auto">
            One consultation can change your life. Let nature heal you.
          </p>
          <motion.a
            href="/contact"
            className="inline-flex items-center gap-4 px-12 py-6 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-xl font-bold rounded-full shadow-2xl hover:shadow-emerald-500/50 transition-all"
            whileHover={{ scale: 1.1, y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <Phone className="w-7 h-7" />
            Book Your Session Now
            <motion.div animate={{ x: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
              <ArrowRight className="w-6 h-6" />
            </motion.div>
          </motion.a>
        </motion.div>
      </section>
    </main>
  );
}