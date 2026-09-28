import React from 'react';
import { Property } from '../../types/property';
import { useApp } from '../../context/AppContext';
import { formatPrice, formatBedrooms, formatBathrooms, formatArea } from '../../utils/helpers';
import { ImageWithFallback } from '../ui/ImageWithFallback';
import { Bookmark, CheckCircle2, Camera } from 'lucide-react';

interface PropertyCardProps {
  property: Property;
  compact?: boolean;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property, compact = false }) => {
  const { navigateTo, isSaved, toggleSave } = useApp();
  const saved = isSaved(property.id);

  const handleCardClick = (e: React.MouseEvent) => {
    // Prevent if clicked favorite button
    if ((e.target as HTMLElement).closest('.save-btn')) return;
    navigateTo('property-detail', { slug: property.slug });
  };

  const handleSaveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleSave(property.id, property.title);
  };

  const priceSuffix = property.purpose === 'rent' ? `/${property.rentFrequency === 'monthly' ? 'month' : 'year'}` : '';

  return (
    <div
      onClick={handleCardClick}
      className="group bg-white rounded-xl border border-stone-200 overflow-hidden hover:border-stone-300 hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col h-full"
    >
      {/* Image container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100">
        <ImageWithFallback
          src={property.images[0]}
          alt={property.title}
          fallbackCategory={property.propertyType === 'villa' ? 'villa' : property.propertyType === 'penthouse' ? 'penthouse' : 'apartment'}
          className="w-full h-full object-cover group-hover:scale-[1.025] transition-transform duration-300 ease-out"
        />

        {/* Quiet Top Overlays */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          {/* Subtle purpose / verified label */}
          <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-xs text-white px-2.5 py-1 rounded text-[11px] font-medium">
            <span className="capitalize">{property.purpose === 'rent' ? 'For Rent' : 'For Sale'}</span>
            {property.verified && (
              <>
                <span className="text-white/40">·</span>
                <span className="text-emerald-300 flex items-center gap-0.5">
                  <CheckCircle2 className="w-3 h-3" />
                  Verified
                </span>
              </>
            )}
          </div>

          {/* Favorite button */}
          <button
            type="button"
            onClick={handleSaveClick}
            className="save-btn pointer-events-auto p-2 bg-white/90 hover:bg-white text-stone-700 hover:text-emerald-900 rounded-full shadow-xs transition-colors cursor-pointer"
            aria-label={saved ? 'Remove from saved' : 'Save property'}
          >
            <Bookmark className={`w-4 h-4 transition-transform active:scale-90 ${saved ? 'fill-emerald-800 text-emerald-800' : ''}`} />
          </button>
        </div>

        {/* Photo count indicator */}
        <div className="absolute bottom-2.5 right-3 bg-black/60 backdrop-blur-xs text-white/90 px-2 py-0.5 rounded text-[10px] font-medium flex items-center gap-1">
          <Camera className="w-3 h-3" />
          <span>{property.images.length || 1}</span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        <div>
          {/* Price */}
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-bold text-stone-900 tracking-tight tabular-nums">
              {formatPrice(property.price, property.currency)}
            </span>
            {priceSuffix && (
              <span className="text-xs text-stone-500 font-medium">{priceSuffix}</span>
            )}
          </div>

          {/* Property Title */}
          <h3 className="text-sm font-semibold text-stone-900 mt-1 line-clamp-1 group-hover:text-emerald-900 transition-colors">
            {property.title}
          </h3>

          {/* Location */}
          <p className="text-xs text-stone-500 mt-0.5 line-clamp-1">
            {property.location.building ? `${property.location.building}, ` : ''}{property.location.community}, Dubai
          </p>
        </div>

        {/* Unboxed Metadata with Typographic Separators (Zero-Pill Discipline) */}
        <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs text-stone-600">
          <div className="flex items-center gap-2">
            <span>{formatBedrooms(property.bedrooms)}</span>
            <span className="text-stone-300" aria-hidden="true">·</span>
            <span>{formatBathrooms(property.bathrooms)}</span>
            <span className="text-stone-300" aria-hidden="true">·</span>
            <span className="tabular-nums">{formatArea(property.areaSqFt)}</span>
          </div>

          {/* Quiet Furnishing Indicator */}
          <span className="text-[11px] text-stone-400 capitalize hidden sm:inline">
            {property.furnished}
          </span>
        </div>
      </div>
    </div>
  );
};
