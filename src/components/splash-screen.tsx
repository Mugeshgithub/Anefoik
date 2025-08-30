
'use client';

import { useEffect, useState } from 'react';
import { Music } from 'lucide-react';

export default function SplashScreen({ isVisible, onFinished }: { isVisible: boolean, onFinished: () => void }) {
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    if (isVisible) {
      // Show logo for 1.5 seconds
      const fadeTimer = setTimeout(() => {
        setIsFading(true);
      }, 1500);

      // Complete fade out after 2 seconds total
      const finishTimer = setTimeout(() => {
        onFinished();
      }, 2000);

      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(finishTimer);
      };
    }
  }, [isVisible, onFinished]);

  if (!isVisible) {
    return null;
  }
  
  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center dark-gradient transition-opacity duration-1000 ease-in-out ${
        isFading ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-slate-900/40 to-black/60 backdrop-blur-sm" />
      
      {/* Content */}
      <div className="relative z-10 text-center">
        <div className="glassmorphism-card rounded-3xl p-12 md:p-16">
          <div className="flex items-center justify-center space-x-4 mb-6">
            <Music className="h-16 w-16 md:h-20 md:w-20 lg:h-24 lg:w-24 text-gold-400 animate-pulse" />
          </div>
          <h1 className="text-6xl font-light text-white tracking-[0.3em] sm:text-7xl md:text-8xl lg:text-9xl"
              style={{
                textShadow: `
                  0 0 30px rgba(255, 255, 255, 0.4),
                  0 0 60px rgba(255, 255, 255, 0.2)
                `
              }}>
            Aniefiok
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-gray-300 mt-6 font-light tracking-wide">
            Musical Portfolio
          </p>
        </div>
      </div>
    </div>
  );
}
