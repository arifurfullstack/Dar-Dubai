import React from 'react';
import { useApp } from '../../context/AppContext';
import { MOCK_AREAS } from '../../data/areas';
import { ImageWithFallback } from '../ui/ImageWithFallback';
import { MapPin, ArrowRight } from 'lucide-react';

export const AreasView: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <div className="min-h-screen bg-stone-50 pb-20">
      <div className="bg-stone-900 text-white py-14 border-b border-stone-800">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-2xl">
          <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
            Explore the City
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold font-serif mt-2 tracking-tight">
            Popular Dubai Communities
          </h1>
          <p className="text-xs sm:text-sm text-stone-300 mt-2 leading-relaxed">
            Find the neighbourhood that fits your lifestyle, from waterfront marina towers to serene golf communities and urban boulevards.
          </p>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {MOCK_AREAS.map((area) => (
            <div
              key={area.id}
              onClick={() => navigateTo('area-detail', { slug: area.slug })}
              className="group bg-white rounded-2xl border border-stone-200 overflow-hidden hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
                  <ImageWithFallback
                    src={area.image}
                    alt={area.name}
                    fallbackCategory="area"
                    aspectRatioClass="aspect-[16/10]"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                  <div className="absolute bottom-3 left-4 text-white">
                    <h2 className="text-xl font-bold font-serif">{area.name}</h2>
                    <p className="text-xs text-stone-300 font-medium">
                      {area.rentalCount} rentals · {area.saleCount} sales · {area.roomCount} rooms
                    </p>
                  </div>
                </div>

                <div className="p-5 space-y-4">
                  <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                    {area.description}
                  </p>

                  <div className="grid grid-cols-2 gap-2 text-xs py-2 border-y border-stone-100">
                    <div>
                      <span className="text-stone-400 block text-[10px] uppercase font-semibold">Avg. Annual Rent</span>
                      <span className="font-bold text-stone-900">{area.avgRentPrice}</span>
                    </div>
                    <div>
                      <span className="text-stone-400 block text-[10px] uppercase font-semibold">Avg. Sale Price</span>
                      <span className="font-bold text-stone-900">{area.avgSalePrice}</span>
                    </div>
                  </div>

                  <div>
                    <span className="text-[11px] font-semibold text-stone-400 uppercase">Key Landmarks</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {area.landmarks.slice(0, 3).map((lm) => (
                        <span key={lm} className="text-[11px] bg-stone-100 text-stone-700 px-2 py-0.5 rounded">
                          {lm}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0 flex items-center justify-between text-xs font-semibold text-emerald-950 group-hover:text-emerald-800">
                <span>Explore Area Listings</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
