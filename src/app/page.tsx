'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Music, Piano, Headphones, Play, Pause, ChevronLeft, ChevronRight, Mail, Phone, MapPin, Instagram, Twitter, Facebook, ChevronUp, ChevronDown, Volume2, SkipBack, SkipForward, Youtube, Linkedin } from 'lucide-react';
import Videos from '@/components/sections/videos';
import ContactChatbot from '@/components/contact-chatbot';
import Footer from '@/components/layout/footer';
import { LoadingScreen } from '@/components/loading-screen';
import { submitContactForm } from './actions';
import emailjs from '@emailjs/browser';

export default function Home() {
  
  // Helper function to parse duration strings
  const parseDuration = (durationString: string) => {
    const [minutes, seconds] = durationString.split(':').map(Number);
    return minutes * 60 + seconds;
  };
  
  const [currentSection, setCurrentSection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [showLanding, setShowLanding] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  
  // Separate state for left player
  const [leftPlayerPlaying, setLeftPlayerPlaying] = useState(false);
  const [leftPlayerTime, setLeftPlayerTime] = useState(0);
  const [leftPlayerDuration, setLeftPlayerDuration] = useState(parseDuration("3:45")); // Written in the Stars duration
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [threadAnimation, setThreadAnimation] = useState(0);
  const [videoColorTransition, setVideoColorTransition] = useState(false);
  const [showWaveTransition, setShowWaveTransition] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formMessage, setFormMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);
  const audioRef = useRef<HTMLAudioElement>(null);
  const leftAudioRef = useRef<HTMLAudioElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Animation variants for staggered section reveals
  const sectionVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99],
        staggerChildren: 0.2
      }
    }
  };

  // Enhanced hover animations for interactive elements
  const hoverVariants = {
    hover: {
      scale: 1.05,
      y: -5,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    tap: {
      scale: 0.95,
      transition: {
        duration: 0.1
      }
    }
  };

  // Enhanced scroll animations for continuous engagement
  const enhancedSectionVariants = {
    hidden: { 
      opacity: 0, 
      y: 60,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 1,
        ease: [0.6, -0.05, 0.01, 0.99],
        staggerChildren: 0.15
      }
    },
    exit: {
      opacity: 0,
      y: -30,
      scale: 0.95,
      transition: {
        duration: 0.5
      }
    }
  };

  // Scroll-triggered background animations
  const backgroundVariants = {
    hidden: { 
      opacity: 0,
      scale: 1.1
    },
    visible: { 
      opacity: 1,
      scale: 1,
      transition: {
        duration: 2,
        ease: "easeOut"
      }
    }
  };

  // Floating animation for continuous engagement
  const floatingVariants = {
    float: {
      y: [-10, 10, -10],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };

  const heroVariants = {
    hidden: { 
      opacity: 0, 
      y: 100,
      scale: 0.8
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 1.2,
        ease: [0.6, -0.05, 0.01, 0.99],
        staggerChildren: 0.3
      }
    }
  };

  // Scroll-reactive transforms for About section
  const aboutScale = useTransform(scrollYProgress, [0, 0.5], [0.3, 1.2]);
  const aboutRotate = useTransform(scrollYProgress, [0, 0.5], [0, 180]);
  const aboutOpacity = useTransform(scrollYProgress, [0, 0.3], [0.2, 0.8]);
  const aboutCenterScale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1.8]);
  const aboutGridOpacity = useTransform(scrollYProgress, [0, 0.5], [0.1, 0.4]);
  const aboutGridSize = useTransform(scrollYProgress, [0, 0.5], ['150px 150px', '50px 50px']);
  const aboutElement1Y = useTransform(scrollYProgress, [0, 0.5], [0, -50]);
  const aboutElement1Rotate = useTransform(scrollYProgress, [0, 0.5], [0, 360]);
  const aboutElement1Scale = useTransform(scrollYProgress, [0, 0.5], [0.5, 1.2]);
  const aboutElement2Y = useTransform(scrollYProgress, [0, 0.5], [0, 40]);
  const aboutElement2Rotate = useTransform(scrollYProgress, [0, 0.5], [45, 225]);
  const aboutElement2Scale = useTransform(scrollYProgress, [0, 0.5], [0.7, 1.3]);

  // Scroll-reactive transforms for Music section
  const musicNoteScale = useTransform(scrollYProgress, [0.2, 0.7], [0.5, 1.5]);
  const musicNoteRotate = useTransform(scrollYProgress, [0.2, 0.7], [0, 90]);
  const musicNoteX = useTransform(scrollYProgress, [0.2, 0.7], [0, 100]);
  const musicElement1Y = useTransform(scrollYProgress, [0.2, 0.7], [0, -80]);
  const musicElement1Rotate = useTransform(scrollYProgress, [0.2, 0.7], [0, 180]);
  const musicElement1Scale = useTransform(scrollYProgress, [0.2, 0.7], [0.8, 1.4]);
  const musicElement2Y = useTransform(scrollYProgress, [0.2, 0.7], [0, 60]);
  const musicElement2Rotate = useTransform(scrollYProgress, [0.2, 0.7], [45, 315]);
  const musicElement2Scale = useTransform(scrollYProgress, [0.2, 0.7], [0.6, 1.2]);
  const musicGridOpacity = useTransform(scrollYProgress, [0.2, 0.7], [0.1, 0.5]);
  const musicGridSize = useTransform(scrollYProgress, [0.2, 0.7], ['120px 120px', '40px 40px']);



  // Contact form submission handler
  const handleContactSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setFormMessage(null);
    
    try {
      const formData = new FormData(event.currentTarget);
      const name = formData.get('name') as string;
      const email = formData.get('email') as string;
      const message = formData.get('message') as string;

      // Validate form data
      if (!name || name.length < 2) {
        setFormMessage({ type: 'error', text: 'Name must be at least 2 characters.' });
        return;
      }
      if (!email || !email.includes('@')) {
        setFormMessage({ type: 'error', text: 'Please enter a valid email address.' });
        return;
      }
      // Message is now optional - no validation needed

      // Send email using Formspree (like Wix/Framer)
      const response = await fetch('https://formspree.io/f/mwpnkkoe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          email: email,
          message: message,
        }),
      });

      if (response.ok) {
        setFormMessage({ type: 'success', text: 'Thank you! Your message has been sent successfully.' });
        // Reset form safely
        const form = event.currentTarget;
        if (form && form.reset) {
          form.reset();
        }
      } else {
        setFormMessage({ type: 'error', text: 'Failed to send message. Please try again.' });
      }
    } catch (error) {
      console.error('Form error:', error);
      setFormMessage({ type: 'error', text: 'Something went wrong. Please try again later.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Wave Loop scrolling to section with infinite loop
  const scrollToSection = (sectionIndex: number) => {
    if (isScrolling) return;
    
    setIsScrolling(true);
    
    // Handle infinite loop - wrap around sections
    let actualIndex = sectionIndex;
    if (sectionIndex < 0) {
      actualIndex = 5; // Go to last section (Contact)
    } else if (sectionIndex >= 6) {
      actualIndex = 0; // Go to first section (Hero)
    }
    
    // Show wave transition effect
    setShowWaveTransition(true);
    
    // Animate thread to highlight current section
    setThreadAnimation(actualIndex);
    setCurrentSection(actualIndex);
    
    const targetSection = sectionsRef.current[actualIndex];
    if (targetSection) {
      // Use native smooth scrolling for better trackpad response
      targetSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
      
      // Hide wave effect and reset scrolling after animation
      setTimeout(() => {
        setShowWaveTransition(false);
        setIsScrolling(false);
      }, 600); // Further reduced to 600ms for better responsiveness
    } else {
      setTimeout(() => {
        setShowWaveTransition(false);
        setIsScrolling(false);
      }, 200);
    }
  };

  // Keyboard navigation for sections with infinite loop
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isScrolling) return;
      
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          scrollToSection(currentSection + 1); // Will loop to first section
          break;
        case 'ArrowUp':
          e.preventDefault();
          scrollToSection(currentSection - 1); // Will loop to last section
          break;
        case 'Home':
          e.preventDefault();
          scrollToSection(0);
          break;
        case 'End':
          e.preventDefault();
          scrollToSection(5);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSection, isScrolling]);

  // Simplified wheel navigation - Only for section jumping
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isScrolling) return;
      
      // Only handle wheel events for section jumping, not for normal scrolling
      // This prevents interference with trackpad scrolling
    };

    // Remove wheel event listener to allow natural trackpad scrolling
    return () => {};
  }, [currentSection, isScrolling]);

  // Thread animation based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const scrollTop = containerRef.current.scrollTop;
        const windowHeight = window.innerHeight;
        const sectionIndex = Math.floor(scrollTop / windowHeight);
        const newSection = Math.min(sectionIndex, sectionsRef.current.length - 1);
        
        // Always update thread animation and current section based on scroll position
        // This ensures dots move smoothly as you scroll
        setThreadAnimation(newSection);
        setCurrentSection(newSection);
      }
    };

    const container = containerRef.current;
    if (container) {
      // Use passive: true for better performance
      container.addEventListener('scroll', handleScroll, { passive: true });
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []); // Remove currentSection dependency to allow continuous updates

  // Audio control functions
  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const changeTrack = (direction: number) => {
    let newIndex = currentTrackIndex + direction;
    
    // Handle circular navigation
    if (newIndex < 0) {
      newIndex = musicTracks.length - 1;
    } else if (newIndex >= musicTracks.length) {
      newIndex = 0;
    }
    
    setCurrentTrackIndex(newIndex);
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const goToTrack = (trackIndex: number) => {
    // Prevent rapid successive calls to the same track
    if (trackIndex === currentTrackIndex) return;
    
    if (trackIndex >= 0 && trackIndex < musicTracks.length) {
      setCurrentTrackIndex(trackIndex);
      setIsPlaying(false);
      setCurrentTime(0);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };





  // Audio event handlers
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const updateTime = () => {
        console.log('Time update:', audio.currentTime, 'Duration:', audio.duration);
        setCurrentTime(audio.currentTime);
      };
      const updateDuration = () => {
        console.log('Duration loaded:', audio.duration);
        setDuration(audio.duration);
      };
      const handleEnded = () => {
        console.log('Track ended');
        setIsPlaying(false);
        setCurrentTime(0);
        // Auto advance to next track
        changeTrack(1);
      };

      audio.addEventListener('timeupdate', updateTime);
      audio.addEventListener('loadedmetadata', updateDuration);
      audio.addEventListener('ended', handleEnded);

      return () => {
        audio.removeEventListener('timeupdate', updateTime);
        audio.removeEventListener('loadedmetadata', updateDuration);
        audio.removeEventListener('ended', handleEnded);
      };
    }
  }, [currentTrackIndex]);

  // Left player audio event handlers
  useEffect(() => {
    const leftAudio = leftAudioRef.current;
    if (leftAudio) {
      const updateLeftTime = () => {
        console.log('Left audio time update:', leftAudio.currentTime);
        setLeftPlayerTime(leftAudio.currentTime);
      };
      const updateLeftDuration = () => {
        console.log('Left audio duration loaded:', leftAudio.duration);
        if (leftAudio.duration && !isNaN(leftAudio.duration)) {
          setLeftPlayerDuration(leftAudio.duration);
        }
      };
      const handleLeftEnded = () => {
        setLeftPlayerPlaying(false);
        setLeftPlayerTime(0);
      };
      const handleLeftCanPlay = () => {
        console.log('Left audio can play, duration:', leftAudio.duration);
        if (leftAudio.duration && !isNaN(leftAudio.duration)) {
          setLeftPlayerDuration(leftAudio.duration);
        }
      };
      const handleLeftLoadStart = () => {
        console.log('Left audio load start');
        leftAudio.load();
      };
      const handleLeftLoadedData = () => {
        console.log('Left audio loaded data, duration:', leftAudio.duration);
        if (leftAudio.duration && !isNaN(leftAudio.duration)) {
          setLeftPlayerDuration(leftAudio.duration);
        }
      };

      // Force load the audio to get duration
      leftAudio.load();
      
      leftAudio.addEventListener('timeupdate', updateLeftTime);
      leftAudio.addEventListener('loadedmetadata', updateLeftDuration);
      leftAudio.addEventListener('ended', handleLeftEnded);
      leftAudio.addEventListener('canplay', handleLeftCanPlay);
      leftAudio.addEventListener('loadstart', handleLeftLoadStart);
      leftAudio.addEventListener('loadeddata', handleLeftLoadedData);

      return () => {
        leftAudio.removeEventListener('timeupdate', updateLeftTime);
        leftAudio.removeEventListener('loadedmetadata', updateLeftDuration);
        leftAudio.removeEventListener('ended', handleLeftEnded);
        leftAudio.removeEventListener('canplay', handleLeftCanPlay);
        leftAudio.removeEventListener('loadstart', handleLeftLoadStart);
        leftAudio.removeEventListener('loadeddata', handleLeftLoadedData);
      };
    }
  }, []);

  // Dedicated timer effect for left player
  useEffect(() => {
    let timerInterval: NodeJS.Timeout;
    
    if (leftPlayerPlaying) {
      timerInterval = setInterval(() => {
        if (leftAudioRef.current && !leftAudioRef.current.paused) {
          const currentTime = leftAudioRef.current.currentTime;
          const duration = leftAudioRef.current.duration;
          
          console.log('Timer update - Current:', currentTime, 'Duration:', duration);
          
          setLeftPlayerTime(currentTime);
          
          if (duration && !isNaN(duration)) {
            setLeftPlayerDuration(duration);
          }
        }
      }, 100);
    }

    return () => {
      if (timerInterval) {
        clearInterval(timerInterval);
      }
    };
  }, [leftPlayerPlaying]);

  // Update main audio source when track changes
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.src = musicTracks[currentTrackIndex].audioUrl;
      audio.load(); // Force reload
      console.log('Main audio source updated to:', musicTracks[currentTrackIndex].audioUrl);
    }
  }, [currentTrackIndex]);

  // Ensure left audio source is set correctly
  useEffect(() => {
    const leftAudio = leftAudioRef.current;
    if (leftAudio && musicTracks.length > 1) {
              leftAudio.src = musicTracks[1].audioUrl; // "Written in the Stars"
      leftAudio.load();
      console.log('Left audio source set to:', leftAudio.src);
      
      // Set up interval to update time every 100ms for smoother timer
      const timeInterval = setInterval(() => {
        if (leftAudio && !leftAudio.paused) {
          setLeftPlayerTime(leftAudio.currentTime);
        }
      }, 100);
      
      return () => clearInterval(timeInterval);
    }
  }, []);

  // Music keyboard controls
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Only handle music controls when not in section navigation mode
      if (isScrolling) return;
      
      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault();
          changeTrack(-1);
          break;
        case 'ArrowRight':
          event.preventDefault();
          changeTrack(1);
          break;
        case ' ':
          event.preventDefault();
          togglePlayPause();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentTrackIndex, isScrolling]);

  // Anefiok's Music Collection - Now using Cloudinary URLs
  const musicTracks = [
    { 
      id: 1,
      title: "The Greatest Story", 
      genre: "Gospel", 
      duration: "4:15",
      composer: "Anefiok",
      year: "2024",
      description: "A powerful gospel anthem that tells the greatest story ever told with soul-stirring melodies",
      color: "#a7c7e7", // Light blue
      audioUrl: "https://res.cloudinary.com/dkcw46zgg/video/upload/v1756589699/anefiok-music/jaystxf8z6pb1dpxiayf.wav",
      coverImage: "https://res.cloudinary.com/dkcw46zgg/image/upload/v1756589727/anefiok-music/e2tvxhy9btjesmtrwvhw.jpg"
    },
    { 
      id: 2,
      title: "Written in the Stars", 
      genre: "Contemporary", 
      duration: "3:45",
      composer: "Anefiok",
      year: "2024",
      description: "A celestial composition that captures the magic of destiny and cosmic connections",
      color: "#e1c5c0", // Light rose
      audioUrl: "https://res.cloudinary.com/dkcw46zgg/video/upload/v1756589719/anefiok-music/kmaeffbydsbcactcgubw.wav",
      coverImage: "https://res.cloudinary.com/dkcw46zgg/image/upload/v1756589728/anefiok-music/v9zw8iriorohnkpjxbch.jpg"
    },
    { 
      id: 3,
      title: "My Life Just Begun", 
      genre: "Inspirational", 
      duration: "4:30",
      composer: "Anefiok",
      year: "2024",
      description: "An uplifting anthem about new beginnings and the journey of life ahead",
      color: "#8a9a5b", // Olive green
      audioUrl: "https://res.cloudinary.com/dkcw46zgg/video/upload/v1756589688/anefiok-music/odtvansgskt4rp5jnrxi.wav",
      coverImage: "https://res.cloudinary.com/dkcw46zgg/image/upload/v1756589730/anefiok-music/moafixtfmjhbe87qxy7j.jpg"
    },
    { 
      id: 4,
      title: "Nature Song", 
      genre: "Ambient", 
      duration: "3:20",
      composer: "Anefiok",
      year: "2024",
      description: "A peaceful ambient piece that connects with the natural world and inner peace",
      color: "#9caf88", // Sage green
      audioUrl: "https://res.cloudinary.com/dkcw46zgg/video/upload/v1756589711/anefiok-music/qr4vat3vvla1rnqqom4f.wav",
      coverImage: "https://res.cloudinary.com/dkcw46zgg/image/upload/v1756589726/anefiok-music/iyynq7awdsrr6i0vj5be.jpg"
    },
    { 
      id: 5,
      title: "Don't Cry", 
      genre: "Emotional", 
      duration: "4:05",
      composer: "Anefiok",
      year: "2024",
      description: "A deeply emotional ballad that speaks to the heart and soothes the soul",
      color: "#faf9f6", // Off-white with accent
      audioUrl: "https://res.cloudinary.com/dkcw46zgg/video/upload/v1756589678/anefiok-music/vms4zuls90dl05lnf6he.wav",
      coverImage: "https://res.cloudinary.com/dkcw46zgg/image/upload/v1756589723/anefiok-music/mtttpmkc0qia85zmsup4.jpg"
    }
  ];

  if (!showLanding) {
    return <LoadingScreen onComplete={() => setShowLanding(true)} />;
  }

  // Main Portfolio with Smooth Scrolling
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 1.5, 
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: 0.3
      }}
    >
      <div ref={containerRef} className="relative bg-[#0B0B0C] overflow-y-auto overflow-x-hidden transition-colors duration-300 h-screen pb-32 md:pb-0">
      
      {/* Hidden audio elements - Must be at top level */}
      <audio 
        ref={audioRef} 
        src={musicTracks[currentTrackIndex].audioUrl}
        preload="metadata"
        onError={(e) => {
          console.error('Main audio error:', e);
          console.log('Failed to load audio:', musicTracks[currentTrackIndex].audioUrl);
        }}
        onLoadStart={() => {
          console.log('Loading main audio:', musicTracks[currentTrackIndex].audioUrl);
        }}
        onCanPlay={() => {
          console.log('Main audio can play:', musicTracks[currentTrackIndex].title);
        }}
      />
      
      {/* Hidden audio element for left player - Always plays "Written in the Stars" */}
      <audio 
        ref={leftAudioRef} 
        src={musicTracks[1].audioUrl}
        preload="auto"
        crossOrigin="anonymous"
        onError={(e) => {
          console.error('Left player audio error:', e);
          console.log('Failed to load left player audio:', musicTracks[1].audioUrl);
        }}
        onLoadStart={() => {
          console.log('Loading left player audio:', musicTracks[1].audioUrl);
        }}
        onCanPlay={() => {
          console.log('Left player audio can play:', musicTracks[1].title);
          console.log('Audio duration:', leftAudioRef.current?.duration);
        }}
        onLoadedMetadata={() => {
          console.log('Left player metadata loaded, duration:', leftAudioRef.current?.duration);
          if (leftAudioRef.current?.duration && !isNaN(leftAudioRef.current.duration)) {
            setLeftPlayerDuration(leftAudioRef.current.duration);
          }
        }}
        onTimeUpdate={() => {
          if (leftAudioRef.current) {
            setLeftPlayerTime(leftAudioRef.current.currentTime);
          }
        }}
      />




            {/* Left-side Fixed Music Player */}
      <div className="fixed left-0 top-1/2 transform -translate-y-1/2 z-50 hidden sm:block">
        <div className="bg-[#1a1a2e]/80 backdrop-blur-xl rounded-r-2xl p-4 shadow-2xl border-r border-t border-b border-white/20">
          {/* Player Header */}
          <div className="text-center mb-4">
            <div className="w-3 h-3 bg-[#fbbf24] rounded-full mx-auto mb-2 animate-pulse"></div>
            <h3 className="text-sm font-medium bg-gradient-to-r from-[#8a9a5b] via-[#e1c5c0] to-[#a7c7e7] bg-clip-text text-transparent">Streaming Now</h3>
          </div>
          
          {/* Track Info */}
          <div className="text-center mb-4">
            <h4 className="text-sm font-semibold text-white mb-1">Written in the Stars</h4>
          </div>
          
          {/* Time Display */}
          <div className="text-center mb-4">
            <span className="text-xs text-[#C9C9D0]">
              {formatTime(leftPlayerTime)} / {formatTime(leftPlayerDuration)}
            </span>
          </div>
          
          {/* Controls */}
          <div className="flex justify-center items-center gap-3">
            <button
              onClick={() => {
                if (leftAudioRef.current) {
                  leftAudioRef.current.currentTime = Math.max(0, leftAudioRef.current.currentTime - 10);
                }
              }}
              className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
            >
              <SkipBack className="w-4 h-4" />
            </button>
            
            <button
              onClick={() => {
                if (leftAudioRef.current) {
                  if (leftPlayerPlaying) {
                    leftAudioRef.current.pause();
                    setLeftPlayerPlaying(false);
                  } else {
                    leftAudioRef.current.play();
                    setLeftPlayerPlaying(true);
                  }
                }
              }}
              className="w-10 h-10 bg-[#1a1a2e]/70 hover:bg-[#2a2a3e]/80 rounded-full flex items-center justify-center text-white transition-colors border border-white/20 backdrop-blur-sm"
            >
              {leftPlayerPlaying ? (
                <div className="flex gap-1">
                  <div className="w-1.5 h-4 bg-white rounded-sm"></div>
                  <div className="w-1.5 h-4 bg-white rounded-sm"></div>
                </div>
              ) : (
                <div className="w-0 h-0 border-l-[8px] border-l-white border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent ml-0.5"></div>
              )}
            </button>
            
            <button
              onClick={() => {
                if (leftAudioRef.current) {
                  leftAudioRef.current.currentTime = Math.min(leftPlayerDuration, leftAudioRef.current.currentTime + 10);
                }
              }}
              className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
            >
              <SkipForward className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Right-side Progress Navigation */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 hidden sm:block">
        <div className="flex flex-col items-center space-y-3">
          {[...Array(6)].map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToSection(index)}
              className={`w-2 h-2 rounded-full transition-all duration-150 cursor-pointer ${
                index === currentSection 
                  ? 'bg-white scale-110 ring-1 ring-white/30 shadow-lg' 
                  : 'bg-white/40 hover:bg-white/70 hover:scale-105'
              }`}
              title={`Section ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Mobile Bottom Navigation Bar - Hidden on larger screens */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-black/80 backdrop-blur-xl border-t border-white/20 md:hidden">
        <div className="flex justify-around items-center py-3 px-4">
          {['Hero', 'About', 'Music', 'Gallery', 'Videos', 'Contact'].map((section, index) => (
            <button
              key={index}
              onClick={() => scrollToSection(index)}
              className={`text-xs font-medium px-3 py-2 rounded-lg transition-all duration-200 ${
                index === currentSection
                  ? 'bg-white text-black'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              {section}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Music Player Bar - Only on very small screens */}
      <div className="fixed bottom-16 left-0 right-0 z-30 bg-black/90 backdrop-blur-xl border-t border-white/20 md:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Track Info */}
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
              <Music className="w-5 h-5 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="text-sm font-semibold text-white truncate">Written in the Stars</h4>
              <p className="text-xs text-gray-300 truncate">Anefiok</p>
            </div>
          </div>
          
          {/* Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (leftAudioRef.current) {
                  leftAudioRef.current.currentTime = Math.max(0, leftAudioRef.current.currentTime - 10);
                }
              }}
              className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
            >
              <SkipBack className="w-4 h-4" />
            </button>
            
            <button
              onClick={() => {
                if (leftAudioRef.current) {
                  if (leftPlayerPlaying) {
                    leftAudioRef.current.pause();
                    setLeftPlayerPlaying(false);
                  } else {
                    leftAudioRef.current.play();
                    setLeftPlayerPlaying(true);
                  }
                }
              }}
              className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors"
            >
              {leftPlayerPlaying ? (
                <div className="flex gap-1">
                  <div className="w-1.5 h-4 bg-white rounded-sm"></div>
                  <div className="w-1.5 h-4 bg-white rounded-sm"></div>
                </div>
              ) : (
                <div className="w-0 h-0 border-l-[8px] border-l-white border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent ml-0.5"></div>
              )}
            </button>
            
            <button
              onClick={() => {
                if (leftAudioRef.current) {
                  leftAudioRef.current.currentTime = Math.min(leftPlayerDuration, leftAudioRef.current.currentTime + 10);
                }
              }}
              className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
            >
              <SkipForward className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>



      {/* Hero Section */}
      <section 
        ref={(el: HTMLDivElement | null) => { sectionsRef.current[0] = el; }}
        className="h-screen flex items-center justify-center relative overflow-hidden bg-[#0B0B0C] transition-colors duration-300"
      >
        {/* Navigation Header - Fixed */}
        <div className="fixed top-0 left-0 right-0 z-50 p-6">
          <div className="flex justify-between items-center">
            {/* Left - Anefiok Logo/Name - Clickable */}
            <motion.button
              onClick={() => scrollToSection(0)}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg font-light tracking-wider hover:text-gray-300 transition-colors cursor-pointer"
              style={{
                background: 'linear-gradient(135deg, #fbbf24 0%, #a855f7 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              Anefiok
            </motion.button>

            {/* Right - Navigation Dropdown */}
            <div className="flex items-center gap-4">
              {/* Navigation Dropdown */}
              <div className="relative group">
                <motion.button
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="flex items-center justify-center w-10 h-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white hover:bg-white/20 transition-all duration-300"
                >
                  <motion.div
                    animate={{ rotate: 0 }}
                    className="group-hover:rotate-180 transition-transform duration-300"
                  >
                    ▼
                  </motion.div>
                </motion.button>

                {/* Dropdown Menu */}
                <div className="absolute right-0 top-full mt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top">
                  <div className="glassmorphism-card p-2 backdrop-blur-md border border-white/20 rounded-lg">
                    {[
                      { name: 'About', index: 1 },
                      { name: 'Music', index: 2 },
                      { name: 'Videos', index: 3 },
                      { name: 'Contact', index: 4 },
                      { name: 'Footer', index: 5 }
                    ].map((item) => (
                      <motion.button
                        key={item.name}
                        onClick={() => scrollToSection(item.index)}
                        className="w-full text-left px-4 py-3 text-white hover:bg-white/10 rounded-md transition-colors duration-200 flex items-center justify-between group/item"
                        whileHover={{ x: 5 }}
                      >
                        <span>{item.name}</span>
                        <motion.div
                          className="opacity-0 group-hover/item:opacity-100 transition-opacity duration-200"
                          initial={{ x: -10 }}
                          animate={{ x: 0 }}
                        >
                          →
                        </motion.div>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Simple Natural Wave Effect */}
        {showWaveTransition && (
          <motion.div
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: -20 }}
            exit={{ opacity: 0, y: 0 }}
            className="absolute inset-0 z-40 pointer-events-none"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-transparent" />
            <div className="absolute inset-0">
              {/* Simple Wave Lines */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  style={{
                    top: `${30 + i * 20}%`,
                    transform: 'translateX(-100%)'
                  }}
                  animate={{
                    x: ['-100%', '100%']
                  }}
                  transition={{
                    duration: 2,
                    delay: i * 0.3,
                    ease: "easeInOut",
                    repeat: 1,
                    repeatType: "reverse"
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}



        {/* Video Background - Enhanced with Blur to Clear Transition */}
        <div className="absolute inset-0">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover transition-all duration-5000 high-quality-video video-sharpness"
            style={{ 
              filter: `
                brightness(1.05) 
                contrast(1.15) 
                saturate(1.0)
                blur(${videoLoaded ? 0 : 20}px)
              `,
              opacity: videoLoaded ? 1 : 0,
              transform: `scale(${videoLoaded ? 1.02 : 1.05})`,
              transformOrigin: 'center center'
            }}
            onLoadedData={() => {
              setVideoLoaded(true);
              // Start color transition after 1.5 seconds
              setTimeout(() => setVideoColorTransition(true), 1500);
            }}
            onError={() => setVideoLoaded(true)} // Fallback if video fails
          >
            <source src="https://res.cloudinary.com/dkcw46zgg/video/upload/v1756589485/anefiok-music/wo1m7vdefsie81reyvrr.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          {/* Enhanced Quality Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/10" />
          
          {/* Dynamic overlay that fades from blur to clear */}
          <motion.div 
            className="absolute inset-0 bg-black/30"
            initial={{ opacity: 1 }}
            animate={{ opacity: videoColorTransition ? 0.05 : 0.4 }}
            transition={{ duration: 4, delay: 0, ease: "easeOut" }}
          />
          
          {/* Sharpness Enhancement Layer */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-30" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent opacity-30" />
          </div>
        </div>

        {/* Subtle Natural Transition Effect */}
        {videoColorTransition && (
          <motion.div
            className="absolute inset-0 pointer-events-none z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.1, 0] }}
            transition={{ 
              duration: 3, 
              delay: 0,
              times: [0, 0.5, 1]
            }}
          >
            {/* Gentle natural light overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent" />
          </motion.div>
        )}

        {/* Centered Text Only */}
        <motion.div 
          className="relative z-10 text-center px-4"
          variants={heroVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl lg:text-7xl font-light tracking-[0.3em] text-white"
            style={{
              textShadow: '0 0 30px rgba(255, 255, 255, 0.4)'
            }}
          >
            {/* Natural Morphing Letters */}
            {['A', 'n', 'e', 'f', 'i', 'o', 'k'].map((letter, index) => (
              <motion.span
                key={index}
                className="inline-block"
                initial={{ 
                  opacity: 0,
                  scale: 0,
                  rotate: Math.random() * 360,
                  filter: 'blur(10px)'
                }}
                animate={{ 
                  opacity: 1,
                  scale: 1,
                  rotate: 0,
                  filter: 'blur(0px)'
                }}
                transition={{
                  duration: 1.5,
                  delay: 1 + (index * 0.2),
                  ease: [0.25, 0.46, 0.45, 0.94], // Custom easing for smooth morph
                  type: "spring",
                  stiffness: 100,
                  damping: 15
                }}
                style={{
                  transformOrigin: 'center center',
                  textShadow: `
                    0 0 30px rgba(255, 255, 255, 0.4),
                    0 0 60px rgba(255, 255, 255, 0.2)
                  `
                }}
                whileHover={{
                  scale: 1.1,
                  transition: { duration: 0.3 }
                }}
              >
                {letter}
              </motion.span>
            ))}
          </motion.h1>

          {/* Subtitle with colored text - Same font style as hero */}
          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light tracking-[0.2em] mt-8 max-w-4xl mx-auto leading-relaxed text-white"
          >
            A keyboardist, Producer & composer
          </motion.p>
        </motion.div>
      </section>

      {/* About Section */}
      <motion.section 
        ref={(el: HTMLDivElement | null) => { sectionsRef.current[1] = el; }}
        className="min-h-screen flex items-center justify-center relative py-4 overflow-hidden bg-[#1a1a2e]"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ margin: "-100px" }}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            {/* Left Side - Who I Am Title */}
            <motion.div 
              className="space-y-6"
              variants={itemVariants}
            >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl lg:text-7xl font-light leading-tight" style={{
            background: 'linear-gradient(135deg, #fbbf24 0%, #a855f7 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textShadow: '0 0 30px rgba(251, 191, 36, 0.3)'
          }}>
            Who Am I
          </h1>
                             <p className="text-base sm:text-lg md:text-xl text-[#C9C9D0]">The story behind the music</p>
        </motion.div>

            {/* Right Side - Content */}
            <div className="space-y-6">
            <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
                className="space-y-4"
            >
              <p className="text-sm sm:text-base md:text-lg leading-relaxed text-[#C9C9D0]">
                I'm Anefiok — a keyboardist, composer, and producer.
              </p>
              <p className="text-sm sm:text-base md:text-lg leading-relaxed text-[#C9C9D0]">
                My journey started in church, where I first discovered the joy of music.
              </p>
              <p className="text-sm sm:text-base md:text-lg leading-relaxed text-[#C9C9D0]">
                Since then, I've explored jazz, pop, gospel, and everything in between.
              </p>
              <p className="text-sm sm:text-base md:text-lg leading-relaxed text-[#C9C9D0]">
                For me, music isn't about genres — it's about moments.
              </p>
              <p className="text-sm sm:text-base md:text-lg leading-relaxed text-[#C9C9D0]">
                Moments that stay with you long after the song ends.
              </p>
            </motion.div>
          </div>
          </div>
        </div>
      </motion.section>

      {/* Music Section */}
      <motion.section 
        ref={(el: HTMLDivElement | null) => { sectionsRef.current[2] = el; }}
        className="min-h-screen flex items-center justify-center relative py-20 overflow-hidden bg-[#0B0B0C]"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ margin: "-100px" }}
      >


        <div className="w-full max-w-7xl mx-auto px-4 text-center relative z-20 flex flex-col items-center justify-center min-h-screen">



          {/* My Music Title - Top Right */}
          <motion.div 
            className="absolute right-8 top-16 z-10"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light leading-tight" style={{
              background: 'linear-gradient(135deg, #fbbf24 0%, #a855f7 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: '0 0 30px rgba(251, 191, 36, 0.3)'
            }}>
              My Music
            </h1>
          </motion.div>

          {/* Animated Music Bars - Under My Music Text */}
          <motion.div
            className="absolute right-8 top-40 z-10"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="flex gap-1">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1 bg-gradient-to-b from-[#fbbf24] to-[#a855f7] rounded-full"
                  animate={{
                    height: isPlaying ? [20, 60, 20] : [20, 40, 20]
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.1
                  }}
                />
              ))}
            </div>
          </motion.div>

          {/* 3D Circular Carousel */}
          <div className="relative h-[500px] flex items-center justify-center perspective-1000 mb-8 z-30 w-full mt-32">




            {/* Background Tracks - 3D Circle */}
            <div className="relative w-full max-w-6xl mx-auto flex items-center justify-center">
              {musicTracks.map((track, index) => {
                const offset = index - currentTrackIndex;
                const isActive = index === currentTrackIndex;
                const angle = (offset * 72) * (Math.PI / 180); // 72 degrees between tracks
                const radius = 220; // Reduced radius for closer spacing between icons
                
                return (
                  <motion.div
                    key={track.id}
                    className="absolute top-1/2 left-1/2 cursor-pointer"
                    initial={false}
                    animate={{
                      x: `calc(-50% + ${Math.cos(angle) * radius}px)`,
                      y: `calc(-50% + ${Math.sin(angle) * radius}px)`,
                      scale: isActive ? 1.1 : 1, // Slightly larger when active
                      zIndex: isActive ? 20 : Math.max(0, 10 - Math.abs(offset)),
                      opacity: Math.abs(offset) > 2 ? 0.9 : 1,
                      rotateY: isActive ? 0 : Math.abs(offset) * 5, // Subtle rotation for depth
                      filter: isActive ? 'blur(0px)' : `blur(${Math.abs(offset) * 0.5}px)`, // Blur effect for depth
                    }}
                    transition={{
                      duration: 0.8,
                      ease: [0.25, 0.46, 0.45, 0.94], // Custom easing for smooth motion
                      scale: { duration: 0.4, ease: "easeOut" },
                      rotateY: { duration: 0.6, ease: "easeOut" },
                      filter: { duration: 0.5, ease: "easeOut" },
                    }}
                    onClick={() => {
                      if (index !== currentTrackIndex) {
                        setCurrentTrackIndex(index);
                        setIsPlaying(false);
                      }
                    }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {/* Background Track Card */}
                    <div className={`relative w-32 h-32 rounded-xl overflow-hidden shadow-2xl cursor-pointer bg-[#121215] ring-1 ring-white/5 backdrop-blur-[0.5px] ${isActive ? 'ml-8' : ''}`}>
                      {/* Album Cover */}
                      <img 
                        src={track.coverImage}
                        alt={track.title}
                        className="w-full h-full object-cover opacity-60"
                        onError={(e) => {
                          console.error(`Failed to load image: ${track.coverImage}`);
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                      
                      {/* Overlay - More transparent for rotating background tracks */}
                      <div className="absolute inset-0 bg-black/5 backdrop-blur-[0.5px]" />
                      
                      {/* Track Info - Apple Music Style - Only for Active Track */}
                      {isActive && (
                        <div className="absolute inset-0 flex flex-col justify-end p-3 bg-gradient-to-t from-black/40 via-black/20 to-transparent">
                          <h3 className="text-xs font-light text-white mb-1 truncate drop-shadow-lg leading-tight">
                            {track.title}
                          </h3>
                          <p className="text-xs text-gray-300 font-light drop-shadow-lg leading-tight">{track.genre}</p>
                        </div>
                      )}

                      {/* Play Indicator */}
                      {isActive && (
                        <motion.div
                          className="absolute top-3 right-3 w-4 h-4 bg-green-400 rounded-full shadow-lg"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Featured Track - Center */}
            <motion.div
              key={currentTrackIndex}
              initial={{ opacity: 0, scale: 0.5, rotateY: -180, filter: 'blur(20px)' }}
              animate={{ 
                opacity: 1, 
                scale: 1, 
                rotateY: 0, 
                filter: 'blur(0px)',
                y: [20, -10, 0]
              }}
              transition={{ 
                duration: 1.2,
                ease: [0.25, 0.46, 0.45, 0.94], // Custom easing for smooth motion
                scale: { duration: 0.8, ease: "easeOut" },
                rotateY: { duration: 1, ease: "easeOut" },
                filter: { duration: 0.6, ease: "easeOut" },
                y: { duration: 1.2, ease: "easeOut" }
              }}
              className="relative z-40 text-center"
            >
              <div className="relative w-80 h-80 mx-auto">
                {/* Featured Album Cover */}
                <img 
                  src={musicTracks[currentTrackIndex].coverImage}
                  alt={musicTracks[currentTrackIndex].title}
                  className="w-full h-full rounded-2xl object-cover"
                  onError={(e) => {
                    console.error(`Failed to load featured image: ${musicTracks[currentTrackIndex].coverImage}`);
                    e.currentTarget.style.display = 'none';
                  }}
                />
                
                {/* Play/Pause Button Overlay - No blur for main featured track */}
                <motion.button
                  onClick={() => {
                    console.log('Main player clicked, current track:', musicTracks[currentTrackIndex].title);
                    console.log('Audio source:', musicTracks[currentTrackIndex].audioUrl);
                    togglePlayPause();
                  }}
                  className="absolute inset-0 flex items-center justify-center bg-black/20 group cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Play Button */}
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-all duration-300">
                    {isPlaying ? (
                      <div className="flex gap-1.5">
                        <div className="w-2.5 h-6 bg-white rounded-sm"></div>
                        <div className="w-2.5 h-6 bg-white rounded-sm"></div>
                      </div>
                    ) : (
                      <div className="w-0 h-0 border-l-[14px] border-l-white border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent ml-1"></div>
                    )}
                  </div>
                </motion.button>

                {/* Progress Bar - At Bottom of Card */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-48">
                  {/* Running Time Display */}
                  <div className="text-center mb-2">
                    <div className="text-sm text-white font-light drop-shadow-lg">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </div>
                  </div>
                  
                  {/* Clickable Progress Bar */}
                  <div 
                    className="w-full h-1.5 bg-white/30 rounded-full overflow-hidden cursor-pointer relative"
                    onClick={(e) => {
                      if (audioRef.current && duration > 0) {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const clickX = e.clientX - rect.left;
                        const clickPercent = clickX / rect.width;
                        const newTime = clickPercent * duration;
                        audioRef.current.currentTime = newTime;
                        setCurrentTime(newTime);
                      }
                    }}
                  >
                    <motion.div
                      className="h-full bg-white rounded-full"
                      style={{ width: `${(currentTime / duration) * 100}%` }}
                      transition={{ duration: 0.1 }}
                    />
                  </div>
                </div>

                {/* Featured Track Info - Apple Music Style */}
                <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 text-center">
                  <h3 className="text-2xl font-light text-white mb-2 drop-shadow-lg">
                    {musicTracks[currentTrackIndex].title}
                  </h3>
                  <p className="text-lg text-gray-200 font-light drop-shadow-lg">
                    {musicTracks[currentTrackIndex].genre}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Navigation Arrows - High Z-Index - Moved Further Out */}
            <motion.button
              onClick={() => changeTrack(-1)}
              className="absolute left-8 top-1/2 transform -translate-y-1/2 z-[999] w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 shadow-2xl"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <SkipBack className="w-5 h-5" />
            </motion.button>

            <motion.button
              onClick={() => changeTrack(1)}
              className="absolute right-8 top-1/2 transform -translate-y-1/2 z-[999] w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 shadow-2xl"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <SkipForward className="w-5 h-5" />
            </motion.button>
          </div>

          {/* Track Navigation Dots */}
          <div className="flex justify-center gap-2 mb-8 relative z-50">
            {musicTracks.map((_, index) => (
              <motion.button
                key={index}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  goToTrack(index);
                }}
                className={`w-2 h-2 rounded-full transition-all duration-200 cursor-pointer ${
                  index === currentTrackIndex 
                    ? 'bg-white scale-110 ring-1 ring-white/30' 
                    : 'bg-white/40 hover:bg-white/70 hover:scale-105'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              />
            ))}
          </div>

          {/* Genre Tags - Centered at Bottom */}
          <div className="flex justify-center mt-8 relative z-20">
            <motion.div
              className="flex gap-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, staggerChildren: 0.2 }}
            >
              {['Jazz', 'Gospel', 'Pop', 'Classical'].map((genre, index) => (
                <motion.span
                  key={genre}
                  className="px-4 py-2 bg-gradient-to-r from-[#fbbf24]/20 to-[#a855f7]/20 backdrop-blur-sm border border-[#fbbf24]/30 rounded-full text-[#fbbf24] text-sm font-light"
                  whileHover={{ scale: 1.05, y: -2 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {genre}
                </motion.span>
              ))}
            </motion.div>
          </div>

        </div>
      </motion.section>

      {/* Videos Section */}
      <motion.section 
        ref={(el: HTMLDivElement | null) => { sectionsRef.current[3] = el; }}
        className="min-h-screen flex items-center justify-center relative bg-[#1a1a2e] py-20 overflow-hidden"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ margin: "-100px" }}
      >

        {/* Right Corner Music Videos Title - Hero Style */}
        <motion.div 
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="absolute right-8 top-16 z-10"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light leading-tight" style={{
            background: 'linear-gradient(135deg, #fbbf24 0%, #a855f7 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textShadow: '0 0 30px rgba(251, 191, 36, 0.3)'
          }}>
            Music Videos
          </h1>
        </motion.div>

        <Videos />
      </motion.section>

      {/* Contact Section */}
      <motion.section 
        ref={(el: HTMLDivElement | null) => { sectionsRef.current[4] = el; }}
        className="min-h-screen flex items-center justify-center relative py-20 overflow-hidden bg-[#0B0B0C]"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ margin: "-100px" }}
      >
        {/* Right Corner Let's Talk Title - Hero Style */}
        <motion.div 
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="absolute right-8 top-8 z-10"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light leading-tight" style={{
            background: 'linear-gradient(135deg, #fbbf24 0%, #a855f7 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textShadow: '0 0 30px rgba(251, 191, 36, 0.3)'
          }}>
            Let's Talk
          </h1>
          <p className="text-sm sm:text-base md:text-lg mt-4 text-right max-w-md leading-relaxed text-[#C9C9D0]">
            Want to work together? Or just share what you felt from a song?<br />
            I'd love to hear from you.
          </p>
        </motion.div>

        <div className="container mx-auto px-4 relative z-20 mt-32">

          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              <div className="bg-[#121215] backdrop-blur-xl rounded-2xl p-8">
                <h3 className="text-2xl font-light text-[#EDEDED] mb-6">Get in Touch</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Mail className="w-6 h-6 text-white" />
                    <span className="text-[#C9C9D0]">emmaasuquo87@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <MapPin className="w-6 h-6 text-white" />
                    <span className="text-[#C9C9D0]">Charenton le pont</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#121215] backdrop-blur-xl rounded-2xl p-8">
                <h3 className="text-2xl font-light text-[#EDEDED] mb-6">Follow</h3>
                <div className="flex gap-4">
                  <motion.a
                    href="https://www.instagram.com/emma_asuquo2005/"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    className="p-3 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                  >
                    <Instagram className="w-6 h-6 text-white" />
                  </motion.a>
                  <motion.a
                    href="https://www.youtube.com/@asuquo05"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    className="p-3 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                  >
                    <Youtube className="w-6 h-6 text-white" />
                  </motion.a>
                  <motion.a
                    href="https://www.linkedin.com/in/aniefiok-asuquo-76b0a498/"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    className="p-3 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                  >
                    <Linkedin className="w-6 h-6 text-white" />
                  </motion.a>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-[#121215] backdrop-blur-xl rounded-2xl p-8"
            >
                              <h3 className="text-2xl font-light text-[#EDEDED] mb-6">
                {formMessage?.type === 'success' ? 'Thank You!' : 'Send Message'}
              </h3>
              
              {/* Form Message Display */}
              {formMessage && (
                <div className={`mb-6 p-4 rounded-lg ${
                  formMessage.type === 'success' 
                    ? 'bg-green-500/20 border border-green-500/30 text-green-300' 
                    : 'bg-red-500/20 border border-red-500/30 text-red-300'
                }`}>
                  {formMessage.text}
                </div>
              )}
              
              {formMessage?.type !== 'success' && (
                <form id="contact-form" onSubmit={handleContactSubmit} className="space-y-6">
                  <div>
                    <input
                      type="text"
                      name="name"
                      placeholder="Name"
                      required
                      minLength={2}
                      className="w-full p-4 bg-[#0F0F11] border border-white/6 rounded-lg text-[#E0E0E5] placeholder-[#70707A] focus:outline-none focus:ring-2 focus:ring-[#7DD3FC]/40 focus:border-transparent transition-colors"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      required
                      className="w-full p-4 bg-[#0F0F11] border border-white/6 rounded-lg text-[#E0E0E5] placeholder-[#70707A] focus:outline-none focus:ring-2 focus:ring-[#7DD3FC]/40 focus:border-transparent transition-colors"
                    />
                  </div>
                  <div>
                    <textarea
                      name="message"
                      placeholder="Message (Optional)"
                      rows={4}
                      className="w-full p-4 bg-[#0F0F11] border border-white/6 rounded-lg text-[#E0E0E5] placeholder-[#70707A] focus:outline-none focus:ring-2 focus:ring-[#7DD3FC]/40 focus:border-transparent transition-colors resize-none"
                    ></textarea>
                  </div>
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                    className={`w-full py-4 font-light rounded-lg transition-all ${
                      isSubmitting 
                        ? 'bg-gray-500 text-gray-300 cursor-not-allowed' 
                        : 'bg-[#1a1a2e] text-white hover:shadow-lg hover:bg-[#2a2a3e]'
                    }`}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </motion.button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.section 
        ref={(el: HTMLDivElement | null) => { sectionsRef.current[5] = el; }}
        className="relative"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ margin: "-100px" }}
      >
        <Footer />
      </motion.section>

      {/* Contact Chatbot - Fixed to bottom right */}
      <ContactChatbot />
      </div>
    </motion.div>
  );
}
