import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { FilterBar } from '../search/FilterBar';
import { PropertyCard } from '../property/PropertyCard';
import { DubaiMap } from '../map/DubaiMap';
import { Property } from '../../types/property';
import { Share2, Home, RotateCcw } from 'lucide-react';
import { copyToClipboard } from '../../utils/helpers';

interface BrowsePropertiesViewProps {
  purpose: 'rent' | 'sale';
}

export const BrowsePropertiesView: React.FC<BrowsePropertiesViewProps> = ({ purpose }) => {
  const { properties, propertyFilters, setPropertyFilters, resetPropertyFilters, showToast } = useApp();
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');

  // Filter properties according to purpose and active filters
  const filteredProperties = useMemo(() => {
    return properties.filter((p) => {
      // Must match purpose
      if (p.purpose !== purpose) return false;

      // Community
      if (propertyFilters.community && p.location.community !== propertyFilters.community) {
        return false;
      }

      // Property Type
      if (propertyFilters.propertyType && p.propertyType !== propertyFilters.propertyType) {
        return false;
      }

      // Bedrooms
      if (propertyFilters.bedrooms) {
        if (propertyFilters.bedrooms === 'studio') {
          if (p.bedrooms !== 'studio' && p.bedrooms !== 0) return false;
        } else if (propertyFilters.bedrooms === '5+') {
          if (typeof p.bedrooms === 'number' && p.bedrooms < 5) return false;
        } else {
          const num = parseInt(propertyFilters.bedrooms, 10);
          if (p.bedrooms !== num) return false;
        }
      }

      // Bathrooms
      if (propertyFilters.bathrooms && propertyFilters.bathrooms !== 'any') {
        const minBaths = parseInt(propertyFilters.bathrooms, 10);
        if (p.bathrooms < minBaths) return false;
      }

      // Price Min
      if (propertyFilters.minPrice && p.price < propertyFilters.minPrice) {
        return false;
      }

      // Price Max
      if (propertyFilters.maxPrice && p.price > propertyFilters.maxPrice) {
        return false;
      }

      // Furnishing
      if (propertyFilters.furnishing && p.furnished !== propertyFilters.furnishing) {
        return false;
      }

      // Verified Only
      if (propertyFilters.verifiedOnly && !p.verified) {
        return false;
      }

      // Amenities (must have all selected amenities)
      if (propertyFilters.amenities && propertyFilters.amenities.length > 0) {
        const hasAll = propertyFilters.amenities.every((a) => p.amenities.includes(a));
        if (!hasAll) return false;
      }

      return true;
    }).sort((a, b) => {
      const sort = propertyFilters.sortBy || 'recommended';
      if (sort === 'price-asc') return a.price - b.price;
      if (sort === 'price-desc') return b.price - a.price;
      if (sort === 'area-desc') return b.areaSqFt - a.areaSqFt;
      if (sort === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [properties, purpose, propertyFilters]);

  const handleShareSearch = () => {
    copyToClipboard(window.location.href);
    showToast('Search link copied to clipboard!', 'info');
  };

  const titlePrefix = purpose === 'rent' ? 'Properties for Rent' : 'Properties for Sale';
  const locationTitle = propertyFilters.community ? ` in ${propertyFilters.community}` : ' in Dubai';

  return (
    <div className="min-h-screen bg-stone-50 pb-20">
      {/* Interactive Sticky Filter Bar */}
      <FilterBar
        filters={propertyFilters}
        onChange={setPropertyFilters}
        onReset={resetPropertyFilters}
        totalCount={filteredProperties.length}
        viewMode={viewMode}
        onToggleViewMode={setViewMode}
        purpose={purpose}
      />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {/* Results Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-stone-900 font-serif tracking-tight">
              {titlePrefix}{locationTitle}
            </h1>
            <p className="text-xs text-stone-500 mt-0.5">
              Showing <span className="font-semibold text-stone-800">{filteredProperties.length}</span> verified properties
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShareSearch}
              className="px-3 py-1.5 bg-white border border-stone-200 text-stone-700 hover:text-stone-950 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            >
              <Share2 className="w-3.5 h-3.5 text-stone-500" />
              <span>Share Search</span>
            </button>
          </div>
        </div>

        {/* View Mode: Map or Grid */}
        {viewMode === 'map' ? (
          <div className="space-y-6">
            <DubaiMap items={filteredProperties} className="h-[550px] shadow-sm" />
            
            {/* Properties underneath map */}
            <div className="pt-4">
              <h2 className="text-sm font-bold text-stone-800 mb-4 uppercase tracking-wider text-xs">
                Map Results List ({filteredProperties.length})
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredProperties.map((p) => (
                  <PropertyCard key={p.id} property={p} />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div>
            {filteredProperties.length === 0 ? (
              /* Designed Empty State */
              <div className="text-center py-20 bg-white rounded-2xl border border-stone-200 p-8 max-w-md mx-auto my-8">
                <div className="w-12 h-12 bg-stone-100 text-stone-400 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Home className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-stone-900 font-serif">
                  No properties match these filters
                </h3>
                <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                  Try broadening your price range, clearing specific amenities, or searching all Dubai communities.
                </p>
                <div className="pt-4">
                  <button
                    onClick={resetPropertyFilters}
                    className="px-5 py-2.5 bg-emerald-900 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold inline-flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Clear All Filters</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProperties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
