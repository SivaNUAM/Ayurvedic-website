'use client';

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import {
  Leaf, Droplets, Wind, Sparkles, Clock, Phone, ArrowRight,
  MessageCircle, Star, Heart, Users, Award, CheckCircle2,
  ChevronDown, Quote, Calendar, MapPin, Shield, Zap
} from "lucide-react";
import {FaWhatsapp} from "react-icons/fa";
import StickyButton from "../components/StickyButton";


const treatments = [
  { id: "panchakarma", title: "Panchakarma", subtitle: "Complete Detox", desc: "Five sacred procedures to eliminate toxins from body & mind.", duration: "7–21 days", icon: Droplets, gradient: "from-emerald-400 to-cyan-400", },
  { id: "shirodhara", title: "Shirodhara", subtitle: "Mind Serenity Flow", desc: "Warm herbal oil poured gently on the forehead for deep calm.", duration: "45 min", icon: Wind, gradient: "from-teal-500 to-emerald-500", },
  { id: "abhyanga", title: "Abhyanga", subtitle: "Nourishing Oil Massage", desc: "Full-body synchronized massage with medicated warm oils.", duration: "60–90 min", icon: Leaf, gradient: "from-cyan-400 to-blue-400", },
  { id: "swedana", title: "Swedana", subtitle: "Herbal Steam Therapy", desc: "Therapeutic sweating to open channels and release toxins.", duration: "20–30 min", icon: Sparkles, gradient: "from-emerald-500 to-lime-400", },
  { id: "nasya", title: "Nasya", subtitle: "Nasal Purification", desc: "Herbal oils administered through nose for clarity & sinus relief.", duration: "30 min", icon: Wind, gradient: "from-cyan-500 to-indigo-400", },
  { id: "basti", title: "Basti", subtitle: "Medicated Enema", desc: "King of Ayurvedic treatments for Vata balance & colon health.", duration: "8–14 days", icon: Droplets, gradient: "from-teal-600 to-emerald-600",},
    { id: "panchakarma", title: "Panchakarma", subtitle: "Complete Detox", desc: "Five sacred procedures to eliminate toxins from body & mind.", duration: "7–21 days", icon: Droplets, gradient: "from-emerald-400 to-cyan-400", },
  { id: "shirodhara", title: "Shirodhara", subtitle: "Mind Serenity Flow", desc: "Warm herbal oil poured gently on the forehead for deep calm.", duration: "45 min", icon: Wind, gradient: "from-teal-500 to-emerald-500", },
  { id: "abhyanga", title: "Abhyanga", subtitle: "Nourishing Oil Massage", desc: "Full-body synchronized massage with medicated warm oils.", duration: "60–90 min", icon: Leaf, gradient: "from-cyan-400 to-blue-400", },
  { id: "swedana", title: "Swedana", subtitle: "Herbal Steam Therapy", desc: "Therapeutic sweating to open channels and release toxins.", duration: "20–30 min", icon: Sparkles, gradient: "from-emerald-500 to-lime-400", },
  { id: "nasya", title: "Nasya", subtitle: "Nasal Purification", desc: "Herbal oils administered through nose for clarity & sinus relief.", duration: "30 min", icon: Wind, gradient: "from-cyan-500 to-indigo-400", },
  { id: "basti", title: "Basti", subtitle: "Medicated Enema", desc: "King of Ayurvedic treatments for Vata balance & colon health.", duration: "8–14 days", icon: Droplets, gradient: "from-teal-600 to-emerald-600",},
];

const testimonials = [
  { name: "Priya Sharma", location: "Mumbai", text: "After 14 days of Panchakarma, my chronic migraines vanished. I feel reborn!", rating: 5 },
  { name: "Rajesh Kumar", location: "Delhi", text: "Shirodhara cured my insomnia. I sleep like a baby now.", rating: 5 },
  { name: "Anita Verma", location: "Bangalore", text: "Lost 8kg naturally and my skin glows. Thank you Ananda!", rating: 5 },
];

const faqs = [
  { q: "How many days should I stay for full healing?", a: "Minimum 7 days for noticeable results. 14–21 days for life-changing transformation." },
  { q: "Is it safe during menstruation?", a: "Yes. We customize treatments. Basti & mild therapies are recommended." },
  { q: "Can I combine treatments?", a: "Absolutely! Our doctors create personalized packages." },
  { q: "Do you provide airport pickup?", a: "Yes, complimentary from Dehradun Airport (DED)." },
];

/* =================== COMPONENTS =================== */
const FloatingLeaf = ({ delay = 0 }) => (
  <motion.div className="absolute text-emerald-300/30 pointer-events-none"
    initial={{ y: -120, rotate: 0 }}
    animate={{ y: "110vh", rotate: 360 }}
    transition={{ duration: 20 + Math.random() * 10, repeat: Infinity, delay, ease: "linear" }}
    style={{ left: `${Math.random() * 100}%` }}
  >
    <Leaf className="w-12 h-12" />
  </motion.div>
);

