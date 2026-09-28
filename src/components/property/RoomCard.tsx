import React from 'react';
import { Room } from '../../types/property';
import { useApp } from '../../context/AppContext';
import { formatPrice } from '../../utils/helpers';
import { ImageWithFallback } from '../ui/ImageWithFallback';
import { Bookmark, Sparkles, Calendar, Users } from 'lucide-react';

interface RoomCardProps {
  room: Room;
}

export const RoomCard: React.FC<RoomCardProps> = ({ room }) => {
  const { navigateTo, isSaved, toggleSave } = useApp();
  const saved = isSaved(room.id);

  const handleCardClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.save-btn')) return;
    navigateTo('room-detail', { slug: room.slug });
  };

  const handleSaveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleSave(room.id, room.title);
  };

  const formatRoomType = (type: string) => {
    switch (type) {
      case 'master': return 'Master Bedroom (Ensuite)';
      case 'private': return 'Private Bedroom';
      case 'shared': return 'Shared Room (Twin)';
      case 'partition': return 'Private Partition';
      case 'bed-space': return 'Bed Space';
      case 'studio': return 'Private Studio Suite';
      default: return 'Room';
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className="group bg-white rounded-xl border border-stone-200 overflow-hidden hover:border-stone-300 hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col h-full"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100">
        <ImageWithFallback
          src={room.images[0]}
          alt={room.title}
          fallbackCategory="room"
          className="w-full h-full object-cover group-hover:scale-[1.025] transition-transform duration-300 ease-out"
        />

        {/* Top Overlays */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-xs text-white px-2.5 py-1 rounded text-[11px] font-medium">
            <span>{formatRoomType(room.roomType)}</span>
            {room.billsIncluded && (
              <>
                <span className="text-white/40">·</span>
                <span className="text-emerald-300 font-semibold flex items-center gap-0.5">
                  <Sparkles className="w-3 h-3" />
                  Bills Included
                </span>
              </>
            )}
          </div>

          <button
            type="button"
            onClick={handleSaveClick}
            className="save-btn pointer-events-auto p-2 bg-white/90 hover:bg-white text-stone-700 hover:text-emerald-900 rounded-full shadow-xs transition-colors cursor-pointer"
            aria-label={saved ? 'Remove from saved' : 'Save room'}
          >
            <Bookmark className={`w-4 h-4 transition-transform active:scale-90 ${saved ? 'fill-emerald-800 text-emerald-800' : ''}`} />
          </button>
        </div>

        {/* Gender Preference label */}
        {room.preferredGender && room.preferredGender !== 'any' && (
          <div className="absolute bottom-2.5 left-3 bg-stone-900/80 backdrop-blur-xs text-stone-200 px-2 py-0.5 rounded text-[10px] font-medium flex items-center gap-1">
            <Users className="w-3 h-3" />
            <span className="capitalize">{room.preferredGender} Preferred</span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        <div>
          {/* Price */}
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-bold text-stone-900 tracking-tight tabular-nums">
              {formatPrice(room.monthlyPrice, room.currency)}
            </span>
            <span className="text-xs text-stone-500 font-medium">/month</span>
          </div>

          {/* Title */}
          <h3 className="text-sm font-semibold text-stone-900 mt-1 line-clamp-1 group-hover:text-emerald-900 transition-colors">
            {room.title}
          </h3>

          {/* Location */}
          <p className="text-xs text-stone-500 mt-0.5 line-clamp-1">
            {room.location}
          </p>
        </div>

        {/* Quiet Meta */}
        <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs text-stone-600">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-stone-400" />
            <span>{room.availableFrom}</span>
          </div>
          <span className="text-stone-400 text-[11px]">
            {room.furnished ? 'Furnished' : 'Unfurnished'}
          </span>
        </div>
      </div>
    </div>
  );
};
