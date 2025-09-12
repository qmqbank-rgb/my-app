'use client';

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { BookOpen, Crown, Info } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

// 👇 Particles client-only render হবে
const Particles = dynamic(() => import("@/components/Particles"), {
  ssr: false,
});

export default function Home() {
  const router = useRouter();
  const [showGreeting, setShowGreeting] = useState(true);

  const isLoggedIn = false;

  const handleGetStarted = () => {
    if (isLoggedIn) router.push("/dashboard");
    else router.push("/register");
  };

  const featureCards = [
    { title: "Free Questions", description: "Hundreds of free practice questions for quick learning.", icon: <BookOpen className="w-10 h-10 text-blue-600 dark:text-blue-400 mb-3" />, bgColor: "bg-blue-50 dark:bg-gray-800/90" },
    { title: "Pro Questions", description: "Premium questions with solutions & analytics.", icon: <Crown className="w-10 h-10 text-purple-600 dark:text-purple-400 mb-3" />, bgColor: "bg-purple-50 dark:bg-gray-800/90" },
    { title: "About the App", description: "Organized question bank by subjects & topics.", icon: <Info className="w-10 h-10 text-green-600 dark:text-green-400 mb-3" />, bgColor: "bg-green-50 dark:bg-gray-800/90" },
  ];

  useEffect(() => {
    const timer = setTimeout(() => setShowGreeting(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white overflow-hidden">
      {/* ✅ Particles client-only */}
      <Particles />

      {/* Hero */}
      <div className="container mx-auto p-6 flex-1 flex flex-col items-center justify-center relative z-10">
        <AnimatePresence>
          {showGreeting && (
            <motion.div
              key="greeting-overlay"
              initial={{ opacity: 0, scale: 1.2, filter: "blur(6px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.85, filter: "blur(4px)" }}
              transition={{ duration: 1 }}
              className="absolute flex items-center justify-center w-full"
            >
              <h1
                className="text-5xl sm:text-6xl font-extrabold arabic-font whitespace-nowrap text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-yellow-400 to-green-400 drop-shadow-2xl animate-float"
                style={{ direction: "rtl" }}
              >
                ا لسلام عليكم . اهلا سهلا مرحبا
              </h1>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: showGreeting ? 0 : 1, y: showGreeting ? 20 : 0 }}
          transition={{ duration: 1, delay: 1.6 }}
          className="text-5xl sm:text-6xl font-extrabold drop-shadow-lg whitespace-nowrap text-center flex items-center gap-2"
        >
          <span className="animated-icon text-6xl">🎓</span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-yellow-400 animate-bounce-slow">
            Welcome to our Question Bank
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: showGreeting ? 0 : 1, y: showGreeting ? 10 : 0 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="text-gray-700 dark:text-gray-200 text-lg sm:text-lg max-w-xl mx-auto text-center mt-2 mb-8 whitespace-nowrap"
        >
          Practice, learn, and excel with free & pro questions curated for every learner.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: showGreeting ? 0 : 1, y: showGreeting ? 10 : 0 }}
          transition={{ delay: 2, duration: 0.8 }}
          className="flex justify-center gap-4 mb-12"
        >
          <button
            onClick={handleGetStarted}
            className="px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold text-lg shadow-md hover:bg-blue-700 transition-colors"
          >
            Get Started
          </button>
          <Link
            href="/login"
            className="px-6 py-3 rounded-xl border border-gray-400 dark:border-gray-600 text-gray-900 dark:text-white font-semibold text-lg shadow-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            🔑 Login
          </Link>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          {featureCards.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: showGreeting ? 0 : 1, y: showGreeting ? 10 : 0 }}
              transition={{ delay: 2.2 + idx * 0.2, duration: 0.8 }}
              className={`flex flex-col items-center p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 ${card.bgColor}`}
            >
              {card.icon}
              <h2 className="text-xl font-semibold mb-2 text-center dark:text-white">{card.title}</h2>
              <p className="text-center text-gray-700 dark:text-gray-200 text-sm">{card.description}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: showGreeting ? 0 : 1, y: showGreeting ? 10 : 0 }}
          transition={{ delay: 2.8, duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-lg sm:text-lg font-bold dark:text-white mb-4">
            Are you ready to start?
          </h2>
          <Link
            href="/register"
            className="px-8 py-4 rounded-xl bg-green-600 text-white font-bold text-lg shadow-md hover:bg-green-700 transition-colors"
          >
            Register Now
          </Link>
        </motion.div>
      </div>

      <footer className="bg-blue-700 dark:bg-gray-800 text-white text-center py-3 mt-auto text-sm">
        <p>© {new Date().getFullYear()} Question Bank. All rights reserved.</p>
      </footer>
    </div>
  );
}
