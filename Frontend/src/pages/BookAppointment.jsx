import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, ArrowRight, Leaf, Sparkles, Mic, Send } from "lucide-react";
import confetti from "canvas-confetti";
import { bookingAPI } from "../api/api";
import { useNavigate } from "react-router-dom";

const SLOTS = [
  "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"
];

export default function BookAppointment() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [form, setForm] = useState({ name: "", email: "", phone: "", concern: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [availableSlots, setAvailableSlots] = useState({});
  const [bookingId, setBookingId] = useState(""); // Store ID for success screen

  // Check if slot time has passed
  const isSlotExpired = (date, time) => {
    try {
      const [h, p] = time.split(' ');
      let [hour] = h.split(':').map(Number);
      if (p === 'PM' && hour !== 12) hour += 12;
      if (p === 'AM' && hour === 12) hour = 0;
      const slotTime = new Date(`${date}T${hour.toString().padStart(2, '0')}:00:00`);
      return slotTime < new Date();
    } catch {
      return true;
    }
  };

  // Fetch availability when date changes
  useEffect(() => {
    if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      setAvailableSlots({});
      return;
    }

    const fetchAvailability = async () => {
      const result = await bookingAPI.getAvailability(date);
      if (result.success) {
        setAvailableSlots(result.data.slots || {});
      }
    };

    fetchAvailability();
  }, [date]);

  const next = (e) => {
    e.preventDefault();
    if (step === 1 && (!form.name || !form.email || !form.phone)) {
      return setError("Please fill all fields");
    }
    if (step === 2 && !date) {
      return setError("Please select a date");
    }
    if (step === 2 && !time) {
      return setError("Please select a time");
    }
    setError("");
    setStep(step + 1);
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!time) return setError("Please select a time");
    setLoading(true);
    setError("");

    try {
      const result = await bookingAPI.create({ ...form, date, time });

      if (result.success) {
        // Save booking ID
        setBookingId(result.data.booking.id);

        // Trigger confetti
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#10b981', '#06b6d4', '#34d399', '#22d3ee', '#6ee7b7'],
        });

        // Go to success step
        setStep(4);
      } else {
        setError(result.error || "Booking failed");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Auto redirect after success
  useEffect(() => {
    if (step === 4) {
      const timer = setTimeout(() => {
        setStep(1);
        setDate("");
        setTime("");
        setForm({ name: "", email: "", phone: "", concern: "" });
        setAvailableSlots({});
        setBookingId("");
        navigate("/");
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [step, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-4 overflow-hidden relative">
      <motion.div animate={{ x: [0,120,0], y: [0,-80,0] }} transition={{ duration:22, repeat:Infinity }} className="absolute top-0 left-0 w-72 h-72 bg-emerald-300/30 rounded-full blur-3xl"/>
      <motion.div animate={{ x: [0,-100,0], y: [0,100,0] }} transition={{ duration:19, repeat:Infinity }} className="absolute bottom-0 right-0 w-64 h-64 bg-cyan-300/30 rounded-full blur-3xl"/>

      {Array.from({length:8}).map((_,i)=>
        <motion.div key={i} className="absolute text-emerald-400/20 pointer-events-none"
          initial={{y:-100}} animate={{y:[-100,innerHeight+100],rotate:360}}
          transition={{duration:15+i*0.8,repeat:Infinity,delay:i*1.2,ease:"linear"}}>
          <Leaf className="w-10 h-10"/>
        </motion.div>
      )}

      <div className="max-w-2xl mx-auto relative z-10">
        <motion.div initial={{y:-30,opacity:0}} animate={{y:0,opacity:1}} className="text-center mb-8">
          <motion.div animate={{rotate:[0,5,-5,0]}} transition={{duration:8,repeat:Infinity}} className="inline-block p-4 bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl">
            <Leaf className="w-12 h-12 text-emerald-600"/>
          </motion.div>
          <h1 className="mt-4 text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600">
            Book Your Healing
          </h1>
        </motion.div>

        {/* Progress Circle - Caps at 100% */}
        <div className="flex justify-center mb-8">
          <div className="relative w-20 h-20">
            <svg className="w-full h-full">
              <circle cx="40" cy="40" r="34" stroke="#e5e7eb" strokeWidth="8" fill="none"/>
              <motion.circle 
                cx="40" cy="40" r="34" 
                stroke="url(#g)" strokeWidth="8" fill="none" strokeLinecap="round"
                strokeDasharray={2*Math.PI*34} 
                initial={{strokeDashoffset:2*Math.PI*34}}
                animate={{strokeDashoffset:2*Math.PI*34*(1-Math.min(step, 3)/3)}} 
                transition={{duration:0.5}}
              />
              <defs>
                <linearGradient id="g">
                  <stop offset="0%" stopColor="#10b981"/>
                  <stop offset="100%" stopColor="#06b6d4"/>
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-emerald-700">
              {step <= 3 ? `${step}/3` : "Done"}
            </div>
          </div>
        </div>

        <motion.form 
          onSubmit={step < 3 ? next : step === 3 ? submit : undefined} 
          className="bg-white/90 backdrop-blur-2xl rounded-3xl shadow-2xl p-6 sm:p-10 border border-white/20" 
          initial={{opacity:0,y:30}} 
          animate={{opacity:1,y:0}}
        >
          <AnimatePresence mode="wait">
            {/* Step 1: Personal Info */}
            {step === 1 && (
              <motion.div key="1" initial={{x:-200,opacity:0}} animate={{x:0,opacity:1}} exit={{x:-200,opacity:0}} className="space-y-5">
                <div className="flex justify-center"><Sparkles className="w-10 h-10 text-emerald-500 animate-pulse"/></div>
                <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Who Are You?</h2>
                {error && <p className="text-red-500 text-center">{error}</p>}
                {["name","email","phone"].map(f=>(
                  <input
                    key={f}
                    type={f==="email"?"email":f==="phone"?"tel":"text"}
                    placeholder={f==="name"?"Full Name":f==="email"?"your@email.com":"+91 98765 43210"}
                    required
                    value={form[f]}
                    onChange={e=>setForm({...form,[f]:e.target.value})}
                    className="w-full px-5 py-4 rounded-2xl bg-gradient-to-br from-emerald-50 to-cyan-50 border-2 border-white/50 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-300/30 outline-none"
                  />
                ))}
              </motion.div>
            )}

            {/* Step 2: Date & Time */}
            {step === 2 && (
              <motion.div key="2" initial={{x:200,opacity:0}} animate={{x:0,opacity:1}} exit={{x:200,opacity:0}} className="space-y-6">
                <div className="flex justify-center"><Calendar className="w-10 h-10 text-teal-600 animate-bounce"/></div>
                <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">When?</h2>

                <div>
                  <label className="flex items-center gap-2 text-lg font-medium text-emerald-700 mb-2"><Clock className="w-5 h-5"/>Date</label>
                  <input
                    type="date"
                    required
                    min={new Date().toISOString().split("T")[0]}
                    value={date}
                    onChange={e => { setDate(e.target.value); setTime(""); }}
                    className="w-full px-5 py-4 rounded-2xl bg-gradient-to-br from-teal-50 to-cyan-50 border-2 border-white/50 focus:border-teal-400 focus:ring-4 focus:ring-teal-300/30 outline-none"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-lg font-medium text-teal-700 mb-2"><Clock className="w-5 h-5"/>Time</label>
                  {error && <p className="text-red-500 text-center mb-2">{error}</p>}
                  {date ? (
                    <>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {SLOTS.map(t => {
                          const isExpired = isSlotExpired(date, t);
                          const count = availableSlots[t]?.count || 0;
                          const isFull = count >= 10;
                          const isInactive = isExpired || isFull;

                          return (
                            <button
                              key={t}
                              type="button"
                              onClick={() => !isInactive && setTime(t)}
                              disabled={isInactive}
                              className={`py-3 rounded-xl font-medium transition-all relative text-sm
                                ${time === t
                                  ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg scale-105"
                                  : isExpired
                                    ? "bg-gray-100 text-gray-400 cursor-not-allowed line-through"
                                    : isFull
                                      ? "bg-red-100 text-red-500 cursor-not-allowed"
                                      : "bg-white/80 border border-emerald-200 hover:bg-emerald-50 hover:shadow"
                                }`}
                            >
                              <div>{t}</div>
                              {isFull && <div className="text-xs mt-1 font-semibold">Full ({count}/10)</div>}
                              {isExpired && <div className="text-xs mt-1">Ended</div>}
                            </button>
                          );
                        })}
                      </div>
                      {date && !time && (
                        <p className="text-amber-600 text-sm text-center mt-3 animate-pulse font-medium">
                          Please select a time slot to proceed
                        </p>
                      )}
                    </>
                  ) : (
                    <p className="text-center text-gray-500 italic">Select a date first</p>
                  )}
                </div>
              </motion.div>
            )}

            {/* Step 3: Concern */}
            {step === 3 && (
              <motion.div key="3" initial={{y:40,opacity:0}} animate={{y:0,opacity:1}} exit={{y:40,opacity:0}} className="space-y-5">
                <div className="flex justify-center"><Mic className="w-10 h-10 text-cyan-600 animate-pulse"/></div>
                <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-cyan-600 to-emerald-600 bg-clip-text text-transparent">Your Concern</h2>
                <textarea
                  rows={5}
                  required
                  placeholder="Describe your symptoms, goals, or any notes..."
                  value={form.concern}
                  onChange={e => setForm({...form, concern: e.target.value})}
                  className="w-full px-5 py-4 rounded-2xl bg-gradient-to-br from-cyan-50 to-emerald-50 border-2 border-white/50 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-300/30 outline-none resize-none"
                />
              </motion.div>
            )}

            {/* Step 4: Success Animation */}
            {step === 4 && (
              <motion.div
                key="success"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="flex flex-col items-center justify-center py-12 space-y-6 text-center"
              >
                {/* Animated Checkmark */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="relative"
                >
                  <div className="w-32 h-32 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-full flex items-center justify-center shadow-2xl">
                    <motion.svg
                      className="w-20 h-20 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </motion.svg>
                  </div>

                  {/* Sparkles */}
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute text-yellow-400"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{
                        opacity: [0, 1, 0],
                        scale: [0, 1.3, 0],
                        x: [0, (i % 2 ? 1 : -1) * (30 + i * 10), 0],
                        y: [0, -40 - i * 10, 0],
                      }}
                      transition={{
                        duration: 1.2,
                        delay: 0.5 + i * 0.1,
                        repeat: Infinity,
                        repeatDelay: 2,
                      }}
                    >
                      <Sparkles className="w-6 h-6" />
                    </motion.div>
                  ))}
                </motion.div>

                {/* Success Text */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="space-y-2"
                >
                  <h3 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
                    Booking Confirmed!
                  </h3>
                  <p className="text-lg text-gray-700">
                    ID: <span className="font-mono font-bold text-emerald-600">{bookingId}</span>
                  </p>
                  <p className="text-sm text-gray-500 animate-pulse">Redirecting you home...</p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons - Only show on steps 1–3 */}
          {step <= 3 && (
            <div className="flex justify-between items-center mt-8 gap-3">
              {step > 1 && (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="px-6 py-3 bg-white/80 backdrop-blur rounded-2xl font-bold text-gray-700 shadow hover:shadow-lg transition"
                >
                  Back
                </button>
              )}
              <button
                type="submit"
                disabled={
                  loading ||
                  (step === 1 && (!form.name || !form.email || !form.phone)) ||
                  (step === 2 && (!date || !time))
                }
                className={`ml-auto px-8 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold rounded-2xl shadow-xl flex items-center gap-2 group relative overflow-hidden transition-all ${
                  loading || (step === 1 && (!form.name || !form.email || !form.phone)) || (step === 2 && (!date || !time))
                    ? 'opacity-60 cursor-not-allowed'
                    : 'hover:shadow-2xl'
                }`}
              >
                <span className="relative z-10">{loading ? "Booking…" : step === 3 ? "Confirm" : "Next"}</span>
                {!loading && (
                  <motion.div
                    animate={{ x: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="relative z-10"
                  >
                    {step === 3 ? <Send className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
                  </motion.div>
                )}
                {loading && (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  />
                )}
                <motion.div
                  className="absolute inset-0 bg-white/30"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.5 }}
                />
              </button>
            </div>
          )}
        </motion.form>

        <p className="text-center mt-6 text-sm text-gray-500">
          <Mic className="inline w-4 h-4 mr-1"/> WhatsApp us to book instantly
        </p>
      </div>
    </div>
  );
}