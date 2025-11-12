'use client';

import { motion } from "framer-motion";
import { Award, Heart, Star, Sparkles } from "lucide-react";

export default function DoctorCard({
  image = "/doctors/placeholder.jpg",
  name = "Dr. Vishnu Sharma",
  specialization = "Panchakarma & Rejuvenation",
  experience = "22+",
  patients = "15,000+",
  rating = 4.9,
  highlight = false, // for featured doctor
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="group relative"
    >
      {/* Glowing Background Mist */}
      <motion.div
        className="absolute -inset-6 bg-gradient-to-br from-emerald-400/30 via-cyan-400/20 to-teal-400/30 rounded-3xl blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 5, repeat: Infinity }}
      />

      {/* Featured Badge */}
      {highlight && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-4 left-1/2 -translate-x-1/2 z-10"
        >
          <div className="px-5 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-xs font-bold rounded-full shadow-2xl flex items-center gap-2">
            <Award className="w-4 h-4" />
            LEAD HEALER
          </div>
        </motion.div>
      )}

      {/* Card */}
      <div className="relative bg-white/97 backdrop-blur-2xl rounded-3xl shadow-xl border border-emerald-100 overflow-hidden hover:shadow-2xl hover:border-emerald-300 transition-all duration-500">
        <div className="relative">
          <img
            src={image}
            alt={name}
            className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-700"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Floating Heart Pulse */}
          <motion.div
            className="absolute top-6 right-6"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Heart className="w-10 h-10 text-white drop-shadow-lg fill-white/80" />
          </motion.div>
        </div>

        <div className="p-8 text-center space-y-5">
          <div>
            <h3 className="text-2xl font-bold text-gray-800 group-hover:text-emerald-700 transition-colors">
              {name}
            </h3>
            <p className="text-emerald-600 font-semibold text-lg mt-1">
              {specialization}
            </p>
          </div>

          <div className="flex items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2 text-emerald-700 font-medium">
              <Award className="w-5 h-5" />
              <span>{experience} Years</span>
            </div>
            <div className="flex items-center gap-2 text-teal-600 font-medium">
              <Heart className="w-5 h-5" />
              <span>{patients} Healed</span>
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center justify-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${i < Math.floor(rating) ? "text-yellow-500 fill-current" : "text-gray-300"}`}
              />
            ))}
            <span className="ml-2 font-semibold text-gray-700">{rating.toFixed(1)}</span>
          </div>

          {/* CTA */}
          <motion.a
            href="/contact"
            className="block w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold rounded-full shadow-lg hover:shadow-emerald-500/70 transition-all flex items-center justify-center gap-3"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Book Consultation
            <Sparkles className="w-5 h-5" />
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}