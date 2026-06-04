import { useState } from 'react';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import GallerySection from './components/GallerySection';
import WhatWeDo from './components/WhatWeDo';
import PropertiesSection from './components/PropertiesSection';
import AboutStatsSection from './components/AboutStatsSection';
import TravelAboutSection from './components/TravelAboutSection';
import FaqSection from './components/FaqSection';
import Footer from './components/Footer';
import VideoWalkthroughModal from './components/VideoWalkthroughModal';
import { AnimatePresence, motion } from 'motion/react';
import BookingPage from './components/BookingPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'booking'>('home');
  const [selectedRoomId, setSelectedRoomId] = useState<string | undefined>(undefined);
  const [videoModalOpen, setVideoModalOpen] = useState<boolean>(false);

  // Dynamic scroll helper to target any section seamlessly
  const handleScaleAndScroll = (targetId: string) => {
    setCurrentPage('home');
    setTimeout(() => {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 150);
  };

  const handleBookRoom = (roomId?: string) => {
    setSelectedRoomId(roomId);
    setCurrentPage('booking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#faf9f6]/95 flex flex-col text-stone-900 selection:bg-[#b38446] selection:text-white">
      {/* 0. SLEEK ANIMATED LOADER */}
      <Loader />

      {/* 1. STICKY LUXURY NAVIGATION */}
      <Navbar 
        onFindRentalClick={() => handleBookRoom()}
        onNavigateSection={handleScaleAndScroll}
      />

      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {currentPage === 'booking' ? (
            <BookingPage 
              key="booking-page"
              onBackToHome={() => setCurrentPage('home')}
              preSelectedRoomId={selectedRoomId}
            />
          ) : (
            <motion.div
              key="home-page"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* 2. SLIDING MULTI-BACKDROP HERO WITH MARQUEE */}
              <HeroSection 
                onGetRentClick={() => handleBookRoom()}
                onPlayWalkthrough={() => setVideoModalOpen(true)}
              />

              {/* 3. EXPERIENCE GALLERY SECTION */}
              <GallerySection />

              {/* 4. SERVICES WHAT WE DO SECTION */}
              <WhatWeDo />

              {/* 5. FUTURE FINDING AND LIVING SECTION */}
              <PropertiesSection onBookRoom={handleBookRoom} />

              {/* BRAND DISCOVERY MARQUEE SLIDE */}
              <div className="w-full overflow-hidden bg-[#1c1107] py-6 border-y border-[#3d2714]/40 relative z-15 select-none my-4">
                <div className="flex whitespace-nowrap overflow-hidden">
                  <motion.div
                    className="flex gap-16 items-center text-xs sm:text-sm tracking-[0.2em] uppercase font-mono text-[#f5ebd6]"
                    animate={{ x: [0, -1200] }}
                    transition={{
                      ease: 'linear',
                      duration: 45,
                      repeat: Infinity,
                    }}
                  >
                    {[
                      "Southern Hospitality",
                      "Convenient Comfort Off Hwy 11",
                      "Complimentary Hot Breakfast Daily",
                      "Free High-Speed WiFi Included",
                      "Cozy Mattress Layers",
                      "Direct Grand Rate Guarantee",
                      "Seasonal Pool & On-Site Gym",
                      "Microwaves & Refrigerators In Rooms",
                      "Southern Hospitality",
                      "Convenient Comfort Off Hwy 11",
                      "Complimentary Hot Breakfast Daily",
                      "Free High-Speed WiFi Included",
                      "Cozy Mattress Layers",
                      "Direct Grand Rate Guarantee",
                      "Seasonal Pool & On-Site Gym",
                      "Microwaves & Refrigerators In Rooms"
                    ].map((text, index) => (
                      <div key={`${text}-${index}`} className="flex items-center gap-6">
                        <span className="font-semibold text-[#f5ebd6] tracking-[0.18em]">{text}</span>
                        <span className="text-[#b38446] font-bold text-lg">•</span>
                      </div>
                    ))}
                  </motion.div>
                </div>
              </div>

              {/* 6. ABOUT STATS STATEMENT SECTION */}
              <AboutStatsSection />

              {/* 7. MEANINGFUL TRAVEL ABOUT SECTION (Screenshot panel 2) */}
              <TravelAboutSection />

              {/* 8. DETAILED FAQ SECTION (Screenshot panel 1) */}
              <FaqSection />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* 9. ELEGANT EXQUISITE FOOTER RE-ATTACHED */}
      <Footer />

      {/* 10. EXPERIENTIAL CINEMATIC OVERLAY */}
      <AnimatePresence>
        {videoModalOpen && (
          <VideoWalkthroughModal 
            isOpen={videoModalOpen} 
            onClose={() => setVideoModalOpen(false)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
