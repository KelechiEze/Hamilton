import { motion } from 'motion/react';
import { Star, Quote, Sparkles } from 'lucide-react';
import { REVIEWS_DATA } from '../data';

export default function ReviewsSection() {
  return (
    <section className="w-full py-24 bg-white" id="reviews">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#b38446]">
            <span className="w-6 h-px bg-[#b38446]" />
            Guest Experiences
            <span className="w-6 h-px bg-[#b38446]" />
          </div>
          <h2 className="font-display font-bold text-3xl md:text-5xl text-stone-950 tracking-tight leading-tight">
            Loved By Families & Business Travelers
          </h2>
          <p className="font-sans text-sm text-stone-500 font-light leading-relaxed">
            Discover real direct diary reviews and checkout comments submitted by our guests following their lodging stay at Hamilton Inn.
          </p>
        </div>

        {/* Testimonials Grid Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS_DATA.map((rev, index) => (
            <motion.div
              key={rev.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              className="bg-slate-50 border border-slate-100 p-8 rounded-[2rem] flex flex-col justify-between gap-6 hover:shadow-lg transition-shadow duration-300 relative group"
              id={`review-item-${rev.id}`}
            >
              {/* Decorative background quote icon */}
              <Quote className="absolute top-6 right-6 text-[#b38446]/10 group-hover:text-[#b38446]/20 transition-colors" size={64} />

              <div className="space-y-4 relative z-10">
                {/* Five star reviews */}
                <div className="flex gap-1">
                  {[...Array(5)].map((_, idx) => (
                    <Star 
                      key={idx} 
                      size={14} 
                      className={idx < rev.rating ? "fill-amber-400 stroke-amber-400" : "text-stone-200"} 
                    />
                  ))}
                </div>

                {/* Star rating label text copy */}
                <p className="font-sans text-sm text-stone-600 font-light italic leading-relaxed">
                  "{rev.text}"
                </p>
              </div>

              {/* Resident Profile Footer */}
              <div className="flex items-center gap-3 border-t border-stone-200/50 pt-4 relative z-10">
                <img 
                  src={rev.avatar} 
                  alt={rev.author} 
                  className="w-10 h-10 rounded-full object-cover border border-[#b38446]/30 shadow-sm"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="font-display font-semibold text-xs text-stone-950 uppercase tracking-widest leading-none">
                    {rev.author}
                  </h4>
                  <span className="text-[10px] text-stone-400 font-light mt-1 block">
                    Verified Guest • {rev.date}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Dynamic bottom call to action banner */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 bg-stone-950 rounded-[2.5rem] p-8 md:p-12 text-white flex flex-col md:flex-row md:items-center md:justify-between gap-8 relative overflow-hidden"
          id="trust-badge-banner"
        >
          {/* Subtle gradient light */}
          <div className="absolute top-0 right-0 w-[500px] h-full bg-[#b38446]/10 skew-x-12 blur-3xl pointer-events-none" />

          <div className="space-y-2 relative z-10 max-w-xl">
            <div className="flex items-center gap-1.5 text-xs text-[#b38446] font-semibold uppercase tracking-wider">
              <Sparkles size={11} className="animate-pulse" />
              HAMILTON INN QUALITY ASSURANCE INDEX
            </div>
            <h3 className="font-display font-semibold text-xl md:text-2xl text-white">
              Each Guest Room is Audited under strict cleanliness check guides.
            </h3>
            <p className="font-sans text-xs text-stone-404 font-light leading-relaxed">
              We certify that every room is meticulously deep-cleaned, bed linen is steam-pressed and changed daily, high-speed Wi-Fi, microwave, Fridge and hot waffle irons are fully checked.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center p-6 bg-white/5 rounded-2xl border border-white/10 shrink-0 self-start md:self-auto relative z-10 min-w-[200px]">
            <div className="font-display font-extrabold text-[#b38446] text-4xl leading-none">4.5</div>
            <div className="text-[10px] text-stone-400 font-mono tracking-widest uppercase mt-2">AVERAGE GUEST RATING</div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
