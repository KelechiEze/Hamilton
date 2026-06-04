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
import { AnimatePresence } from 'motion/react';

export default function App() {
  const [videoModalOpen, setVideoModalOpen] = useState<boolean>(false);

  // Dynamic scroll helper to target any section seamlessly
  const handleScaleAndScroll = (targetId: string) => {
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-[#faf9f6]/95 flex flex-col text-stone-900 selection:bg-[#b38446] selection:text-white">
      {/* 0. SLEEK ANIMATED LOADER */}
      <Loader />

      {/* 1. STICKY LUXURY NAVIGATION */}
      <Navbar 
        onFindRentalClick={() => setVideoModalOpen(true)}
        onNavigateSection={handleScaleAndScroll}
      />

      <main className="flex-grow">
        {/* 2. SLIDING MULTI-BACKDROP HERO WITH MARQUEE */}
        <HeroSection 
          onGetRentClick={() => setVideoModalOpen(true)}
          onPlayWalkthrough={() => setVideoModalOpen(true)}
        />

        {/* 3. EXPERIENCE GALLERY SECTION */}
        <GallerySection />

        {/* 4. SERVICES WHAT WE DO SECTION */}
        <WhatWeDo />

        {/* 5. FUTURE FINDING AND LIVING SECTION */}
        <PropertiesSection />

        {/* 6. ABOUT STATS STATEMENT SECTION */}
        <AboutStatsSection />

        {/* 7. MEANINGFUL TRAVEL ABOUT SECTION (Screenshot panel 2) */}
        <TravelAboutSection />

        {/* 8. DETAILED FAQ SECTION (Screenshot panel 1) */}
        <FaqSection />
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
