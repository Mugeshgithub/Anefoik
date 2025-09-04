'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Clock, ExternalLink, X, Users } from 'lucide-react';

interface ShowData {
  isActive: boolean;
  title: string;
  date: string;
  time: string;
  venue: string;
  location: string;
  link: string;
  linkText: string;
  type: 'live' | 'streaming' | 'recording';
  description: string;
  collaborators: Array<{
    name: string;
    role: string;
    social: string;
  }>;
}

export default function CollaborationWidget() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showData, setShowData] = useState<ShowData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch show data from API
  useEffect(() => {
    const fetchShowData = async () => {
      try {
        const response = await fetch('/api/show-data');
        if (response.ok) {
          const data = await response.json();
          setShowData(data);
        }
      } catch (error) {
        console.error('Error fetching show data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchShowData();

    // Poll for updates every 5 seconds
    const interval = setInterval(fetchShowData, 5000);
    return () => clearInterval(interval);
  }, []);

  // Don't render if loading
  if (isLoading || !showData) {
    return null;
  }

  // Don't show anything if there's no show
  if (!showData.isActive || !showData.title.trim()) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isExpanded ? (
          // Expanded State
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="w-80 bg-[#1a1a2e]/90 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl"
          >
            {/* Header */}
            <div className="relative p-4 border-b border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-red-400 uppercase tracking-wide">
                      {showData.type === 'live' ? 'Live Now' : 
                       showData.type === 'streaming' ? 'Streaming' : 'Recording'}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setIsExpanded(false)}
                  className="p-1 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X className="w-4 h-4 text-white/70" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              {/* Show Title */}
              <h3 className="text-lg font-light text-white mb-2">
                {showData.title}
              </h3>
              
              {/* Description */}
              <p className="text-sm text-[#C9C9D0] mb-4">
                {showData.description}
              </p>

              {/* Show Details */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-[#C9C9D0]">
                  <Calendar className="w-4 h-4 text-[#fbbf24]" />
                  <span>{showData.date}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-[#C9C9D0]">
                  <Clock className="w-4 h-4 text-[#a855f7]" />
                  <span>{showData.time}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-[#C9C9D0]">
                  <MapPin className="w-4 h-4 text-blue-400" />
                  <span>{showData.venue}, {showData.location}</span>
                </div>
              </div>

              {/* Collaborators */}
              {showData.collaborators && showData.collaborators.length > 0 && (
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-4 h-4 text-[#fbbf24]" />
                    <span className="text-sm font-medium text-[#fbbf24]">Featuring</span>
                  </div>
                  <div className="space-y-2">
                    {showData.collaborators.map((artist, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-[#a855f7] to-[#fbbf24] rounded-full flex items-center justify-center">
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
                </div>
              )}

              {/* Action Button */}
              <motion.a
                href={showData.link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-[#fbbf24] to-[#a855f7] text-white font-medium rounded-xl hover:shadow-lg hover:shadow-[#fbbf24]/25 transition-all duration-300"
              >
                <ExternalLink className="w-4 h-4" />
                {showData.linkText}
              </motion.a>
            </div>
          </motion.div>
        ) : (
          // Collapsed State
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={() => setIsExpanded(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-16 h-16 bg-[#1a1a2e]/80 backdrop-blur-xl rounded-full border border-white/20 shadow-lg hover:shadow-xl hover:shadow-[#fbbf24]/20 transition-all duration-300 flex items-center justify-center relative overflow-hidden group"
          >
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#fbbf24]/10 via-transparent to-[#a855f7]/10 rounded-full" />
            
            {/* Pulsing ring effect */}
            <motion.div
              animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 border border-[#fbbf24]/40 rounded-full"
            />
            
            {/* Content */}
            <div className="relative z-10 text-center">
              {/* Sound wave visualization */}
              <div className="mb-2 flex items-center justify-center gap-1">
                {/* Sound wave bars - up and down like audio waves */}
                <div className="flex items-end gap-1">
                  <motion.div
                    animate={{ height: ["4px", "12px", "4px"] }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                    className="w-1 bg-gradient-to-t from-[#fbbf24] to-[#a855f7] rounded-full"
                  />
                  <motion.div
                    animate={{ height: ["8px", "16px", "8px"] }}
                    transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut", delay: 0.1 }}
                    className="w-1 bg-gradient-to-t from-[#a855f7] to-[#3b82f6] rounded-full"
                  />
                  <motion.div
                    animate={{ height: ["6px", "14px", "6px"] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                    className="w-1 bg-gradient-to-t from-[#3b82f6] to-[#fbbf24] rounded-full"
                  />
                  <motion.div
                    animate={{ height: ["10px", "18px", "10px"] }}
                    transition={{ duration: 1.3, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                    className="w-1 bg-gradient-to-t from-[#fbbf24] to-[#a855f7] rounded-full"
                  />
                  <motion.div
                    animate={{ height: ["5px", "13px", "5px"] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                    className="w-1 bg-gradient-to-t from-[#a855f7] to-[#3b82f6] rounded-full"
                  />
                </div>
              </div>
              
              {/* Clean text */}
              <span className="text-xs font-light text-[#C9C9D0] uppercase tracking-wider group-hover:text-white transition-colors">
                {showData.type === 'live' ? 'LIVE' : 'SHOW'}
              </span>
            </div>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
