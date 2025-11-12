// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Menu, X, Sun, Moon } from "lucide-react";

// export default function Header() {
//   const [open, setOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const [theme, setTheme] = useState("light");

//   // Scroll effect
//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 20);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // ✅ Apply dark mode properly
//   useEffect(() => {
//     if (theme === "dark") {
//       document.documentElement.classList.add("dark");
//     } else {
//       document.documentElement.classList.remove("dark");
//     }
//   }, [theme]);

//   const navItems = [
//     { name: "Home", href: "/" },
//     { name: "About", href: "/about" },
//     { name: "Treatments", href: "/treatments" },
//     { name: "Doctors", href: "/doctors" },
//     { name: "Contact", href: "/contact" },
//   ];

//   return (
//     <>
//       {/* Floating Orb */}
//       <motion.div
//         className="fixed top-0 left-0 w-96 h-96 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-emerald-400/20 via-teal-400/20 to-cyan-400/20 rounded-full blur-3xl pointer-events-none z-0"
//         animate={{ scale: [1, 1.2, 1], rotate: [0, 360] }}
//         transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
//       />

//       <motion.nav
//         initial={{ y: -100 }}
//         animate={{ y: 0 }}
//         transition={{ type: "spring", stiffness: 120 }}
//         className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
//           scrolled
//             ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-md"
//             : "bg-transparent"
//         }`}
//       >
//         <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
//           {/* Logo */}
//           <motion.a
//             href="/"
//             className="relative z-10 flex items-center gap-3 group"
//             whileHover={{ scale: 1.05 }}
//           >
//             <motion.div
//               animate={{ rotateY: [0, 360] }}
//               transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
//               className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg"
//             >
//               <motion.div
//                 animate={{ rotate: [0, -10, 10, 0] }}
//                 transition={{ duration: 4, repeat: Infinity }}
//               >
//                 <LeafIcon className="w-6 h-6 text-white" />
//               </motion.div>
//             </motion.div>
//             <span
//               className={`text-2xl font-bold transition-colors ${
//                 scrolled ? "text-gray-900 dark:text-gray-100" : "text-white"
//               }`}
//             >
//               Aura Ayurvedic
//             </span>
//           </motion.a>

//           {/* Desktop Menu */}
//           <div className="hidden lg:flex items-center gap-1">
//             {navItems.map((item, index) => (
//               <motion.a
//                 key={index}
//                 href={item.href}
//                 className={`relative px-5 py-3 font-medium transition-all group ${
//                   scrolled ? "text-gray-900 dark:text-gray-100" : "text-white"
//                 }`}
//                 initial={{ opacity: 0, y: -20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: index * 0.1 }}
//                 whileHover={{ y: -2 }}
//               >
//                 <span className="relative z-10">{item.name}</span>
//                 <motion.div
//                   className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-teal-400/20 rounded-xl -z-10"
//                   initial={{ scale: 0 }}
//                   whileHover={{ scale: 1 }}
//                   transition={{ type: "spring", stiffness: 400 }}
//                 />
//                 <motion.div
//                   className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500"
//                   whileHover={{ width: "60%", left: "20%" }}
//                   transition={{ duration: 0.3 }}
//                 />
//               </motion.a>
//             ))}

//             {/* ✅ Theme Toggle */}
//             {/* <motion.button
//               onClick={() => setTheme(theme === "light" ? "dark" : "light")}
//               className="ml-4 p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               <motion.div
//                 animate={{ rotate: theme === "dark" ? 180 : 0 }}
//                 transition={{ duration: 0.4 }}
//               >
//                 {theme === "light" ? (
//                   <Sun className="w-5 h-5 text-amber-600" />
//                 ) : (
//                   <Moon className="w-5 h-5 text-blue-400" />
//                 )}
//               </motion.div>
//             </motion.button> */}
//           </div>

