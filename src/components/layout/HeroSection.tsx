import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, MapPin, Home, Bed, ChevronDown, Check } from 'lucide-react';
import { MOCK_AREAS } from '../../data/areas';

export const HeroSection: React.FC = () => {
  const { navigateTo, setPropertyFilters, setRoomFilters } = useApp();

  const [activeTab, setActiveTab] = useState<'rent' | 'buy' | 'rooms'>('rent');
  const [selectedArea, setSelectedArea] = useState<string>('');
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [propertyType, setPropertyType] = useState<string>('all');
  const [bedrooms, setBedrooms] = useState<string>('any');
  const [priceBudget, setPriceBudget] = useState<string>('any');

  const locationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (locationRef.current && !locationRef.current.contains(e.target as Node)) {
        setIsLocationOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = () => {
    if (activeTab === 'rooms') {
      setRoomFilters((prev) => ({
        ...prev,
        community: selectedArea || undefined,
        ...(priceBudget !== 'any' ? { maxPrice: parseInt(priceBudget, 10) } : {}),
      }));
      navigateTo('rooms', {
        ...(selectedArea ? { community: selectedArea } : {}),
      });
      return;
    }

    const mappedPurpose = activeTab === 'buy' ? 'sale' : 'rent';
    setPropertyFilters((prev) => ({
      ...prev,
      purpose: mappedPurpose,
      community: selectedArea || undefined,
      propertyType: propertyType !== 'all' ? propertyType : undefined,
      bedrooms: bedrooms !== 'any' ? bedrooms : undefined,
      ...(priceBudget !== 'any' ? { maxPrice: parseInt(priceBudget, 10) } : {}),
    }));

    navigateTo(activeTab === 'buy' ? 'buy' : 'rent', {
      ...(selectedArea ? { community: selectedArea } : {}),
      ...(bedrooms !== 'any' ? { beds: bedrooms } : {}),
      ...(propertyType !== 'all' ? { type: propertyType } : {}),
    });
  };

  const handleQuickArea = (areaName: string) => {
    setSelectedArea(areaName);
    const mappedPurpose = activeTab === 'buy' ? 'sale' : 'rent';
    if (activeTab === 'rooms') {
      setRoomFilters((prev) => ({ ...prev, community: areaName }));
      navigateTo('rooms', { community: areaName });
    } else {
      setPropertyFilters((prev) => ({ ...prev, purpose: mappedPurpose, community: areaName }));
      navigateTo(activeTab === 'buy' ? 'buy' : 'rent', { community: areaName });
    }
  };

  return (
    <section className="relative bg-stone-900 min-h-[520px] sm:min-h-[580px] flex items-center justify-center overflow-hidden">
      {/* 1. Single authentic high-resolution Dubai photograph with natural dark scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=2000&q=85"
          alt="Dubai Marina residential towers"
          className="w-full h-full object-cover"
        />
        {/* Clean, natural photographic vignette scrim - no purple or rainbow gradients */}
        <div className="absolute inset-0 bg-stone-950/60" />
      </div>

      <div className="relative z-10 w-full max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 flex flex-col items-center text-center">
        {/* 2. Clear, authentic editorial typography (Zero AI slop) */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-normal text-white tracking-[-0.03em] text-balance max-w-4xl leading-[1.05]">
          Find your place in Dubai.
        </h1>
        <p className="mt-4 text-base sm:text-lg text-stone-200/90 max-w-xl font-normal leading-relaxed">
          Apartments, villas, rooms and properties for rent or sale across Dubai.
        </p>

        {/* 3. The Search Engine: Clean, solid, human-designed marketplace console */}
        <div className="w-full max-w-4xl mt-8 bg-white rounded-xl shadow-xl border border-stone-200 p-3 sm:p-5 text-left">
          {/* Functional Purpose Tabs */}
          <div className="flex items-center gap-1 mb-4 border-b border-stone-100 pb-3">
            <button
              type="button"
              onClick={() => {
                setActiveTab('rent');
                setPriceBudget('any');
              }}
              className={`px-5 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                activeTab === 'rent'
                  ? 'bg-emerald-900 text-white'
                  : 'text-stone-600 hover:text-stone-950 hover:bg-stone-50'
              }`}
            >
              Rent
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab('buy');
                setPriceBudget('any');
              }}
              className={`px-5 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                activeTab === 'buy'
                  ? 'bg-emerald-900 text-white'
                  : 'text-stone-600 hover:text-stone-950 hover:bg-stone-50'
              }`}
            >
              Buy
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab('rooms');
                setPriceBudget('any');
              }}
              className={`px-5 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                activeTab === 'rooms'
                  ? 'bg-emerald-900 text-white'
                  : 'text-stone-600 hover:text-stone-950 hover:bg-stone-50'
              }`}
            >
              Rooms
            </button>
          </div>

          {/* Form Controls Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* 1. Location */}
            <div className="relative" ref={locationRef}>
              <label className="block text-[11px] font-semibold text-stone-500 uppercase tracking-wider mb-1">
                Location
              </label>
              <button
                type="button"
                onClick={() => setIsLocationOpen(!isLocationOpen)}
                className="w-full h-11 px-3 bg-stone-50 border border-stone-200 rounded-lg text-left flex items-center justify-between hover:border-stone-300 focus:outline-none focus:ring-1 focus:ring-emerald-800 text-xs sm:text-sm cursor-pointer"
              >
                <div className="flex items-center gap-2 truncate">
                  <MapPin className="w-4 h-4 text-emerald-800 shrink-0" />
                  <span className={`truncate ${selectedArea ? 'text-stone-900 font-medium' : 'text-stone-400'}`}>
                    {selectedArea || 'All Dubai Areas'}
                  </span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-stone-400 shrink-0" />
              </button>

              {isLocationOpen && (
                <div className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-lg border border-stone-200 z-50 p-1.5 max-h-64 overflow-y-auto w-72">
                  <div className="px-2 py-1 text-[10px] font-bold text-stone-400 uppercase tracking-wider">
                    Popular Areas
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedArea('');
                      setIsLocationOpen(false);
                    }}
                    className={`w-full text-left px-2.5 py-1.5 rounded text-xs font-medium flex items-center justify-between hover:bg-stone-50 ${
                      selectedArea === '' ? 'text-emerald-900 bg-emerald-50/60 font-semibold' : 'text-stone-700'
                    }`}
                  >
                    <span>All Dubai Communities</span>
                    {selectedArea === '' && <Check className="w-3.5 h-3.5 text-emerald-800" />}
                  </button>
                  {MOCK_AREAS.map((area) => (
                    <button
                      key={area.id}
                      type="button"
                      onClick={() => {
                        setSelectedArea(area.name);
                        setIsLocationOpen(false);
                      }}
                      className={`w-full text-left px-2.5 py-1.5 rounded text-xs font-medium flex items-center justify-between hover:bg-stone-50 ${
                        selectedArea === area.name ? 'text-emerald-900 bg-emerald-50/60 font-semibold' : 'text-stone-700'
                      }`}
                    >
                      <span className="font-medium text-stone-800">{area.name}</span>
                      {selectedArea === area.name && <Check className="w-3.5 h-3.5 text-emerald-800" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 2. Property Type */}
            <div>
              <label className="block text-[11px] font-semibold text-stone-500 uppercase tracking-wider mb-1">
                {activeTab === 'rooms' ? 'Room Type' : 'Property Type'}
              </label>
              <div className="relative">
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="w-full h-11 pl-9 pr-8 bg-stone-50 border border-stone-200 rounded-lg text-xs font-medium text-stone-800 appearance-none hover:border-stone-300 focus:outline-none focus:ring-1 focus:ring-emerald-800 cursor-pointer"
                >
                  {activeTab === 'rooms' ? (
                    <>
                      <option value="all">All Room Types</option>
                      <option value="master">Master Room (Ensuite)</option>
                      <option value="private">Private Room</option>
                      <option value="shared">Shared Room</option>
                      <option value="partition">Partition</option>
                      <option value="studio">Private Studio</option>
                    </>
                  ) : (
                    <>
                      <option value="all">All Property Types</option>
                      <option value="apartment">Apartment</option>
                      <option value="villa">Villa</option>
                      <option value="townhouse">Townhouse</option>
                      <option value="penthouse">Penthouse</option>
                      <option value="studio">Studio</option>
                      <option value="duplex">Duplex</option>
                    </>
                  )}
                </select>
                <Home className="w-4 h-4 text-emerald-800 absolute left-3 top-3.5 pointer-events-none" />
                <ChevronDown className="w-3.5 h-3.5 text-stone-400 absolute right-3 top-3.5 pointer-events-none" />
              </div>
            </div>

            {/* 3. Bedrooms / Gender */}
            <div>
              <label className="block text-[11px] font-semibold text-stone-500 uppercase tracking-wider mb-1">
                {activeTab === 'rooms' ? 'Preference' : 'Bedrooms'}
              </label>
              <div className="relative">
                {activeTab === 'rooms' ? (
                  <select
                    value={bedrooms}
                    onChange={(e) => setBedrooms(e.target.value)}
                    className="w-full h-11 pl-9 pr-8 bg-stone-50 border border-stone-200 rounded-lg text-xs font-medium text-stone-800 appearance-none hover:border-stone-300 focus:outline-none focus:ring-1 focus:ring-emerald-800 cursor-pointer"
                  >
                    <option value="any">Any Gender</option>
                    <option value="female">Female Preferred</option>
                    <option value="male">Male Preferred</option>
                  </select>
                ) : (
                  <select
                    value={bedrooms}
                    onChange={(e) => setBedrooms(e.target.value)}
                    className="w-full h-11 pl-9 pr-8 bg-stone-50 border border-stone-200 rounded-lg text-xs font-medium text-stone-800 appearance-none hover:border-stone-300 focus:outline-none focus:ring-1 focus:ring-emerald-800 cursor-pointer"
                  >
                    <option value="any">Any Bedrooms</option>
                    <option value="studio">Studio</option>
                    <option value="1">1 Bedroom</option>
                    <option value="2">2 Bedrooms</option>
                    <option value="3">3 Bedrooms</option>
                    <option value="4">4 Bedrooms</option>
                    <option value="5+">5+ Bedrooms</option>
                  </select>
                )}
                <Bed className="w-4 h-4 text-emerald-800 absolute left-3 top-3.5 pointer-events-none" />
                <ChevronDown className="w-3.5 h-3.5 text-stone-400 absolute right-3 top-3.5 pointer-events-none" />
              </div>
            </div>

            {/* 4. Price Budget */}
            <div>
              <label className="block text-[11px] font-semibold text-stone-500 uppercase tracking-wider mb-1">
                Max Price (AED)
              </label>
              <div className="relative">
                <select
                  value={priceBudget}
                  onChange={(e) => setPriceBudget(e.target.value)}
                  className="w-full h-11 pl-3 pr-8 bg-stone-50 border border-stone-200 rounded-lg text-xs font-medium text-stone-800 appearance-none hover:border-stone-300 focus:outline-none focus:ring-1 focus:ring-emerald-800 cursor-pointer"
                >
                  <option value="any">Any Price</option>
                  {activeTab === 'rooms' ? (
                    <>
                      <option value="2000">Up to AED 2,000 / mo</option>
                      <option value="3500">Up to AED 3,500 / mo</option>
                      <option value="5000">Up to AED 5,000 / mo</option>
                      <option value="7000">Up to AED 7,000 / mo</option>
                    </>
                  ) : activeTab === 'buy' ? (
                    <>
                      <option value="1500000">Up to AED 1.5M</option>
                      <option value="3000000">Up to AED 3.0M</option>
                      <option value="5000000">Up to AED 5.0M</option>
                      <option value="10000000">Up to AED 10M+</option>
                    </>
                  ) : (
                    <>
                      <option value="75000">Up to AED 75,000 / yr</option>
                      <option value="120000">Up to AED 120,000 / yr</option>
                      <option value="180000">Up to AED 180,000 / yr</option>
                      <option value="250000">Up to AED 250,000 / yr</option>
                    </>
                  )}
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-stone-400 absolute right-3 top-3.5 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Action Row: Search CTA + Popular Searches */}
          <div className="mt-4 pt-3 border-t border-stone-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 flex-wrap text-xs text-stone-500">
              <span className="font-semibold text-stone-400">Popular:</span>
              {['Dubai Marina', 'Downtown Dubai', 'Palm Jumeirah', 'JVC'].map((area) => (
                <button
                  key={area}
                  type="button"
                  onClick={() => handleQuickArea(area)}
                  className="hover:text-emerald-900 hover:underline cursor-pointer"
                >
                  {area}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={handleSearch}
              className="w-full sm:w-auto px-6 py-2.5 bg-emerald-900 hover:bg-emerald-800 text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Search Properties</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
