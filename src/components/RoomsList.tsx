import { useState, MouseEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bed, Maximize2, Users, Star, ArrowLeft, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import { ROOMS_DATA } from '../data';
import { Room } from '../types';

interface RoomsListProps {
  onSelectRoomForBooking: (roomId: string) => void;
}

export default function RoomsList({ onSelectRoomForBooking }: RoomsListProps) {
  // Keep track of the selected image index for each room card individually
  const [roomImgIndexes, setRoomImgIndexes] = useState<Record<string, number>>({
    'room-emerald': 0,
    'room-lagoon': 0,
    'room-obsidian': 0,
    'room-whisperwood': 0,
  });

  const [activeTypeFilter, setActiveTypeFilter] = useState<string>('All');

  const handleNextImage = (e: MouseEvent, room: Room) => {
    e.stopPropagation();
    const currentIdx = roomImgIndexes[room.id] || 0;
    const nextIdx = (currentIdx + 1) % room.images.length;
    setRoomImgIndexes({
      ...roomImgIndexes,
      [room.id]: nextIdx
    });
  };

  const handlePrevImage = (e: MouseEvent, room: Room) => {
    e.stopPropagation();
    const currentIdx = roomImgIndexes[room.id] || 0;
    const prevIdx = (currentIdx - 1 + room.images.length) % room.images.length;
    setRoomImgIndexes({
      ...roomImgIndexes,
      [room.id]: prevIdx
    });
  };

  const filteredRooms = activeTypeFilter === 'All' 
    ? ROOMS_DATA 
    : ROOMS_DATA.filter(r => r.type === activeTypeFilter);

  return (
    <section className="w-full py-20 bg-slate-50/50" id="rooms">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-400">
              <span className="w-8 h-px bg-[#b38446]" />
              Premium Living Structures
            </div>
            <h2 className="font-display font-bold text-3xl md:text-5xl text-stone-950 tracking-tight leading-tight">
              Bespoke Spaces Designed <br /> For Absolute Resignation
            </h2>
          </div>

          {/* Filtering controls */}
          <div className="flex flex-wrap items-center gap-2 bg-white p-1.5 rounded-full shadow-sm border border-stone-100">
            {['All', 'Suite', 'Villa', 'Penthouse', 'Chalet'].map((type) => (
              <button
                key={type}
                onClick={() => setActiveTypeFilter(type)}
                className={`px-4 py-2 rounded-full text-xs font-medium cursor-pointer transition-all duration-300 ${
                  activeTypeFilter === type
                    ? 'bg-black text-white shadow-md'
                    : 'text-stone-500 hover:text-black hover:bg-slate-50'
                }`}
                id={`filter-${type.toLowerCase()}-btn`}
              >
                {type}s
              </button>
            ))}
          </div>
        </div>

        {/* Room Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {filteredRooms.map((room) => {
            const currentImgIdx = roomImgIndexes[room.id] || 0;
            const currentImg = room.images[currentImgIdx];

            return (
              <motion.div
                key={room.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-stone-100 group flex flex-col h-full"
                id={`room-card-${room.id}`}
              >
                {/* Image Showcase Wrapper */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentImg}
                      src={currentImg}
                      alt={room.name}
                      initial={{ opacity: 0.85, scale: 1.03 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0.85 }}
                      transition={{ duration: 0.4 }}
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                  </AnimatePresence>

                  {/* Gradient overlays */}
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />

                  {/* Left & Right custom arrow sliders for images */}
                  <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={(e) => handlePrevImage(e, room)}
                      className="w-10 h-10 rounded-full bg-white/95 text-black flex items-center justify-center shadow-lg hover:bg-[#b38446] hover:text-white transition-colors cursor-pointer"
                      title="Previous Image"
                      id={`room-${room.id}-prev-img`}
                    >
                      <ArrowLeft size={16} />
                    </button>
                    <button
                      onClick={(e) => handleNextImage(e, room)}
                      className="w-10 h-10 rounded-full bg-white/95 text-black flex items-center justify-center shadow-lg hover:bg-[#b38446] hover:text-white transition-colors cursor-pointer"
                      title="Next Image"
                      id={`room-${room.id}-next-img`}
                    >
                      <ArrowRight size={16} />
                    </button>
                  </div>

                  {/* Rating Badge Top Right */}
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3.5 py-1.5 rounded-full shadow-md flex items-center gap-1.5 border border-white/50 text-stone-900">
                    <Star size={14} className="fill-amber-400 stroke-amber-400" />
                    <span className="text-xs font-bold tracking-tight">{room.rating}</span>
                    <span className="text-[10px] text-stone-400 font-light">({room.reviewCount})</span>
                  </div>

                  {/* Type Badge Top Left */}
                  <div className="absolute top-4 left-4 bg-black/75 backdrop-blur-sm px-4 py-1.5 rounded-full text-white text-[10px] font-mono tracking-widest uppercase">
                    {room.type}
                  </div>

                  {/* Dot sliders indicators at bottom of image */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                    {room.images.map((_, i) => (
                      <span
                        key={i}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          i === currentImgIdx ? 'w-5 bg-[#b38446]' : 'w-1.5 bg-white/55'
                        }`}
                      />
                    ))}
                  </div>

                </div>

                {/* Card Details Body */}
                <div className="p-8 md:p-10 flex flex-col flex-grow justify-between gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="font-display font-bold text-xl md:text-2xl text-stone-900 group-hover:text-stone-950 transition-colors leading-tight">
                        {room.name}
                      </h3>
                      <div className="text-right flex-shrink-0">
                        <span className="font-display font-extrabold text-2xl text-stone-950">${room.pricePerNight}</span>
                        <span className="text-xs text-stone-400 font-light block">/ night</span>
                      </div>
                    </div>

                    <p className="font-sans text-sm text-stone-500 leading-relaxed font-light">
                      {room.description}
                    </p>

                    {/* Room Specific Small Amenities Icons Row */}
                    <div className="grid grid-cols-3 gap-4 py-4 border-y border-stone-100 font-sans text-xs text-stone-600">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-stone-50 flex items-center justify-center text-stone-400">
                          <Maximize2 size={14} />
                        </div>
                        <div>
                          <p className="text-[10px] text-stone-400 font-light block uppercase tracking-wider">Area Size</p>
                          <span className="font-medium text-stone-800">{room.size} m²</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-stone-50 flex items-center justify-center text-stone-400">
                          <Bed size={14} />
                        </div>
                        <div>
                          <p className="text-[10px] text-stone-400 font-light block uppercase tracking-wider">Bed Setup</p>
                          <span className="font-medium text-stone-800 break-all">{room.bedType}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-stone-50 flex items-center justify-center text-stone-400">
                          <Users size={14} />
                        </div>
                        <div>
                          <p className="text-[10px] text-stone-400 font-light block uppercase tracking-wider">Capacity</p>
                          <span className="font-medium text-stone-800">{room.capacity} Guests</span>
                        </div>
                      </div>
                    </div>

                    {/* Features Badges list */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {room.features.slice(0, 3).map((feat) => (
                        <span key={feat} className="flex items-center gap-1 bg-slate-50 border border-slate-100 text-stone-600 text-[10px] px-2.5 py-1 rounded-full font-light">
                          <CheckCircle2 size={10} className="text-[#b38446]" />
                          {feat}
                        </span>
                      ))}
                      {room.features.length > 3 && (
                        <span className="bg-slate-50 border border-slate-100 text-stone-400 text-[10px] px-2.5 py-1 rounded-full font-light">
                          +{room.features.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Book Activation Button */}
                  <button
                    onClick={() => onSelectRoomForBooking(room.id)}
                    className="w-full flex items-center justify-center gap-2 bg-stone-950 hover:bg-[#b38446] text-white px-5 py-3.5 rounded-full font-sans font-medium text-xs tracking-wider uppercase transition-all duration-300 cursor-pointer shadow-sm active:scale-98"
                    id={`book-select-${room.id}`}
                  >
                    <span>Check Availability</span>
                    <ShieldCheck size={14} />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
