import { motion } from 'motion/react';
import { Info, ArrowUpRight } from 'lucide-react';

export default function TravelAboutSection() {
  const landscapeImg = 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80'; // hotel exterior
  const portraitImg = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80'; // warm bedroom / pool vibe

  return (
    <section className="w-full max-w-7xl mx-auto px-6 py-20 bg-transparent animate-[fadeIn_0.5s_ease-out]" id="about-travel">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-stretch">
        
        {/* Left Column containing Typography and Horizontal photo block */}
        <div className="lg:col-span-6 flex flex-col justify-between gap-12">
          
          <div className="space-y-6">
            {/* Symmetrical Label Category */}
            <div className="flex items-center gap-2 text-stone-700">
              <Info size={16} className="text-[#b38446] shrink-0 stroke-[1.8]" />
              <span className="font-sans font-medium text-xs tracking-wider uppercase">
                About Our Hotel
              </span>
            </div>

            {/* Giant Title precisely styled */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-4xl sm:text-5xl font-bold text-[#1c1107] tracking-tight leading-[1.1]"
            >
              Affordable Comfort & <br />
              Convenient Location
            </motion.h2>

            {/* Narrative copy text */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.8 }}
              className="font-sans text-stone-500 text-sm sm:text-base leading-relaxed font-light max-w-xl"
            >
              At Hamilton Inn Bessemer – Birmingham, we combine comfort, value, and convenience for travelers visiting the Birmingham area. Located just off Highway 11, our hotel offers easy access to I-20/I-59, making it a perfect stop for business trips, family visits, and weekend getaways.
            </motion.p>

            {/* Styled "Know More" button */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="pt-2"
            >
              <a
                href="tel:205-425-2010"
                className="flex items-center gap-2.5 bg-[#b38446] hover:bg-[#976a2f] text-white font-sans font-medium text-xs md:text-sm pl-6 pr-2.5 py-2.5 rounded-full transition-all duration-300 shadow-md cursor-pointer group w-fit"
                id="know-more-about-btn"
              >
                <span>Call and Book Now</span>
                <div className="bg-white/10 text-white w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:rotate-45">
                  <ArrowUpRight size={14} className="stroke-[2.5]" />
                </div>
              </a>
            </motion.div>
          </div>

          {/* Under-the-text Horizontal Landscape Image Frame */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative aspect-[21/9] w-full rounded-3xl overflow-hidden bg-stone-100 shadow-md border border-stone-200/20"
          >
            <img
              src={landscapeImg}
              alt="Hamilton Inn Bessemer building view"
              className="w-full h-full object-cover transition-transform duration-1000 hover:scale-103 pointer-events-none select-none"
              referrerPolicy="no-referrer"
            />
            {/* Warm overlay gradient for visual touch */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
          </motion.div>

        </div>

        {/* Right Column containing portrait image */}
        <div className="lg:col-span-6 flex flex-col justify-end">
          <motion.div
            initial={{ opacity: 0, scale: 0.96, x: 20 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="relative aspect-[4/5] lg:aspect-[4/5] w-full rounded-[2.5rem] overflow-hidden bg-stone-100 shadow-xl border border-stone-200/30"
          >
            <img
              src={portraitImg}
              alt="Cozy suite setup with fluffy pillows"
              className="w-full h-full object-cover transition-transform duration-1000 hover:scale-102 pointer-events-none select-none"
              referrerPolicy="no-referrer"
            />
            {/* Beautiful highlight ring overlay with soft glow */}
            <div className="absolute inset-6 rounded-[2rem] border border-white/10 pointer-events-none" />
          </motion.div>
        </div>

      </div>
    </section>
  );
}
