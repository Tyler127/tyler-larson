"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const generateParticles = () =>
  Array.from({ length: 20 }, (_, i) => ({
    id: i,
    startX: Math.random() * 100,
    endX: Math.random() * 100,
    startY: Math.random() * 100,
    endY: Math.random() * 100,
    duration: Math.random() * 40 + 80,
  }));

export function FloatingParticles() {
  const [particles, setParticles] = useState<Array<{
    id: number;
    startX: number;
    endX: number;
    startY: number;
    endY: number;
    duration: number;
  }>>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setParticles(generateParticles());
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-2 h-2 bg-primary/20 rounded-full cursor-pointer pointer-events-auto"
          initial={{ 
            opacity: 0,
            left: `${particle.startX}%`,
            top: `${particle.startY}%`,
          }}
          animate={{
            opacity: [0.2, 0.5, 0.2],
            left: [`${particle.startX}%`, `${particle.endX}%`, `${particle.startX}%`],
            top: [`${particle.startY}%`, `${particle.endY}%`, `${particle.startY}%`],
            scale: [1, 1.2, 1],
          }}
          whileHover={{
            scale: 2.5,
            opacity: 0.8,
            transition: { duration: 0.3 },
          }}
          transition={{
            opacity: { duration: particle.duration / 2, repeat: Infinity, ease: "easeInOut" },
            left: { duration: particle.duration, repeat: Infinity, ease: "easeInOut" },
            top: { duration: particle.duration, repeat: Infinity, ease: "easeInOut" },
            scale: { duration: particle.duration / 3, repeat: Infinity, ease: "easeInOut" },
          }}
        />
      ))}
    </div>
  );
}

