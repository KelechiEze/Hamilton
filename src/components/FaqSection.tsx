import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, Plus, Minus } from 'lucide-react';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export default function FaqSection() {
  const [openIds, setOpenIds] = useState<string[]>([]);

  const faqs: FaqItem[] = [
    {
      id: 'faq-1',
      question: 'What are your standard check-in and check-out times?',
      answer: 'Our check-in window opens at 3:00 PM, and checkout concludes at 11:00 AM daily. Please contact our reception desk if you need special early or late arrangements.'
    },
    {
      id: 'faq-2',
      question: 'Is parking included with my hotel booking?',
      answer: 'Yes! We offer fully complimentary on-site self-parking for all registered guests directly in our well-lit parking lot surrounding the hotel building.'
    },
    {
      id: 'faq-3',
      question: 'How far is the hotel from Alabama Splash Adventure?',
      answer: 'Our convenient location off Highway 11 places you only 5 minutes (approx 2 miles) from the great water slides and rollercoasters of Alabama Splash Adventure!'
    },
    {
      id: 'faq-4',
      question: 'What is included in the complimentary breakfast?',
      answer: "Our hot breakfast buffet features warm golden waffles, sausage, scrambled eggs, toasted breads, sweet muffins, fresh fruits, and premium hot coffee."
    },
    {
      id: 'faq-5',
      question: 'Do all guest rooms include a microwave and mini-fridge?',
      answer: 'Yes, absolutely. Every executive room and whirlpool suite is fully equipped with an in-room microwave, personal mini-refrigerator, and a coffee maker.'
    },
    {
      id: 'faq-6',
      question: 'Do you offer clean accessible rooms?',
      answer: 'Yes, we have thoughtfully appointed ADA-compliant King Rooms complete with barrier-free grab rails, lower counters, and a spacious roll-in shower system.'
    },
    {
      id: 'faq-7',
      question: 'What is your reservation cancellation policy?',
      answer: 'For standard bookings, you can cancel or change your stay up to 24 hours prior to 3:00 PM on your arrival date to avoid any penalty fees.'
    },
    {
      id: 'faq-8',
      question: 'How can I reach the hotel booking team directly?',
      answer: 'You can call us directly at 205-425-2010 during any hour of the day or night. We look forward to welcoming you to the Birmingham Bessemer region!'
    }
  ];

  const toggleFaq = (id: string) => {
    if (openIds.includes(id)) {
      setOpenIds(openIds.filter((item) => item !== id));
    } else {
      setOpenIds([...openIds, id]);
    }
  };

  // Splitting them into left column (first 4) and right column (last 4) to match the dashboard image layout
  const leftFaqs = faqs.slice(0, 4);
  const rightFaqs = faqs.slice(4, 8);

  return (
    <section className="w-full max-w-7xl mx-auto px-6 py-20 bg-transparent animate-[fadeIn_0.5s_ease-out]" id="faq">
      {/* Small FAQ category header indicator */}
      <div className="flex flex-col items-center text-center mb-10">
        <div className="flex items-center gap-2 mb-4 bg-stone-100 px-4 py-2 rounded-full border border-stone-200/50">
          <HelpCircle size={14} className="text-[#b38446] shrink-0" />
          <span className="font-sans font-medium text-xs text-stone-700 tracking-wider uppercase">
            Frequently Asked Questions
          </span>
        </div>
        
        {/* Giant header precisely matching screenshot */}
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 tracking-tight leading-[1.15] max-w-3xl"
        >
          Everything You Need To Know <br className="hidden sm:inline" /> Before Booking Your Stay
        </motion.h2>
      </div>

      {/* Grid of 2 columns containing 4 panels each */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        
        {/* Left Column panel list */}
        <div className="space-y-4">
          {leftFaqs.map((item, idx) => {
            const isOpen = openIds.includes(item.id);
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                className="bg-white border border-stone-200/60 rounded-3xl p-6 md:p-8 hover:border-slate-300 hover:shadow-sm transition-all duration-300 animate-[fadeIn_0.4s_ease-out]"
                id={`faq-panel-${item.id}`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(item.id)}
                  className="w-full flex items-center justify-between text-left gap-4 font-display font-semibold text-base sm:text-lg text-stone-900 cursor-pointer group"
                >
                  <span>{item.question}</span>
                  <div className={`p-2 rounded-full transition-colors duration-300 shrink-0 ${isOpen ? 'bg-[#b38446] text-white' : 'bg-stone-50 text-stone-500 group-hover:bg-stone-100'}`}>
                    {isOpen ? <Minus size={16} className="stroke-[2.5]" /> : <Plus size={16} className="stroke-[2.5]" />}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1, marginTop: 16 }}
                      exit={{ height: 0, opacity: 0, marginTop: 0 }}
                      transition={{ duration: 0.35, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <p className="font-sans text-stone-500 text-xs sm:text-sm leading-relaxed font-light">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Right Column panel list */}
        <div className="space-y-4">
          {rightFaqs.map((item, idx) => {
            const isOpen = openIds.includes(item.id);
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: 15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                className="bg-white border border-stone-200/60 rounded-3xl p-6 md:p-8 hover:border-slate-300 hover:shadow-sm transition-all duration-300 animate-[fadeIn_0.4s_ease-out]"
                id={`faq-panel-${item.id}`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(item.id)}
                  className="w-full flex items-center justify-between text-left gap-4 font-display font-semibold text-base sm:text-lg text-stone-900 cursor-pointer group"
                >
                  <span>{item.question}</span>
                  <div className={`p-2 rounded-full transition-colors duration-300 shrink-0 ${isOpen ? 'bg-[#b38446] text-white' : 'bg-stone-50 text-stone-500 group-hover:bg-stone-100'}`}>
                    {isOpen ? <Minus size={16} className="stroke-[2.5]" /> : <Plus size={16} className="stroke-[2.5]" />}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1, marginTop: 16 }}
                      exit={{ height: 0, opacity: 0, marginTop: 0 }}
                      transition={{ duration: 0.35, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <p className="font-sans text-stone-500 text-xs sm:text-sm leading-relaxed font-light">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
