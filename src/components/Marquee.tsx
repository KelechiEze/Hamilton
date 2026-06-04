import { motion } from 'motion/react';
import { HOTEL_SERVICES } from '../data';

export default function Marquee() {
  // We duplicate the services to ensure continuous flow without gap
  const marqueeItems = [...HOTEL_SERVICES, ...HOTEL_SERVICES, ...HOTEL_SERVICES];

  return (
    <div className="w-full overflow-hidden bg-black/40 backdrop-blur-md py-4 border-y border-white/15 relative z-10 select-none">
      <div className="flex whitespace-nowrap overflow-hidden">
        <motion.div
          className="flex gap-12 items-center text-sm tracking-widest uppercase font-mono text-white/90"
          animate={{ x: [0, -1000] }}
          transition={{
            ease: 'linear',
            duration: 35,
            repeat: Infinity,
          }}
        >
          {marqueeItems.map((service, index) => (
            <div key={`${service}-${index}`} className="flex items-center gap-4">
              <span className="font-semibold text-white tracking-[0.15em]">{service}</span>
              <span className="text-[#b38446] font-bold text-lg">•</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
