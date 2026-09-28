import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Search,
  MapPin,
  Home,
  Bed,
  ChevronDown,
  Check,
  Building2,
  Building,
  Sparkles,
  KeyRound,
  Layers,
  Coins,
  Users,
  X,
} from 'lucide-react';
import { MOCK_AREAS } from '../../data/areas';

type DropdownKey = 'location' | 'type' | 'bedrooms' | 'price' | null;

export const HeroSection: React.FC = () => {
  const { navigateTo, setPropertyFilters, setRoomFilters } = useApp();

  const [activeTab, setActiveTab] = useState<'rent' | 'buy' | 'rooms'>('rent');
  const [selectedArea, setSelectedArea] = useState<string>('');
  const [propertyType, setPropertyType] = useState<string>('all');
  const [bedrooms, setBedrooms] = useState<string>('any');
  const [priceBudget, setPriceBudget] = useState<string>('any');

  // Active Dropdown Manager
  const [activeDropdown, setActiveDropdown] = useState<DropdownKey>(null);
  const [areaSearchQuery, setAreaSearchQuery] = useState('');

  const searchBoxRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click or ESC key
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchBoxRef.current && !searchBoxRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Filtered areas for location dropdown
  const filteredAreas = useMemo(() => {
    if (!areaSearchQuery.trim()) return MOCK_AREAS;
    const q = areaSearchQuery.toLowerCase();
    return MOCK_AREAS.filter(
      (a) => a.name.toLowerCase().includes(q) || a.description.toLowerCase().includes(q)
    );
  }, [areaSearchQuery]);

  const handleSearch = () => {
    setActiveDropdown(null);

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
    setActiveDropdown(null);
    const mappedPurpose = activeTab === 'buy' ? 'sale' : 'rent';
    if (activeTab === 'rooms') {
      setRoomFilters((prev) => ({ ...prev, community: areaName }));
      navigateTo('rooms', { community: areaName });
    } else {
      setPropertyFilters((prev) => ({ ...prev, purpose: mappedPurpose, community: areaName }));
      navigateTo(activeTab === 'buy' ? 'buy' : 'rent', { community: areaName });
    }
  };

  // Property type metadata
  const propertyTypeOptions = [
    { id: 'all', label: 'All Property Types', desc: 'Apartments, villas, townhouses', icon: Building2 },
    { id: 'apartment', label: 'Apartment', desc: 'Luxury residential flats', icon: Building },
    { id: 'villa', label: 'Villa', desc: 'Standalone private residences', icon: Home },
    { id: 'townhouse', label: 'Townhouse', desc: 'Multi-story family homes', icon: Building2 },
    { id: 'penthouse', label: 'Penthouse', desc: 'Exclusive high-floor luxury', icon: Sparkles },
    { id: 'studio', label: 'Studio', desc: 'Efficient open-plan units', icon: KeyRound },
    { id: 'duplex', label: 'Duplex', desc: 'Two-level architectural layouts', icon: Layers },
  ];

  const roomTypeOptions = [
    { id: 'all', label: 'All Room Types', desc: 'Master, private, shared living', icon: Building2 },
    { id: 'master', label: 'Master Room (Ensuite)', desc: 'Attached private bathroom', icon: Sparkles },
    { id: 'private', label: 'Private Room', desc: 'Single private bedroom', icon: KeyRound },
    { id: 'shared', label: 'Shared Room', desc: 'Shared roommate accommodation', icon: Users },
    { id: 'partition', label: 'Partition Room', desc: 'Budget-conscious partitioned space', icon: Layers },
    { id: 'studio', label: 'Private Studio Room', desc: 'Self-contained unit within villa', icon: Home },
  ];

  const currentTypeOptions = activeTab === 'rooms' ? roomTypeOptions : propertyTypeOptions;
  const selectedTypeItem = currentTypeOptions.find((t) => t.id === propertyType) || currentTypeOptions[0];

  // Bedrooms options
  const bedroomList = [
    { id: 'any', label: 'Any' },
    { id: 'studio', label: 'Studio' },
    { id: '1', label: '1 Bed' },
    { id: '2', label: '2 Beds' },
    { id: '3', label: '3 Beds' },
    { id: '4', label: '4 Beds' },
    { id: '5+', label: '5+ Beds' },
  ];

  const genderPreferenceList = [
    { id: 'any', label: 'Any Gender', desc: 'All roommate profiles welcome' },
    { id: 'female', label: 'Female Preferred', desc: 'Female tenants or flatmates only' },
    { id: 'male', label: 'Male Preferred', desc: 'Male tenants or flatmates only' },
  ];

  // Price Budget options
  const rentPrices = [
    { id: 'any', label: 'Any Budget' },
    { id: '75000', label: 'Up to AED 75,000 / yr', sub: '~AED 6,250 / mo' },
    { id: '120000', label: 'Up to AED 120,000 / yr', sub: '~AED 10,000 / mo' },
    { id: '180000', label: 'Up to AED 180,000 / yr', sub: '~AED 15,000 / mo' },
    { id: '250000', label: 'Up to AED 250,000 / yr', sub: '~AED 20,800 / mo' },
    { id: '400000', label: 'Up to AED 400,000 / yr', sub: '~AED 33,300 / mo (Luxury)' },
  ];

  const buyPrices = [
    { id: 'any', label: 'Any Budget' },
    { id: '1500000', label: 'Up to AED 1.5 Million', sub: 'Starter Investment' },
    { id: '3000000', label: 'Up to AED 3.0 Million', sub: 'Prime Waterfront' },
    { id: '5000000', label: 'Up to AED 5.0 Million', sub: 'Luxury Apartments & Villas' },
    { id: '10000000', label: 'Up to AED 10.0 Million', sub: 'Ultra-Prime Residences' },
    { id: '20000000', label: 'Up to AED 20M+', sub: 'Trophy Mansions & Penthouses' },
  ];

  const roomPrices = [
    { id: 'any', label: 'Any Budget' },
    { id: '2000', label: 'Up to AED 2,000 / mo', sub: 'Economy / Partition' },
    { id: '3500', label: 'Up to AED 3,500 / mo', sub: 'Private Room in Marina/JVC' },
    { id: '5000', label: 'Up to AED 5,000 / mo', sub: 'Master Room Ensuite' },
    { id: '7000', label: 'Up to AED 7,000 / mo', sub: 'Luxury Downtown Master Suite' },
  ];

  const currentPriceOptions =
    activeTab === 'rooms' ? roomPrices : activeTab === 'buy' ? buyPrices : rentPrices;

  const selectedPriceItem = currentPriceOptions.find((p) => p.id === priceBudget) || currentPriceOptions[0];

  return (
    <section className="relative bg-stone-900 min-h-[540px] sm:min-h-[600px] flex items-center justify-center overflow-visible">
      {/* 1. Single authentic high-resolution Dubai photograph with natural dark scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=2000&q=85"
          alt="Dubai Marina residential towers"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-stone-950/65" />
      </div>

      <div className="relative z-10 w-full max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 flex flex-col items-center text-center">
        {/* Editorial Typography */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-normal text-white tracking-[-0.03em] text-balance max-w-4xl leading-[1.05]">
          Find your place in Dubai.
        </h1>
        <p className="mt-4 text-base sm:text-lg text-stone-200/90 max-w-xl font-normal leading-relaxed">
          Apartments, villas, rooms and properties for rent or sale across Dubai.
        </p>

        {/* 3. The Search Engine: High-End Interactive Console */}
        <div
          ref={searchBoxRef}
          className="w-full max-w-4xl mt-8 bg-white rounded-2xl shadow-2xl border border-stone-200/90 p-4 sm:p-6 text-left relative"
        >
          {/* Functional Purpose Tabs */}
          <div className="flex items-center gap-1.5 mb-5 border-b border-stone-100 pb-3.5">
            <button
              type="button"
              onClick={() => {
                setActiveTab('rent');
                setPropertyType('all');
                setBedrooms('any');
                setPriceBudget('any');
                setActiveDropdown(null);
              }}
              className={`px-5 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                activeTab === 'rent'
                  ? 'bg-emerald-950 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-950 hover:bg-stone-100'
              }`}
            >
              Rent
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab('buy');
                setPropertyType('all');
                setBedrooms('any');
                setPriceBudget('any');
                setActiveDropdown(null);
              }}
              className={`px-5 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                activeTab === 'buy'
                  ? 'bg-emerald-950 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-950 hover:bg-stone-100'
              }`}
            >
              Buy
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab('rooms');
                setPropertyType('all');
                setBedrooms('any');
                setPriceBudget('any');
                setActiveDropdown(null);
              }}
              className={`px-5 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'rooms'
                  ? 'bg-emerald-950 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-950 hover:bg-stone-100'
              }`}
            >
              <span>Rooms</span>
              <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-emerald-800 text-white font-bold">
                Flatshare
              </span>
            </button>
          </div>

          {/* Form Controls Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 relative">
            {/* 1. Location Dropdown Button */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setActiveDropdown(activeDropdown === 'location' ? null : 'location');
                  setAreaSearchQuery('');
                }}
                className={`w-full h-[62px] px-3.5 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                  activeDropdown === 'location'
                    ? 'bg-white border-emerald-900 ring-2 ring-emerald-900/15 shadow-sm'
                    : 'bg-stone-50 hover:bg-stone-100/90 border-stone-200 hover:border-stone-300'
                }`}
                aria-expanded={activeDropdown === 'location'}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                      activeDropdown === 'location' ? 'bg-emerald-950 text-white' : 'bg-emerald-50 text-emerald-900'
                    }`}
                  >
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="truncate">
                    <span className="block text-[10px] font-bold text-stone-400 uppercase tracking-wider">
                      Location
                    </span>
                    <span className="block text-xs sm:text-sm font-semibold text-stone-900 truncate mt-0.5">
                      {selectedArea || 'All Dubai Areas'}
                    </span>
                  </div>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-stone-400 shrink-0 transition-transform duration-200 ml-1 ${
                    activeDropdown === 'location' ? 'rotate-180 text-emerald-950' : ''
                  }`}
                />
              </button>

              {/* Location Popover Menu */}
              {activeDropdown === 'location' && (
                <div className="absolute top-full left-0 mt-2 bg-white rounded-2xl shadow-2xl border border-stone-200 z-50 p-2.5 w-76 sm:w-80 animate-in fade-in zoom-in-95 duration-150">
                  {/* Search box inside location menu */}
                  <div className="relative mb-2">
                    <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder="Search community or landmark..."
                      value={areaSearchQuery}
                      onChange={(e) => setAreaSearchQuery(e.target.value)}
                      autoFocus
                      className="w-full h-9 pl-8 pr-3 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-900 text-stone-800 placeholder-stone-400"
                    />
                  </div>

                  <div className="max-h-60 overflow-y-auto space-y-1 pr-1">
                    {/* All Dubai Areas Option */}
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedArea('');
                        setActiveDropdown(null);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                        selectedArea === ''
                          ? 'bg-emerald-950 text-white'
                          : 'text-stone-700 hover:bg-stone-50'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>All Dubai Communities</span>
                      </div>
                      {selectedArea === '' && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                    </button>

                    <div className="pt-1.5 pb-1 px-2 text-[10px] font-bold text-stone-400 uppercase tracking-wider">
                      Popular Communities
                    </div>

                    {filteredAreas.map((area) => {
                      const isSelected = selectedArea === area.name;
                      return (
                        <button
                          key={area.id}
                          type="button"
                          onClick={() => {
                            setSelectedArea(area.name);
                            setActiveDropdown(null);
                          }}
                          className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium flex items-center justify-between transition-colors cursor-pointer ${
                            isSelected
                              ? 'bg-emerald-950 text-white font-semibold'
                              : 'text-stone-700 hover:bg-stone-50'
                          }`}
                        >
                          <div className="flex flex-col">
                            <span className={isSelected ? 'text-white' : 'text-stone-900'}>
                              {area.name}
                            </span>
                            <span
                              className={`text-[10px] ${
                                isSelected ? 'text-emerald-200' : 'text-stone-400'
                              }`}
                            >
                              {area.rentalCount + area.saleCount} properties available
                            </span>
                          </div>
                          {isSelected && <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
                        </button>
                      );
                    })}

                    {filteredAreas.length === 0 && (
                      <p className="text-center py-4 text-xs text-stone-400">
                        No communities found for "{areaSearchQuery}"
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* 2. Property / Room Type Dropdown Button */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setActiveDropdown(activeDropdown === 'type' ? null : 'type')}
                className={`w-full h-[62px] px-3.5 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                  activeDropdown === 'type'
                    ? 'bg-white border-emerald-900 ring-2 ring-emerald-900/15 shadow-sm'
                    : 'bg-stone-50 hover:bg-stone-100/90 border-stone-200 hover:border-stone-300'
                }`}
                aria-expanded={activeDropdown === 'type'}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                      activeDropdown === 'type' ? 'bg-emerald-950 text-white' : 'bg-emerald-50 text-emerald-900'
                    }`}
                  >
                    <Home className="w-4 h-4" />
                  </div>
                  <div className="truncate">
                    <span className="block text-[10px] font-bold text-stone-400 uppercase tracking-wider">
                      {activeTab === 'rooms' ? 'Room Type' : 'Property Type'}
                    </span>
                    <span className="block text-xs sm:text-sm font-semibold text-stone-900 truncate mt-0.5">
                      {selectedTypeItem.label}
                    </span>
                  </div>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-stone-400 shrink-0 transition-transform duration-200 ml-1 ${
                    activeDropdown === 'type' ? 'rotate-180 text-emerald-950' : ''
                  }`}
                />
              </button>

              {/* Property Type Popover Menu */}
              {activeDropdown === 'type' && (
                <div className="absolute top-full left-0 mt-2 bg-white rounded-2xl shadow-2xl border border-stone-200 z-50 p-2.5 w-76 sm:w-80 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-2 py-1 text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-1">
                    Select {activeTab === 'rooms' ? 'Room Classification' : 'Property Type'}
                  </div>

                  <div className="max-h-64 overflow-y-auto space-y-1">
                    {currentTypeOptions.map((opt) => {
                      const IconComponent = opt.icon;
                      const isSelected = propertyType === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => {
                            setPropertyType(opt.id);
                            setActiveDropdown(null);
                          }}
                          className={`w-full text-left p-2.5 rounded-xl text-xs flex items-center justify-between transition-colors cursor-pointer ${
                            isSelected
                              ? 'bg-emerald-950 text-white font-semibold'
                              : 'text-stone-700 hover:bg-stone-50'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <IconComponent
                              className={`w-4 h-4 shrink-0 ${
                                isSelected ? 'text-emerald-400' : 'text-emerald-900'
                              }`}
                            />
                            <div className="truncate">
                              <span className="block font-semibold truncate">{opt.label}</span>
                              <span
                                className={`text-[10px] block truncate ${
                                  isSelected ? 'text-stone-300' : 'text-stone-400'
                                }`}
                              >
                                {opt.desc}
                              </span>
                            </div>
                          </div>
                          {isSelected && <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 ml-2" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* 3. Bedrooms / Living Preference Dropdown Button */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setActiveDropdown(activeDropdown === 'bedrooms' ? null : 'bedrooms')}
                className={`w-full h-[62px] px-3.5 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                  activeDropdown === 'bedrooms'
                    ? 'bg-white border-emerald-900 ring-2 ring-emerald-900/15 shadow-sm'
                    : 'bg-stone-50 hover:bg-stone-100/90 border-stone-200 hover:border-stone-300'
                }`}
                aria-expanded={activeDropdown === 'bedrooms'}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                      activeDropdown === 'bedrooms' ? 'bg-emerald-950 text-white' : 'bg-emerald-50 text-emerald-900'
                    }`}
                  >
                    <Bed className="w-4 h-4" />
                  </div>
                  <div className="truncate">
                    <span className="block text-[10px] font-bold text-stone-400 uppercase tracking-wider">
                      {activeTab === 'rooms' ? 'Preference' : 'Bedrooms'}
                    </span>
                    <span className="block text-xs sm:text-sm font-semibold text-stone-900 truncate mt-0.5">
                      {activeTab === 'rooms'
                        ? genderPreferenceList.find((g) => g.id === bedrooms)?.label || 'Any Gender'
                        : bedrooms === 'any'
                        ? 'Any Bedrooms'
                        : bedrooms === 'studio'
                        ? 'Studio'
                        : `${bedrooms} Bedroom${bedrooms === '1' ? '' : 's'}`}
                    </span>
                  </div>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-stone-400 shrink-0 transition-transform duration-200 ml-1 ${
                    activeDropdown === 'bedrooms' ? 'rotate-180 text-emerald-950' : ''
                  }`}
                />
              </button>

              {/* Bedrooms Popover Menu */}
              {activeDropdown === 'bedrooms' && (
                <div className="absolute top-full left-0 mt-2 bg-white rounded-2xl shadow-2xl border border-stone-200 z-50 p-3.5 w-76 sm:w-80 animate-in fade-in zoom-in-95 duration-150">
                  {activeTab === 'rooms' ? (
                    <div>
                      <div className="text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-2">
                        Flatmate / Gender Preference
                      </div>
                      <div className="space-y-1.5">
                        {genderPreferenceList.map((g) => {
                          const isSelected = bedrooms === g.id;
                          return (
                            <button
                              key={g.id}
                              type="button"
                              onClick={() => {
                                setBedrooms(g.id);
                                setActiveDropdown(null);
                              }}
                              className={`w-full text-left p-2.5 rounded-xl text-xs flex items-center justify-between transition-colors cursor-pointer ${
                                isSelected
                                  ? 'bg-emerald-950 text-white font-semibold'
                                  : 'text-stone-700 hover:bg-stone-50'
                              }`}
                            >
                              <div>
                                <span className="block font-semibold">{g.label}</span>
                                <span
                                  className={`text-[10px] ${
                                    isSelected ? 'text-stone-300' : 'text-stone-400'
                                  }`}
                                >
                                  {g.desc}
                                </span>
                              </div>
                              {isSelected && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-center justify-between mb-2.5">
                        <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">
                          Select Bedrooms
                        </span>
                        {bedrooms !== 'any' && (
                          <button
                            type="button"
                            onClick={() => setBedrooms('any')}
                            className="text-[11px] text-emerald-900 font-semibold hover:underline cursor-pointer"
                          >
                            Reset
                          </button>
                        )}
                      </div>

                      {/* Visual Pill Grid for fast UX */}
                      <div className="grid grid-cols-3 gap-2">
                        {bedroomList.map((b) => {
                          const isSelected = bedrooms === b.id;
                          return (
                            <button
                              key={b.id}
                              type="button"
                              onClick={() => {
                                setBedrooms(b.id);
                                setActiveDropdown(null);
                              }}
                              className={`h-10 rounded-xl text-xs font-semibold transition-all cursor-pointer border ${
                                isSelected
                                  ? 'bg-emerald-950 text-white border-emerald-950 shadow-xs'
                                  : 'bg-stone-50 hover:bg-stone-100 text-stone-800 border-stone-200'
                              }`}
                            >
                              {b.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* 4. Price Budget Dropdown Button */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setActiveDropdown(activeDropdown === 'price' ? null : 'price')}
                className={`w-full h-[62px] px-3.5 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                  activeDropdown === 'price'
                    ? 'bg-white border-emerald-900 ring-2 ring-emerald-900/15 shadow-sm'
                    : 'bg-stone-50 hover:bg-stone-100/90 border-stone-200 hover:border-stone-300'
                }`}
                aria-expanded={activeDropdown === 'price'}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                      activeDropdown === 'price' ? 'bg-emerald-950 text-white' : 'bg-emerald-50 text-emerald-900'
                    }`}
                  >
                    <Coins className="w-4 h-4" />
                  </div>
                  <div className="truncate">
                    <span className="block text-[10px] font-bold text-stone-400 uppercase tracking-wider">
                      Price Budget (AED)
                    </span>
                    <span className="block text-xs sm:text-sm font-semibold text-stone-900 truncate mt-0.5">
                      {selectedPriceItem.label}
                    </span>
                  </div>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-stone-400 shrink-0 transition-transform duration-200 ml-1 ${
                    activeDropdown === 'price' ? 'rotate-180 text-emerald-950' : ''
                  }`}
                />
              </button>

              {/* Price Budget Popover Menu */}
              {activeDropdown === 'price' && (
                <div className="absolute top-full right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-stone-200 z-50 p-2.5 w-76 sm:w-80 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-2 py-1 text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-1">
                    Maximum Budget ({activeTab === 'rooms' ? 'AED / month' : activeTab === 'buy' ? 'AED Total' : 'AED / year'})
                  </div>

                  <div className="max-h-64 overflow-y-auto space-y-1">
                    {currentPriceOptions.map((p) => {
                      const isSelected = priceBudget === p.id;
                      return (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => {
                            setPriceBudget(p.id);
                            setActiveDropdown(null);
                          }}
                          className={`w-full text-left p-2.5 rounded-xl text-xs flex items-center justify-between transition-colors cursor-pointer ${
                            isSelected
                              ? 'bg-emerald-950 text-white font-semibold'
                              : 'text-stone-700 hover:bg-stone-50'
                          }`}
                        >
                          <div>
                            <span className="block font-semibold">{p.label}</span>
                            {'sub' in p && (
                              <span
                                className={`text-[10px] ${
                                  isSelected ? 'text-stone-300' : 'text-stone-400'
                                }`}
                              >
                                {p.sub}
                              </span>
                            )}
                          </div>
                          {isSelected && <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 ml-2" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action Row: Search CTA + Popular Searches */}
          <div className="mt-5 pt-4 border-t border-stone-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 flex-wrap text-xs text-stone-500">
              <span className="font-semibold text-stone-400">Popular:</span>
              {['Dubai Marina', 'Downtown Dubai', 'Palm Jumeirah', 'Business Bay', 'JVC'].map((area) => (
                <button
                  key={area}
                  type="button"
                  onClick={() => handleQuickArea(area)}
                  className="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-emerald-50 hover:text-emerald-950 text-stone-700 font-medium transition-colors cursor-pointer text-[11px]"
                >
                  {area}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={handleSearch}
              className="w-full sm:w-auto px-7 py-3 bg-emerald-950 hover:bg-emerald-900 text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg active:scale-98 cursor-pointer shrink-0"
            >
              <Search className="w-4 h-4 text-emerald-300" />
              <span>Search Residences</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