const ScrollProgressRing = () => {
  const { scrollYProgress } = useScroll();
  const [pct, setPct] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => setPct(Math.round(v * 100)));
  const radius = 34;
  const circumference = 2 * Math.PI * radius;
  const dash = useTransform(scrollYProgress, [0, 1], [circumference, 0]);

  return (
    <motion.div className="fixed bottom-10 left-10 z-50" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1 }}>
      <div className="relative w-28 h-28">
        <motion.div className="absolute inset-0 bg-emerald-400/50 blur-3xl rounded-full"
          animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 3 }} />
        <svg className="absolute inset-0 w-full h-full -rotate-90">
          <circle cx="56" cy="56" r={radius} stroke="#ccfbf1" strokeWidth="8" fill="none" />
          <motion.circle cx="56" cy="56" r={radius} stroke="url(#grad)" strokeWidth="8" fill="none" strokeLinecap="round"
            style={{ pathLength: scrollYProgress }} />
          <defs>
            <linearGradient id="grad"><stop offset="0%" stopColor="#10b981" /><stop offset="100%" stopColor="#06b6d4" /></linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-emerald-700">{pct}</span>
          <span className="text-xs -mt-1 text-emerald-600">scrolled</span>
        </div>
      </div>
    </motion.div>
  );
};

const TreatmentCard = ({ t, i }) => (
  <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }}
    className="snap-center shrink-0 w-96 md:w-80">
    <div className="relative group">
      <motion.div className={`absolute -inset-4 bg-gradient-to-r ${t.gradient} blur-2xl opacity-60 group-hover:opacity-90 transition-opacity`}
        animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 4, repeat: Infinity }} />
      <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-emerald-100">
        <div className="p-10 text-center space-y-6">
          <div className={`p-6 rounded-full bg-gradient-to-br ${t.gradient} inline-block`}>
            <t.icon className="w-16 h-16 text-white" />
          </div>
          <div>
            <h3 className="text-3xl font-bold text-gray-800">{t.title}</h3>
            <p className="text-emerald-600 font-semibold mt-2">{t.subtitle}</p>
          </div>
          <p className="text-gray-600 leading-relaxed">{t.desc}</p>
          <div className="flex items-center justify-center gap-2 text-emerald-700">
            <Clock className="w-5 h-5" /><span className="font-medium">{t.duration}</span>
          </div>
          <div className="text-2xl font-bold text-emerald-600">{t.price}</div>
          <div className="flex justify-center gap-1">
            {[...Array(5)].map((_, s) => (<Star key={s} className="w-5 h-5 text-yellow-500 fill-current" />))}
          </div>
          <motion.a href={`/treatments/${t.id}`} className={`block py-4 rounded-full bg-gradient-to-r ${t.gradient} text-white font-bold shadow-lg`}
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            View Details
          </motion.a>
        </div>
      </div>
    </div>
  </motion.div>
);

