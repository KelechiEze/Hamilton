import { useState } from 'react';
import { Menu, X, ArrowRight, Phone, Hotel } from 'lucide-react';

interface NavbarProps {
  onFindRentalClick: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export default function Navbar({ onFindRentalClick, onNavigateSection }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="w-full sticky top-0 z-50">
      {/* Top Banner for Call Us & Urgent Info */}
      <div className="w-full bg-[#1c1107] text-[#e8dcc4] py-2 px-4 sm:px-6 text-xs font-sans flex flex-row items-center justify-between gap-2 border-b border-[#2e1d0c]/30">
        <div className="flex items-center gap-2">
          <span className="bg-[#b38446] text-white font-semibold text-[10px] uppercase px-1.5 py-0.5 rounded shrink-0">Special Offer</span>
          <span className="hidden md:inline">Complimentary Hot Breakfast & High-Speed WiFi Included with Every Stay</span>
          <span className="hidden sm:inline md:hidden">Breakfast & WiFi Included</span>
        </div>
        <div className="flex items-center gap-1.5 font-semibold text-[#f5ebd6] shrink-0">
          <Phone size={12} className="text-[#b38446]" />
          <span className="text-[10px] sm:text-xs">Call Us Today: <a href="tel:205-425-2010" className="hover:underline">205-425-2010</a></span>
        </div>
      </div>

      <nav className="w-full bg-stone-50/95 backdrop-blur-md px-6 py-4 border-b border-stone-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo / Brand */}
          <button 
            onClick={() => onNavigateSection('hero')} 
            className="flex items-center gap-2.5 cursor-pointer group text-left"
            id="nav-logo-btn"
          >
            <div className="relative w-9 h-9 flex items-center justify-center bg-[#b38446] text-white rounded-xl transition-transform duration-300 group-hover:scale-105 shadow-inner">
              <Hotel size={18} />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-lg leading-none tracking-tight text-stone-900 group-hover:text-[#b38446] transition-colors">
                Hamilton Inn
              </span>
              <span className="font-sans text-[10px] text-stone-500 font-medium tracking-wide">
                Bessemer · Birmingham AL
              </span>
            </div>
          </button>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-7">
            {[
              { label: 'Home', id: 'hero' },
              { label: 'Breakfast', id: 'what-we-do' },
              { label: 'Explore', id: 'gallery' },
              { label: 'Rooms', id: 'properties' },
              { label: 'Amenities', id: 'about-stats' },
              { label: 'FAQ & Contact', id: 'faq' }
            ].map((link) => (
              <button
                key={link.label}
                onClick={() => onNavigateSection(link.id)}
                className="font-sans font-medium text-xs md:text-sm text-stone-600 hover:text-[#b38446] hover:underline underline-offset-4 decoration-2 transition-all duration-200 cursor-pointer"
                id={`nav-${link.label.toLowerCase().replace(/\s+/g, '-')}-btn`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Action Button: BOOK NOW */}
          <button
            onClick={onFindRentalClick}
            className="hidden md:flex items-center gap-2.5 bg-[#b38446] hover:bg-[#976a2f] active:scale-95 text-white font-sans font-semibold text-xs md:text-sm px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group"
            id="nav-find-rental-btn"
          >
            <span>BOOK NOW</span>
            <div className="bg-white/15 text-white w-5 h-5 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
              <ArrowRight size={10} className="stroke-[3]" />
            </div>
          </button>

          {/* Mobile menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-stone-700 hover:text-black transition-colors"
            id="nav-mobile-toggle"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-white border-b border-stone-200/60 shadow-xl px-6 py-6 flex flex-col gap-4 z-50 animate-[fadeIn_0.2s_ease-out]">
            {[
              { label: 'Home', id: 'hero' },
              { label: 'Breakfast', id: 'what-we-do' },
              { label: 'Explore', id: 'gallery' },
              { label: 'Rooms', id: 'properties' },
              { label: 'Amenities', id: 'about-stats' },
              { label: 'FAQ & Contact', id: 'faq' }
            ].map((link) => (
              <button
                key={link.label}
                onClick={() => {
                  onNavigateSection(link.id);
                  setMobileMenuOpen(false);
                }}
                className="font-sans font-semibold text-left text-sm text-stone-700 hover:text-[#b38446] py-1 border-b border-stone-100"
                id={`nav-mob-${link.label.toLowerCase().replace(/\s+/g, '-')}-btn`}
              >
                {link.label}
              </button>
            ))}
            
            <button
              onClick={() => {
                onFindRentalClick();
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-between w-full bg-[#b38446] hover:bg-[#976a2f] text-white font-sans font-bold px-5 py-3.5 rounded-full shadow-md transition-colors mt-2"
              id="nav-mob-find-rental-btn"
            >
              <span>BOOK NOW</span>
              <div className="bg-white/20 text-white w-7 h-7 rounded-full flex items-center justify-center">
                <ArrowRight size={14} className="stroke-[3]" />
              </div>
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}
