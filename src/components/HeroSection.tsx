import { useState, useEffect, MouseEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { HERO_SLIDES } from '../data';
import Marquee from './Marquee';

interface HeroSectionProps {
  onGetRentClick: () => void;
  onPlayWalkthrough: () => void;
}

export default function HeroSection({ onGetRentClick, onPlayWalkthrough }: HeroSectionProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto slide every 6 seconds for continuous dynamic visuals
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = (e: MouseEvent) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const handleNext = (e: MouseEvent) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-6 pt-4 pb-12" id="hero">
      {/* Outer rounded picture frame container, resembling the exact rounded bounds in the screenshot */}
      <div className="relative h-[82vh] md:h-[85vh] w-full rounded-2xl overflow-hidden shadow-2xl bg-black">
        
        {/* Sliding Background Image Layers with Ken Burns dynamic zoom */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 1.4, ease: [0.25, 1, 0.5, 1] }}
              className="absolute inset-0 w-full h-full"
            >
              {/* Backing image */}
              <img
                src={HERO_SLIDES[currentSlide].image}
                alt={HERO_SLIDES[currentSlide].title}
                className="w-full h-full object-cover select-none"
                referrerPolicy="no-referrer"
              />
              {/* Refined gradient overlay for top-tier readability of white writings */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/45" />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* --- Top Right Floating Card ("Discover") --- */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 md:top-8 md:right-8 z-20 bg-white/95 backdrop-blur-md text-black p-4 sm:p-5 md:p-6 rounded-2xl sm:rounded-[2rem] shadow-md max-w-[190px] sm:max-w-[280px] md:max-w-[320px] flex flex-col gap-1.5 sm:gap-3 md:gap-4 hover:translate-y-[-4px] transition-transform duration-300 border border-white/30"
          id="discover-card"
        >
          {/* Grey circle play button */}
          <button
            onClick={onPlayWalkthrough}
            className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-slate-100 hover:bg-[#b38446] hover:text-white text-black shadow-md flex items-center justify-center hover:scale-110 active:scale-90 transition-all cursor-pointer group/play self-start relative"
            title="Watch Walkthrough Video"
            id="play-video-btn"
          >
            <span className="absolute inset-0 rounded-full bg-[#b38446]/30 animate-ping group-hover:block hidden" />
            <Play size={12} className="fill-black stroke-black translate-x-[1px] md:w-4 md:h-4" />
          </button>

          <div className="flex flex-col">
            <h3 className="font-display font-semibold text-sm sm:text-base md:text-xl text-stone-900 tracking-tight">
              Discover
            </h3>
            <p className="font-sans text-[10px] sm:text-xs md:text-sm text-stone-500 mt-0.5 sm:mt-1 leading-relaxed">
              {HERO_SLIDES[currentSlide].subtitle}
            </p>
          </div>
        </motion.div>

        {/* --- Central Main Content Grid --- */}
        <div className="absolute inset-0 z-10 flex flex-col justify-between p-6 md:p-12 pb-24 md:pb-28">
          
          <div /> {/* Spacer */}

          {/* Large dynamic headline and description */}
          <div className="space-y-6 md:space-y-8 max-w-4xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-4"
              >
                <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-bold text-white tracking-tight leading-[1.05] drop-shadow-md">
                  {HERO_SLIDES[currentSlide].title}
                </h1>
              </motion.div>
            </AnimatePresence>

            {/* Bottom-left Booking activation pill button + Bottom-right text */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              
              {/* White rounded "BOOK YOUR STAY" Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onGetRentClick}
                className="bg-white hover:bg-slate-50 text-black font-sans font-semibold text-sm rounded-full pl-6 pr-2 py-2 flex items-center justify-between gap-4 shadow-xl cursor-pointer w-fit"
                id="get-rent-cta"
              >
                <span>BOOK YOUR STAY</span>
                <div className="bg-[#b38446] text-white w-8 h-8 rounded-full flex items-center justify-center">
                  <ArrowRight size={14} className="stroke-[3]" />
                </div>
              </motion.button>

              {/* Dynamic Bottom-Right Description Paragraph */}
              <div className="max-w-[340px] md:max-w-[420px] text-right md:text-right text-left">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={currentSlide}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.6 }}
                    className="font-sans text-xs md:text-sm text-stone-200/95 leading-relaxed font-light drop-shadow-md"
                  >
                    {HERO_SLIDES[currentSlide].description}
                  </motion.p>
                </AnimatePresence>
              </div>

            </div>
          </div>
        </div>

        {/* --- Slide Indicators & Left/Right manual triggers --- */}
        {/* Floating manual left/right navigation arrows, positioned mid-screen for maximum mobile convenience (zero overlap with text & buttons) */}
        <button
          onClick={handlePrev}
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-25 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/45 hover:bg-[#b38446] backdrop-blur-md text-white/90 border border-white/10 flex items-center justify-center hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-md"
          aria-label="Previous backdrop"
          id="slide-arrow-prev"
        >
          <ChevronLeft size={16} />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-25 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/45 hover:bg-[#b38446] backdrop-blur-md text-[#f5ebd6] border border-white/10 flex items-center justify-center hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-md"
          aria-label="Next backdrop"
          id="slide-arrow-next"
        >
          <ChevronRight size={16} />
        </button>

        {/* Small translucent indicator dots floating cleanly at the top-left, 100% clash-free */}
        <div className="absolute left-4 top-4 sm:left-6 sm:top-6 z-20 bg-black/40 backdrop-blur-md px-3 py-2 rounded-xl border border-white/15 flex items-center gap-1.5">
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === currentSlide ? 'w-5 bg-[#b38446]' : 'w-1.5 bg-white/40 hover:bg-white/70'
              }`}
              title={`Switch to slide ${idx + 1}`}
              id={`slide-dot-${idx}`}
            />
          ))}
        </div>

        {/* --- Infinite Marquee inside of hero section at the very bottom --- */}
        <div className="absolute bottom-0 left-0 w-full z-20">
          <Marquee />
        </div>

      </div>
    </div>
  );
}
