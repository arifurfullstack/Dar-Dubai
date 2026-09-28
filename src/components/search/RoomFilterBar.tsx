import React from 'react';
import { RoomFilterState } from '../../types/property';
import { MOCK_AREAS } from '../../data/areas';
import { ChevronDown, Sparkles, RotateCcw } from 'lucide-react';

interface RoomFilterBarProps {
  filters: RoomFilterState;
  onChange: (filters: RoomFilterState) => void;
  onReset: () => void;
  totalCount: number;
  viewMode: 'grid' | 'map';
  onToggleViewMode: (mode: 'grid' | 'map') => void;
}

export const RoomFilterBar: React.FC<RoomFilterBarProps> = ({
  filters,
  onChange,
  onReset,
  totalCount,
  viewMode,
  onToggleViewMode,
}) => {
  const hasActiveFilters = Boolean(
    filters.community ||
    filters.roomType ||
    filters.maxPrice ||
    filters.billsIncluded ||
    filters.preferredGender
  );

  return (
    <div className="bg-white border-b border-stone-200 py-3 sticky top-18 z-30 shadow-xs">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Left: Quick inline filters */}
          <div className="flex items-center flex-wrap gap-2">
            {/* Location */}
            <div className="relative">
              <select
                value={filters.community || ''}
                onChange={(e) => onChange({ ...filters, community: e.target.value || undefined })}
                className="h-9 pl-3 pr-7 bg-stone-50 border border-stone-200 rounded-lg text-xs font-medium text-stone-800 appearance-none hover:border-stone-300 focus:outline-none cursor-pointer"
              >
                <option value="">All Dubai Communities</option>
                {MOCK_AREAS.map((a) => (
                  <option key={a.id} value={a.name}>
                    {a.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-stone-400 absolute right-2.5 top-3 pointer-events-none" />
            </div>

            {/* Room Type */}
            <div className="relative">
              <select
                value={filters.roomType || ''}
                onChange={(e) => onChange({ ...filters, roomType: e.target.value || undefined })}
                className="h-9 pl-3 pr-7 bg-stone-50 border border-stone-200 rounded-lg text-xs font-medium text-stone-800 appearance-none hover:border-stone-300 focus:outline-none cursor-pointer"
              >
                <option value="">All Room Types</option>
                <option value="master">Master Room (Ensuite)</option>
                <option value="private">Private Bedroom</option>
                <option value="shared">Shared Room</option>
                <option value="partition">Partition</option>
                <option value="studio">Private Studio</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-stone-400 absolute right-2.5 top-3 pointer-events-none" />
            </div>

            {/* Max Monthly Budget */}
            <div className="relative">
              <select
                value={filters.maxPrice || ''}
                onChange={(e) =>
                  onChange({ ...filters, maxPrice: e.target.value ? Number(e.target.value) : undefined })
                }
                className="h-9 pl-3 pr-7 bg-stone-50 border border-stone-200 rounded-lg text-xs font-medium text-stone-800 appearance-none hover:border-stone-300 focus:outline-none cursor-pointer"
              >
                <option value="">Max Budget</option>
                <option value="2000">Up to AED 2,000</option>
                <option value="3500">Up to AED 3,500</option>
                <option value="5000">Up to AED 5,000</option>
                <option value="7000">Up to AED 7,000</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-stone-400 absolute right-2.5 top-3 pointer-events-none" />
            </div>

            {/* Gender Preference */}
            <div className="relative">
              <select
                value={filters.preferredGender || ''}
                onChange={(e) => onChange({ ...filters, preferredGender: e.target.value || undefined })}
                className="h-9 pl-3 pr-7 bg-stone-50 border border-stone-200 rounded-lg text-xs font-medium text-stone-800 appearance-none hover:border-stone-300 focus:outline-none cursor-pointer"
              >
                <option value="">Any Gender</option>
                <option value="female">Female Only</option>
                <option value="male">Male Only</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-stone-400 absolute right-2.5 top-3 pointer-events-none" />
            </div>

            {/* Bills Included Toggle */}
            <button
              type="button"
              onClick={() => onChange({ ...filters, billsIncluded: !filters.billsIncluded })}
              className={`h-9 px-3 rounded-lg text-xs font-medium border transition-colors flex items-center gap-1.5 cursor-pointer ${
                filters.billsIncluded
                  ? 'bg-emerald-50 text-emerald-950 border-emerald-300 font-semibold'
                  : 'bg-stone-50 text-stone-700 border-stone-200 hover:border-stone-300'
              }`}
            >
              <Sparkles className={`w-3.5 h-3.5 ${filters.billsIncluded ? 'text-emerald-700' : 'text-stone-400'}`} />
              <span>Bills Included</span>
            </button>
          </div>

          {/* Right: Sort & Map Toggle */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <select
                value={filters.sortBy || 'recommended'}
                onChange={(e) => onChange({ ...filters, sortBy: e.target.value as any })}
                className="h-9 pl-3 pr-7 bg-white border border-stone-200 rounded-lg text-xs font-medium text-stone-800 appearance-none hover:border-stone-300 focus:outline-none cursor-pointer"
              >
                <option value="recommended">Recommended</option>
                <option value="price-asc">Rent: Low to High</option>
                <option value="price-desc">Rent: High to Low</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-stone-400 absolute right-2.5 top-3 pointer-events-none" />
            </div>

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

        {hasActiveFilters && (
          <div className="mt-2.5 pt-2 border-t border-stone-100 flex items-center justify-between text-xs text-stone-600">
            <span>Showing filtered room results</span>
            <button
              onClick={onReset}
              className="text-xs text-emerald-900 font-semibold hover:underline flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Filters</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
