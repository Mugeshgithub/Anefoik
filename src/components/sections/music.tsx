'use client';

import { useState } from 'react';
import { Play, Youtube, ExternalLink } from 'lucide-react';

export default function Music() {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <section id="music" className="relative min-h-screen bg-slate-900 py-12 sm:py-16 md:py-20">
      {/* Main content container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
            <span className="bg-gradient-to-r from-gold-400 to-yellow-500 bg-clip-text text-transparent">
              Videos
            </span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto">
            Experience the visual journey of Anefiok's musical creations
          </p>
        </div>

        {/* Featured Video - Large */}
        <div className="mb-8 sm:mb-12 md:mb-16">
          <div className="relative group">
            <video
              className="w-full h-[300px] sm:h-[400px] md:h-[600px] lg:h-[700px] object-cover rounded-2xl shadow-2xl"
              poster="/My Pics.jpeg"
              controls
              preload="metadata"
            >
              <source src="/Dont cry V2.4.mov" type="video/quicktime" />
              Your browser does not support the video tag.
            </video>
            
            {/* Video overlay info */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-2xl">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2">Don't Cry V2.4</h3>
              <p className="text-sm sm:text-base text-gray-200">Official Music Video</p>
            </div>
          </div>
        </div>

        {/* Second Video - Smaller */}
        <div className="mb-8 sm:mb-12 md:mb-16">
          <div className="relative group">
            <video
              className="w-full h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px] object-cover rounded-2xl shadow-2xl"
              poster="/My Pics2.jpeg"
              controls
              preload="metadata"
            >
              <source src="/v8 writn in the stars.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            
            {/* Video overlay info */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-2xl">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2">Written in the Stars</h3>
              <p className="text-sm sm:text-base text-gray-200">Official Music Video</p>
            </div>
          </div>
        </div>

        {/* YouTube Channel Section */}
        <div className="text-center">
          <div className="glassmorphism-card p-8 max-w-2xl mx-auto">
            <div className="mb-6">
              <Youtube className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-white mb-4">Subscribe to My Channel</h3>
              <p className="text-gray-300 mb-6">
                Stay updated with the latest music videos, behind-the-scenes content, and exclusive releases
              </p>
            </div>
            
            <a
              href="https://www.youtube.com/@asuquo05"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
            >
              <Youtube className="w-6 h-6" />
              Visit YouTube Channel
              <ExternalLink className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
