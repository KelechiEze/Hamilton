import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Home, BedDouble, ChevronDown } from 'lucide-react';

interface PropertiesSectionProps {
  onBookRoom?: (roomId: string) => void;
}

export default function PropertiesSection({ onBookRoom }: PropertiesSectionProps) {
  const [visibleCount, setVisibleCount] = useState<number>(3);

 const properties = [
    {
      id: 'prop-1',
      title: 'Executive King Room',
      subtitle: 'Premium comfort with pillowtop mattress & desk.',
      image: '/ed1.jpg',
      price: '$95 / Night',
      tag: 'Best Value',
      address: 'Hamilton Inn Bessemer, AL Off Hwy 11',
      bedrooms: 1,
      bathrooms: 1,
      sqft: 'Standard King'
    },
    {
      id: 'prop-2',
      title: 'Standard Double Queen Room',
      subtitle: 'Cozy and spacious, perfect for family stay trips.',
      image: '/ed3.jpg',
      price: '$115 / Night',
      tag: 'Family Favorite',
      address: 'Hamilton Inn Bessemer, AL Off Hwy 11',
      bedrooms: 2,
      bathrooms: 1,
      sqft: 'Double Beds'
    },
    {
      id: 'prop-3',
      title: 'Whirlpool Premium King Suite',
      subtitle: 'In-room deep therapeutic hot tub setup.',
      image: '/ed2.avif',
      price: '$145 / Night',
      tag: 'Luxury Upgrade',
      address: 'Hamilton Inn Bessemer, AL Off Hwy 11',
      bedrooms: 1,
      bathrooms: 1,
      sqft: 'Whirlpool Tub'
    },
    {
      id: 'prop-4',
      title: 'Accessible Comfort King Room',
      subtitle: 'Fully ADA compliant layouts with roll-in shower safety.',
      image: '/ed3.jpg',
      price: '$105 / Night',
      tag: 'ADA Accessible',
      address: 'Hamilton Inn Bessemer, AL Off Hwy 11',
      bedrooms: 1,
      bathrooms: 1,
      sqft: 'Grab Rails'
    },
    {
      id: 'prop-5',
      title: 'Extended Two-Room Suite',
      subtitle: 'Extra separate living lounge & cozy sofa bed.',
      image: '/ed5.jpg',
      price: '$135 / Night',
      tag: 'Premium Extended',
      address: 'Hamilton Inn Bessemer, AL Off Hwy 11',
      bedrooms: 2,
      bathrooms: 1.5,
      sqft: 'Sofa Sleeper'
    },
    {
      id: 'prop-6',
      title: 'Executive Business Preferred Suite',
      subtitle: 'Complete workspace desk plus custom breakfast privilege.',
      image: '/ed6.avif',
      price: '$125 / Night',
      tag: 'Business Select',
      address: 'Hamilton Inn Bessemer, AL Off Hwy 11',
      bedrooms: 1,
      bathrooms: 1,
      sqft: 'Direct Access'
    }
  ];

  const hasMore = visibleCount < properties.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 3, properties.length));
  };

  const handleShowLess = () => {
    setVisibleCount(3);
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-6 py-20 bg-transparent" id="properties">
      {/* Header Row split nicely with button */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-stone-900 tracking-tight leading-[1.1]"
          >
            <span className="text-stone-400 font-light block">Experience the art of</span>
            <span className="text-stone-900">finding and living</span>
          </motion.h2>
        </div>

        {/* All Properties Button connected to the view state toggle */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={hasMore ? handleLoadMore : handleShowLess}
          className="flex items-center gap-4 bg-[#f4f6f7] hover:bg-stone-200/80 text-black font-sans font-medium text-xs md:text-sm px-6 py-3.5 rounded-full transition-all duration-300 w-fit cursor-pointer group"
          id="all-properties-btn"
        >
          <span>{hasMore ? 'View All Rooms & Suites' : 'Show Less Rooms'}</span>
          <div className="bg-[#b38446] text-white w-6 h-6 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
            <ArrowRight size={12} className="stroke-[3]" />
          </div>
        </motion.button>
      </div>

      {/* Grid of properties columns with image styling layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
        <AnimatePresence mode="popLayout">
          {properties.slice(0, visibleCount).map((prop, idx) => (
            <motion.div
              key={prop.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: (idx % 3) * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col group"
              id={`prop-card-${prop.id}`}
            >
              {/* Image Box */}
              <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-stone-100 mb-5">
                <img
                  src={prop.image}
                  alt={prop.title}
                  className="w-full h-full object-cover transition-transform duration-750 group-hover:scale-103 pointer-events-none select-none"
                  referrerPolicy="no-referrer"
                />
                {/* "tag" badge */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3.5 py-1.5 rounded-lg font-sans font-semibold text-[10px] text-[#b38446] tracking-wide uppercase border border-stone-200/20">
                  {prop.tag}
                </div>
              </div>

              {/* Title & info text */}
              <div className="space-y-1 mb-4">
                <h3 className="font-display font-medium text-2xl md:text-3xl text-stone-950 tracking-tight leading-snug group-hover:text-[#b38446] transition-colors">
                  {prop.title}
                </h3>
                <p className="font-sans text-xs md:text-sm text-stone-400 font-light leading-none">
                  {prop.subtitle}
                </p>
              </div>

              {/* Premium Copper Brown Price & Booking CTA Action Box */}
              <div className="flex items-stretch gap-3 mb-5">
                <div className="flex-grow bg-stone-100 border border-stone-200/50 text-stone-900 font-display font-bold text-sm sm:text-base px-5 py-4 rounded-xl flex items-center justify-center">
                  <span>{prop.price}</span>
                </div>
                {onBookRoom && (
                  <button 
                    onClick={() => {
                      const getRoomId = (id: string) => {
                        if (id === 'prop-1') return 'room-king-grand';
                        if (id === 'prop-2') return 'room-double-queen';
                        if (id === 'prop-3') return 'room-deluxe-whirlpool';
                        if (id === 'prop-4') return 'room-accessible-king';
                        if (id === 'prop-5') return 'room-double-queen';
                        return 'room-king-grand';
                      };
                      onBookRoom(getRoomId(prop.id));
                    }}
                    className="bg-[#b38446] hover:bg-stone-950 text-white font-sans font-semibold text-[11px] sm:text-xs px-5 py-4 rounded-xl transition-all duration-300 cursor-pointer uppercase tracking-wider shrink-0 flex items-center gap-1 shadow-sm active:scale-97"
                    id={`book-prop-${prop.id}`}
                  >
                    <span>Book Now</span>
                  </button>
                )}
              </div>

              {/* Specs & address section footer layout with dividers */}
              <div className="grid grid-cols-12 gap-4 border-t border-stone-200/50 pt-4 font-sans text-xs md:text-sm text-stone-500">
                {/* Left Column Address */}
                <div className="col-span-7 flex items-start gap-2.5">
                  <Home size={15} className="text-stone-400 shrink-0 mt-0.5 stroke-[1.8]" />
                  <span className="font-light leading-relaxed truncate md:text-xs text-stone-600">
                    {prop.address}
                  </span>
                </div>

                {/* Right Column Specifications */}
                <div className="col-span-5 flex items-start gap-2 border-l border-stone-200 pl-4">
                  <BedDouble size={15} className="text-stone-400 shrink-0 mt-0.5 stroke-[1.8]" />
                  <div className="font-light text-stone-600 text-[10px] uppercase leading-relaxed tracking-wider">
                    <span className="font-medium text-stone-900 block normal-case text-xs">
                      {prop.bedrooms > 0 ? `${prop.bedrooms} Bed` : ''} · {prop.bathrooms} Bath
                    </span>
                    <span>{prop.sqft}</span>
                  </div>
                </div>
              </div>

            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Dedicated Load More Trigger in center */}
      {hasMore && (
        <div className="mt-14 flex justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLoadMore}
            className="flex items-center gap-3 bg-stone-900 hover:bg-[#b38446] text-white font-sans font-medium text-xs md:text-sm px-8 py-4 rounded-full shadow-lg transition-all duration-300 cursor-pointer"
            id="load-more-properties-btn"
          >
            <span>Load More Rooms</span>
            <ChevronDown size={16} />
          </motion.button>
        </div>
      )}
    </section>
  );
}
