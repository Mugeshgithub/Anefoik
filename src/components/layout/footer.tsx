'use client'; 

import Link from 'next/link';
import { Music, Piano, Youtube, Globe, Facebook, Linkedin, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative py-16 overflow-hidden bg-[#0a0a1a]">
      <div className="container relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start mb-8">
          <div className="flex items-start gap-6 mb-8 md:mb-0">
            <div className="flex items-center gap-3 mt-1">
              <Music className="w-6 h-6 text-[#fbbf24]" />
              <Piano className="w-6 h-6 text-[#a855f7]" />
              <Music className="w-6 h-6 text-blue-400" />
            </div>
            <div className="flex flex-col">
              <p className="text-sm text-white">Creating melodies</p>
              <p className="text-sm text-white">that touch the soul</p>
              <p className="text-sm text-white">across all genres</p>
              <div className="w-1 h-1 rounded-full mt-2 bg-[#fbbf24]"></div>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-8">
            <div className="flex flex-col gap-3">
              <Link href="#about" className="text-sm text-white hover:text-[#fbbf24] transition-colors">About</Link>
              <Link href="#music" className="text-sm text-white hover:text-[#a855f7] transition-colors">Music</Link>
              <Link href="#videos" className="text-sm text-white hover:text-[#a855f7] transition-colors">Videos</Link>
              <Link href="#contact" className="text-sm text-white hover:text-[#fbbf24] transition-colors">Contact</Link>
            </div>
            <div className="flex flex-col gap-3">
              <h3 className="text-xs font-medium tracking-widest uppercase text-gray-400">SOCIAL</h3>
              <Link href="https://www.youtube.com/@asuquo05" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-white hover:text-red-300 transition-colors">
                <Youtube className="w-4 h-4" />
                YouTube
              </Link>
              <Link href="https://www.facebook.com/aniefiok.asuquo.5" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-white hover:text-blue-600 transition-colors">
                <Facebook className="w-4 h-4" />
                Facebook
              </Link>
              <Link href="https://www.linkedin.com/in/aniefiok-asuquo-76b0a498/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-white hover:text-blue-500 transition-colors">
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </Link>
              <Link href="https://www.instagram.com/emma_asuquo2005/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-white hover:text-pink-400 transition-colors">
                <Instagram className="w-4 h-4" />
                Instagram
              </Link>
              <Link href="https://www.tiktok.com/@manu49903?_t=ZN-8zHsXihH0HG&_r=1" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-white hover:text-black transition-colors">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                </svg>
                TikTok
              </Link>
            </div>
            <div className="flex flex-col gap-3">
              <h3 className="text-xs font-medium tracking-widest uppercase text-gray-400">SERVICES</h3>
              <Link href="https://www.musichopecenter.com/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-white hover:text-blue-300 transition-colors">
                <Globe className="w-4 h-4" />
                Music Classes
              </Link>
              <div className="flex items-center gap-2 text-sm text-[#fbbf24] mt-2">
                <Music className="w-4 h-4" />
                Support the Music
              </div>
            </div>
          </div>
        </div>
        
        <div className="w-full h-px bg-gradient-to-r from-transparent via-[#fbbf24]/30 to-transparent mb-8"></div>
        
        <div className="relative">
          <div className="flex flex-col items-start">
            <h1 className="text-[4rem] md:text-[6rem] font-bold leading-none tracking-tight bg-gradient-to-r from-[#fbbf24] via-[#a855f7] to-blue-400 bg-clip-text text-transparent">
              ANIEFIOK <span className="text-[2rem] md:text-[3rem]">ASUQUO</span>
            </h1>
            <div className="mt-4 text-white text-center">
              <span className="text-sm">© 2025 Aniefiok. All rights reserved.</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
