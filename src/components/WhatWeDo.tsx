import { motion } from 'motion/react';
import { Coffee, BedDouble, ShieldCheck } from 'lucide-react';

export default function WhatWeDo() {
  const cards = [
    {
      title: 'Hot Breakfast Buffet',
      description: 'Start your morning with our free hot breakfast. Enjoy golden fresh waffles, sausage and eggs, warm muffins, pastries, and premium coffee cooked fresh daily.',
      icon: <Coffee className="w-8 h-8 text-stone-900 group-hover:text-white transition-colors duration-500" />
    },
    {
      title: 'In-Room Conveniences',
      description: 'Relax with premium essentials in every suite: complimentary high-speed WiFi, in-room microwave, mini-fridge, 32-inch cable TV, and premium coffee master sets.',
      icon: <BedDouble className="w-8 h-8 text-stone-900 group-hover:text-white transition-colors duration-500" />
    },
    {
      title: 'On-Site Amenities',
      description: 'Maximize your stay with our seasonal outdoor swimming pool, high-tempo fitness gymnasium center, business office support, and complimentary parking.',
      icon: <ShieldCheck className="w-8 h-8 text-stone-900 group-hover:text-white transition-colors duration-500" />
    }
  ];

  return (
    <section className="w-full max-w-7xl mx-auto px-6 py-14 bg-transparent" id="what-we-do">
      {/* Label with small square prefix */}
      <div className="flex items-center gap-2 mb-10">
        <span className="w-2.5 h-2.5 bg-[#b38446] rounded-[1px] block shrink-0" />
        <span className="font-sans font-medium text-xs text-stone-900 tracking-wider uppercase">What we offer</span>
      </div>

      {/* Grid containing the 3 clean cards exactly matching the screenshot style */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {cards.map((card, idx) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ delay: idx * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="bg-[#f4f6f7]/60 hover:bg-white border border-stone-100 hover:border-stone-200 p-8 md:p-10 rounded-[2rem] flex flex-col justify-between items-start gap-12 group hover:shadow-xl transition-all duration-500 min-h-[340px]"
            id={`whatwe-item-${idx}`}
          >
            {/* Custom high-fidelity stroke icon */}
            <div className="p-4 bg-stone-100 group-hover:bg-[#b38446] rounded-2xl transition-all duration-500">
              {card.icon}
            </div>

            {/* Typography Content */}
            <div className="space-y-4">
              <h3 className="font-display font-medium text-2xl md:text-3xl text-stone-950 tracking-tight leading-none">
                {card.title}
              </h3>
              <p className="font-sans text-xs md:text-sm text-stone-500 font-light leading-relaxed">
                {card.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
