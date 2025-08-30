'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music } from 'lucide-react';

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [audioPlayed, setAudioPlayed] = useState(false);
  const [windowDimensions, setWindowDimensions] = useState({ width: 800, height: 600 });

  useEffect(() => {
    console.log('Preloader mounted, starting timer...');
    console.log('onComplete function:', onComplete);
    
    // Set window dimensions on client side
    setWindowDimensions({
      width: window.innerWidth,
      height: window.innerHeight
    });

    // Play audio effect
    const audio = new Audio('/space-ambient-cinematic-351304.mp3');
    audio.volume = 0.3;
    
    const playAudio = async () => {
      try {
        await audio.play();
        setAudioPlayed(true);
        console.log('Audio started playing');
      } catch (error) {
        console.log('Audio autoplay failed:', error);
      }
    };

    playAudio();

    // Simple timeout for preloader
    const timer = setTimeout(() => {
      console.log('Preloader timer completed, calling onComplete');
      onComplete();
    }, 4000);

    return () => {
      console.log('Preloader cleanup - clearing timer');
      clearTimeout(timer);
      audio.pause();
      audio.currentTime = 0;
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black flex items-center justify-center"
      >
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20" />
        
        {/* Main content */}
        <div className="relative z-10 text-center">
          {/* Logo text with neon glow */}
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-8xl md:text-9xl font-bold text-white mb-8"
            style={{
              textShadow: `
                0 0 20px rgba(168, 85, 247, 0.8),
                0 0 40px rgba(168, 85, 247, 0.6),
                0 0 60px rgba(168, 85, 247, 0.4),
                0 0 80px rgba(236, 72, 153, 0.3)
              `
            }}
          >
            Anefiok
          </motion.h1>

          {/* Music note icon with pulsing animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.8, 1, 0.8]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="inline-block"
            >
              <Music 
                className="w-24 h-24 text-purple-400 mx-auto"
                style={{
                  filter: 'drop-shadow(0 0 20px rgba(168, 85, 247, 0.8))'
                }}
              />
            </motion.div>
          </motion.div>

          {/* Loading text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="text-xl text-gray-400 mt-8 font-light"
          >
            Loading...
          </motion.p>

          {/* Progress bar */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 4, delay: 0 }}
            className="w-64 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mt-6 rounded-full overflow-hidden"
          >
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ duration: 4, delay: 0 }}
              className="h-full bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400"
            />
          </motion.div>

          {/* Debug info */}
          <div className="text-xs text-gray-500 mt-4">
            onComplete: {typeof onComplete === 'function' ? 'Function' : 'Not a function'}
          </div>
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-purple-400 rounded-full"
              initial={{
                x: Math.random() * windowDimensions.width,
                y: Math.random() * windowDimensions.height,
                opacity: 0
              }}
              animate={{
                y: [null, -100],
                opacity: [0, 1, 0],
                scale: [0, 1, 0]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                delay: Math.random() * 2,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
