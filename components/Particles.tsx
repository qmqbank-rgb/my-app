"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Particles() {
  const [shapes, setShapes] = useState<
    { width: number; height: number; top: number; left: number; duration: number; delay: number }[]
  >([]);

  useEffect(() => {
    const generated = Array.from({ length: 50 }).map(() => ({
      width: Math.random() * 4 + 2,
      height: Math.random() * 4 + 2,
      top: Math.random() * 100,
      left: Math.random() * 100,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 1,
    }));
    setShapes(generated);
  }, []);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      {shapes.map((shape, idx) => (
        <motion.div
          key={idx}
          className="absolute bg-white dark:bg-gray-400 rounded-full opacity-20"
          style={{
            width: `${shape.width}px`,
            height: `${shape.height}px`,
            top: `${shape.top}%`,
            left: `${shape.left}%`,
          }}
          animate={{ y: [0, -8, 0], x: [0, 6, 0], opacity: [0.2, 0.5, 0.2] }}
          transition={{ repeat: Infinity, duration: shape.duration, ease: "easeInOut", delay: shape.delay }}
        />
      ))}
    </div>
  );
}
