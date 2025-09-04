
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu, X, Play, Pause, Music } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const navLinks = [
  { href: '#music', label: 'Music' },
  { href: '#videos', label: 'Videos' },
  { href: '#about', label: 'About' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#journey', label: 'Journey' },
  { href: '#contact', label: 'Contact' },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.3;
    audio.loop = true;
  }, []);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().catch(error => {
        console.error('Failed to play audio:', error);
      });
      setIsPlaying(true);
    }
  };

  return (
    <header className="fixed top-0 z-40 w-full animate-fade-in header-dark-blue border-b border-[#7DD3FC]/20 shadow-lg backdrop-blur-md" style={{minHeight: '64px', backgroundColor: '#0a0a1a', opacity: '1'}}>
       <div className="container flex h-16 md:h-20 items-center justify-between px-4">
         <Link href="/" className="flex items-center space-x-2 group">
            <Music className="h-5 w-5 md:h-6 md:w-6 text-[#7DD3FC] group-hover:text-[#7DD3FC]/80 transition-colors" />
            <span className="text-lg md:text-xl font-bold text-white group-hover:text-[#7DD3FC] transition-colors">
                              Aniefiok
            </span>
         </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-white/80 transition-all duration-300 hover:text-[#7DD3FC] hover:scale-105 relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#7DD3FC] transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
          
          {/* Simple Music Control */}
          <Button
            onClick={toggleMusic}
            variant="ghost"
            size="icon"
            className="w-8 h-8 text-[#7DD3FC] hover:text-[#7DD3FC]/80 hover:bg-[#7DD3FC]/20 rounded-full transition-all duration-300 hover:scale-110"
            title={isPlaying ? 'Pause Music' : 'Play Music'}
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center space-x-2 md:hidden">
          {/* Mobile Music Control */}
          <Button
            onClick={toggleMusic}
            variant="ghost"
            size="icon"
            className="w-8 h-8 text-[#7DD3FC] hover:text-[#7DD3FC]/80 hover:bg-[#7DD3FC]/20 rounded-full transition-all duration-300"
            title={isPlaying ? 'Pause Music' : 'Play Music'}
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="w-8 h-8 text-white hover:text-[#7DD3FC] hover:bg-[#7DD3FC]/10 rounded-full transition-all duration-300"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden header-dark-blue border-b border-[#7DD3FC]/20 shadow-lg" style={{backgroundColor: '#0a0a1a'}}>
          <nav className="container px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-white/80 transition-all duration-300 hover:text-[#7DD3FC] hover:bg-[#7DD3FC]/10 py-2 px-3 rounded-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
      
      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        src="/space-ambient-cinematic-351304.mp3"
        preload="metadata"
      />
    </header>
  );
}
