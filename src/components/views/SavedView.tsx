import React from 'react';
import { useApp } from '../../context/AppContext';
import { PropertyCard } from '../property/PropertyCard';
import { RoomCard } from '../property/RoomCard';
import { Bookmark, ArrowRight, Trash2 } from 'lucide-react';

export const SavedView: React.FC = () => {
  const { savedIds, properties, rooms, navigateTo } = useApp();

  const savedProperties = properties.filter((p) => savedIds.includes(p.id));
  const savedRooms = rooms.filter((r) => savedIds.includes(r.id));
  const totalSaved = savedProperties.length + savedRooms.length;

  return (
    <div className="min-h-screen bg-stone-50 pb-20">
      <div className="bg-white border-b border-stone-200 py-10">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 uppercase tracking-wider mb-1">
            <Bookmark className="w-3.5 h-3.5 fill-emerald-800" />
            <span>Saved Portfolio</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 font-serif">
            Saved Properties & Rooms
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Review and compare residences you have bookmarked for easy reference.
          </p>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {totalSaved === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-stone-200 p-8 max-w-md mx-auto my-8">
            <div className="w-12 h-12 bg-stone-100 text-stone-400 rounded-full flex items-center justify-center mx-auto mb-3">
              <Bookmark className="w-6 h-6" />
            </div>
            <h2 className="text-base font-bold text-stone-900 font-serif">
              No saved properties yet
            </h2>
            <p className="text-xs text-stone-500 mt-1 leading-relaxed">
              Save properties or rooms you are interested in by clicking the bookmark icon to compare them later.
            </p>
            <div className="pt-4 flex items-center justify-center gap-2">
              <button
                onClick={() => navigateTo('rent')}
                className="px-5 py-2.5 bg-emerald-900 text-white rounded-xl text-xs font-semibold hover:bg-emerald-800 transition-colors shadow-xs cursor-pointer"
              >
                Browse Rentals
              </button>
              <button
                onClick={() => navigateTo('buy')}
                className="px-5 py-2.5 bg-stone-100 text-stone-800 rounded-xl text-xs font-semibold hover:bg-stone-200 transition-colors cursor-pointer"
              >
                Browse Sales
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-12">
            {savedProperties.length > 0 && (
              <div>
                <h2 className="text-lg font-bold text-stone-900 font-serif mb-4">
                  Properties ({savedProperties.length})
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {savedProperties.map((p) => (
                    <PropertyCard key={p.id} property={p} />
                  ))}
                </div>
              </div>
            )}

            {savedRooms.length > 0 && (
              <div>
                <h2 className="text-lg font-bold text-stone-900 font-serif mb-4">
                  Rooms & Shared Accommodation ({savedRooms.length})
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {savedRooms.map((r) => (
                    <RoomCard key={r.id} room={r} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
