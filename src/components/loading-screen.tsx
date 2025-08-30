import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          // Start exit animation first
          setIsExiting(true);
          // Wait for exit animation to complete before calling onComplete
          setTimeout(onComplete, 1200);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="loading-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{
          opacity: 0,
          scale: 1.05,
          filter: "blur(20px)",
          transition: { 
            duration: 1.2, 
            ease: [0.6, -0.05, 0.01, 0.99],
            opacity: { duration: 0.8 },
            scale: { duration: 1.2 },
            filter: { duration: 1.2 }
          }
        }}
        className="fixed inset-0 bg-[#0a0a1a] z-[100] flex items-center justify-center"
      >
        <div className="text-center">
          {/* Logo Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{
              opacity: 0,
              scale: 0.8,
              y: -20,
              transition: { duration: 0.6, ease: "easeInOut" }
            }}
            className="mb-12"
          >
            <div className="relative">
              <motion.div
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="w-24 h-24 border-2 border-[#fbbf24]/20 rounded-full mx-auto mb-6"
              >
                <div className="w-6 h-6 bg-[#fbbf24] rounded-full"></div>
              </motion.div>
              
              {/* Pulsing rings */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 border border-[#fbbf24]/20 rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.7, 0, 0.7],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.4,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{
                opacity: 0,
                y: -30,
                transition: { duration: 0.5, ease: "easeInOut" }
              }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-4xl font-light tracking-[0.3em] text-white"
            >
              ANIEFIOK
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{
                opacity: 0,
                transition: { duration: 0.4, ease: "easeInOut" }
              }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="text-gray-400 mt-2 text-sm tracking-wider"
            >
              Loading Musical Experience
            </motion.p>
          </motion.div>

          {/* Progress Bar */}
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "300px" }}
            exit={{
              opacity: 0,
              scale: 0.8,
              transition: { duration: 0.5, ease: "easeInOut" }
            }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mx-auto bg-white/10 rounded-full h-1 overflow-hidden"
          >
            <motion.div
              className="h-full bg-gradient-to-r from-[#fbbf24] to-[#a855f7] rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{
              opacity: 0,
              transition: { duration: 0.4, ease: "easeInOut" }
            }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="text-[#fbbf24] text-sm mt-4 font-light"
          >
            {progress}%
          </motion.div>
        </div>

        {/* Background fade transition */}
        <motion.div
          className="absolute inset-0 bg-[#1a1a2e]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0 }}
          exit={{
            opacity: 1,
            transition: { 
              duration: 1.2, 
              ease: [0.6, -0.05, 0.01, 0.99],
              delay: 0.3
            }
          }}
        />
      </motion.div>
    </AnimatePresence>
  );
}