/* =================== MAIN PAGE =================== */
export default function Treatments() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useTransform(scrollYProgress, [0, 1], [0, -300]);

  const processSteps = [
    { day: "Day 1–3", title: "Purva Karma", desc: "Preparation with oils & steam" },
    { day: "Day 4–10", title: "Pradhana Karma", desc: "Main elimination therapies" },
    { day: "Day 11–21", title: "Paschat Karma", desc: "Rejuvenation & diet" },
  ];

  return (
    <section ref={ref} className="relative min-h-screen overflow-hidden bg-gradient-to-b from-emerald-50 via-white to-cyan-50">
      {/* Floating Leaves */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {[...Array(20)].map((_, i) => (<FloatingLeaf key={i} delay={i * 1.4} />))}
      </div>
      <ScrollProgressRing />

      {/* HERO */}
      <motion.div style={{ y }} className="relative py-40">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 via-cyan-300/20 to-teal-400/20 blur-3xl" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }} className="space-y-12">
            <motion.div animate={{ y: [0, -15, 0] }} transition={{ duration: 6, repeat: Infinity }}
              className="inline-block p-10 bg-white/70 backdrop-blur-2xl rounded-3xl shadow-2xl">
              <Droplets className="w-32 h-32 text-emerald-600" />
            </motion.div>
            <h1 className="text-6xl md:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600">
              Ayurvedic Healing for Body, Mind & Soul
            </h1>
            <p className="text-2xl text-gray-700 max-w-4xl mx-auto font-light leading-relaxed">
              50-year-old Ayurvedic treatments performed beside the holy Ganges in Rishikesh.
            </p>
            <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto mt-16">
              {[{icon: Heart, value: "20+"}, {icon: Users, value: "10+"}, {icon: Shield, value: "100%"}].map((s, i) => (
                <div key={i} className="text-center">
                  <s.icon className="w-12 h-12 mx-auto text-emerald-600 mb-2" />
                  <div className="text-4xl font-bold text-emerald-700">{s.value}</div>
                  <div className="text-sm text-gray-600">{i===0?"Healed":i===1?"Countries":"Natural"}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* RIVER OF TREATMENTS */}
  <div className="relative py-32 bg-gradient-to-b from-transparent via-emerald-50/50 to-transparent">
  <div className="max-w-7xl mx-auto px-6">
    <motion.h2
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      className="text-5xl md:text-7xl font-bold text-center mb-20 bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-cyan-600"
    >
      Choose Your Healing Journey
    </motion.h2>

    {/* Add custom class here */}
    <div className="flex overflow-x-auto snap-x snap-mandatory treatments-scroll md:justify-center md:flex-wrap gap-12 px-6">
      {treatments.map((t, i) => (
        <TreatmentCard key={t.id} t={t} i={i} />
      ))}
    </div>
  </div>
</div>



      {/* HEALING PROCESS TIMELINE */}
      <div className="py-32 px-6 bg-white/80 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-20 bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-cyan-600">
            Your 21-Day Transformation
          </h2>
          <div className="space-y-16">
            {processSteps.map((step, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: i % 2 === 0 ? -100 : 100 }} whileInView={{ opacity: 1, x: 0 }}
                className={`flex flex-col md:flex-row items-center gap-10 ${i % 2 === 1 ? "md:flex-row-reverse" : ""}`}>
                <div className="flex-1 text-center md:text-left">
                  <div className="text-3xl font-bold text-emerald-600">{step.day}</div>
                  <h3 className="text-2xl font-semibold mt-2">{step.title}</h3>
                  <p className="text-gray-600 mt-4">{step.desc}</p>
                </div>
                <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-cyan-400 rounded-full flex items-center justify-center shadow-xl">
                  <Zap className="w-12 h-12 text-white" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* TESTIMONIALS */}
      <div className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-20 bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-cyan-600">
            Voices of Healing
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            {testimonials.map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.2 }}
                className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-emerald-100">
                <Quote className="w-10 h-10 text-emerald-400 mb-4" />
                <p className="text-gray-700 italic leading-relaxed">"{t.text}"</p>
                <div className="flex items-center gap-4 mt-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-cyan-400 rounded-full" />
                  <div>
                    <div className="font-semibold">{t.name}</div>
                    <div className="text-sm text-gray-600 flex items-center gap-1"><MapPin className="w-3 h-3" /> {t.location}</div>
                  </div>
                </div>
                <div className="flex gap-1 mt-4">
                  {[...Array(t.rating)].map((_, s) => (<Star key={s} className="w-5 h-5 text-yellow-500 fill-current" />))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* DOCTOR SPOTLIGHT */}
      <div className="py-32 px-6 bg-gradient-to-b from-emerald-50 to-cyan-50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
            <div className="relative inline-block">
              <div className="w-48 h-48 bg-gradient-to-br from-emerald-400 to-cyan-400 rounded-full mx-auto" />
              <Award className="absolute bottom-0 right-0 w-16 h-16 text-white bg-emerald-600 rounded-full p-3" />
            </div>
            <h3 className="text-4xl font-bold mt-8">Dr. Vishnu Sharma</h3>
            <p className="text-emerald-600 font-semibold">BAMS, MD (Ayurveda), 22+ years</p>
            <p className="text-gray-700 mt-6 max-w-2xl mx-auto">
              Third-generation Ayurvedic healer from Rishikesh. Personally guides every Panchakarma journey.
            </p>
          </motion.div>
        </div>
      </div>

      {/* FAQ */}
      <div className="py-32 px-6 bg-white/80 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-20 bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-cyan-600">
            Common Questions
          </h2>
          <div className="space-y-8">
            {faqs.map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: i * 0.1 }}
                className="bg-gradient-to-r from-emerald-50 to-cyan-50 rounded-3xl p-8 shadow-lg">
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-xl font-semibold text-gray-800">{f.q}</h4>
                    <p className="text-gray-600 mt-2">{f.a}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* FINAL CTA */}
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
        className="relative py-40 text-center bg-gradient-to-t from-emerald-100/80 to-transparent overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 space-y-12">
          <h2 className="text-6xl md:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-cyan-600">
            Your Healing River Awaits
          </h2>
          <p className="text-2xl text-gray-700">One step into nature’s flow can change everything.</p>
          <div className="flex flex-col sm:flex-row gap-8 justify-center">
            <motion.a href="/contact"
              className="inline-flex items-center gap-4 px-16 py-7 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-2xl font-bold rounded-full shadow-2xl"
              whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Phone className="w-8 h-8" /> Book Free Consultation <ArrowRight className="w-7 h-7" />
            </motion.a>
            <motion.a href="https://wa.me/1234567890" target="_blank"
              className="inline-flex items-center gap-4 px-12 py-7 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-2xl font-bold rounded-full shadow-2xl"
              whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <FaWhatsapp className="w-8 h-8" /> WhatsApp Now
            </motion.a>
          </div>
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }}
            className="mt-12"><ChevronDown className="w-12 h-12 text-emerald-600 mx-auto" /></motion.div>
        </div>
      </motion.div>
            <StickyButton />
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