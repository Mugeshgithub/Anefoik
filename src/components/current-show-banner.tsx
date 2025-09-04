'use client';

import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, ExternalLink } from 'lucide-react';
import { currentShow } from '@/config/currentShow';

export default function CurrentShowBanner() {
  // Don't render if no show is active
  if (!currentShow.isActive) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative bg-gradient-to-r from-[#1a1a2e] via-[#2a2a3e] to-[#1a1a2e] border-b border-white/10 backdrop-blur-xl"
    >
      {/* Animated background glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#fbbf24]/10 via-[#a855f7]/10 to-[#fbbf24]/10 opacity-50"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Left side - Show info */}
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center gap-3 mb-2"
            >
              {/* Live indicator */}
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-red-400 uppercase tracking-wide">
                  {currentShow.type === 'live' ? 'Live Now' : 
                   currentShow.type === 'streaming' ? 'Streaming' : 'Recording'}
                </span>
              </div>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-xl md:text-2xl font-light text-white mb-2"
            >
              {currentShow.title}
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-sm text-[#C9C9D0] mb-3"
            >
              {currentShow.description}
            </motion.p>
            
            {/* Collaborating Artists */}
            {currentShow.collaborators && currentShow.collaborators.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="mb-3"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-medium text-[#fbbf24] uppercase tracking-wide">Featuring</span>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  {currentShow.collaborators.map((artist, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-gradient-to-r from-[#a855f7] to-[#fbbf24] rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold text-white">
                          {artist.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="text-sm">
                        <span className="text-white font-medium">{artist.name}</span>
                        <span className="text-[#C9C9D0] ml-1">({artist.role})</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
            
            {/* Show details */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap items-center gap-4 text-sm text-[#C9C9D0]"
            >
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#fbbf24]" />
                <span>{currentShow.date}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#a855f7]" />
                <span>{currentShow.time}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-400" />
                <span>{currentShow.venue}, {currentShow.location}</span>
              </div>
            </motion.div>
          </div>
          
          {/* Right side - Action button */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex-shrink-0"
          >
            <motion.a
              href={currentShow.link}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#fbbf24] to-[#a855f7] text-white font-medium rounded-full hover:shadow-lg hover:shadow-[#fbbf24]/25 transition-all duration-300"
            >
              <ExternalLink className="w-4 h-4" />
              {currentShow.linkText}
            </motion.a>
          </motion.div>
        </div>
      </div>
      
      {/* Bottom border glow */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#fbbf24]/50 to-transparent"></div>
    </motion.div>
  );
}
