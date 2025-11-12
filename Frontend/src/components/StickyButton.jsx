
import { motion } from "framer-motion";
import { Phone, ArrowRight, Sparkles, Leaf } from "lucide-react";

export default function StickyButton() {
  return (
    <motion.a
      href="/book-appointment"
      aria-label="Book a healing session"
      className="
        fixed bottom-5 left-1/2 -translate-x-1/2 z-50
        flex items-center gap-2 sm:gap-3
        bg-gradient-to-r from-emerald-500 via-teal-600 to-cyan-600 
        text-white font-bold
        px-5 py-3 sm:px-7 sm:py-4
        text-sm sm:text-base
        rounded-full 
        shadow-xl sm:shadow-2xl shadow-emerald-500/50
        backdrop-blur-xl 
        border border-white/30
        hover:shadow-emerald-400/70 
        transition-all duration-300 
        group
        overflow-hidden
        select-none
      "
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ 
        delay: 1.5, 
        type: "spring", 
        stiffness: 140, 
        damping: 20 
      }}
      whileHover={{ 
        scale: 1.1,
        y: -3,
      }}
      whileTap={{ scale: 0.94 }}
      onTap={() => navigator.vibrate?.(40)}
    >
      {/* Shine sweep */}
      <motion.div
        className="absolute inset-0 bg-white/25"
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
        transition={{
          repeat: Infinity,
          repeatDelay: 5,
          duration: 1.8,
          ease: "easeInOut"
        }}
      />

      {/* Pulsing glow */}
      <motion.div
        className="absolute inset-0 rounded-full bg-emerald-400/30 blur-lg"
        animate={{
          scale: [1, 1.25, 1],
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{
          duration: 2.4,
          repeat: Infinity,
        }}
      />

      {/* Tiny sparkle */}
      <motion.div
        className="absolute -top-1 -right-1"
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      >
        <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-300/90" />
      </motion.div>

      <Phone className="w-4.5 h-4.5 sm:w-5 sm:h-5 group-hover:animate-pulse" />
      
      <span className="tracking-tight">
        Book Healing
      </span>

      <motion.div
        animate={{ x: [0, 5, 0] }}
        transition={{ repeat: Infinity, duration: 1.6 }}
      >
        <ArrowRight className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
      </motion.div>

      {/* Tiny leaf */}
      <motion.div
        className="absolute -bottom-2 left-1/2 -translate-x-1/2 opacity-60"
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Leaf className="w-4 h-4 text-emerald-200" />
      </motion.div>
    </motion.a>
  );
}