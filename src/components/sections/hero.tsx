
'use client'

import { useState, useEffect, useRef } from 'react';
import { Music, Piano, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const musicalNotes: Array<{
      x: number;
      y: number;
      symbol: string;
      rotation: number;
      speed: number;
      opacity: number;
    }> = [];

    // Initialize musical notes
    for (let i = 0; i < 50; i++) {
      musicalNotes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        symbol: ['♪', '♫', '♬', '♩', '♭', '♯'][Math.floor(Math.random() * 6)],
        rotation: Math.random() * 360,
        speed: 0.5 + Math.random() * 1,
        opacity: 0.1 + Math.random() * 0.3
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      musicalNotes.forEach(note => {
        ctx.save();
        ctx.translate(note.x, note.y);
        ctx.rotate((note.rotation * Math.PI) / 180);
        ctx.globalAlpha = note.opacity;
        ctx.font = '24px Arial';
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(note.symbol, 0, 0);
        ctx.restore();

        note.y += note.speed;
        note.rotation += 0.5;
        
        if (note.y > canvas.height) {
          note.y = -20;
        }
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section className="relative py-32 dark-gradient overflow-hidden">
      {/* Animated canvas background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 opacity-30"
        style={{ zIndex: 1 }}
      />

      {/* Glassmorphism overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/20 to-black/40 backdrop-blur-sm" style={{ zIndex: 2 }} />

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="glassmorphism-card rounded-3xl p-6 sm:p-8 md:p-12 max-w-4xl mx-auto">
          {/* Icons */}
          <div className="flex justify-center items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
            <Music className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white" />
            <Piano className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white" />
          </div>

          {/* Main title - Clean white text */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 text-white"
          >
            Anefiok
          </motion.h1>

          {/* Subtitle with colored text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white mb-6 max-w-4xl mx-auto leading-relaxed"
          >
            A{' '}
            <span className="text-yellow-400 font-semibold">keyboardist</span>
            ,{' '}
            <span className="text-purple-400 font-semibold">Producer</span>
            {' '}&{' '}
            <span className="text-blue-400 font-semibold">composer</span>
          </motion.p>

          {/* Genre tags */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="flex flex-wrap justify-center gap-3 mb-8"
          >
            <span className="px-4 py-2 bg-white/10 border border-white/20 rounded-full text-white text-sm">
              Jazz
            </span>
            <span className="px-4 py-2 bg-white/10 border border-white/20 rounded-full text-white text-sm">
              Gospel
            </span>
            <span className="px-4 py-2 bg-white/10 border border-white/20 rounded-full text-white text-sm">
              Pop
            </span>
            <span className="px-4 py-2 bg-white/10 border border-white/20 rounded-full text-white text-sm">
              Contemporary Christian
            </span>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-10"
          >
            Creating soul-stirring melodies that transcend genres and connect hearts through the universal language of music.
          </motion.p>

          {/* Action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="#music"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-white/10 border border-white/20 rounded-full text-white hover:bg-white/20 transition-all duration-300 transform hover:scale-105 hover:bg-white/10 backdrop-blur-sm"
            >
              <Music className="w-5 h-5 group-hover:animate-pulse" />
              Explore Music
            </a>
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-white/10 border border-white/20 rounded-full text-white hover:bg-white/20 transition-all duration-300 transform hover:scale-105 hover:bg-white/10 backdrop-blur-sm"
            >
              <Piano className="w-5 h-5 group-hover:animate-pulse" />
              Book Now
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <a href="#music" className="text-white/60 hover:text-white transition-colors">
          <ChevronDown className="w-8 h-8" />
        </a>
      </div>
    </section>
  );
}
