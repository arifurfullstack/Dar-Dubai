import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { RoomFilterBar } from '../search/RoomFilterBar';
import { RoomCard } from '../property/RoomCard';
import { DubaiMap } from '../map/DubaiMap';
import { Sparkles, BedDouble, RotateCcw, Share2 } from 'lucide-react';
import { copyToClipboard } from '../../utils/helpers';

export const BrowseRoomsView: React.FC = () => {
  const { rooms, roomFilters, setRoomFilters, resetRoomFilters, showToast } = useApp();
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');

  const filteredRooms = useMemo(() => {
    return rooms.filter((r) => {
      // Community
      if (roomFilters.community && r.community !== roomFilters.community) {
        return false;
      }

      // Room Type
      if (roomFilters.roomType && r.roomType !== roomFilters.roomType) {
        return false;
      }

      // Max Price
      if (roomFilters.maxPrice && r.monthlyPrice > roomFilters.maxPrice) {
        return false;
      }

      // Bills Included
      if (roomFilters.billsIncluded && !r.billsIncluded) {
        return false;
      }

      // Preferred Gender
      if (roomFilters.preferredGender) {
        if (roomFilters.preferredGender === 'female' && r.preferredGender !== 'female') return false;
        if (roomFilters.preferredGender === 'male' && r.preferredGender !== 'male') return false;
      }

      return true;
    }).sort((a, b) => {
      const sort = roomFilters.sortBy || 'recommended';
      if (sort === 'price-asc') return a.monthlyPrice - b.monthlyPrice;
      if (sort === 'price-desc') return b.monthlyPrice - a.monthlyPrice;
      return 0;
    });
  }, [rooms, roomFilters]);

  const handleShare = () => {
    copyToClipboard(window.location.href);
    showToast('Rooms search link copied!', 'info');
  };

  return (
    <div className="min-h-screen bg-stone-50 pb-20">
      {/* Sticky Room Filter Bar */}
      <RoomFilterBar
        filters={roomFilters}
        onChange={setRoomFilters}
        onReset={resetRoomFilters}
        totalCount={filteredRooms.length}
        viewMode={viewMode}
        onToggleViewMode={setViewMode}
      />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Flatshares & Executive Suites</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-stone-900 font-serif tracking-tight">
              Rooms & Shared Living for Rent in Dubai
            </h1>
            <p className="text-xs text-stone-500 mt-0.5">
              Showing <span className="font-semibold text-stone-800">{filteredRooms.length}</span> verified room listings with all bills & high-speed Wi-Fi
            </p>
          </div>

          <button
            onClick={handleShare}
            className="self-start sm:self-auto px-3 py-1.5 bg-white border border-stone-200 text-stone-700 hover:text-stone-950 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
          >
            <Share2 className="w-3.5 h-3.5 text-stone-500" />
            <span>Share</span>
          </button>
        </div>

        {/* View Mode: Map or Grid */}
        {viewMode === 'map' ? (
          <div className="space-y-6">
            <DubaiMap items={filteredRooms} className="h-[550px] shadow-sm" />
            <div className="pt-4">
              <h2 className="text-sm font-bold text-stone-800 mb-4 uppercase tracking-wider text-xs">
                Available Rooms ({filteredRooms.length})
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredRooms.map((r) => (
                  <RoomCard key={r.id} room={r} />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div>
            {filteredRooms.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl border border-stone-200 p-8 max-w-md mx-auto my-8">
                <div className="w-12 h-12 bg-stone-100 text-stone-400 rounded-full flex items-center justify-center mx-auto mb-3">
                  <BedDouble className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-stone-900 font-serif">
                  No rooms match these preferences
                </h3>
                <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                  Try adjusting your budget cap or switching gender preferences.
                </p>
                <div className="pt-4">
                  <button
                    onClick={resetRoomFilters}
                    className="px-5 py-2.5 bg-emerald-900 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold inline-flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset Room Filters</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredRooms.map((room) => (
                  <RoomCard key={room.id} room={room} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
