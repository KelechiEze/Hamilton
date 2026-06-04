import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Hotel } from 'lucide-react';

export default function Loader() {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Elegant animation sequence to build the progress value
    const duration = 2400; // 2.4s loading duration
    const intervalTime = 20;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const currentProgress = Math.min(Math.round((currentStep / steps) * 100), 100);
      setProgress(currentProgress);

      if (currentStep >= steps) {
        clearInterval(timer);
        setTimeout(() => {
          setIsLoaded(true);
        }, 300); // Elegant small pause at 100%
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {!isLoaded && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white text-[#170e06] select-none"
        >
          {/* Subtle warm luxury background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#b38446]/5 rounded-full blur-[80px] pointer-events-none" />

          {/* Visual Canvas containing the blocks building */}
          <div className="relative w-64 h-64 flex items-center justify-center">
            
            <svg
              viewBox="0 0 200 200"
              className="w-48 h-48 drop-shadow-[0_12px_24px_rgba(0,0,0,0.1)]"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* CHIMNEY EMITTING SMOKE PARTICLE 1 */}
              <motion.circle
                cx="140"
                cy="50"
                r="6"
                fill="#b38446"
                initial={{ opacity: 0, scale: 0.2, y: 0, x: 0 }}
                animate={{
                  opacity: [0, 0.65, 0.35, 0],
                  scale: [0.4, 1.2, 1.7, 2.1],
                  y: [0, -35, -65, -95],
                  x: [0, -6, 8, -4],
                }}
                transition={{
                  duration: 2.3,
                  repeat: Infinity,
                  delay: 0,
                  ease: "easeOut"
                }}
              />
              
              {/* CHIMNEY EMITTING SMOKE PARTICLE 2 */}
              <motion.circle
                cx="140"
                cy="50"
                r="5.5"
                fill="#d4a373"
                initial={{ opacity: 0, scale: 0.2, y: 0, x: 0 }}
                animate={{
                  opacity: [0, 0.7, 0.4, 0],
                  scale: [0.4, 1.1, 1.6, 2.0],
                  y: [0, -30, -58, -88],
                  x: [0, 7, -5, 11],
                }}
                transition={{
                  duration: 2.3,
                  repeat: Infinity,
                  delay: 0.75,
                  ease: "easeOut"
                }}
              />

              {/* CHIMNEY EMITTING SMOKE PARTICLE 3 */}
              <motion.circle
                cx="140"
                cy="50"
                r="7"
                fill="#e8dcc4"
                initial={{ opacity: 0, scale: 0.2, y: 0, x: 0 }}
                animate={{
                  opacity: [0, 0.55, 0.25, 0],
                  scale: [0.5, 1.0, 1.4, 1.8],
                  y: [0, -40, -72, -102],
                  x: [0, -9, 3, -7],
                }}
                transition={{
                  duration: 2.3,
                  repeat: Infinity,
                  delay: 1.5,
                  ease: "easeOut"
                }}
              />

              {/* BLOCK 1: Solid Dark Foundation Block */}
              <motion.rect
                x="20"
                y="148"
                width="160"
                height="12"
                rx="4"
                fill="#d4a373"
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
              />

              {/* BLOCK 2: Left Wall Block */}
              <motion.rect
                x="40"
                y="98"
                width="36"
                height="50"
                rx="5"
                fill="#b38446"
                initial={{ opacity: 0, y: -60 }}
                animate={{ opacity: 1, y: 98 }}
                transition={{ type: 'spring', damping: 13, stiffness: 100, delay: 0.4 }}
              />

              {/* BLOCK 3: Right Wall Block */}
              <motion.rect
                x="124"
                y="98"
                width="36"
                height="50"
                rx="5"
                fill="#b38446"
                initial={{ opacity: 0, y: -60 }}
                animate={{ opacity: 1, y: 98 }}
                transition={{ type: 'spring', damping: 13, stiffness: 100, delay: 0.55 }}
              />

              {/* BLOCK 4: Central Bridge / Main body connect block */}
              <motion.rect
                x="76"
                y="108"
                width="48"
                height="40"
                rx="6"
                fill="#9c6e3e"
                initial={{ opacity: 0, scale: 0.4 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', damping: 11, stiffness: 90, delay: 0.8 }}
              />

              {/* BLOCK 5: The grand entrance arch/doorway */}
              <motion.path
                d="M88,148 L88,124 C88,121 90,119 93,119 L107,119 C110,119 112,121 112,124 L112,148 Z"
                fill="#170e06"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                style={{ originY: '148px' }}
                transition={{ duration: 0.6, delay: 1.15, ease: 'easeOut' }}
              />

              {/* BLOCK 6: Circular Left Room Window */}
              <motion.circle
                cx="58"
                cy="118"
                r="6"
                fill="#170e06"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.35, type: 'spring', stiffness: 120 }}
              />

              {/* BLOCK 7: Circular Right Room Window */}
              <motion.circle
                cx="142"
                cy="118"
                r="6"
                fill="#170e06"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.45, type: 'spring', stiffness: 120 }}
              />

              {/* BLOCK 8: Chimney placement */}
              <motion.rect
                x="132"
                y="52"
                width="16"
                height="32"
                rx="2"
                fill="#9c6e3e"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 52 }}
                transition={{ type: 'spring', damping: 12, delay: 1.25 }}
              />

              {/* BLOCK 9: Iconic Triangle House Roof */}
              <motion.polygon
                points="30,100 100,43 170,100"
                fill="#d4a373"
                initial={{ opacity: 0, y: -45 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', damping: 13, stiffness: 110, delay: 0.7 }}
              />
            </svg>

            {/* Glowing outer framing ring */}
            <div className="absolute inset-0 border border-[#b38446]/10 rounded-full scale-110 animate-pulse pointer-events-none" />
          </div>

          {/* Symmetrical Brand Title */}
          <div className="text-center mt-6 z-10">
            <div className="flex items-center justify-center gap-2">
              <Hotel size={15} className="text-[#b38446]" />
              <span className="font-display font-bold text-xs uppercase tracking-widest text-[#170e06]">
                Hamilton Inn
              </span>
            </div>
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}