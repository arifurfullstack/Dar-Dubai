import React, { useState } from 'react';
import { Property, Room } from '../../types/property';
import { useApp } from '../../context/AppContext';
import { formatCompactPrice, formatPrice, formatBedrooms } from '../../utils/helpers';
import { ImageWithFallback } from '../ui/ImageWithFallback';
import { X, MapPin, ExternalLink } from 'lucide-react';

interface DubaiMapProps {
  items: (Property | Room)[];
  activeId?: string;
  onSelectItem?: (item: Property | Room) => void;
  className?: string;
}

export const DubaiMap: React.FC<DubaiMapProps> = ({ items, activeId, onSelectItem, className = 'h-[500px]' }) => {
  const { navigateTo } = useApp();
  const [selectedPin, setSelectedPin] = useState<Property | Room | null>(null);

  // Normalize lat/lng to percentage bounds on SVG Dubai map canvas
  // Dubai bounds approximately: Lat 25.04 to 25.24, Lng 55.12 to 55.38
  const minLat = 25.04;
  const maxLat = 25.23;
  const minLng = 55.12;
  const maxLng = 55.37;

  const getCoordinatesPercent = (lat: number, lng: number) => {
    const x = ((lng - minLng) / (maxLng - minLng)) * 88 + 6;
    // Invert Y since latitude increases northward
    const y = ((maxLat - lat) / (maxLat - minLat)) * 84 + 8;
    return {
      x: Math.min(Math.max(x, 8), 92),
      y: Math.min(Math.max(y, 10), 90),
    };
  };

  return (
    <div className={`relative w-full rounded-2xl overflow-hidden border border-stone-300 bg-[#E8EEF5] select-none ${className}`}>
      {/* Dubai Stylized Cartographic Background SVG */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none" viewBox="0 0 1000 600">
        <defs>
          <linearGradient id="seaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#CBE2F4" />
            <stop offset="100%" stopColor="#BCD9EE" />
          </linearGradient>
          <linearGradient id="landGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#F5F3EF" />
            <stop offset="100%" stopColor="#EDEAE3" />
          </linearGradient>
        </defs>

        {/* Arabian Gulf Sea */}
        <rect width="1000" height="600" fill="url(#seaGrad)" />

        {/* Mainland Dubai Coastline */}
        <path
          d="M 0,380 Q 200,320 400,260 T 700,180 Q 850,140 1000,110 L 1000,600 L 0,600 Z"
          fill="url(#landGrad)"
        />

        {/* Dubai Creek Inlet */}
        <path
          d="M 850,150 Q 880,180 890,260 Q 900,320 940,360 Q 980,390 1000,395"
          fill="none"
          stroke="#CBE2F4"
          strokeWidth="32"
          strokeLinecap="round"
        />

        {/* Dubai Water Canal */}
        <path
          d="M 520,225 Q 540,280 580,330 T 630,360"
          fill="none"
          stroke="#CBE2F4"
          strokeWidth="18"
          strokeLinecap="round"
        />

        {/* Palm Jumeirah Stylized Silhouette */}
        <g transform="translate(180, 180) scale(0.65)" opacity="0.95">
          <ellipse cx="120" cy="120" rx="90" ry="80" fill="none" stroke="#EDEAE3" strokeWidth="22" strokeDasharray="18,10" />
          <path d="M 120,200 L 120,40" stroke="#EDEAE3" strokeWidth="26" strokeLinecap="round" />
          <path d="M 60,110 Q 120,70 180,110" fill="none" stroke="#EDEAE3" strokeWidth="16" />
          <path d="M 40,140 Q 120,90 200,140" fill="none" stroke="#EDEAE3" strokeWidth="16" />
          <path d="M 70,170 Q 120,130 170,170" fill="none" stroke="#EDEAE3" strokeWidth="16" />
        </g>

        {/* Sheikh Zayed Road (E11) Arterial */}
        <path
          d="M 0,420 Q 300,340 600,240 T 1000,130"
          fill="none"
          stroke="#E2DCD2"
          strokeWidth="10"
        />
        <path
          d="M 0,420 Q 300,340 600,240 T 1000,130"
          fill="none"
          stroke="#FFF"
          strokeWidth="2"
          strokeDasharray="8,8"
          opacity="0.8"
        />

        {/* Key Community Watermark Labels */}
        <text x="60" y="240" fill="#78909C" fontSize="13" fontWeight="bold" opacity="0.6">ARABIAN GULF</text>
        <text x="140" y="470" fill="#8D7B68" fontSize="12" fontWeight="600" opacity="0.65">DUBAI MARINA</text>
        <text x="560" y="280" fill="#8D7B68" fontSize="12" fontWeight="600" opacity="0.65">DOWNTOWN / BURJ</text>
        <text x="480" y="340" fill="#8D7B68" fontSize="12" fontWeight="600" opacity="0.65">BUSINESS BAY</text>
        <text x="320" y="520" fill="#8D7B68" fontSize="12" fontWeight="600" opacity="0.65">JVC</text>
        <text x="820" y="290" fill="#8D7B68" fontSize="12" fontWeight="600" opacity="0.65">CREEK HARBOUR</text>
      </svg>

      {/* Interactive Property / Room Markers */}
      <div className="absolute inset-0">
        {items.map((item) => {
          const isRoom = 'monthlyPrice' in item;
          const lat = isRoom ? item.lat : item.location.lat;
          const lng = isRoom ? item.lng : item.location.lng;
          const price = isRoom ? item.monthlyPrice : item.price;
          const pos = getCoordinatesPercent(lat, lng);
          const isSelected = selectedPin?.id === item.id || activeId === item.id;

          return (
            <button
              key={item.id}
              onClick={() => {
                setSelectedPin(item);
                if (onSelectItem) onSelectItem(item);
              }}
              style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 transition-transform duration-150 cursor-pointer ${
                isSelected ? 'scale-115 z-30' : 'hover:scale-110 z-10'
              }`}
              title={item.title}
            >
              <div
                className={`px-2.5 py-1 rounded-full text-[11px] font-bold shadow-md flex items-center gap-1 border ${
                  isSelected
                    ? 'bg-emerald-900 text-white border-emerald-950 ring-2 ring-emerald-500'
                    : 'bg-white text-stone-900 border-stone-300 hover:border-emerald-800'
                }`}
              >
                <MapPin className={`w-3 h-3 ${isSelected ? 'text-emerald-300' : 'text-emerald-800'}`} />
                <span className="tabular-nums">
                  {formatCompactPrice(price, item.currency)}
                  {isRoom ? '/m' : ''}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Floating Map Controls & Counter */}
      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-stone-200 shadow-xs text-xs font-semibold text-stone-800 z-20 flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-emerald-700 animate-pulse" />
        <span>{items.length} Map Pins Active</span>
      </div>

      {/* Selected Property Popup Card */}
      {selectedPin && (
        <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-80 bg-white rounded-xl shadow-2xl border border-stone-200 overflow-hidden z-40 animate-in slide-in-from-bottom-2">
          <div className="relative aspect-[16/9] w-full bg-stone-100">
            <ImageWithFallback
              src={selectedPin.images[0]}
              alt={selectedPin.title}
              aspectRatioClass="aspect-[16/9]"
              className="w-full h-full object-cover"
            />
            <button
              onClick={() => setSelectedPin(null)}
              className="absolute top-2 right-2 p-1 bg-black/60 hover:bg-black text-white rounded-full transition-colors cursor-pointer"
              aria-label="Close Preview"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="p-3">
            <div className="flex items-baseline justify-between">
              <span className="text-base font-bold text-stone-900 tabular-nums">
                {'monthlyPrice' in selectedPin
                  ? `${formatPrice(selectedPin.monthlyPrice, selectedPin.currency)}/mo`
                  : `${formatPrice(selectedPin.price, selectedPin.currency)}${selectedPin.purpose === 'rent' ? '/yr' : ''}`}
              </span>
              <span className="text-[10px] text-stone-500 capitalize">
                {'roomType' in selectedPin ? selectedPin.roomType : selectedPin.propertyType}
              </span>
            </div>

            <div className="text-xs font-semibold text-stone-800 line-clamp-1 mt-0.5">
              {selectedPin.title}
            </div>

            <div className="text-[11px] text-stone-500 line-clamp-1 mt-0.5">
              {'community' in selectedPin ? selectedPin.location : `${selectedPin.location.building || ''} ${selectedPin.location.community}`}
            </div>

            <div className="mt-3 pt-2 border-t border-stone-100 flex items-center justify-between">
              <div className="text-[11px] text-stone-600">
                {'bedrooms' in selectedPin ? formatBedrooms(selectedPin.bedrooms) : 'Furnished Suite'}
              </div>
              <button
                onClick={() => {
                  if ('monthlyPrice' in selectedPin) {
                    navigateTo('room-detail', { slug: selectedPin.slug });
                  } else {
                    navigateTo('property-detail', { slug: selectedPin.slug });
                  }
                }}
                className="px-3 py-1 bg-emerald-900 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
              >
                <span>View Details</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
