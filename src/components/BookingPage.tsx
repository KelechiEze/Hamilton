import { useState, useEffect, useRef, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, Calendar, Users, ShieldCheck, Mail, User, Phone, 
  Sparkles, Check, ChevronRight, Hash, BedDouble, Maximize2, 
  MapPin, Printer, Star, Coffee, AlertCircle, Heart, CheckCircle2 
} from 'lucide-react';
import { ROOMS_DATA } from '../data';
import { Room } from '../types';

interface BookingPageProps {
  onBackToHome: () => void;
  preSelectedRoomId?: string;
  key?: string;
}

export default function BookingPage({ onBackToHome, preSelectedRoomId }: BookingPageProps) {
  // Navigation stepper: 'rooms' | 'details' | 'success'
  const [step, setStep] = useState<'rooms' | 'details' | 'success'>(
    preSelectedRoomId ? 'details' : 'rooms'
  );
  
  // Keep track of the selected room index / object
  const [selectedRoomId, setSelectedRoomId] = useState<string>(
    preSelectedRoomId && ROOMS_DATA.some(r => r.id === preSelectedRoomId)
      ? preSelectedRoomId 
      : ROOMS_DATA[0].id
  );

  const selectedRoom = ROOMS_DATA.find((r) => r.id === selectedRoomId) || ROOMS_DATA[0];

  // Calendar dates setups: Default to tomorrow to 3 days after
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const threeDaysLater = new Date(tomorrow);
  threeDaysLater.setDate(threeDaysLater.getDate() + 3);

  const formatDate = (date: Date) => date.toISOString().split('T')[0];

  const [checkIn, setCheckIn] = useState<string>(formatDate(tomorrow));
  const [checkOut, setCheckOut] = useState<string>(formatDate(threeDaysLater));
  const [guestsCount, setGuestsCount] = useState<number>(2);
  
  // Guest customer fields
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [specialRequests, setSpecialRequests] = useState<string>('');
  
  // Custom complimentary package add-ons
  const [addOns, setAddOns] = useState({
    earlyCheckIn: false,
    fruitBasket: false,
    frenchCoffee: false,
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [confirmedBookingId, setConfirmedBookingId] = useState<string>('');

  // Individual image showcase index for selected room
  const [activeImageIdx, setActiveImageIdx] = useState<number>(0);

  // Recalculate duration in nights
  const getNightsCount = (start: string, end: string): number => {
    const sDate = new Date(start);
    const eDate = new Date(end);
    const diffTime = eDate.getTime() - sDate.getTime();
    if (isNaN(diffTime) || diffTime <= 0) return 1;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const nights = getNightsCount(checkIn, checkOut);
  const roomRateAmount = selectedRoom.pricePerNight * nights;
  const standardHotelTax = Math.round(roomRateAmount * 0.12); // local 12% lodger tax
  const totalStayCost = roomRateAmount + standardHotelTax;

  // Enforce capacity safety checks
  useEffect(() => {
    if (guestsCount > selectedRoom.capacity) {
      setGuestsCount(selectedRoom.capacity);
    }
  }, [selectedRoomId]);

  // Adjust active image state when room switches
  useEffect(() => {
    setActiveImageIdx(0);
  }, [selectedRoomId]);

  const handleCreateReservation = (e: FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phoneNumber) {
      return;
    }

    setIsSubmitting(true);

    // High fidelity virtual booking coordination simulation
    setTimeout(() => {
      const generatedCode = `HMI-${Math.floor(200000 + Math.random() * 799999)}`;
      setConfirmedBookingId(generatedCode);
      setIsSubmitting(false);
      setStep('success');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1500);
  };

  const handlePrintVoucher = () => {
    window.print();
  };

  // Safe reset to let them prepare another booking
  const handleReset = () => {
    setStep('rooms');
    setFullName('');
    setEmail('');
    setPhoneNumber('');
    setSpecialRequests('');
    setCheckIn(formatDate(tomorrow));
    setCheckOut(formatDate(threeDaysLater));
    setGuestsCount(2);
    setAddOns({
      earlyCheckIn: false,
      fruitBasket: false,
      frenchCoffee: false,
    });
  };

  return (
    <div className="w-full min-h-screen bg-[#faf9f6] text-stone-900 pb-24" id="booking-flow-page">
      
      {/* 1. SEAMLESS LUXURY HERO HEADER */}
      <div className="bg-stone-950 text-white py-12 px-6 relative overflow-hidden mb-12 border-b border-stone-800">
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/90 to-stone-900/40 z-10" />
        <div className="absolute top-0 right-0 w-[600px] h-[300px] bg-[#b38446]/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-20 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-4">
            <button 
              onClick={onBackToHome}
              className="inline-flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-stone-400 hover:text-[#b38446] transition-colors cursor-pointer group"
              id="back-home-top-btn"
            >
              <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
              <span>Back to Home View</span>
            </button>
            <div className="space-y-1">
              <h1 className="font-serif font-extrabold text-4xl sm:text-5xl tracking-tight text-white italic">
                Bespoke Reservations
              </h1>
              <p className="font-sans text-stone-400 text-xs sm:text-sm font-light">
                Hamilton Inn Bessemer · Birmingham, AL · Convenient Comfort Off Hwy 11
              </p>
            </div>
          </div>

          {/* Luxury Signature Badge */}
          <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-3 rounded-2xl w-fit">
            <div className="w-8 h-8 rounded-full bg-[#b38446]/20 flex items-center justify-center text-[#b38446]">
              <ShieldCheck size={18} />
            </div>
            <div className="font-mono text-[10px] sm:text-xs">
              <span className="text-white font-semibold block uppercase">Direct Booking Guarantee</span>
              <span className="text-stone-400">Complimentary Breakfast & WiFi Included</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. LIVE STEP PROGRESS GAUGE */}
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 bg-white border border-stone-200/60 shadow-sm rounded-3xl p-6">
          <div className="font-serif font-bold text-stone-800 text-sm tracking-wide shrink-0 italic">
            Booking Steps:
          </div>
          
          <div className="flex flex-wrap items-center gap-3 md:gap-6 text-xs sm:text-sm font-sans w-full">
            <button 
              onClick={() => step !== 'success' && setStep('rooms')}
              className={`flex items-center gap-2.5 font-medium transition-colors ${step === 'rooms' ? 'text-[#b38446] font-semibold' : 'text-stone-400 hover:text-stone-700'}`}
              disabled={step === 'success'}
              id="step-tab-rooms"
            >
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-3xs font-mono font-bold border ${step === 'rooms' ? 'bg-[#b38446] border-[#b38446] text-white' : 'border-stone-300 text-stone-400'}`}>1</span>
              <span>Select Room Sanctuary</span>
            </button>

            <ChevronRight size={14} className="text-stone-300 hidden sm:block" />

            <button 
              onClick={() => step !== 'success' && selectedRoomId && setStep('details')}
              className={`flex items-center gap-2.5 font-medium transition-colors ${step === 'details' ? 'text-[#b38446] font-semibold' : 'text-stone-400'} ${!selectedRoomId && 'opacity-50 cursor-not-allowed'}`}
              disabled={step === 'success' || !selectedRoomId}
              id="step-tab-details"
            >
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-3xs font-mono font-bold border ${step === 'details' ? 'bg-[#b38446] border-[#b38446] text-white' : 'border-stone-300 text-stone-400'}`}>2</span>
              <span>Stay & Guest Details</span>
            </button>

            <ChevronRight size={14} className="text-stone-300 hidden sm:block" />

            <div className={`flex items-center gap-2.5 font-medium ${step === 'success' ? 'text-[#b38446] font-semibold' : 'text-stone-400'}`}>
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-3xs font-mono font-bold border ${step === 'success' ? 'bg-[#b38446] border-[#b38446] text-white' : 'border-stone-300 text-stone-400'}`}>3</span>
              <span>Confirm Invoice Voucher</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <AnimatePresence mode="wait">
          
          {/* STEP 1: SELECT ROOM SANCTUARY */}
          {step === 'rooms' && (
            <motion.div
              key="step-rooms"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="space-y-10"
            >
              <div className="text-center max-w-3xl mx-auto space-y-3">
                <span className="text-[10px] sm:text-xs font-mono font-bold uppercase text-[#b38446] tracking-[0.2em] block">STEP 1 OF 2</span>
                <h2 className="font-serif font-extrabold text-3xl sm:text-5xl text-stone-900 tracking-tight leading-tight">
                  Choose Your Perfect Alabamian Sanctuary
                </h2>
                <p className="font-sans text-stone-500 font-light text-xs sm:text-sm leading-relaxed">
                  Compare our bespoke room layouts configured with cozy mattress layers, in-room microwaves, refrigerators, and high-speed WiFi. Select a room layout to immediately customize your booking parameters.
                </p>
              </div>

              {/* Spectacular E-Commerce Product Listing Style Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full" id="booking-rooms-grid">
                {ROOMS_DATA.map((room) => {
                  const isSelected = selectedRoomId === room.id;
                  return (
                    <div
                      key={room.id}
                      onClick={() => {
                        setSelectedRoomId(room.id);
                        setStep('details');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="bg-white rounded-3xl overflow-hidden border border-stone-200/50 hover:border-[#b38446] transition-all duration-300 cursor-pointer flex flex-col justify-between group shadow-sm hover:shadow-xl hover:-translate-y-1 relative"
                      id={`select-card-${room.id}`}
                    >
                      {/* Premium E-commerce Top Badges */}
                      <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5 items-start">
                        <span className="bg-stone-900/85 backdrop-blur-md text-white font-mono text-[9px] px-3 py-1 rounded-full uppercase tracking-wider font-semibold border border-white/10">
                          {room.type}
                        </span>
                        <span className="bg-[#b38446]/95 backdrop-blur-md text-white font-mono text-[8px] px-2.5 py-0.5 rounded-md uppercase tracking-wide font-bold">
                          FREE Breakfast & WiFi
                        </span>
                      </div>

                      {/* Top Right Star Rating Rating Badge */}
                      <div className="absolute top-4 right-4 z-10 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-full text-[10px] font-bold shadow-md flex items-center gap-1 border border-stone-100">
                        <Star className="fill-amber-400 stroke-amber-400" size={12} />
                        <span className="text-stone-800 font-mono font-bold">{room.rating}</span>
                      </div>

                      {/* Image Frame with zoom-on-hover */}
                      <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100">
                        <img 
                          src={room.images[0]} 
                          alt={room.name} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-60 pointer-events-none" />
                      </div>

                      {/* Content Card Body */}
                      <div className="p-6 flex-grow flex flex-col justify-between space-y-5">
                        <div className="space-y-3">
                          {/* Title and rating */}
                          <div className="space-y-1">
                            <h3 className="font-serif font-bold text-xl sm:text-2xl text-stone-900 leading-tight group-hover:text-[#b38446] transition-colors">
                              {room.name}
                            </h3>
                            <span className="text-[10px] text-[#b38446] font-mono tracking-wider font-semibold block uppercase">Hamilton Luxury Preferred Suite</span>
                          </div>

                          <p className="font-sans text-xs text-stone-500 font-light leading-relaxed line-clamp-3">
                            {room.description}
                          </p>

                          {/* Quick spec icons display - nice pastel look */}
                          <div className="flex flex-wrap gap-2 pt-2">
                            <span className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-50 text-stone-600 font-sans text-3xs sm:text-[11px] rounded-full border border-stone-150/65 font-medium">
                              <BedDouble size={12} className="text-[#b38446]" />
                              <span>{room.bedType}</span>
                            </span>
                            <span className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-50 text-stone-600 font-sans text-3xs sm:text-[11px] rounded-full border border-stone-150/65 font-medium">
                              <Users size={12} className="text-[#b38446]" />
                              <span>Max {room.capacity} Guests</span>
                            </span>
                          </div>
                        </div>

                        {/* Price highlight and interactive CTA block */}
                        <div className="pt-4 border-t border-stone-100 flex flex-col gap-3">
                          {/* Price Tag Details */}
                          <div className="flex items-baseline justify-between">
                            <span className="text-stone-400 font-sans text-xs font-light">Direct Guaranteed Rate</span>
                            <div className="flex items-baseline gap-1">
                              <span className="font-mono text-2xl sm:text-3xl font-extrabold text-[#b38446]">${room.pricePerNight}</span>
                              <span className="text-stone-400 font-sans text-xs font-light font-mono">/ night</span>
                            </div>
                          </div>

                          {/* Direct Select Action Button */}
                          <button
                            type="button"
                            className="w-full bg-[#b38446] hover:bg-stone-950 text-white font-sans font-bold text-xs uppercase tracking-wider py-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-sm group-hover:shadow-md active:scale-[0.98] cursor-pointer"
                          >
                            <span>Book Sanctuary Layout</span>
                            <ArrowLeft size={13} className="rotate-180 stroke-[2] transition-transform duration-300 group-hover:translate-x-1" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* STEP 2: STAY & GUEST DETAILS */}
          {step === 'details' && (
            <motion.div
              key="step-details"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="space-y-8"
            >
              <div className="space-y-2">
                <button
                  onClick={() => setStep('rooms')}
                  className="inline-flex items-center gap-1.5 text-xs text-stone-500 hover:text-[#b38446] font-mono uppercase tracking-wider transition-colors cursor-pointer"
                  id="back-rooms-btn"
                >
                  <ArrowLeft size={12} />
                  <span>Choose a different room</span>
                </button>
                <span className="text-xs font-mono font-bold uppercase text-[#b38446] tracking-widest block">STEP 2 OF 2</span>
                <h2 className="font-serif font-bold text-2xl sm:text-4xl text-stone-900 tracking-tight">
                  Stay Schedule & Personal Coordination
                </h2>
                <p className="font-sans text-stone-500 font-light text-sm max-w-2xl leading-relaxed">
                  Enter your dates, details, and special guest requests. Our coordination team handles all requests with complete attention before your arrival off Hwy 11.
                </p>
              </div>

              <form onSubmit={handleCreateReservation} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                
                {/* Stay Forms details (Left Column) */}
                <div className="lg:col-span-8 bg-white border border-stone-200/60 shadow-sm rounded-3xl p-6 md:p-10 space-y-8" id="guest-booking-form">
                  
                  {/* Selected Sanctuary Headline Block - E-Commerce Style */}
                  <div className="bg-stone-950 text-white p-5 sm:p-6 rounded-2xl md:rounded-[2rem] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border border-stone-850 shadow-md relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-stone-950/40 to-[#b38446]/10 opacity-60 pointer-events-none" />
                    
                    <div className="flex items-center gap-4 relative z-10 animate-[fadeIn_0.3s_ease]">
                      <img 
                        src={selectedRoom.images[0]} 
                        alt={selectedRoom.name} 
                        className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl object-cover border border-stone-800 shrink-0"
                      />
                      <div className="space-y-0.5 sm:space-y-1 text-left">
                        <span className="text-[9px] font-mono uppercase tracking-[0.15em] text-[#b38446] block font-extrabold">Selected Sanctuary Layout</span>
                        <h3 className="font-display font-extrabold text-sm sm:text-base text-white leading-tight">
                          {selectedRoom.name}
                        </h3>
                        <p className="font-sans text-[10px] sm:text-xs text-stone-300 font-light font-sans">
                          {selectedRoom.bedType} · Breakfast & WiFi Included
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-t-0 border-white/5 pt-3 sm:pt-0 relative z-10 shrink-0">
                      <div className="text-left sm:text-right">
                        <div className="flex items-baseline gap-0.5">
                          <span className="font-mono font-extrabold text-[#b38446] text-base sm:text-lg">${selectedRoom.pricePerNight}</span>
                          <span className="text-[9px] font-sans text-stone-400">/ night</span>
                        </div>
                        <span className="text-[8px] font-mono text-emerald-400 uppercase font-semibold block sm:text-right">Price Locked</span>
                      </div>
                      
                      <button
                        type="button"
                        onClick={() => {
                          setStep('rooms');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="bg-white/10 hover:bg-white text-white hover:text-stone-950 font-sans font-bold text-3xs sm:text-2xs uppercase tracking-wider px-4 py-2.5 rounded-xl border border-white/10 transition-all cursor-pointer shadow-sm active:scale-95"
                      >
                        Change Room
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pb-4 border-b border-stone-100">
                    <h3 className="font-serif font-bold text-stone-900 text-lg">
                      1. Reservation Parameters
                    </h3>
                    <span className="text-3xs font-mono bg-stone-100 border text-stone-500 px-3 py-1 rounded-full uppercase">
                      Validator Active
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Check In Date */}
                    <div className="space-y-2">
                      <label className="text-stone-500 text-xs font-mono uppercase tracking-wider block">Check-In</label>
                      <div className="relative">
                        <Calendar size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
                        <input
                          type="date"
                          min={formatDate(tomorrow)}
                          value={checkIn}
                          onChange={(e) => {
                            setCheckIn(e.target.value);
                            // Auto adjust checkout if it overlaps
                            if (new Date(e.target.value) >= new Date(checkOut)) {
                              const nextD = new Date(e.target.value);
                              nextD.setDate(nextD.getDate() + 2);
                              setCheckOut(formatDate(nextD));
                            }
                          }}
                          className="w-full bg-stone-50 border border-stone-200 focus:border-[#b38446] rounded-xl pl-12 pr-4 py-3.5 text-xs sm:text-sm text-stone-800 focus:outline-none transition-colors cursor-pointer"
                          id="book-form-checkin"
                          required
                        />
                      </div>
                    </div>

                    {/* Check Out Date */}
                    <div className="space-y-2">
                      <label className="text-stone-500 text-xs font-mono uppercase tracking-wider block">Check-Out</label>
                      <div className="relative">
                        <Calendar size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
                        <input
                          type="date"
                          min={checkIn}
                          value={checkOut}
                          onChange={(e) => setCheckOut(e.target.value)}
                          className="w-full bg-stone-50 border border-stone-200 focus:border-[#b38446] rounded-xl pl-12 pr-4 py-3.5 text-xs sm:text-sm text-stone-800 focus:outline-none transition-colors cursor-pointer"
                          id="book-form-checkout"
                          required
                        />
                      </div>
                    </div>

                    {/* Guests Select */}
                    <div className="sm:col-span-2 space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-stone-500 text-xs font-mono uppercase tracking-wider block">Authorized Guests</label>
                        <span className="text-3xs text-stone-400 font-light block">Max allowed matching suite size: {selectedRoom.capacity} guests</span>
                      </div>
                      <div className="relative">
                        <Users size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
                        <input
                          type="number"
                          min="1"
                          max={selectedRoom.capacity}
                          value={guestsCount}
                          onChange={(e) => setGuestsCount(Math.min(selectedRoom.capacity, Math.max(1, parseInt(e.target.value) || 1)))}
                          className="w-full bg-stone-50 border border-stone-200 focus:border-[#b38446] rounded-xl pl-12 pr-4 py-3.5 text-xs sm:text-sm text-stone-800 focus:outline-none transition-colors font-medium"
                          id="book-form-guests"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pb-4 border-b border-stone-100 pt-3">
                    <h3 className="font-serif font-bold text-stone-900 text-lg">
                      2. Guest Resident Information
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Full name */}
                    <div className="space-y-2">
                      <label className="text-stone-500 text-xs font-mono uppercase tracking-wider block">Full Legal Name</label>
                      <div className="relative">
                        <User size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
                        <input
                          type="text"
                          placeholder="your first & last name"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="w-full bg-stone-50 border border-stone-200 focus:border-[#b38446] rounded-xl pl-12 pr-4 py-3.5 text-xs sm:text-sm text-stone-800 focus:outline-none transition-colors"
                          id="book-form-name"
                          required
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label className="text-stone-500 text-xs font-mono uppercase tracking-wider block">Email Address</label>
                      <div className="relative">
                        <Mail size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
                        <input
                          type="email"
                          placeholder="e.g. resident@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-stone-50 border border-stone-200 focus:border-[#b38446] rounded-xl pl-12 pr-4 py-3.5 text-xs sm:text-sm text-stone-800 focus:outline-none transition-colors"
                          id="book-form-email"
                          required
                        />
                      </div>
                    </div>

                    {/* Phone Number */}
                    <div className="sm:col-span-2 space-y-2">
                      <label className="text-stone-500 text-xs font-mono uppercase tracking-wider block">Mobile Phone Number</label>
                      <div className="relative">
                        <Phone size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
                        <input
                          type="tel"
                          placeholder="e.g. 205-000-0000"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          className="w-full bg-stone-50 border border-stone-200 focus:border-[#b38446] rounded-xl pl-12 pr-4 py-3.5 text-xs sm:text-sm text-stone-800 focus:outline-none transition-colors"
                          id="book-form-phone"
                          required
                        />
                      </div>
                    </div>

                    {/* Special requests comments */}
                    <div className="sm:col-span-2 space-y-2">
                      <label className="text-stone-500 text-xs font-mono uppercase tracking-wider block">Concierge Special Requests (Optional)</label>
                      <textarea
                        rows={3}
                        placeholder="e.g. Ground floor request, extra towels, ADA assistance near parking, quiet room away from ice machine..."
                        value={specialRequests}
                        onChange={(e) => setSpecialRequests(e.target.value)}
                        className="w-full bg-stone-50 border border-stone-200 focus:border-[#b38446] rounded-xl p-4 text-xs sm:text-sm text-stone-800 focus:outline-none transition-all duration-300 resize-none"
                        id="book-form-requests"
                      />
                    </div>
                  </div>

                  {/* 3. Complimentary Services Options Selection */}
                  <div className="flex items-center justify-between pb-4 border-b border-stone-100 pt-3">
                    <h3 className="font-serif font-bold text-stone-900 text-lg">
                      3. Complimentary Welcome Perks
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <button
                      type="button"
                      onClick={() => setAddOns(prev => ({ ...prev, earlyCheckIn: !prev.earlyCheckIn }))}
                      className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                        addOns.earlyCheckIn 
                          ? 'border-[#b38446] bg-[#b38446]/5 text-[#b38446]' 
                          : 'border-stone-200 hover:border-stone-400 bg-transparent text-stone-600'
                      }`}
                      id="addon-early-btn"
                    >
                      <div className="flex items-center gap-2 mb-1.5 font-semibold text-xs uppercase font-sans">
                        <Users size={14} />
                        <span>Early Check-in</span>
                      </div>
                      <p className="text-[10px] text-stone-400 font-light font-sans">Request arrivals coordinate ahead of standard 3:00 PM Check-In. <strong className="font-semibold block text-[#b38446] mt-1">FREE</strong></p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setAddOns(prev => ({ ...prev, fruitBasket: !prev.fruitBasket }))}
                      className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                        addOns.fruitBasket 
                          ? 'border-[#b38446] bg-[#b38446]/5 text-[#b38446]' 
                          : 'border-stone-200 hover:border-stone-400 bg-transparent text-stone-600'
                      }`}
                      id="addon-fruit-btn"
                    >
                      <div className="flex items-center gap-2 mb-1.5 font-semibold text-xs uppercase font-sans">
                        <Heart size={14} />
                        <span>Fresh Fruits</span>
                      </div>
                      <p className="text-[10px] text-stone-400 font-light font-sans">Enjoy a complimentary seasonal fruit platter paired in-room on your first arrival. <strong className="font-semibold block text-[#b38446] mt-1">FREE</strong></p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setAddOns(prev => ({ ...prev, frenchCoffee: !prev.frenchCoffee }))}
                      className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                        addOns.frenchCoffee 
                          ? 'border-[#b38446] bg-[#b38446]/5 text-[#b38446]' 
                          : 'border-stone-200 hover:border-stone-400 bg-transparent text-stone-600'
                      }`}
                      id="addon-coffee-btn"
                    >
                      <div className="flex items-center gap-2 mb-1.5 font-semibold text-xs uppercase font-sans">
                        <Coffee size={14} />
                        <span>French Press Coffee</span>
                      </div>
                      <p className="text-[10px] text-stone-400 font-light font-sans">Bespoke french press setup upgraded in room for mornings. <strong className="font-semibold block text-[#b38446] mt-1">FREE</strong></p>
                    </button>
                  </div>
                </div>

                {/* Pricing summary validation sidebar (Right Column) */}
                <div className="lg:col-span-4 bg-stone-950 text-white rounded-[2.5rem] border border-white/5 p-6 md:p-8 space-y-6 lg:sticky lg:top-32 shadow-xl">
                  <div className="flex items-center justify-between text-[#b38446] text-xs font-mono uppercase tracking-widest pb-4 border-b border-white/10">
                    <span>Invoice Valuation</span>
                    <Hash size={14} />
                  </div>

                  {/* Summary card details */}
                  <div className="space-y-3 font-sans text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-stone-400">Chosen Sanctuary</span>
                      <span className="font-semibold text-stone-100">{selectedRoom.name}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-stone-400">Total Nights Duration</span>
                      <span className="font-semibold text-stone-100">{nights} {nights === 1 ? 'Night' : 'Nights'}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-stone-400">Authorized Guests</span>
                      <span className="font-semibold text-stone-100">{guestsCount} Guests</span>
                    </div>
                  </div>

                  {/* Detailed Math formulas pricing */}
                  <div className="bg-white/5 p-5 border border-white/10 rounded-2xl space-y-3">
                    <div className="flex items-center justify-between text-2xs font-mono uppercase tracking-widest text-[#b38446] border-b border-white/5 pb-2">
                      <span>Valuation breakdown</span>
                      <span>USD</span>
                    </div>

                    <div className="space-y-2 text-xs text-stone-300 font-light">
                      <div className="flex items-center justify-between font-sans">
                        <span>Stay charges (${selectedRoom.pricePerNight} × {nights})</span>
                        <span className="font-mono text-white">${roomRateAmount}</span>
                      </div>
                      <div className="flex items-center justify-between font-sans">
                        <span>Complimentary Bufet Breakfast</span>
                        <span className="font-mono text-[#b38446] text-[10px] font-bold">FREE ($0)</span>
                      </div>
                      <div className="flex items-center justify-between font-sans">
                        <span>Complimentary High-speed WiFi</span>
                        <span className="font-mono text-[#b38446] text-[10px] font-bold">FREE ($0)</span>
                      </div>
                      <div className="flex items-center justify-between font-sans pt-1 border-t border-dashed border-white/5">
                        <span>Hotel Resort & Lodgers Tax (12%)</span>
                        <span className="font-mono text-white">${standardHotelTax}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm sm:text-base font-semibold text-white pt-3 border-t border-white/10 font-sans">
                      <span>Dynamic Grand Total</span>
                      <span className="font-mono text-[#b38446]">${totalStayCost}</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#b38446] hover:bg-white hover:text-black disabled:bg-stone-800 disabled:text-stone-500 text-white font-semibold py-4 rounded-2xl text-xs tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-98"
                    id="submit-real-booking-btn"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="animate-pulse">Locking Direct Rate...</span>
                      </>
                    ) : (
                      <>
                        <span>Request Direct Booking</span>
                        <ArrowLeft size={14} className="rotate-180 stroke-[3]" />
                      </>
                    )}
                  </button>

                  <div className="flex items-start gap-2 text-[10px] text-stone-500 font-light font-sans leading-relaxed">
                    <AlertCircle size={12} className="text-[#b38446] shrink-0 mt-0.5" />
                    <span>Free execution cancellation up to 72 hours. Rest assured layout choices are directly locked at this rate.</span>
                  </div>
                </div>

              </form>
            </motion.div>
          )}

          {/* STEP 3: BOOKING SUCCESS - PRINTABLE INVOICE VOUCHER */}
          {step === 'success' && (
            <motion.div
              key="step-success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25 }}
              className="max-w-2xl mx-auto space-y-8"
            >
              <div className="bg-white border border-stone-200/60 shadow-xl rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden flex flex-col items-center" id="booking-success-container">
                
                {/* Embedded printable ticket header banner */}
                <div className="absolute top-0 inset-x-0 h-4 bg-[#b38446]" />
                
                {/* Checked Stamp animation check */}
                <div className="w-16 h-16 rounded-full bg-[#b38446] text-white flex items-center justify-center mb-6 shadow-lg shadow-[#b38446]/20">
                  <Check size={32} className="stroke-[3]" />
                </div>

                <div className="text-center space-y-2">
                  <h3 className="font-serif font-bold text-3xl md:text-4xl text-stone-900 leading-tight italic">
                    Reservation Secured!
                  </h3>
                  <p className="font-sans text-stone-500 font-light text-xs sm:text-sm max-w-sm mx-auto leading-relaxed">
                    Welcome to Alabama! Your residency voucher has been coordinates. A hospitality team manager will contact <strong className="text-stone-900 font-semibold">{email}</strong> or <strong className="text-stone-900 font-semibold">{phoneNumber}</strong> to organize bespoke requirements.
                  </p>
                </div>

                {/* Dynamic Voucher Pass Ticket */}
                <div className="w-full bg-stone-50 border border-stone-200 rounded-3xl p-6 md:p-8 my-8 space-y-6 font-sans text-xs">
                  
                  {/* Top line ID bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-200 pb-4">
                    <div className="flex items-center gap-1">
                      <Hash size={12} className="text-[#b38446]" />
                      <span className="font-mono text-[10px] sm:text-xs tracking-wider uppercase font-medium text-stone-400">HAMILTON RESIDENCY VOUCHER</span>
                    </div>
                    <span className="font-mono font-bold text-[#b38446] text-xs sm:text-sm bg-[#b38446]/10 px-3.5 py-1 rounded-full border border-[#b38446]/20 self-start sm:self-auto">
                      {confirmedBookingId}
                    </span>
                  </div>

                  {/* Core Stay Values Column grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 pt-2">
                    <div>
                      <span className="text-[#b38446] text-4xs tracking-widest uppercase font-mono block mb-1">Guest Resident</span>
                      <span className="font-semibold text-stone-800 text-sm sm:text-base">{fullName}</span>
                      <span className="text-stone-400 text-4xs block font-light mt-0.5">{email} · {phoneNumber}</span>
                    </div>

                    <div>
                      <span className="text-[#b38446] text-4xs tracking-widest uppercase font-mono block mb-1">Assigned Suite Layout</span>
                      <span className="font-semibold text-stone-800 text-sm sm:text-base leading-tight block">{selectedRoom.name}</span>
                      <span className="text-stone-400 text-4xs block font-mono mt-0.5">{selectedRoom.bedType} · {selectedRoom.size} m²</span>
                    </div>

                    <div className="sm:border-t border-stone-200/50 sm:pt-4">
                      <span className="text-[#b38446] text-4xs tracking-widest uppercase font-mono block mb-1">Scheduled Stay Range</span>
                      <span className="font-medium text-stone-700 text-xs sm:text-sm">{checkIn} — {checkOut}</span>
                      <span className="text-stone-400 text-4xs block font-light mt-0.5">{nights} Stay Nights · Standard Check-In 3 PM</span>
                    </div>

                    <div className="border-t border-stone-200/50 pt-4">
                      <span className="text-[#b38446] text-4xs tracking-widest uppercase font-mono block mb-1">Consolidated Stays Charges</span>
                      <span className="font-bold text-stone-900 text-base sm:text-xl font-mono">${totalStayCost}</span>
                      <span className="text-stone-400 text-4xs block font-light mt-0.5">Rate details complete with complimentary Breakfast + WiFi</span>
                    </div>
                  </div>

                  {/* Addons summary */}
                  {(addOns.earlyCheckIn || addOns.fruitBasket || addOns.frenchCoffee) && (
                    <div className="border-t border-dotted border-stone-300 pt-4 space-y-1.5">
                      <span className="text-stone-400 text-[9px] uppercase font-mono tracking-wider block">Complimentary Concierge Perks Selected:</span>
                      <div className="flex flex-wrap gap-2">
                        {addOns.earlyCheckIn && <span className="bg-[#b38446]/5 border border-[#b38446]/20 text-[#b38446] text-[10px] px-2.5 py-0.5 rounded-full font-medium">✓ Early Check-in (Scheduled)</span>}
                        {addOns.fruitBasket && <span className="bg-[#b38446]/5 border border-[#b38446]/20 text-[#b38446] text-[10px] px-2.5 py-0.5 rounded-full font-medium">✓ In-Room Fresh Fruit Platter</span>}
                        {addOns.frenchCoffee && <span className="bg-[#b38446]/5 border border-[#b38446]/20 text-[#b38446] text-[10px] px-2.5 py-0.5 rounded-full font-medium">✓ French Press Setup</span>}
                      </div>
                    </div>
                  )}

                  {/* Special requests if any */}
                  {specialRequests && (
                    <div className="border-t border-dashed border-stone-200 pt-4">
                      <span className="text-[#b38446] text-4xs tracking-widest uppercase font-mono block mb-1">Coordination Instructions Supplied</span>
                      <p className="text-stone-500 font-light italic text-2xs leading-relaxed">"{specialRequests}"</p>
                    </div>
                  )}

                  {/* Decorative Barcode simulation */}
                  <div className="border-t border-dashed border-stone-300 pt-5 flex flex-col items-center justify-center gap-1.5">
                    {/* Barcode bars block */}
                    <div className="h-10 w-48 flex items-stretch gap-0.5 select-none opacity-85" aria-hidden="true">
                      {[1, 3, 1, 4, 1, 2, 3, 1, 4, 1, 2, 1, 4, 1, 3, 1, 2, 1, 4, 1].map((bar, i) => (
                        <div 
                          key={i} 
                          className="bg-stone-950 flex-grow" 
                          style={{ width: `${bar * 3}px` }}
                        />
                      ))}
                    </div>
                    <span className="font-mono text-[9px] tracking-[0.2em] text-stone-400 uppercase">DIRECT PASS INVALID TO DUPLICATE</span>
                  </div>
                </div>

                <div className="w-full flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handlePrintVoucher}
                    className="flex-1 bg-stone-900 border border-stone-800 hover:bg-[#b38446] text-white font-semibold py-3.5 rounded-2xl text-xs tracking-wider uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    id="print-voucher-btn"
                  >
                    <Printer size={14} />
                    <span>Print Residency Pass</span>
                  </button>
                  
                  <button
                    onClick={handleReset}
                    className="flex-1 bg-stone-100 hover:bg-stone-200 border border-stone-200 text-stone-800 font-semibold py-3.5 rounded-2xl text-xs tracking-wider uppercase transition-colors cursor-pointer"
                    id="new-booking-btn"
                  >
                    Set New Reservation
                  </button>
                </div>
              </div>

              {/* Back to Home safety button */}
              <div className="text-center">
                <button
                  type="button"
                  onClick={onBackToHome}
                  className="font-mono text-xs text-stone-500 hover:text-[#b38446] hover:underline underline-offset-4 cursor-pointer"
                  id="success-back-home-link"
                >
                  Return to Main Website
                </button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

    </div>
  );
}
