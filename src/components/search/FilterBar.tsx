import React, { useState } from 'react';
import { PropertyFilterState } from '../../types/property';
import { MOCK_AREAS } from '../../data/areas';
import { SlidersHorizontal, ChevronDown, Check, X, RotateCcw } from 'lucide-react';

interface FilterBarProps {
  filters: PropertyFilterState;
  onChange: (filters: PropertyFilterState) => void;
  onReset: () => void;
  totalCount: number;
  viewMode: 'grid' | 'map';
  onToggleViewMode: (mode: 'grid' | 'map') => void;
  purpose: 'rent' | 'sale';
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onChange,
  onReset,
  totalCount,
  viewMode,
  onToggleViewMode,
  purpose,
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const amenitiesList = [
    'Balcony',
    'Pool',
    'Gym',
    'Covered Parking',
    'Security',
    'Concierge',
    'Private Garden',
    'Maid’s Room',
    'Built-in Wardrobes',
    'Pet Friendly',
    'Central AC',
    'Direct Beach Access',
  ];

  const handleAmenityToggle = (amenity: string) => {
    const current = filters.amenities || [];
    const next = current.includes(amenity)
      ? current.filter((a) => a !== amenity)
      : [...current, amenity];
    onChange({ ...filters, amenities: next });
  };

  const hasActiveFilters = Boolean(
    filters.community ||
    filters.propertyType ||
    filters.bedrooms ||
    filters.minPrice ||
    filters.maxPrice ||
    filters.furnishing ||
    (filters.amenities && filters.amenities.length > 0) ||
    filters.verifiedOnly
  );

