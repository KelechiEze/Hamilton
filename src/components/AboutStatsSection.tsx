import { motion } from 'motion/react';

export default function AboutStatsSection() {
  const inlineImage = 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=150&q=80';
  const rightFeaturedImage = 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80';

  return (
    <section className="w-full max-w-7xl mx-auto px-6 py-24 bg-transparent" id="about-stats">
      {/* Top Split Block: Paragraph on left + Image on right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-16">
        
        {/* Left Prose: Styling matching Image 4 exactly */}
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="font-display font-medium text-2xl sm:text-3xl md:text-4xl text-stone-900 leading-[1.4] tracking-tight">
              At Hamilton Inn, we{' '}
              {/* Custom oval inline clip element */}
              <span className="inline-block align-middle mx-2 w-14 sm:w-16 h-8 sm:h-9 rounded-full overflow-hidden border border-stone-200 shadow-sm">
                <img
                  src={inlineImage}
                  alt="Hamilton Inn sweet breakfast"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </span>{' '}
              combine affordable comfort, modern travel amenities, and a convenient location off Highway 11 with easy access to downtown Birmingham. Relax in spacious rooms, print in our business center, or sink into pool relaxation.
            </p>
          </motion.div>
        </div>

        {/* Right Feature Architecture Image */}
        <div className="lg:col-span-5">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="aspect-[4/3] rounded-[2rem] overflow-hidden bg-stone-100 shadow-lg border border-stone-200/40"
          >
            <img
              src={rightFeaturedImage}
              alt="Hamilton Inn hospitality"
              className="w-full h-full object-cover select-none pointer-events-none"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>

      </div>

      {/* Horizontal Divider Line */}
      <div className="w-full h-px bg-stone-300 mb-8" />

      {/* Bottom Row showing Project Completed & Stats indicators */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 pt-2">
        
        {/* Left Side Label */}
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-[#b38446] rounded-[1px] block shrink-0" />
          <span className="font-sans font-medium text-xs text-stone-900 tracking-wider uppercase">
            Hotel Experience
          </span>
        </div>

        {/* Right Side Statistics Row */}
        <div className="flex flex-wrap gap-12 md:gap-20">
          
          {/* Stat Item 1 */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="space-y-1.5 min-w-[150px]"
            id="stat-residences"
          >
            <div className="font-display font-semibold text-5xl md:text-6xl text-stone-900 leading-none">
              100<span className="text-[#b38446] font-light">%</span>
            </div>
            {/* Fine divider bar */}
            <div className="h-[2px] w-20 bg-stone-200" />
            <div className="font-sans text-xs md:text-sm text-stone-500 font-light leading-snug">
              Complimentary Hot <br />
              Waffles & Sausage Buffet
            </div>
          </motion.div>

          {/* Stat Item 2 */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="space-y-1.5 min-w-[150px]"
            id="stat-commercial"
          >
            <div className="font-display font-semibold text-5xl md:text-6xl text-stone-900 leading-none">
              5<span className="text-[#b38446] font-light"> min</span>
            </div>
            <div className="h-[2px] w-20 bg-stone-200 text-stone-600" />
            <div className="font-sans text-xs md:text-sm text-stone-500 font-light leading-snug">
              To Alabama Splash <br />
              Adventure Amusement
            </div>
          </motion.div>

          {/* Stat Item 3 */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="space-y-1.5 min-w-[150px]"
            id="stat-amenities"
          >
            <div className="font-display font-semibold text-5xl md:text-6xl text-stone-900 leading-none">
              370<span className="text-[#b38446] font-light">+</span>
            </div>
            <div className="h-[2px] w-20 bg-stone-200" />
            <div className="font-sans text-xs md:text-sm text-stone-500 font-light leading-snug">
              Verifiable Online <br />
              Excellent Guest Reviews
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
