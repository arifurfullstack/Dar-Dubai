import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MOCK_AGENTS } from '../../data/agents';
import { RoomCard } from '../property/RoomCard';
import { ImageWithFallback } from '../ui/ImageWithFallback';
import { formatPrice, copyToClipboard } from '../../utils/helpers';
import {
  Bookmark,
  Share2,
  Calendar,
  MapPin,
  Sparkles,
  Users,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  MessageSquare,
  Phone,
  Check,
  Ban,
  Maximize2,
  X,
} from 'lucide-react';

interface RoomDetailViewProps {
  slug: string;
}

export const RoomDetailView: React.FC<RoomDetailViewProps> = ({ slug }) => {
  const { rooms, navigateTo, isSaved, toggleSave, openViewingModal, showToast } = useApp();
  const [activePhoto, setActivePhoto] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  const room = rooms.find((r) => r.slug === slug) || rooms[0];
  const agent = MOCK_AGENTS.find((a) => a.id === room.agentId) || MOCK_AGENTS[3];
  const saved = isSaved(room.id);

  const similarRooms = rooms.filter((r) => r.id !== room.id).slice(0, 3);

  const handleShare = () => {
    copyToClipboard(window.location.href);
    showToast('Room link copied to clipboard!', 'info');
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(`Hi ${agent.name}, I am interested in viewing the room: "${room.title}" (Ref: ${room.reference}) on Dar Dubai.`);
    window.open(`https://wa.me/${agent.whatsapp.replace(/[^0-9]/g, '')}?text=${text}`, '_blank');
  };

  const handleCall = () => {
    window.open(`tel:${agent.phone.replace(/[^0-9+]/g, '')}`, '_self');
  };

  return (
    <div className="min-h-screen bg-stone-50 pb-24">
      {/* Breadcrumbs */}
      <div className="bg-white border-b border-stone-200 py-3">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs text-stone-500">
          <nav className="flex items-center gap-1.5">
            <button onClick={() => navigateTo('home')} className="hover:text-stone-900 cursor-pointer">
              Home
            </button>
            <ChevronRight className="w-3 h-3 text-stone-300" />
            <button onClick={() => navigateTo('rooms')} className="hover:text-stone-900 cursor-pointer">
              Rooms for Rent
            </button>
            <ChevronRight className="w-3 h-3 text-stone-300" />
            <span className="text-stone-800 font-medium truncate max-w-xs">{room.title}</span>
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleSave(room.id, room.title)}
              className={`p-1.5 rounded-lg border flex items-center gap-1 text-xs font-medium cursor-pointer ${
                saved ? 'bg-emerald-50 text-emerald-900 border-emerald-300' : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${saved ? 'fill-emerald-800 text-emerald-800' : ''}`} />
              <span className="hidden sm:inline">{saved ? 'Saved' : 'Save'}</span>
            </button>
            <button
              onClick={handleShare}
              className="p-1.5 rounded-lg border border-stone-200 bg-white hover:bg-stone-50 text-stone-700 text-xs font-medium flex items-center gap-1 cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Share</span>
            </button>
          </div>
        </div>
      </div>

      {/* Gallery */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="relative rounded-2xl overflow-hidden border border-stone-200/80 bg-stone-900">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 h-[340px] sm:h-[440px]">
            <div
              onClick={() => {
                setActivePhoto(0);
                setLightbox(true);
              }}
              className="md:col-span-2 relative h-full cursor-pointer group overflow-hidden bg-stone-800"
            >
              <ImageWithFallback
                src={room.images[0]}
                alt={room.title}
                fallbackCategory="room"
                aspectRatioClass="h-full w-full"
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
              />
            </div>
            <div className="hidden md:flex flex-col gap-2 h-full">
              {room.images.slice(1, 3).map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setActivePhoto(idx + 1);
                    setLightbox(true);
                  }}
                  className="relative flex-1 cursor-pointer group overflow-hidden bg-stone-800"
                >
                  <ImageWithFallback
                    src={img}
                    alt={`${room.title} ${idx + 2}`}
                    fallbackCategory="room"
                    aspectRatioClass="h-full w-full"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={() => setLightbox(true)}
            className="absolute bottom-4 right-4 px-4 py-2 bg-white/90 hover:bg-white text-stone-900 rounded-xl text-xs font-semibold shadow-md backdrop-blur-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>View all {room.images.length} photos</span>
          </button>
        </div>
      </div>

      {/* Main Details */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          <div className="lg:col-span-2 space-y-8">
            {/* Header info */}
            <div className="bg-white p-6 rounded-2xl border border-stone-200 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold text-stone-900 font-serif tabular-nums">
                    {formatPrice(room.monthlyPrice, room.currency)}
                  </span>
                  <span className="text-sm font-medium text-stone-500">/ month</span>
                </div>

                <div className="flex items-center gap-2">
                  {room.billsIncluded && (
                    <span className="inline-flex items-center gap-1 text-emerald-800 font-semibold bg-emerald-50 px-2.5 py-1 rounded text-xs">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
                      All Bills Included
                    </span>
                  )}
                  <span className="text-xs text-stone-400">Ref: {room.reference}</span>
                </div>
              </div>

              <h1 className="text-xl sm:text-2xl font-bold text-stone-900">
                {room.title}
              </h1>

              <div className="flex items-center gap-2 text-xs text-stone-600">
                <MapPin className="w-4 h-4 text-emerald-800 shrink-0" />
                <span>{room.location}</span>
              </div>

              {/* Specs */}
              <div className="pt-4 border-t border-stone-100 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center text-xs">
                <div className="p-3 bg-stone-50 rounded-xl">
                  <div className="text-stone-400 font-semibold uppercase text-[10px]">Room Type</div>
                  <div className="font-bold text-stone-900 mt-0.5 capitalize">{room.roomType}</div>
                </div>
                <div className="p-3 bg-stone-50 rounded-xl">
                  <div className="text-stone-400 font-semibold uppercase text-[10px]">Move-In Date</div>
                  <div className="font-bold text-stone-900 mt-0.5">{room.availableFrom}</div>
                </div>
                <div className="p-3 bg-stone-50 rounded-xl">
                  <div className="text-stone-400 font-semibold uppercase text-[10px]">Furnishing</div>
                  <div className="font-bold text-stone-900 mt-0.5">{room.furnished ? 'Furnished' : 'Unfurnished'}</div>
                </div>
                <div className="p-3 bg-stone-50 rounded-xl">
                  <div className="text-stone-400 font-semibold uppercase text-[10px]">Tenant Preference</div>
                  <div className="font-bold text-stone-900 mt-0.5 capitalize">{room.preferredGender || 'Any'}</div>
                </div>
              </div>
            </div>

            {/* About Room & Property */}
            <div className="bg-white p-6 rounded-2xl border border-stone-200 space-y-4">
              <h2 className="text-base font-bold text-stone-900 font-serif">About the Accommodation</h2>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {room.description}
              </p>

              {room.currentOccupants && (
                <div className="p-4 bg-emerald-50/50 rounded-xl border border-emerald-100 flex items-start gap-3">
                  <Users className="w-4 h-4 text-emerald-800 mt-0.5 shrink-0" />
                  <div className="text-xs text-emerald-950">
                    <span className="font-bold">Current Occupants:</span> {room.currentOccupants}
                  </div>
                </div>
              )}
            </div>

            {/* House Rules */}
            <div className="bg-white p-6 rounded-2xl border border-stone-200 space-y-4">
              <h2 className="text-base font-bold text-stone-900 font-serif">House Rules & Agreement</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {room.houseRules.map((rule, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-2.5 bg-stone-50 rounded-xl text-xs text-stone-800">
                    <Check className="w-4 h-4 text-emerald-800 shrink-0" />
                    <span>{rule}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Room Amenities */}
            <div className="bg-white p-6 rounded-2xl border border-stone-200 space-y-4">
              <h2 className="text-base font-bold text-stone-900 font-serif">Included Amenities & Services</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {room.amenities.map((a) => (
                  <div key={a} className="flex items-center gap-2 p-2.5 bg-stone-50 rounded-xl text-xs text-stone-800">
                    <Check className="w-4 h-4 text-emerald-800 shrink-0" />
                    <span>{a}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Rail: Contact Card */}
          <div className="lg:col-span-1 sticky top-22 space-y-4">
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-5">
              <div className="flex items-center gap-3">
                <img
                  src={agent.image}
                  alt={agent.name}
                  className="w-16 h-16 rounded-full object-cover border border-stone-200"
                />
                <div>
                  <div className="flex items-center gap-1">
                    <h3 className="text-sm font-bold text-stone-900">{agent.name}</h3>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-800" />
                  </div>
                  <p className="text-xs text-stone-500">{agent.agency}</p>
                  <p className="text-[11px] text-emerald-800 font-semibold mt-0.5">Rooms & Rentals Advisor</p>
                </div>
              </div>

              <div className="space-y-2 pt-1">
                <button
                  onClick={() => openViewingModal(room)}
                  className="w-full py-3 bg-emerald-900 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Request In-Person Viewing</span>
                </button>

                <button
                  onClick={handleWhatsApp}
                  className="w-full py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-700" />
                  <span>Chat on WhatsApp</span>
                </button>

                <button
                  onClick={handleCall}
                  className="w-full py-2.5 bg-stone-50 hover:bg-stone-100 border border-stone-200 text-stone-800 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5 text-stone-500" />
                  <span>Call Advisor</span>
                </button>
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-center gap-1.5 text-[11px] text-stone-400 text-center">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-800" />
                <span>Verified roommate listing · No hidden agent fees</span>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Rooms */}
        {similarRooms.length > 0 && (
          <div className="mt-16 pt-10 border-t border-stone-200">
            <h2 className="text-xl font-bold text-stone-900 font-serif mb-6">Similar Available Rooms</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarRooms.map((r) => (
                <RoomCard key={r.id} room={r} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between p-4 sm:p-6 animate-in fade-in">
          <div className="flex items-center justify-between text-white">
            <span className="text-xs font-semibold">
              {activePhoto + 1} of {room.images.length}
            </span>
            <button
              onClick={() => setLightbox(false)}
              className="p-2 text-white/80 hover:text-white rounded-full bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center p-4">
            <img
              src={room.images[activePhoto]}
              alt="Room view"
              className="max-h-[75vh] max-w-full object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
};
