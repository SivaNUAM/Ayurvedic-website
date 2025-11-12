
import { motion } from "framer-motion";
import { Sparkles, Clock, Star, ArrowRight } from "lucide-react";

export default function ServiceCard({
  icon: Icon,
  title,
  description,
  duration = "45-90 min",
  price = "₹3,500",
  benefits = ["Relieves stress", "Boosts energy", "Natural healing"],
  rating = 4.9,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      viewport={{ once: true }}
      className="group relative"
    >
      {/* Glowing Background Blob */}
      <motion.div
        className="absolute -inset-4 bg-gradient-to-br from-emerald-400/30 via-cyan-400/20 to-teal-400/30 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      {/* Main Card */}
      <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-xl border border-emerald-100 overflow-hidden hover:shadow-2xl transition-all duration-500">
        <div className="p-8 space-y-6 text-center">
          {/* Icon with Pulse Glow */}
          <div className="relative inline-block">
            <motion.div
              className="absolute inset-0 bg-emerald-400/40 blur-3xl rounded-full"
              animate={{ scale: [1, 1.4, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <div className="relative p-6 bg-gradient-to-br from-emerald-50 to-cyan-50 rounded-2xl shadow-inner">
              <Icon className="w-16 h-16 text-emerald-600" />
            </div>
          </div>

          {/* Title & Description */}
          <div>
            <h3 className="text-2xl font-bold text-gray-800 group-hover:text-emerald-700 transition-colors">
              {title}
            </h3>
            <p className="mt-3 text-gray-600 leading-relaxed text-sm">
              {description}
            </p>
          </div>

          {/* Benefits List */}
          <ul className="space-y-2">
            {benefits.slice(0, 3).map((benefit, i) => (
              <li key={i} className="flex items-center justify-center gap-3 text-sm text-gray-600">
                <Sparkles className="w-4 h-4 text-emerald-500" />
                {benefit}
              </li>
            ))}
          </ul>

          {/* Duration & Price */}
          <div className="flex items-center justify-between pt-4 border-t border-emerald-100">
            <div className="flex items-center gap-2 text-emerald-700 font-medium">
              <Clock className="w-5 h-5" />
              <span>{duration}</span>
            </div>
            <div className="text-xl font-bold text-emerald-600">{price}</div>
          </div>

          {/* Rating */}
          <div className="flex items-center justify-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${i < Math.floor(rating) ? "text-yellow-500 fill-current" : "text-gray-300"}`}
              />
            ))}
            <span className="ml-2 text-sm font-medium text-gray-700">{rating}</span>
          </div>

          {/* CTA Button */}
          <motion.button
            className="w-full mt-6 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold rounded-full shadow-lg hover:shadow-emerald-500/60 transition-all flex items-center justify-center gap-3 group/btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Book This Treatment
            <motion.div
              animate={{ x: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <ArrowRight className="w-5 h-5" />
            </motion.div>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}