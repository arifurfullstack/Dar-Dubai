import React from 'react';
import { useApp } from '../../context/AppContext';
import { MOCK_AREAS } from '../../data/areas';
import { PropertyCard } from '../property/PropertyCard';
import { RoomCard } from '../property/RoomCard';
import { ImageWithFallback } from '../ui/ImageWithFallback';
import { ChevronRight, MapPin, Building, Landmark, Compass } from 'lucide-react';

interface AreaDetailViewProps {
  slug: string;
}

export const AreaDetailView: React.FC<AreaDetailViewProps> = ({ slug }) => {
  const { properties, rooms, navigateTo, setPropertyFilters, setRoomFilters } = useApp();

  const area = MOCK_AREAS.find((a) => a.slug === slug) || MOCK_AREAS[0];

  const areaRentals = properties.filter(
    (p) => p.location.community.toLowerCase() === area.name.toLowerCase() && p.purpose === 'rent'
  );
  const areaSales = properties.filter(
    (p) => p.location.community.toLowerCase() === area.name.toLowerCase() && p.purpose === 'sale'
  );
  const areaRooms = rooms.filter(
    (r) => r.community.toLowerCase() === area.name.toLowerCase()
  );

  return (
    <div className="min-h-screen bg-stone-50 pb-20">
      {/* Breadcrumbs */}
      <div className="bg-white border-b border-stone-200 py-3">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-1.5 text-xs text-stone-500">
          <button onClick={() => navigateTo('home')} className="hover:text-stone-900 cursor-pointer">
            Home
          </button>
          <ChevronRight className="w-3 h-3 text-stone-300" />
          <button onClick={() => navigateTo('areas')} className="hover:text-stone-900 cursor-pointer">
            Communities
          </button>
          <ChevronRight className="w-3 h-3 text-stone-300" />
          <span className="text-stone-800 font-medium">{area.name}</span>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="relative bg-stone-900 text-white py-16">
        <div className="absolute inset-0 overflow-hidden opacity-35">
          <ImageWithFallback
            src={area.image}
            alt={area.name}
            fallbackCategory="area"
            aspectRatioClass="h-full w-full"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
              Dubai Community Guide
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold font-serif tracking-tight">
              {area.name}
            </h1>
            <p className="text-sm sm:text-base text-stone-300 leading-relaxed">
              {area.description}
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4 text-xs">
              <div className="bg-white/10 backdrop-blur-xs px-3 py-2 rounded-lg">
                <span className="text-stone-400 block text-[10px] uppercase">Average Rent</span>
                <span className="font-bold text-white text-sm">{area.avgRentPrice}</span>
              </div>
              <div className="bg-white/10 backdrop-blur-xs px-3 py-2 rounded-lg">
                <span className="text-stone-400 block text-[10px] uppercase">Average Sale</span>
                <span className="font-bold text-white text-sm">{area.avgSalePrice}</span>
              </div>
              <div className="bg-white/10 backdrop-blur-xs px-3 py-2 rounded-lg">
                <span className="text-stone-400 block text-[10px] uppercase">Total Active Listings</span>
                <span className="font-bold text-white text-sm">
                  {area.rentalCount + area.saleCount + area.roomCount} properties
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-12">
        {/* Landmarks row */}
        <div className="bg-white p-6 rounded-2xl border border-stone-200">
          <h2 className="text-sm font-bold uppercase tracking-wider text-stone-400 mb-3 flex items-center gap-1.5">
            <Landmark className="w-4 h-4 text-emerald-800" />
            <span>Notable Landmarks in {area.name}</span>
          </h2>
          <div className="flex flex-wrap gap-2">
            {area.landmarks.map((lm) => (
              <span key={lm} className="px-3 py-1.5 bg-stone-100 rounded-lg text-xs font-medium text-stone-800">
                {lm}
              </span>
            ))}
          </div>
        </div>

        {/* Properties for Rent in this area */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-stone-900 font-serif">
              Properties for Rent in {area.name}
            </h2>
            <button
              onClick={() => {
                setPropertyFilters({ community: area.name, purpose: 'rent' });
                navigateTo('rent', { community: area.name });
              }}
              className="text-xs font-semibold text-emerald-950 hover:underline cursor-pointer"
            >
              See all rentals →
            </button>
          </div>
          {areaRentals.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {areaRentals.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          ) : (
            <div className="p-8 bg-white rounded-xl border border-stone-200 text-center text-xs text-stone-500">
              No current rentals listed directly under this community filter in this demo subset.
            </div>
          )}
        </div>

        {/* Properties for Sale in this area */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-stone-900 font-serif">
              Properties for Sale in {area.name}
            </h2>
            <button
              onClick={() => {
                setPropertyFilters({ community: area.name, purpose: 'sale' });
                navigateTo('buy', { community: area.name });
              }}
              className="text-xs font-semibold text-emerald-950 hover:underline cursor-pointer"
            >
              See all sales →
            </button>
          </div>
          {areaSales.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {areaSales.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          ) : (
            <div className="p-8 bg-white rounded-xl border border-stone-200 text-center text-xs text-stone-500">
              No current sale listings under this community filter in this demo subset.
            </div>
          )}
        </div>

        {/* Rooms in this area */}
        {areaRooms.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-stone-900 font-serif">
                Rooms & Flatshares in {area.name}
              </h2>
              <button
                onClick={() => {
                  setRoomFilters({ community: area.name });
                  navigateTo('rooms', { community: area.name });
                }}
                className="text-xs font-semibold text-emerald-950 hover:underline cursor-pointer"
              >
                See all rooms →
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {areaRooms.map((r) => (
                <RoomCard key={r.id} room={r} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
