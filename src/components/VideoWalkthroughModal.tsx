import { motion } from 'motion/react';
import { X, Volume2, VolumeX, Sparkles, MapPin } from 'lucide-react';
import { useState } from 'react';

interface VideoWalkthroughModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function VideoWalkthroughModal({ isOpen, onClose }: VideoWalkthroughModalProps) {
  const [muted, setMuted] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Dark overlay background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/90 backdrop-blur-md"
        id="video-modal-backdrop"
      />

      {/* Main video window container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 30 }}
        transition={{ type: 'spring', damping: 25, stiffness: 180 }}
        className="relative w-full max-w-5xl bg-[#111] rounded-3xl overflow-hidden shadow-2xl border border-white/10 z-10"
        id="video-modal-content"
      >
        {/* Aspect Ratio Box */}
        <div className="relative aspect-video w-full bg-stone-950">
          
          <video
            autoPlay
            loop
            muted={muted}
            playsInline
            className="w-full h-full object-cover"
            src="https://player.vimeo.com/external/434045526.sd.mp4?s=c27dfcc6963ac6d7b539097cc4decdd54f277dde&profile_id=165&oauth2_token_id=57447761"
          />

          {/* Floating UI Elements over video */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none" />

          {/* Top Control Bar */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20 pointer-events-auto">
            <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-white">
              <Sparkles size={14} className="text-[#b38446] animate-pulse" />
              <span className="font-mono text-2xs tracking-wider uppercase font-medium">Hamilton Inn Video Tour</span>
            </div>

            <div className="flex items-center gap-2">
              {/* Mute button */}
              <button
                onClick={() => setMuted(!muted)}
                className="w-10 h-10 rounded-full bg-black/50 hover:bg-black/85 text-white flex items-center justify-center border border-white/10 hover:border-white/30 transition-all cursor-pointer"
                title={muted ? 'Unmute' : 'Mute'}
                id="video-mute-btn"
              >
                {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
              </button>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-black/50 hover:bg-black/85 text-white flex items-center justify-center border border-white/10 hover:border-white/30 transition-all cursor-pointer"
                title="Close Walkthrough"
                id="video-close-btn"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Bottom Video metadata */}
          <div className="absolute bottom-6 left-6 right-6 flex flex-col md:flex-row md:items-end justify-between gap-4 z-20">
            <div className="space-y-1 text-white">
              <div className="flex items-center gap-2 text-white/50 text-xs">
                <MapPin size={12} className="text-[#b38446]" />
                <span className="font-sans font-light">Bessemer - Birmingham, Alabama</span>
              </div>
              <h4 className="font-display font-bold text-xl md:text-2xl">
                Hamilton Inn Hotel Tour
              </h4>
              <p className="font-sans text-xs text-stone-300 max-w-md font-light leading-relaxed">
                Enjoy a visual tour highlight of our luxurious entry lobby, comfortable double queen family bedding setups, therapeutic whirlpool suites, and delicious warm hot breakfast buffet stations.
              </p>
            </div>

            <div className="flex items-center gap-5 bg-white/5 backdrop-blur-md p-3 rounded-2xl border border-white/10 text-stone-200">
              <div className="text-center px-2">
                <div className="font-display font-semibold text-white text-lg">6</div>
                <div className="font-sans text-stone-400 text-[10px] font-light tracking-wider uppercase">Room Types</div>
              </div>
              <div className="h-6 w-px bg-white/15" />
              <div className="text-center px-2">
                <div className="font-display font-semibold text-white text-lg">24h</div>
                <div className="font-sans text-stone-400 text-[10px] font-light tracking-wider uppercase">Support</div>
              </div>
              <div className="h-6 w-px bg-white/15" />
              <div className="text-center px-2">
                <div className="font-display font-semibold text-white text-lg">4.5</div>
                <div className="font-sans text-stone-400 text-[10px] font-light tracking-wider uppercase">Rating</div>
              </div>
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
}
