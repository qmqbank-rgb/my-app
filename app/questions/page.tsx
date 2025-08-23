"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";
import FreeQuestions from "@/components/FreeQuestions";
import ProQuestions from "@/components/ProQuestions";

export default function QuestionsPage() {
  const [freeUnlocked, setFreeUnlocked] = useState(false);
  const [proUnlocked, setProUnlocked] = useState(false);
  const [showFreeSuccess, setShowFreeSuccess] = useState(false);
  const [showProSuccess, setShowProSuccess] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    const handleResize = () =>
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const unlockFree = () => {
    setFreeUnlocked(true);
    setShowFreeSuccess(true);
    setTimeout(() => setShowFreeSuccess(false), 3000);
  };

  const unlockPro = () => {
    setProUnlocked(true);
    setShowProSuccess(true);
    setTimeout(() => setShowProSuccess(false), 3000);
  };

  return (
    <main className="pt-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

      {/* Page Heading */}
      <h1 className="text-4xl sm:text-5xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 drop-shadow-lg mb-6">
        📝 Questions
      </h1>

      {/* Success Messages */}
      <div className="flex flex-col items-center space-y-2">
        <AnimatePresence>
          {showFreeSuccess && (
            <motion.div
              key="free-success"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className="px-6 py-2 bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-100 font-semibold rounded-full shadow-md text-lg"
            >
              🎉 Free Questions Unlocked!
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showProSuccess && (
            <motion.div
              key="pro-success"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className="px-6 py-2 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-100 font-semibold rounded-full shadow-md text-lg"
            >
              🚀 Pro Questions Unlocked!
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Questions Cards */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Free Questions Card */}
        <div className="flex-1">
          <div className="bg-blue-50 dark:bg-blue-900 rounded-2xl shadow-lg p-6 hover:scale-105 hover:shadow-2xl transition-transform duration-300">
            <FreeQuestions isUnlocked={freeUnlocked} onUnlock={unlockFree} />
          </div>
        </div>

        {/* Pro Questions Card */}
        <div className="flex-1">
          <div className="bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900 dark:to-orange-800 rounded-2xl shadow-lg p-6 hover:scale-105 hover:shadow-2xl transition-transform duration-300">
            <ProQuestions isUnlocked={proUnlocked} onUnlock={unlockPro} />
          </div>
        </div>
      </div>

      {/* Confetti */}
      {(showFreeSuccess || showProSuccess) && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={200}
          gravity={0.2}
        />
      )}
    </main>
  );
}
