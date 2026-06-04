import { motion } from 'motion/react';
import { Award, Compass, Heart, Shield } from 'lucide-react';

export default function CompanySection() {
  const principles = [
    {
      icon: <Compass size={24} className="text-stone-800" />,
      title: 'Architectural Ecology',
      description: 'We carve luxury spaces directly into nature, preserving local mosses, centuries-old pines, and water ecosystems without disruption.'
    },
    {
      icon: <Shield size={24} className="text-stone-800" />,
      title: 'Obsessive Security',
      description: 'Enjoy guaranteed absolute physical isolation and complete end-to-end database secrecy regarding your elite stays.'
    },
    {
      icon: <Heart size={24} className="text-stone-800" />,
      title: 'Bespoke Customization',
      description: 'Your food, spirits, climate profiles, pillow firmness, and ambient music selections are prepared in perfect detail prior to landing.'
    },
    {
      icon: <Award size={24} className="text-stone-800" />,
      title: 'Michelin Stewardship',
      description: 'Each resort features direct culinary menus created by double Michelin-starred resident chefs sourcing fresh local organic harvests.'
    }
  ];

  return (
    <section className="w-full py-24 bg-[#FAF9F6] border-t border-stone-200/55" id="company">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Text Detail */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-400">
              <span className="w-8 h-px bg-[#b38446]" />
              Our Hospitality Ideals
            </div>

            <h2 className="font-display font-bold text-3xl md:text-5xl text-stone-950 tracking-tight leading-tight">
              An Elite Residence <br />Driven by Precision
            </h2>

            <p className="font-sans text-sm text-stone-500 font-light leading-relaxed">
              At Hamilton Inn, we don't build generic hotels — we craft bespoke living monuments. Our accommodations off Highway 11 represent a rigorous integration of premium comfort, high-speed amenities, and elite hospitality support.
            </p>

            {/* Dynamic visual badge stats */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="p-4 bg-white rounded-2xl border border-stone-100 shadow-sm text-center">
                <div className="font-display font-extrabold text-2xl text-stone-900">4</div>
                <div className="text-[10px] text-stone-400 uppercase tracking-wider font-semibold font-mono mt-1">Global Locations</div>
              </div>
              <div className="p-4 bg-white rounded-2xl border border-stone-100 shadow-sm text-center">
                <div className="font-display font-extrabold text-2xl text-stone-900">100%</div>
                <div className="text-[10px] text-stone-400 uppercase tracking-wider font-semibold font-mono mt-1">Bespoke Privacy</div>
              </div>
            </div>
          </div>

          {/* Right Principles Grid List */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
            {principles.map((pr, idx) => (
              <motion.div
                key={pr.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="bg-white p-6 md:p-8 rounded-[2rem] border border-stone-100 shadow-sm hover:shadow-md transition-shadow duration-300 space-y-4"
                id={`principle-${idx}`}
              >
                <div className="w-12 h-12 rounded-2xl bg-[#b38446]/15 flex items-center justify-center shrink-0">
                  {pr.icon}
                </div>
                <div className="space-y-1.5">
                  <h3 className="font-display font-bold text-base text-stone-900 tracking-tight">{pr.title}</h3>
                  <p className="font-sans text-xs text-stone-500 font-light leading-relaxed">{pr.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
