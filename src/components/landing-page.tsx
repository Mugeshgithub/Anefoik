'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Music, Piano, Headphones } from 'lucide-react';

export default function LandingPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      {/* Animated gradient background */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            background: [
              'linear-gradient(45deg, #1e1b4b, #312e81, #000000)',
              'linear-gradient(45deg, #312e81, #1e40af, #1e1b4b)',
              'linear-gradient(45deg, #1e40af, #000000, #312e81)',
              'linear-gradient(45deg, #000000, #1e1b4b, #1e40af)',
            ]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute inset-0"
        />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0.3
            }}
            animate={{
              y: [null, -200],
              x: [null, Math.random() * 100 - 50],
              opacity: [0.3, 1, 0.3],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              delay: Math.random() * 2,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Cyan spotlight cursor effect */}
      <motion.div
        className="fixed pointer-events-none z-10"
        animate={{
          x: mousePosition.x - 200,
          y: mousePosition.y - 200,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      >
        <div className="w-96 h-96 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 rounded-full blur-3xl" />
      </motion.div>

      {/* Main content */}
      <div className="relative z-20 min-h-screen flex items-center justify-center">
        <div className="text-center px-4 max-w-4xl mx-auto">
          {/* Hero section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mb-12"
          >
            {/* Large heading */}
            <motion.h1
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.8 }}
              className="text-7xl md:text-9xl font-bold text-white mb-8"
              style={{
                textShadow: `
                  0 0 30px rgba(34, 211, 238, 0.8),
                  0 0 60px rgba(34, 211, 238, 0.6),
                  0 0 90px rgba(34, 211, 238, 0.4)
                `
              }}
            >
              Anefiok
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="text-2xl md:text-3xl text-gray-300 mb-12 font-light tracking-wide"
            >
              Keyboardist · Composer · Producer
            </motion.p>

            {/* Music icons row */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.5 }}
              className="flex justify-center items-center gap-8 mb-12"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="text-cyan-400"
              >
                <Music className="w-12 h-12" />
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.1, rotate: -5 }}
                className="text-blue-400"
              >
                <Piano className="w-12 h-12" />
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="text-purple-400"
              >
                <Headphones className="w-12 h-12" />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Enter Site button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.8 }}
          >
            <motion.button
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 30px rgba(34, 211, 238, 0.6)"
              }}
              whileTap={{ scale: 0.95 }}
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-xl border border-cyan-400/30 rounded-full text-white text-xl font-semibold overflow-hidden"
              style={{
                boxShadow: "0 0 20px rgba(34, 211, 238, 0.3)"
              }}
            >
              {/* Button background glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full" />
              
              {/* Button content */}
              <span className="relative z-10">Enter Site</span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="relative z-10"
              >
                <ArrowRight className="w-6 h-6 text-cyan-400" />
              </motion.div>

              {/* Hover effect overlay */}
              <motion.div
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent"
              />
            </motion.button>
          </motion.div>

          {/* Bottom accent line */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 1.5, delay: 2.2 }}
            className="w-64 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto mt-16"
          />
        </div>
      </div>

      {/* Additional floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`element-${i}`}
            className="absolute text-cyan-400/30"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              rotate: 0
            }}
            animate={{
              y: [null, -150],
              rotate: [0, 360],
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              delay: Math.random() * 3,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {['♪', '♫', '♬', '♩', '♭', '♯'][i % 6]}
          </motion.div>
        ))}
      </div>
    </div>
  );
}


