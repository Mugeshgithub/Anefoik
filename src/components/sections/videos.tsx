'use client';

import { useState } from 'react';
import { Youtube, ExternalLink } from 'lucide-react';

export default function Videos() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const mainVideos = [
    {
      src: "https://res.cloudinary.com/dkcw46zgg/video/upload/v1756590414/anefiok-music/dviiyvpkfkatudn9r05z.mp4",
      type: "video/mp4",
      title: "Written in the Stars",
      thumbnail: "https://res.cloudinary.com/dkcw46zgg/image/upload/v1756589725/anefiok-music/dvauytjhdiio7dhwyafs.jpg"
    },
    {
      src: "https://res.cloudinary.com/dkcw46zgg/video/upload/v1756589616/anefiok-music/bpr5adnuxxzlpktxvbf4.mp4",
      type: "video/mp4",
      title: "Don't Cry V2.4",
      thumbnail: "https://res.cloudinary.com/dkcw46zgg/image/upload/v1756589723/anefiok-music/mtttpmkc0qia85zmsup4.jpg"
    },
    {
      src: "https://res.cloudinary.com/dkcw46zgg/video/upload/v1756941679/anefiok-music/anefiok-small-file.mp4",
      type: "video/mp4",
      title: "ANIEFIOK Small File",
      thumbnail: "https://res.cloudinary.com/dkcw46zgg/image/upload/v1756951954/anefiok-music/aniefiok-small-file-thumbnail.png"
    }
  ];

  const youtubeVideos = [
    {
      id: "FZyskt4HYl0",
      title: "Seeing the Sunrise",
      thumbnail: `https://img.youtube.com/vi/FZyskt4HYl0/maxresdefault.jpg`
    },
    {
      id: "s1tSp858G0A", 
      title: "OLORUN",
      thumbnail: `https://img.youtube.com/vi/s1tSp858G0A/maxresdefault.jpg`
    }
  ];

  return (
    <section id="videos" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-20 mt-32">
        {/* Main Video Player with Glassmorphism */}
        <div className="max-w-6xl mx-auto">
          <div className="relative">
            {/* Glassmorphism Background Layer */}
            <div className="absolute inset-0 bg-[#1a1a2e]/80 backdrop-blur-xl rounded-2xl shadow-2xl"></div>
            
            {/* Main Video Player with Consistent Sizing */}
            <div className="relative w-full h-[500px] md:h-[600px] rounded-2xl overflow-hidden transition-opacity duration-500">
              <video
                key={currentVideoIndex}
                className="absolute inset-0 w-full h-full object-cover rounded-2xl shadow-2xl transform transition-all duration-700 hover:scale-[1.02] hover:shadow-[0_25px_50px_-12px_rgba(125,211,252,0.3)]"
                controls
                preload="metadata"
                poster={mainVideos[currentVideoIndex].thumbnail}
                onError={(e) => {
                  console.error('Video error:', e);
                  console.log('Current video source:', mainVideos[currentVideoIndex].src);
                  console.log('Video type:', mainVideos[currentVideoIndex].type);
                }}
                onLoadStart={() => console.log('Loading video:', mainVideos[currentVideoIndex].title)}
                onCanPlay={() => console.log('Video can play:', mainVideos[currentVideoIndex].title)}
              >
                <source src={mainVideos[currentVideoIndex].src} type={mainVideos[currentVideoIndex].type} />
                <p className="text-white text-center p-8">
                  Video format not supported. Please try the next video or contact support.
                </p>
              </video>
            </div>
          </div>

          {/* Video Counter */}
          <div className="text-center mt-6">
            <div className="inline-block bg-[#1a1a2e]/90 backdrop-blur-xl px-6 py-3 rounded-full text-[#EDEDED] font-light shadow-lg">
              {currentVideoIndex + 1} of {mainVideos.length}
            </div>
          </div>
        </div>

        {/* YouTube Videos Section */}
        <div className="max-w-6xl mx-auto mt-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-light mb-4" style={{
              background: 'linear-gradient(135deg, #fbbf24 0%, #a855f7 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              More Videos on YouTube
            </h3>
          </div>

          {/* YouTube Videos Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {youtubeVideos.map((video, index) => (
              <div key={video.id} className="group relative overflow-hidden rounded-xl bg-[#1a1a2e]/60 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-[1.02]">
                <div className="relative aspect-video">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
                  
                  {/* Play Button Overlay - White Play Button */}
                  <a 
                    href={`https://www.youtube.com/watch?v=${video.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 flex items-center justify-center group-hover:scale-110 transition-all duration-300"
                  >
                    <svg className="w-16 h-16 text-white opacity-80 group-hover:opacity-100 transition-opacity duration-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </a>
                </div>
                
                <div className="p-4">
                  <h4 className="text-white font-medium mb-2 group-hover:text-[#fbbf24] transition-colors duration-300">
                    {video.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>

          {/* Check Out More on YouTube Button */}
          <div className="text-center">
            <a 
              href="https://www.youtube.com/@asuquo05"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#1a1a2e]/80 backdrop-blur-xl border border-white/20 rounded-full text-white hover:bg-white/20 hover:border-white/30 transition-all duration-300 transform hover:scale-105 group"
            >
              <Youtube className="w-6 h-6 text-[#fbbf24] group-hover:text-[#f59e0b] transition-colors duration-300" />
              <span className="text-lg font-medium">Check out more on YouTube</span>
              <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-300" />
            </a>
          </div>
        </div>
      </div>

      {/* Navigation Controls - Positioned Above Video Progress Bar */}
      <button
        onClick={() => setCurrentVideoIndex((prev) => (prev - 1 + mainVideos.length) % mainVideos.length)}
        className="absolute top-1/3 left-4 md:left-8 transform -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/20 transition-all duration-300 hover:scale-110 z-30 shadow-lg"
      >
        ←
      </button>
      
      <button
        onClick={() => setCurrentVideoIndex((prev) => (prev + 1) % mainVideos.length)}
        className="absolute top-1/3 right-4 md:right-8 transform -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/20 transition-all duration-300 hover:scale-110 z-30 shadow-lg"
      >
        →
      </button>
    </section>
  );
}