//           {/* Mobile Toggle */}
//           <motion.button
//             onClick={() => setOpen(!open)}
//             className="lg:hidden p-3 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-md shadow-md"
//             whileHover={{ scale: 1.1 }}
//             whileTap={{ scale: 0.9 }}
//           >
//             <motion.div
//               animate={{ rotate: open ? 180 : 0 }}
//               transition={{ duration: 0.3 }}
//             >
//               {open ? (
//                 <X className="w-6 h-6 text-emerald-600" />
//               ) : (
//                 <Menu className="w-6 h-6 text-emerald-600" />
//               )}
//             </motion.div>
//           </motion.button>
//         </div>

//         {/* Mobile Menu */}
//         <AnimatePresence>
//           {open && (
//             <motion.div
//               initial={{ height: 0, opacity: 0 }}
//               animate={{ height: "auto", opacity: 1 }}
//               exit={{ height: 0, opacity: 0 }}
//               transition={{ duration: 0.4, ease: "easeOut" }}
//               className="lg:hidden overflow-hidden bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-t border-gray-200 dark:border-gray-800"
//             >
//               <div className="px-6 py-6 space-y-5">
//                 {navItems.map((item, index) => (
//                   <motion.a
//                     key={index}
//                     href={item.href}
//                     onClick={() => setOpen(false)}
//                     className="block text-lg font-medium text-gray-700 dark:text-gray-200 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all"
//                     initial={{ x: -50, opacity: 0 }}
//                     animate={{ x: 0, opacity: 1 }}
//                     exit={{ x: -50, opacity: 0 }}
//                     transition={{ delay: index * 0.05 }}
//                     whileHover={{ x: 10 }}
//                   >
//                     {item.name}
//                   </motion.a>
//                 ))}

//                 {/* ✅ Theme toggle in mobile */}
//                 {/* <div className="flex items-center gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
//                   <motion.button
//                     onClick={() => setTheme(theme === "light" ? "dark" : "light")}
//                     className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800"
//                     whileHover={{ scale: 1.05 }}
//                   >
//                     {theme === "light" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
//                     <span className="text-sm font-medium">
//                       {theme === "light" ? "Light" : "Dark"}
//                     </span>
//                   </motion.button>
//                 </div> */}
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </motion.nav>
//     </>
//   );
// }

// // Safe Leaf Icon
// const LeafIcon = ({ className }) => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//     className={className}
//   >
//     <path d="M21 12.5c0-5-3.5-8-9-8s-9 3-9 8c0 3 1.5 5.5 4 7" />
//     <path d="M12 4v16" />
//     <path d="M8 12h8" />
//   </svg>
// );


// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Menu, X } from "lucide-react";

// export default function Header() {
//   const [open, setOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);

