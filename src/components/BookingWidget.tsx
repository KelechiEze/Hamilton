import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Users, HelpCircle, Check, Sparkles, Receipt, User, Mail, Loader2, ArrowRight } from 'lucide-react';
import { ROOMS_DATA } from '../data';
import { Room, Booking } from '../types';

interface BookingWidgetProps {
  selectedRoomId: string;
  onRoomChange: (roomId: string) => void;
}

export default function BookingWidget({ selectedRoomId, onRoomChange }: BookingWidgetProps) {
  // Setup beautiful initial calendar dates: e.g. tomorrow to three days later
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const threeDaysLater = new Date(tomorrow);
  threeDaysLater.setDate(threeDaysLater.getDate() + 3);

  const formatDate = (date: Date) => date.toISOString().split('T')[0];

  const [checkIn, setCheckIn] = useState(formatDate(tomorrow));
  const [checkOut, setCheckOut] = useState(formatDate(threeDaysLater));
  const [guestsCount, setGuestsCount] = useState(2);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState<Booking | null>(null);

  const selectedRoom = ROOMS_DATA.find((r) => r.id === selectedRoomId) || ROOMS_DATA[0];

  // Recalculate duration in nights
  const getNightsCount = (start: string, end: string): number => {
    const sDate = new Date(start);
    const eDate = new Date(end);
    const diffTime = eDate.getTime() - sDate.getTime();
    if (isNaN(diffTime) || diffTime <= 0) return 0;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const nights = getNightsCount(checkIn, checkOut);
  const baseCharge = selectedRoom.pricePerNight * (nights || 1);
  const serviceFee = Math.round(baseCharge * 0.12); // Elegant 12% hotel resort tax
  const totalAmount = baseCharge + serviceFee;

  // Enforce guests capacity limits
  useEffect(() => {
    if (guestsCount > selectedRoom.capacity) {
      setGuestsCount(selectedRoom.capacity);
    }
  }, [selectedRoomId]);

  const handleBookingSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!fullName || !email) {
      alert('Please fill out your full contact name and email before finalizing.');
      return;
    }

    setIsSubmitting(true);

    // Simulate luxury reservation engine delay
    setTimeout(() => {
      const mockBooking: Booking = {
        id: `SLT-${Math.floor(100000 + Math.random() * 900000)}`,
        roomId: selectedRoom.id,
        checkIn,
        checkOut,
        guests: guestsCount,
        totalAmount,
        fullName,
        email,
        status: 'confirmed',
        createdAt: new Date().toISOString(),
      };
      setBookingConfirmed(mockBooking);
      setIsSubmitting(false);
    }, 1800);
  };

  const handleResetBooking = () => {
    setBookingConfirmed(null);
    setFullName('');
    setEmail('');
  };

  return (
    <section className="w-full py-20 bg-stone-900 text-white relative overflow-hidden" id="booking-section">
      {/* Background radial soft light to resemble midnight luxury night vibe */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#b38446]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Text Detail Grid Column */}
          <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-28">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#b38446]">
                <span className="w-8 h-px bg-[#b38446]" />
                Interactive Reservation
              </div>
              <h2 className="font-display font-bold text-3xl md:text-5xl text-white tracking-tight leading-tight">
                Secure Your Suite <br />In Pure Luxury
              </h2>
              <p className="font-sans text-sm text-stone-400 font-light leading-relaxed">
                Connect directly with the resort reservation channel. Our booking dashboard coordinates directly with local concierge teams to ensure your bespoke preferences are customized ahead of your arrival.
              </p>
            </div>

            <div className="space-y-4 font-sans text-xs text-stone-300">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-[#b38446] shrink-0 mt-0.5">
                  <span className="font-bold">✓</span>
                </div>
                <div>
                  <h4 className="font-semibold text-white">Full Post-Booking Flexibility</h4>
                  <p className="text-stone-400 font-light mt-0.5">Cancel or reschedule up to 7 days before check-in with absolute zero-fee processing.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-[#b38446] shrink-0 mt-0.5">
                  <span className="font-bold">✓</span>
                </div>
                <div>
                  <h4 className="font-semibold text-white">Tailored Welcome Care</h4>
                  <p className="text-stone-400 font-light mt-0.5">Complementary premium in-suite champagne or custom fruit pairing of your request.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Interface Card Column */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {!bookingConfirmed ? (
                // --- STEP 1 & 2: INPUT DETAILS AND SUBMIT FORM ---
                <motion.form
                  key="booking-form"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5 }}
                  onSubmit={handleBookingSubmit}
                  className="bg-stone-950 p-6 md:p-10 rounded-[2.5rem] border border-white/5 shadow-2xl space-y-8"
                  id="resort-booking-form"
                >
                  <div className="flex items-center justify-between border-b border-white/10 pb-5">
                    <span className="font-display font-semibold text-lg">Suite Reservation Checkout</span>
                    <span className="font-mono text-[10px] tracking-widest text-[#b38446] uppercase bg-white/5 px-3 py-1 rounded-full border border-white/10">1 / 2 Complete</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Room Selector */}
                    <div className="md:col-span-2 space-y-2">
                      <label className="text-stone-400 text-xs font-mono uppercase tracking-wider block">Selected Space</label>
                      <select
                        value={selectedRoomId}
                        onChange={(e) => onRoomChange(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 focus:border-[#b38446] rounded-2xl p-4 text-sm text-white focus:outline-none transition-colors font-medium cursor-pointer"
                        id="form-room-select"
                      >
                        {ROOMS_DATA.map((r) => (
                          <option key={r.id} value={r.id} className="bg-stone-950 text-white">
                            {r.name} - ${r.pricePerNight} / night
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Check In Date */}
                    <div className="space-y-2">
                      <label className="text-stone-400 text-xs font-mono uppercase tracking-wider block">Check-In</label>
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
                          className="w-full bg-white/5 border border-white/10 focus:border-[#b38446] rounded-2xl pl-12 pr-4 py-4 text-xs md:text-sm text-stone-200 focus:outline-none transition-colors cursor-pointer"
                          id="form-check-in-date"
                          required
                        />
                      </div>
                    </div>

                    {/* Check Out Date */}
                    <div className="space-y-2">
                      <label className="text-stone-400 text-xs font-mono uppercase tracking-wider block">Check-Out</label>
                      <div className="relative">
                        <Calendar size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
                        <input
                          type="date"
                          min={checkIn}
                          value={checkOut}
                          onChange={(e) => setCheckOut(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 focus:border-[#b38446] rounded-2xl pl-12 pr-4 py-4 text-xs md:text-sm text-stone-200 focus:outline-none transition-colors cursor-pointer"
                          id="form-check-out-date"
                          required
                        />
                      </div>
                    </div>

                    {/* Guest Selection */}
                    <div className="md:col-span-2 space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-stone-400 text-xs font-mono uppercase tracking-wider block">Guests Quantity</label>
                        <span className="text-[10px] text-stone-400 font-light block">Max allowed: {selectedRoom.capacity} guests</span>
                      </div>
                      <div className="relative">
                        <Users size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
                        <input
                          type="number"
                          min="1"
                          max={selectedRoom.capacity}
                          value={guestsCount}
                          onChange={(e) => setGuestsCount(Math.min(selectedRoom.capacity, Math.max(1, parseInt(e.target.value) || 1)))}
                          className="w-full bg-white/5 border border-white/10 focus:border-[#b38446] rounded-2xl pl-12 pr-4 py-4 text-sm text-stone-200 focus:outline-none transition-colors"
                          id="form-guests-num"
                          required
                        />
                      </div>
                    </div>

                    {/* Guest Contact Details */}
                    <div className="space-y-2">
                      <label className="text-stone-400 text-xs font-mono uppercase tracking-wider block">Your Full Name</label>
                      <div className="relative">
                        <User size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
                        <input
                          type="text"
                          placeholder="e.g. Richard Hendricks"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 focus:border-[#b38446] rounded-2xl pl-12 pr-4 py-4 text-sm text-stone-200 focus:outline-none transition-colors"
                          id="form-full-name"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-stone-400 text-xs font-mono uppercase tracking-wider block">Your Email</label>
                      <div className="relative">
                        <Mail size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
                        <input
                          type="email"
                          placeholder="richard@hooli.xyz"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 focus:border-[#b38446] rounded-2xl pl-12 pr-4 py-4 text-sm text-stone-200 focus:outline-none transition-colors"
                          id="form-email"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Pricing break downs math calculations */}
                  <div className="bg-white/5 p-5 rounded-2xl border border-white/10 space-y-3.5">
                    <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-stone-400">
                      <span>Valuation Calculator</span>
                      <Receipt size={14} className="text-[#b38446]" />
                    </div>
                    
                    <div className="space-y-2 text-sm text-stone-300">
                      <div className="flex justify-between">
                        <span className="font-light">${selectedRoom.pricePerNight} × {nights || 1} stays</span>
                        <span className="font-medium font-mono text-white">${baseCharge}</span>
                      </div>
                      <div className="flex justify-between border-b border-white/5 pb-2">
                        <span className="font-light">12% Luxury Resort Service & Tax</span>
                        <span className="font-medium font-mono text-white">${serviceFee}</span>
                      </div>
                      <div className="flex justify-between text-base font-semibold pt-2">
                        <span className="text-white">Dynamic Grand Total</span>
                        <span className="text-[#b38446] font-mono">${totalAmount}</span>
                      </div>
                    </div>
                  </div>

                  {/* Primary submit action */}
                  <button
                    type="submit"
                    disabled={isSubmitting || !nights}
                    className="w-full bg-[#b38446] hover:bg-[#ebdcc4] hover:text-black disabled:bg-stone-800 disabled:text-stone-500 text-white py-4 rounded-2xl font-sans font-semibold text-sm tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer shadow-lg active:scale-98"
                    id="submit-booking-btn"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="animate-spin" size={16} />
                        <span>Confirming Reservation...</span>
                      </>
                    ) : !nights ? (
                      <span>Invalid Booking Duration</span>
                    ) : (
                      <>
                        <span>Request VIP Booking</span>
                        <ArrowRight size={14} className="stroke-[3]" />
                      </>
                    )}
                  </button>
                </motion.form>
              ) : (
                // --- STEP 3: BOOKING CONFIRMED SCREEN ---
                <motion.div
                  key="booking-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ type: 'spring', damping: 20 }}
                  className="bg-black text-white p-8 md:p-12 rounded-[2.5rem] border border-[#b38446]/20 shadow-2xl relative overflow-hidden flex flex-col items-center"
                  id="resort-booking-success"
                >
                  {/* Confetti particle simulation on absolute backdrop */}
                  <div className="absolute inset-0 bg-gradient-to-b from-[#b38446]/10 to-transparent pointer-events-none" />

                  {/* Big Checkmark Circle anims */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                    className="w-16 h-16 rounded-full bg-[#b38446] text-white flex items-center justify-center mb-6 shadow-lg shadow-[#b38446]/20"
                  >
                    <Check size={32} className="stroke-[3]" />
                  </motion.div>

                  <h3 className="font-display font-semibold text-2xl md:text-3xl text-center">
                    Reservation Confirmed!
                  </h3>
                  
                  <p className="font-sans text-stone-400 text-center font-light text-xs md:text-sm max-w-sm mt-2 leading-relaxed">
                    A luxurious hospitality coordinator will reach out to <span className="text-white font-medium">{bookingConfirmed.email}</span> shortly to complete check-in requirements.
                  </p>

                  {/* Transaction Voucher Ticket details */}
                  <div className="w-full bg-stone-900 border border-white/5 rounded-2xl p-6 my-8 space-y-4 font-sans text-xs shrink-0">
                    <div className="flex justify-between items-center text-stone-400 border-b border-white/5 pb-3">
                      <span className="font-mono text-[10px] tracking-wider uppercase font-medium">SLATEON INVOICE VOUCHER</span>
                      <span className="font-mono font-bold text-[#ebdcc4] text-[11px] bg-[#b38446]/10 px-2.5 py-0.5 rounded-full border border-[#b38446]/20">{bookingConfirmed.id}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-y-4 gap-x-2">
                      <div>
                        <span className="text-stone-400 text-3xs tracking-widest uppercase font-mono block">Guest Resident</span>
                        <span className="font-semibold text-stone-200 text-sm">{bookingConfirmed.fullName}</span>
                      </div>
                      <div>
                        <span className="text-stone-400 text-3xs tracking-widest uppercase font-mono block">Assigned Space</span>
                        <span className="font-semibold text-stone-200 text-sm break-keep">{selectedRoom.name}</span>
                      </div>
                      <div>
                        <span className="text-stone-400 text-3xs tracking-widest uppercase font-mono block">Schedule Range</span>
                        <span className="font-medium text-stone-200 text-xs">{bookingConfirmed.checkIn} — {bookingConfirmed.checkOut}</span>
                      </div>
                      <div>
                        <span className="text-stone-400 text-3xs tracking-widest uppercase font-mono block">Total Stay Cost</span>
                        <span className="font-semibold text-[#b38446] font-mono text-sm">${bookingConfirmed.totalAmount}</span>
                      </div>
                    </div>

                    <div className="bg-black/40 border-t border-dashed border-white/10 pt-4 flex items-center justify-center gap-1.5 text-stone-400 text-3xs tracking-wide uppercase font-mono">
                      <Sparkles size={11} className="text-[#b38446] animate-pulse" />
                      Digital checkout pass valid for scanning
                    </div>
                  </div>

                  <button
                    onClick={handleResetBooking}
                    className="w-full bg-white/5 border border-white/10 hover:border-white/30 text-white font-sans font-semibold text-xs py-3.5 rounded-xl uppercase tracking-wider transition-colors cursor-pointer"
                    id="book-reset-btn"
                  >
                    Prepare New Reservation
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
