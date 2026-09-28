import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Search,
  MapPin,
  Home,
  Bed,
  ChevronDown,
  Check,
  KeyRound,
  Building2,
  BedDouble,
  Sparkles,
  Coins,
  ArrowRight,
} from 'lucide-react';
import { MOCK_AREAS } from '../../data/areas';

export const HeroSearch: React.FC = () => {
  const { navigateTo, setPropertyFilters, setRoomFilters } = useApp();

  const [activeTab, setActiveTab] = useState<'rent' | 'buy' | 'rooms' | 'new-projects'>('rent');
  const [selectedArea, setSelectedArea] = useState<string>('');
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [propertyType, setPropertyType] = useState<string>('all');
  const [bedrooms, setBedrooms] = useState<string>('any');
  const [priceBudget, setPriceBudget] = useState<string>('any');

  const locationRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
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

    if (activeTab === 'new-projects') {
      navigateTo('new-projects');
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
    } else if (activeTab === 'new-projects') {
      navigateTo('new-projects');
    } else {
      setPropertyFilters((prev) => ({ ...prev, purpose: mappedPurpose, community: areaName }));
      navigateTo(activeTab === 'buy' ? 'buy' : 'rent', { community: areaName });
    }
  };

  return (
    <div className="w-full bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-stone-200/80 p-4 sm:p-6">
      {/* Luxury Search Tabs with Premium Icons */}
      <div className="flex items-center gap-1.5 p-1 bg-stone-100/90 rounded-xl max-w-fit mb-5 border border-stone-200/50">
        <button
          type="button"
          onClick={() => {
            setActiveTab('rent');
            setPriceBudget('any');
          }}
          className={`flex items-center gap-1.5 px-3.5 sm:px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
            activeTab === 'rent'
              ? 'bg-emerald-950 text-white shadow-xs'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <KeyRound className="w-3.5 h-3.5" />
          <span>Rent</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveTab('buy');
            setPriceBudget('any');
          }}
          className={`flex items-center gap-1.5 px-3.5 sm:px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
            activeTab === 'buy'
              ? 'bg-emerald-950 text-white shadow-xs'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <Building2 className="w-3.5 h-3.5" />
          <span>Buy</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveTab('rooms');
            setPriceBudget('any');
          }}
          className={`flex items-center gap-1.5 px-3.5 sm:px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
            activeTab === 'rooms'
              ? 'bg-emerald-950 text-white shadow-xs'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <BedDouble className="w-3.5 h-3.5" />
          <span>Rooms</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('new-projects')}
          className={`flex items-center gap-1.5 px-3.5 sm:px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
            activeTab === 'new-projects'
              ? 'bg-emerald-950 text-white shadow-xs'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>New Projects</span>
        </button>
      </div>

      {/* Main Search Inputs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* 1. Location Smart Dropdown */}
        <div className="relative" ref={locationRef}>
          <label className="block text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-1.5">
            Location
          </label>
          <button
            type="button"
            onClick={() => setIsLocationOpen(!isLocationOpen)}
            className="w-full h-12 px-3.5 bg-stone-50/80 border border-stone-200 rounded-xl text-left flex items-center justify-between hover:border-emerald-700/50 hover:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700/20 text-xs sm:text-sm cursor-pointer transition-all"
          >
            <div className="flex items-center gap-2 truncate">
              <MapPin className="w-4 h-4 text-emerald-800 shrink-0" />
              <span className={`truncate ${selectedArea ? 'text-stone-900 font-semibold' : 'text-stone-500'}`}>
                {selectedArea || 'All Dubai Areas'}
              </span>
            </div>
            <ChevronDown className="w-4 h-4 text-stone-400 shrink-0" />
          </button>

          {/* Location Picker Popup */}
          {isLocationOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-stone-200 z-50 p-2 max-h-72 overflow-y-auto w-72 sm:w-80">
              <div className="px-2 py-1.5 text-[10px] font-bold text-stone-400 uppercase tracking-wider">
                Select Community
              </div>
              <button
                type="button"
                onClick={() => {
                  setSelectedArea('');
                  setIsLocationOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium flex items-center justify-between hover:bg-stone-50 transition-colors ${
                  selectedArea === '' ? 'text-emerald-900 bg-emerald-50 font-semibold' : 'text-stone-700'
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
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium flex items-center justify-between hover:bg-stone-50 transition-colors ${
                    selectedArea === area.name ? 'text-emerald-900 bg-emerald-50 font-semibold' : 'text-stone-700'
                  }`}
                >
                  <div>
                    <div className="font-semibold text-stone-900">{area.name}</div>
                    <div className="text-[10px] text-stone-400">
                      {activeTab === 'rooms' ? `${area.roomCount} rooms` : `${area.rentalCount + area.saleCount} properties`}
                    </div>
                  </div>
                  {selectedArea === area.name && <Check className="w-3.5 h-3.5 text-emerald-800" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 2. Property Type */}
        <div>
          <label className="block text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-1.5">
            {activeTab === 'rooms' ? 'Room Category' : 'Property Type'}
          </label>
          <div className="relative">
            <select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="w-full h-12 pl-9 pr-8 bg-stone-50/80 border border-stone-200 rounded-xl text-xs font-semibold text-stone-800 appearance-none hover:border-emerald-700/50 hover:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700/20 cursor-pointer transition-all"
            >
              {activeTab === 'rooms' ? (
                <>
                  <option value="all">All Room Types</option>
                  <option value="master">Master Bedroom (Ensuite)</option>
                  <option value="private">Private Bedroom</option>
                  <option value="shared">Shared Room</option>
                  <option value="partition">Partition</option>
                  <option value="studio">Private Studio</option>
                </>
              ) : (
                <>
                  <option value="all">All Property Types</option>
                  <option value="apartment">Apartment</option>
                  <option value="villa">Luxury Villa</option>
                  <option value="townhouse">Townhouse</option>
                  <option value="penthouse">Penthouse</option>
                  <option value="studio">Studio</option>
                  <option value="duplex">Duplex</option>
                </>
              )}
            </select>
            <Home className="w-4 h-4 text-emerald-800 absolute left-3 top-4 pointer-events-none" />
            <ChevronDown className="w-4 h-4 text-stone-400 absolute right-3 top-4 pointer-events-none" />
          </div>
        </div>

        {/* 3. Bedrooms / Gender */}
        <div>
          <label className="block text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-1.5">
            {activeTab === 'rooms' ? 'Tenant Preference' : 'Bedrooms'}
          </label>
          <div className="relative">
            {activeTab === 'rooms' ? (
              <select
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
                className="w-full h-12 pl-9 pr-8 bg-stone-50/80 border border-stone-200 rounded-xl text-xs font-semibold text-stone-800 appearance-none hover:border-emerald-700/50 hover:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700/20 cursor-pointer transition-all"
              >
                <option value="any">Any Gender</option>
                <option value="female">Female Preferred</option>
                <option value="male">Male Preferred</option>
                <option value="couples">Couples Welcome</option>
              </select>
            ) : (
              <select
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
                className="w-full h-12 pl-9 pr-8 bg-stone-50/80 border border-stone-200 rounded-xl text-xs font-semibold text-stone-800 appearance-none hover:border-emerald-700/50 hover:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700/20 cursor-pointer transition-all"
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
            <Bed className="w-4 h-4 text-emerald-800 absolute left-3 top-4 pointer-events-none" />
            <ChevronDown className="w-4 h-4 text-stone-400 absolute right-3 top-4 pointer-events-none" />
          </div>
        </div>

        {/* 4. Price Budget */}
        <div>
          <label className="block text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-1.5">
            Max Budget
          </label>
          <div className="relative">
            <select
              value={priceBudget}
              onChange={(e) => setPriceBudget(e.target.value)}
              className="w-full h-12 pl-9 pr-8 bg-stone-50/80 border border-stone-200 rounded-xl text-xs font-semibold text-stone-800 appearance-none hover:border-emerald-700/50 hover:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700/20 cursor-pointer transition-all"
            >
              <option value="any">Any Budget</option>
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
            <Coins className="w-4 h-4 text-emerald-800 absolute left-3 top-4 pointer-events-none" />
            <ChevronDown className="w-4 h-4 text-stone-400 absolute right-3 top-4 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* CTA Button & Quick Community Chips Row */}
      <div className="mt-5 pt-4 border-t border-stone-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        {/* Quick tags */}
        <div className="flex items-center gap-1.5 flex-wrap text-xs">
          <span className="text-stone-400 font-medium mr-1">Trending:</span>
          {['Palm Jumeirah', 'Dubai Marina', 'Downtown Dubai', 'Dubai Hills'].map((area) => (
            <button
              key={area}
              type="button"
              onClick={() => handleQuickArea(area)}
              className="px-2.5 py-1 bg-stone-100 hover:bg-emerald-50 hover:text-emerald-950 text-stone-600 rounded-lg text-[11px] font-medium transition-colors cursor-pointer"
            >
              {area}
            </button>
          ))}
        </div>

        {/* Search CTA */}
        <button
          type="button"
          onClick={handleSearch}
          className="w-full md:w-auto px-8 py-3.5 bg-emerald-950 hover:bg-emerald-900 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all cursor-pointer"
        >
          <Search className="w-4 h-4 text-emerald-400" />
          <span>
            {activeTab === 'rooms'
              ? 'Search Available Rooms'
              : activeTab === 'new-projects'
              ? 'Explore Off-Plan Projects'
              : 'Search Properties'}
          </span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
