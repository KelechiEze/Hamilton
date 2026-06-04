import { useState, FormEvent } from 'react';
import { Mail, ArrowRight, Check, Hotel } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="w-full bg-[#170e06] text-white py-16 md:py-24 font-sans relative overflow-hidden" id="footer">
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0e0803] to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* TOP SECTION: Hamilton Inn Brand & Newsletter Signup */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-24 mb-16">
          
          {/* Brand & Mission Statement */}
          <div className="max-w-md space-y-4">
            <div className="flex items-center gap-3" id="footer-logo">
              <div className="relative w-8 h-8 flex items-center justify-center bg-[#b38446] text-white rounded-lg">
                <Hotel size={16} />
              </div>
              <span className="font-display font-semibold text-2xl tracking-tight text-white">
                Hamilton Inn
              </span>
            </div>
            <p className="text-[#ebdcc4] font-normal text-sm md:text-base leading-relaxed">
              Experience warm hospitality, beautiful clean rooms, and a prime location off Hwy 11 close to Alabama Splash Adventure in Bessemer, Alabama.
            </p>
          </div>

          {/* Newsletter Signup Form Area */}
          <div className="w-full lg:max-w-md space-y-4">
            <h3 className="font-display font-medium text-3xl sm:text-4xl text-[#f3ebd6] tracking-tight">
              Newsletter Signup
            </h3>
            <p className="text-stone-300 font-light text-sm">
              Receive special deals, lodging offers, and local Bessemer guide updates directly in your inbox.
            </p>

            <form onSubmit={handleSubmit} className="relative w-full max-w-sm">
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-white/5 border border-white/10 hover:border-white/20 focus:border-[#b38446] rounded-xl px-4 py-3.5 pr-12 text-sm text-white placeholder-stone-400 focus:outline-none transition-all duration-300"
                id="newsletter-email-input"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white/10 hover:bg-[#b38446] text-white hover:text-white rounded-lg transition-all duration-300 cursor-pointer"
                id="newsletter-submit-btn"
                title="Subscribe to updates"
              >
                {subscribed ? <Check size={16} /> : <ArrowRight size={16} />}
              </button>
            </form>

            {subscribed && (
              <p className="text-[#b38446] text-xs font-mono animate-pulse">
                Successfully subscribed to Hamilton Inn updates!
              </p>
            )}
          </div>

        </div>

        {/* Horizontal divider line */}
        <div className="w-full h-px bg-white/10 mb-14" />

        {/* BOTTOM SECTION: Four Grid Columns Table List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Column 1: Head Quarter & Support Details */}
          <div className="lg:col-span-5 space-y-8">
            {/* HQ Info */}
            <div className="space-y-2.5">
              <h4 className="text-[#a59178] font-semibold text-xs uppercase tracking-wider">
                Hotel Address
              </h4>
              <p className="text-stone-200 font-medium text-sm sm:text-base leading-snug">
                Hamilton Inn Bessemer - Birmingham <br />
                Highway 11 Off Interstate 20 / 59 <br />
                Bessemer, Alabama, USA
              </p>
            </div>

            {/* Support Info */}
            <div className="space-y-2.5">
              <h4 className="text-[#a59178] font-semibold text-xs uppercase tracking-wider">
                Reservations & Support
              </h4>
              <p className="text-white font-semibold text-sm sm:text-base hover:text-[#ebdcc4] transition-colors">
                <a href="mailto:booking@hamiltoninnbessemer.com">booking@hamiltoninnbessemer.com</a>
              </p>
            </div>

            {/* Phone Info */}
            <div className="space-y-2.5">
              <h4 className="text-[#a59178] font-semibold text-xs uppercase tracking-wider">
                Call Us Today
              </h4>
              <p className="text-white font-bold text-lg hover:text-[#ebdcc4] transition-colors">
                <a href="tel:205-425-2010">205-425-2010</a>
              </p>
            </div>
          </div>

          {/* Column 2: Navigations */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-[#a59178] font-semibold text-xs uppercase tracking-wider">
              Explore Our Site
            </h4>
            <ul className="space-y-3 t-xs sm:text-sm font-semibold text-stone-200">
              <li>
                <a href="#hero" className="hover:text-[#b38446] transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#what-we-do" className="hover:text-[#b38446] transition-colors">
                  Breakfast Buffet
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-[#b38446] transition-colors">
                  Explore Gallery
                </a>
              </li>
              <li>
                <a href="#properties" className="hover:text-[#b38446] transition-colors">
                  Rooms & Suites
                </a>
              </li>
              <li>
                <a href="#about-stats" className="hover:text-[#b38446] transition-colors">
                  Amenities & Stats
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-[#b38446] transition-colors">
                  Contact & Support
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Nearby Locations */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-[#a59178] font-semibold text-xs uppercase tracking-wider">
              Nearby Attractions
            </h4>
            <ul className="space-y-3.5 text-xs sm:text-sm text-stone-300">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#b38446]" />
                Alabama Splash Adventure Park (5 mins)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#b38446]" />
                Bessemer Civic Center (3 mins)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#b38446]" />
                Downtown Birmingham, AL (15 mins)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#b38446]" />
                Watercourse Industrial Complexes
              </li>
            </ul>
          </div>

        </div>

        {/* Elegant Minimal copyright tag bottom padding */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-stone-500 text-xs text-center sm:text-left">
          <p>© 2026 Hamilton Inn Bessemer - Birmingham AL. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#privacy" className="hover:text-stone-300 transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#terms" className="hover:text-stone-300 transition-colors">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
