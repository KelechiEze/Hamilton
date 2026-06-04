import { motion } from 'motion/react';

export default function GallerySection() {
  const row1 = [
    {
      id: 'r1-1',
      url: '/first.png',
      alt: 'Modern minimalist white villa'
    },
    {
      id: 'r1-2',
      url: '/second.png',
      alt: 'White country cottage'
    },
    {
      id: 'r1-3',
      url: '/third.png',
      alt: 'Aerial swimming pool landscape'
    },
    {
      id: 'r1-4',
      url: '/fifth.png',
      alt: 'Exquisite modern home and pool'
    },
    {
      id: 'r1-5',
      url: '/fourth.png',
      alt: 'Patio view with sliding doors'
    }
  ];

  const row2 = [
    {
      id: 'r2-1',
      url: '/ninth.png',
      alt: 'Luxurious Mediterranean estate'
    },
    {
      id: 'r2-2',
      url: '/juk1.jpg',
      alt: 'Modern architecture at sunset'
    },
    {
      id: 'r2-3',
      url: '/juk2.avif',
      alt: 'Charming cottage white fence'
    },
    {
      id: 'r2-4',
      url: '/juk3.jpg',
      alt: 'Luxury kitchen layout'
    },
    {
      id: 'r2-5',
      url: '/eight.png',
      alt: 'Stunning pool mansion sunset'
    }
  ];

  // Tripled elements to guarantee visual abundance during continuous animation loops
  const row1Repeated = [...row1, ...row1, ...row1];
  const row2Repeated = [...row2, ...row2, ...row2];

  return (
    <section className="w-full py-16 bg-transparent overflow-hidden" id="gallery">
      {/* Self-contained styling variables for smooth infinite loop mechanics */}
      <style>{`
        @keyframes marquee-to-right {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-33.3333%, 0, 0);
          }
        }
        @keyframes marquee-to-left {
          0% {
            transform: translate3d(-33.3333%, 0, 0);
          }
          100% {
            transform: translate3d(0, 0, 0);
          }
        }
        .infinite-slide-right-track {
          display: flex;
          width: max-content;
          animation: marquee-to-right 30s linear infinite;
        }
        .infinite-slide-left-track {
          display: flex;
          width: max-content;
          animation: marquee-to-left 30s linear infinite;
        }
        .infinite-slide-right-track:hover,
        .infinite-slide-left-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Exquisite boutique header aligned to main site grid */}
      <div className="w-full max-w-7xl mx-auto px-6 mb-12">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-4xl sm:text-5xl md:text-6xl text-stone-900 tracking-tight leading-[1.1]"
        >
          <span className="text-stone-400 font-light block">Our gallery to</span>
          <span className="font-semibold text-stone-900">experience the </span>
          <span className="text-[#b38446] font-light italic">comforts</span>
        </motion.h2>
      </div>

      {/* Row 1 - Left to Right Slider */}
      <div className="relative w-full py-3 overflow-hidden select-none pointer-events-auto">
        {/* Soft fading border masks for smooth luxury transitions on the screen edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#faf9f6]/95 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#faf9f6]/95 to-transparent z-10 pointer-events-none" />

        <div className="infinite-slide-right-track">
          {row1Repeated.map((img, idx) => (
            <div
              key={`row1-${img.id}-${idx}`}
              className="relative w-64 h-36 md:w-96 md:h-52 rounded-2xl overflow-hidden shadow-md border border-stone-200/40 bg-stone-100 mx-3 flex-shrink-0 group cursor-pointer"
            >
              <img
                src={img.url}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-750 group-hover:scale-103 pointer-events-none"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/5 opacity-100 group-hover:opacity-0 transition-opacity duration-300" />
              <div className="absolute inset-3 rounded-xl border border-white/0 group-hover:border-white/10 transition-all duration-500 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>

      {/* Row 2 - Right to Left Slider */}
      <div className="relative w-full py-3 overflow-hidden select-none mt-4 pointer-events-auto">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#faf9f6]/95 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#faf9f6]/95 to-transparent z-10 pointer-events-none" />

        <div className="infinite-slide-left-track">
          {row2Repeated.map((img, idx) => (
            <div
              key={`row2-${img.id}-${idx}`}
              className="relative w-64 h-36 md:w-96 md:h-52 rounded-2xl overflow-hidden shadow-md border border-stone-200/40 bg-stone-100 mx-3 flex-shrink-0 group cursor-pointer"
            >
              <img
                src={img.url}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-750 group-hover:scale-103 pointer-events-none"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/5 opacity-100 group-hover:opacity-0 transition-opacity duration-300" />
              <div className="absolute inset-3 rounded-xl border border-white/0 group-hover:border-white/10 transition-all duration-500 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