//   /* ---------- Scroll effect ---------- */
//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 20);
//     window.addEventListener("scroll", onScroll);
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   const navItems = [
//     { name: "Home", href: "/" },
//     { name: "About", href: "/about" },
//     { name: "Treatments", href: "/treatments" },
//     { name: "Doctors", href: "/doctors" },
//     { name: "Contact", href: "/contact" },
//   ];

//   return (
//     <>
//       {/* Floating Orb */}
//       <motion.div
//         className="fixed top-0 left-0 w-96 h-96 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-emerald-400/20 via-teal-400/20 to-cyan-400/20 rounded-full blur-3xl pointer-events-none z-0"
//         animate={{ scale: [1, 1.2, 1], rotate: [0, 360] }}
//         transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
//       />

//       {/* ---------- NAV ---------- */}
//       <motion.nav
//         initial={{ y: -100 }}
//         animate={{ y: 0 }}
//         transition={{ type: "spring", stiffness: 120 }}
//         className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
//           scrolled
//             ? "bg-white/90 backdrop-blur-md shadow-md"
//             : "bg-transparent"
//         }`}
//       >
//         <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           {/* ---- LOGO + DESKTOP LINKS (centered) ---- */}
//           <div className="flex flex-col items-center py-4">
//             {/* Logo + Brand */}
//             <motion.a
//               href="/"
//               className="flex items-center gap-3 group"
//               whileHover={{ scale: 1.05 }}
//             >
//               <motion.div
//                 animate={{ rotateY: [0, 360] }}
//                 transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
//                 className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg"
//               >
//                 <motion.div
//                   animate={{ rotate: [0, -10, 10, 0] }}
//                   transition={{ duration: 4, repeat: Infinity }}
//                 >
//                   <LeafIcon className="w-6 h-6 text-white" />
//                 </motion.div>
//               </motion.div>

//               <span
//                 className={`text-2xl font-bold transition-colors ${
//                   scrolled ? "text-gray-900" : "text-white"
//                 }`}
//               >
//                 Aura Ayurvedic
//               </span>
//             </motion.a>

//             {/* Desktop Nav (second line) */}
//             <div className="hidden lg:flex items-center gap-1 mt-3">
//               {navItems.map((item, i) => (
//                 <motion.a
//                   key={i}
//                   href={item.href}
//                   className={`relative px-5 py-2 font-medium transition-all group ${
//                     scrolled ? "text-gray-900" : "text-white"
//                   }`}
//                   initial={{ opacity: 0, y: -15 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: i * 0.08 }}
//                   whileHover={{ y: -2 }}
//                 >
//                   <span className="relative z-10">{item.name}</span>

//                   {/* hover background */}
//                   <motion.div
//                     className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-teal-400/20 rounded-xl -z-10"
//                     initial={{ scale: 0 }}
//                     whileHover={{ scale: 1 }}
//                     transition={{ type: "spring", stiffness: 400 }}
//                   />

//                   {/* hover underline */}
//                   <motion.div
//                     className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500"
//                     whileHover={{ width: "60%", left: "20%" }}
//                     transition={{ duration: 0.3 }}
//                   />
//                 </motion.a>
//               ))}
//             </div>
//           </div>

//           {/* ---------- Mobile Hamburger (always visible) ---------- */}
//           <div className="absolute right-4 top-1/2 -translate-y-1/2 lg:hidden">
//             <motion.button
//               onClick={() => setOpen(!open)}
//               className="p-3 rounded-xl bg-white/50 backdrop-blur-md shadow-md"
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.9 }}
//             >
//               <motion.div
//                 animate={{ rotate: open ? 180 : 0 }}
//                 transition={{ duration: 0.3 }}
//               >
//                 {open ? (
//                   <X className="w-6 h-6 text-emerald-600" />
//                 ) : (
//                   <Menu className="w-6 h-6 text-emerald-600" />
//                 )}
//               </motion.div>
//             </motion.button>
//           </div>
//         </div>

//         {/* ---------- Mobile Menu ---------- */}
//         <AnimatePresence>
//           {open && (
//             <motion.div
//               initial={{ height: 0, opacity: 0 }}
//               animate={{ height: "auto", opacity: 1 }}
//               exit={{ height: 0, opacity: 0 }}
//               transition={{ duration: 0.4, ease: "easeOut" }}
//               className="lg:hidden overflow-hidden bg-white/90 backdrop-blur-xl border-t border-gray-200"
//             >
//               <div className="px-6 py-6 space-y-4 text-center">
//                 {navItems.map((item, i) => (
//                   <motion.a
//                     key={i}
//                     href={item.href}
//                     onClick={() => setOpen(false)}
//                     className="block text-lg font-medium text-gray-700 hover:text-emerald-600 transition-all"
//                     initial={{ x: -40, opacity: 0 }}
//                     animate={{ x: 0, opacity: 1 }}
//                     exit={{ x: -40, opacity: 0 }}
//                     transition={{ delay: i * 0.05 }}
//                     whileHover={{ x: 8 }}
//                   >
//                     {item.name}
//                   </motion.a>
//                 ))}
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </motion.nav>
//     </>
//   );
// }