  return (
    <div className="bg-white border-b border-stone-200 py-3 sticky top-18 z-30 shadow-xs">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Controls Row */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Left: Quick inline filters */}
          <div className="flex items-center flex-wrap gap-2">
            {/* Location Select */}
            <div className="relative">
              <select
                value={filters.community || ''}
                onChange={(e) => onChange({ ...filters, community: e.target.value || undefined })}
                className="h-9 pl-3 pr-7 bg-stone-50 border border-stone-200 rounded-lg text-xs font-medium text-stone-800 appearance-none hover:border-stone-300 focus:outline-none cursor-pointer"
              >
                <option value="">All Locations</option>
                {MOCK_AREAS.map((a) => (
                  <option key={a.id} value={a.name}>
                    {a.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-stone-400 absolute right-2.5 top-3 pointer-events-none" />
            </div>

            {/* Property Type Select */}
            <div className="relative">
              <select
                value={filters.propertyType || ''}
                onChange={(e) => onChange({ ...filters, propertyType: e.target.value || undefined })}
                className="h-9 pl-3 pr-7 bg-stone-50 border border-stone-200 rounded-lg text-xs font-medium text-stone-800 appearance-none hover:border-stone-300 focus:outline-none cursor-pointer"
              >
                <option value="">All Types</option>
                <option value="apartment">Apartment</option>
                <option value="villa">Villa</option>
                <option value="townhouse">Townhouse</option>
                <option value="penthouse">Penthouse</option>
                <option value="studio">Studio</option>
                <option value="duplex">Duplex</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-stone-400 absolute right-2.5 top-3 pointer-events-none" />
            </div>

            {/* Bedrooms Select */}
            <div className="relative">
              <select
                value={filters.bedrooms || ''}
                onChange={(e) => onChange({ ...filters, bedrooms: e.target.value || undefined })}
                className="h-9 pl-3 pr-7 bg-stone-50 border border-stone-200 rounded-lg text-xs font-medium text-stone-800 appearance-none hover:border-stone-300 focus:outline-none cursor-pointer"
              >
                <option value="">Any Beds</option>
                <option value="studio">Studio</option>
                <option value="1">1 Bed</option>
                <option value="2">2 Beds</option>
                <option value="3">3 Beds</option>
                <option value="4">4 Beds</option>
                <option value="5+">5+ Beds</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-stone-400 absolute right-2.5 top-3 pointer-events-none" />
            </div>

            {/* Verified Only Toggle */}
            <button
              type="button"
              onClick={() => onChange({ ...filters, verifiedOnly: !filters.verifiedOnly })}
              className={`h-9 px-3 rounded-lg text-xs font-medium border transition-colors flex items-center gap-1.5 cursor-pointer ${
                filters.verifiedOnly
                  ? 'bg-emerald-50 text-emerald-900 border-emerald-300 font-semibold'
                  : 'bg-stone-50 text-stone-700 border-stone-200 hover:border-stone-300'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${filters.verifiedOnly ? 'bg-emerald-600' : 'bg-stone-300'}`} />
              <span>Verified Only</span>
            </button>

            {/* More Filters Drawer Button */}
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className="h-9 px-3 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>All Filters</span>
              {hasActiveFilters && (
                <span className="w-2 h-2 rounded-full bg-emerald-800" />
              )}
            </button>
          </div>

          {/* Right: Sort & Map Toggle */}
          <div className="flex items-center gap-2">
            {/* Sort Select */}
            <div className="relative">
              <select
                value={filters.sortBy || 'recommended'}
                onChange={(e) => onChange({ ...filters, sortBy: e.target.value as any })}
                className="h-9 pl-3 pr-7 bg-white border border-stone-200 rounded-lg text-xs font-medium text-stone-800 appearance-none hover:border-stone-300 focus:outline-none cursor-pointer"
              >
                <option value="recommended">Recommended</option>
                <option value="newest">Newest First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="area-desc">Largest Area</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-stone-400 absolute right-2.5 top-3 pointer-events-none" />
            </div>

            {/* View Mode Toggle: Grid | Map */}
            <div className="flex items-center p-0.5 bg-stone-100 rounded-lg border border-stone-200">
              <button
                type="button"
                onClick={() => onToggleViewMode('grid')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-500 hover:text-stone-900'
                }`}
              >
                Grid
              </button>
              <button
                type="button"
                onClick={() => onToggleViewMode('map')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                  viewMode === 'map'
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-500 hover:text-stone-900'
                }`}
              >
                Map
              </button>
            </div>
          </div>
        </div>

        {/* Active Filter Chips Row */}
        {hasActiveFilters && (
          <div className="mt-2.5 pt-2 border-t border-stone-100 flex items-center gap-2 flex-wrap">
            <span className="text-[11px] font-semibold text-stone-400">Active:</span>

            {filters.community && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-stone-100 text-stone-800 text-[11px] font-medium rounded">
                <span>{filters.community}</span>
                <button
                  onClick={() => onChange({ ...filters, community: undefined })}
                  className="hover:text-stone-950"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {filters.propertyType && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-stone-100 text-stone-800 text-[11px] font-medium rounded capitalize">
                <span>{filters.propertyType}</span>
                <button
                  onClick={() => onChange({ ...filters, propertyType: undefined })}
                  className="hover:text-stone-950"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {filters.bedrooms && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-stone-100 text-stone-800 text-[11px] font-medium rounded">
                <span>{filters.bedrooms === 'studio' ? 'Studio' : `${filters.bedrooms} Beds`}</span>
                <button
                  onClick={() => onChange({ ...filters, bedrooms: undefined })}
                  className="hover:text-stone-950"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {filters.maxPrice && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-stone-100 text-stone-800 text-[11px] font-medium rounded">
                <span>Max AED {filters.maxPrice.toLocaleString()}</span>
                <button
                  onClick={() => onChange({ ...filters, maxPrice: undefined })}
                  className="hover:text-stone-950"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {filters.verifiedOnly && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-50 text-emerald-900 text-[11px] font-medium rounded">
                <span>Verified Only</span>
                <button
                  onClick={() => onChange({ ...filters, verifiedOnly: false })}
                  className="hover:text-emerald-950"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            <button
              onClick={onReset}
              className="text-[11px] text-emerald-900 font-semibold hover:underline flex items-center gap-1 ml-1 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Clear All</span>
            </button>
          </div>
        )}
      </div>

      {/* Comprehensive Filter Drawer (Right slide-over) */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-200">
            {/* Drawer Header */}
            <div className="p-5 border-b border-stone-200 flex items-center justify-between sticky top-0 bg-white z-10">
              <div>
                <h3 className="text-base font-bold text-stone-900 font-serif">
                  Filters & Specifications
                </h3>
                <p className="text-xs text-stone-500">Refine properties in Dubai</p>
              </div>
              <button
                onClick={() => setDrawerOpen(false)}
                className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Content */}
            <div className="p-5 space-y-6 flex-1">
              {/* Price Range */}
              <div>
                <label className="block text-xs font-semibold text-stone-900 mb-2">
                  Price Range (AED)
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-[10px] text-stone-400 uppercase">Min Price</span>
                    <input
                      type="number"
                      placeholder="e.g. 50,000"
                      value={filters.minPrice || ''}
                      onChange={(e) =>
                        onChange({ ...filters, minPrice: e.target.value ? Number(e.target.value) : undefined })
                      }
                      className="w-full h-10 px-3 bg-stone-50 border border-stone-200 rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-stone-400 uppercase">Max Price</span>
                    <input
                      type="number"
                      placeholder="e.g. 250,000"
                      value={filters.maxPrice || ''}
                      onChange={(e) =>
                        onChange({ ...filters, maxPrice: e.target.value ? Number(e.target.value) : undefined })
                      }
                      className="w-full h-10 px-3 bg-stone-50 border border-stone-200 rounded-lg text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Furnishing */}
              <div>
                <label className="block text-xs font-semibold text-stone-900 mb-2">
                  Furnishing
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['all', 'furnished', 'unfurnished'].map((f) => {
                    const isSelected = (filters.furnishing || 'all') === f;
                    return (
                      <button
                        key={f}
                        type="button"
                        onClick={() => onChange({ ...filters, furnishing: f === 'all' ? undefined : f })}
                        className={`py-2 text-xs font-medium rounded-lg border capitalize transition-colors ${
                          isSelected
                            ? 'bg-emerald-900 text-white border-emerald-950 font-semibold'
                            : 'bg-stone-50 text-stone-700 border-stone-200 hover:border-stone-300'
                        }`}
                      >
                        {f}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Bathrooms */}
              <div>
                <label className="block text-xs font-semibold text-stone-900 mb-2">
                  Bathrooms
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {['any', '1', '2', '3', '4+'].map((b) => {
                    const isSelected = (filters.bathrooms || 'any') === b;
                    return (
                      <button
                        key={b}
                        type="button"
                        onClick={() => onChange({ ...filters, bathrooms: b === 'any' ? undefined : b })}
                        className={`py-2 text-xs font-medium rounded-lg border transition-colors ${
                          isSelected
                            ? 'bg-emerald-900 text-white border-emerald-950 font-semibold'
                            : 'bg-stone-50 text-stone-700 border-stone-200 hover:border-stone-300'
                        }`}
                      >
                        {b === 'any' ? 'Any' : `${b} Bath`}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Amenities */}
              <div>
                <label className="block text-xs font-semibold text-stone-900 mb-2">
                  Key Amenities
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {amenitiesList.map((amenity) => {
                    const checked = (filters.amenities || []).includes(amenity);
                    return (
                      <button
                        key={amenity}
                        type="button"
                        onClick={() => handleAmenityToggle(amenity)}
                        className={`px-3 py-2 rounded-lg border text-xs text-left flex items-center justify-between transition-colors ${
                          checked
                            ? 'bg-emerald-50 text-emerald-950 border-emerald-300 font-semibold'
                            : 'bg-stone-50 text-stone-700 border-stone-200 hover:border-stone-300'
                        }`}
                      >
                        <span>{amenity}</span>
                        {checked && <Check className="w-3.5 h-3.5 text-emerald-800" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Sticky Drawer Footer */}
            <div className="p-4 border-t border-stone-200 bg-white sticky bottom-0 flex items-center gap-3">
              <button
                type="button"
                onClick={onReset}
                className="w-1/3 py-2.5 border border-stone-200 text-stone-700 rounded-xl text-xs font-semibold hover:bg-stone-50 transition-colors"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className="w-2/3 py-2.5 bg-emerald-900 text-white rounded-xl text-xs font-semibold hover:bg-emerald-800 transition-colors shadow-xs"
              >
                Show {totalCount} Properties
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