// /* ---- Leaf SVG ---- */
// const LeafIcon = ({ className }) => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//     className={className}
//   >
//     <path d="M21 12.5c0-5-3.5-8-9-8s-9 3-9 8c0 3 1.5 5.5 4 7" />
//     <path d="M12 4v16" />
//     <path d="M8 12h8" />
//   </svg>
// );

'use client';

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  /* ---------- Scroll effect ---------- */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Treatments", href: "/treatments" },
    { name: "Doctors", href: "/doctors" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      {/* Floating Orb */}
      <motion.div
        className="fixed top-0 left-0 w-96 h-96 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-emerald-400/20 via-teal-400/20 to-cyan-400/20 rounded-full blur-3xl pointer-events-none z-0"
        animate={{ scale: [1, 1.2, 1], rotate: [0, 360] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      {/* ---------- NAV ---------- */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 120 }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/90 backdrop-blur-md shadow-md"
            : "bg-transparent"
        }`}
      >
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* ---- LOGO + DESKTOP NAV ---- */}
          <div className="flex flex-col py-4">
            {/* Mobile: Logo Left + Hamburger Right | Desktop: Centered Logo */}
            <div className="flex justify-between items-center lg:justify-center">
              {/* Logo + Text (Left on Mobile, Center on Desktop) */}
              <motion.a
                href="/"
                className="flex items-center gap-3 group"
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  animate={{ rotateY: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg"
                >
                  <motion.div
                    animate={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    <LeafIcon className="w-6 h-6 text-white" />
                  </motion.div>
                </motion.div>

                <span
                  className={`text-2xl font-bold transition-colors ${
                    scrolled ? "text-gray-900" : "text-white"
                  }`}
                >
                  Aura Ayurvedic
                </span>
              </motion.a>

              {/* Mobile Hamburger (Right) */}
              <div className="lg:hidden">
                <motion.button
                  onClick={() => setOpen(!open)}
                  className="p-3 rounded-xl bg-white/50 backdrop-blur-md shadow-md"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <motion.div
                    animate={{ rotate: open ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {open ? (
                      <X className="w-6 h-6 text-emerald-600" />
                    ) : (
                      <Menu className="w-6 h-6 text-emerald-600" />
                    )}
                  </motion.div>
                </motion.button>
              </div>
            </div>

            {/* Desktop Nav Links (Centered Below Logo) */}
            <div className="hidden lg:flex justify-center items-center gap-1 mt-3">
              {navItems.map((item, i) => (
                <motion.a
                  key={i}
                  href={item.href}
                  className={`relative px-5 py-2 font-medium transition-all group ${
                    scrolled ? "text-gray-900" : "text-white"
                  }`}
                  initial={{ opacity: 0, y: -15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -2 }}
                >
                  <span className="relative z-10">{item.name}</span>

                  {/* Hover Background */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-teal-400/20 rounded-xl -z-10"
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  />

                  {/* Hover Underline */}
                  <motion.div
                    className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500"
                    whileHover={{ width: "60%", left: "20%" }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* ---------- Mobile Menu (Dropdown) ---------- */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="lg:hidden overflow-hidden bg-white/90 backdrop-blur-xl border-t border-gray-200"
            >
              <div className="px-6 py-6 space-y-4 text-center">
                {navItems.map((item, i) => (
                  <motion.a
                    key={i}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block text-lg font-medium text-gray-700 hover:text-emerald-600 transition-all"
                    initial={{ x: -40, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -40, opacity: 0 }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ x: 8 }}
                  >
                    {item.name}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}

/* ---- Leaf Icon SVG ---- */
const LeafIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M21 12.5c0-5-3.5-8-9-8s-9 3-9 8c0 3 1.5 5.5 4 7" />
    <path d="M12 4v16" />
    <path d="M8 12h8" />
  </svg>
);