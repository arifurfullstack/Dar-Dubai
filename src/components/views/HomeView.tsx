import React from 'react';
import { useApp } from '../../context/AppContext';
import { HeroSection } from '../layout/HeroSection';
import { PropertyCard } from '../property/PropertyCard';
import { RoomCard } from '../property/RoomCard';
import { ImageWithFallback } from '../ui/ImageWithFallback';
import { MOCK_AREAS } from '../../data/areas';
import { MOCK_AGENTS } from '../../data/agents';
import { MOCK_PROJECTS } from '../../data/projects';
import { formatCompactPrice } from '../../utils/helpers';
import {
  Building2,
  Home,
  BedDouble,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  PhoneCall,
  KeyRound,
  FileCheck,
  BadgeCheck,
} from 'lucide-react';

export const HomeView: React.FC = () => {
  const { properties, rooms, navigateTo, setPropertyFilters } = useApp();

  const featuredProperties = properties.filter((p) => p.featured).slice(0, 4);
  const rentProperties = properties.filter((p) => p.purpose === 'rent').slice(0, 4);
  const saleProperties = properties.filter((p) => p.purpose === 'sale').slice(0, 4);
  const featuredRooms = rooms.slice(0, 4);

  const categories = [
    {
      title: 'Apartments',
      count: '1,420 listings',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=85',
      action: () => {
        setPropertyFilters({ propertyType: 'apartment' });
        navigateTo('rent', { type: 'apartment' });
      },
    },
    {
      title: 'Luxury Villas',
      count: '480 listings',
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=85',
      action: () => {
        setPropertyFilters({ propertyType: 'villa' });
        navigateTo('buy', { type: 'villa' });
      },
    },
    {
      title: 'Townhouses',
      count: '310 listings',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=85',
      action: () => {
        setPropertyFilters({ propertyType: 'townhouse' });
        navigateTo('buy', { type: 'townhouse' });
      },
    },
    {
      title: 'Rooms for Rent',
      count: '640 rooms',
      image: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=85',
      action: () => navigateTo('rooms'),
    },
    {
      title: 'Penthouses',
      count: '95 residences',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=85',
      action: () => {
        setPropertyFilters({ propertyType: 'penthouse' });
        navigateTo('buy', { type: 'penthouse' });
      },
    },
    {
      title: 'Studio Apartments',
      count: '510 listings',
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=85',
      action: () => {
        setPropertyFilters({ bedrooms: 'studio' });
        navigateTo('rent', { beds: 'studio' });
      },
    },
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Popular Property Categories */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl sm:text-4xl font-medium text-stone-900 font-serif tracking-tight">
              Explore Property Types
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              Curated architectural styles and accommodation types across Dubai
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <button
              key={cat.title}
              onClick={cat.action}
              className="group relative rounded-xl overflow-hidden aspect-[4/5] bg-stone-100 text-left border border-stone-200/80 hover:border-stone-300 transition-all cursor-pointer"
            >
              <ImageWithFallback
                src={cat.image}
                alt={cat.title}
                aspectRatioClass="aspect-[4/5]"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <h3 className="text-sm font-bold tracking-tight">{cat.title}</h3>
                <p className="text-[11px] text-stone-300 font-medium">{cat.count}</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* 3. Featured Properties Showcase */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="text-xs font-semibold text-emerald-800 uppercase tracking-wider mb-1">
              Handpicked Residences
            </div>
            <h2 className="text-3xl sm:text-4xl font-medium text-stone-900 font-serif tracking-tight">
              Featured Dubai Properties
            </h2>
          </div>
          <button
            onClick={() => navigateTo('rent')}
            className="text-xs font-semibold text-emerald-950 hover:text-emerald-800 flex items-center gap-1.5 cursor-pointer"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProperties.map((prop) => (
            <PropertyCard key={prop.id} property={prop} />
          ))}
        </div>
      </section>

      {/* 4. Properties for Rent */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="text-xs font-semibold text-emerald-800 uppercase tracking-wider mb-1">
              Annual & Monthly Leases
            </div>
            <h2 className="text-3xl sm:text-4xl font-medium text-stone-900 font-serif tracking-tight">
              Properties for Rent in Dubai
            </h2>
          </div>
          <button
            onClick={() => navigateTo('rent')}
            className="text-xs font-semibold text-emerald-950 hover:text-emerald-800 flex items-center gap-1.5 cursor-pointer"
          >
            <span>Browse Rentals</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {rentProperties.map((prop) => (
            <PropertyCard key={prop.id} property={prop} />
          ))}
        </div>
      </section>

      {/* 5. Find a Room Section (Dedicated Marketplace Feature) */}
      <section className="bg-stone-100 py-16 border-y border-stone-200">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 uppercase tracking-wider mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Executive Rooms & Shared Living</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-medium text-stone-900 font-serif tracking-tight">
                Find a Room in Dubai
              </h2>
              <p className="text-xs sm:text-sm text-stone-500 mt-1 max-w-xl">
                Private master rooms, executive suites, and shared apartments with all utility bills and high-speed Wi-Fi included.
              </p>
            </div>
            <button
              onClick={() => navigateTo('rooms')}
              className="px-5 py-2.5 bg-emerald-900 text-white rounded-xl text-xs font-semibold hover:bg-emerald-800 transition-colors shadow-xs cursor-pointer flex items-center gap-1.5 whitespace-nowrap"
            >
              <span>Explore All Rooms</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredRooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        </div>
      </section>

      {/* 6. Properties for Sale */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="text-xs font-semibold text-emerald-800 uppercase tracking-wider mb-1">
              Freehold Ownership
            </div>
            <h2 className="text-3xl sm:text-4xl font-medium text-stone-900 font-serif tracking-tight">
              Properties for Sale
            </h2>
          </div>
          <button
            onClick={() => navigateTo('buy')}
            className="text-xs font-semibold text-emerald-950 hover:text-emerald-800 flex items-center gap-1.5 cursor-pointer"
          >
            <span>Browse Sales</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {saleProperties.map((prop) => (
            <PropertyCard key={prop.id} property={prop} />
          ))}
        </div>
      </section>

      {/* 7. Popular Dubai Communities / Areas */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="text-xs font-semibold text-emerald-800 uppercase tracking-wider mb-1">
              Neighbourhood Guides
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 font-serif tracking-tight">
              Popular Dubai Communities
            </h2>
          </div>
          <button
            onClick={() => navigateTo('areas')}
            className="text-xs font-semibold text-emerald-950 hover:text-emerald-800 flex items-center gap-1.5 cursor-pointer"
          >
            <span>All Communities</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {MOCK_AREAS.slice(0, 4).map((area) => (
            <div
              key={area.id}
              onClick={() => navigateTo('area-detail', { slug: area.slug })}
              className="group bg-white rounded-xl border border-stone-200 overflow-hidden hover:shadow-md transition-all cursor-pointer"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
                <ImageWithFallback
                  src={area.image}
                  alt={area.name}
                  fallbackCategory="area"
                  aspectRatioClass="aspect-[16/10]"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-3 left-3 text-white">
                  <h3 className="text-lg font-bold font-serif">{area.name}</h3>
                  <div className="text-[11px] text-stone-300">
                    {area.rentalCount} for rent · {area.saleCount} for sale
                  </div>
                </div>
              </div>
              <div className="p-4 space-y-2">
                <div className="flex items-center justify-between text-xs text-stone-600">
                  <span>Avg. Rent</span>
                  <span className="font-semibold text-stone-900">{area.avgRentPrice}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-stone-600">
                  <span>Avg. Sale</span>
                  <span className="font-semibold text-stone-900">{area.avgSalePrice}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. New Projects Highlight */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-stone-900 rounded-2xl p-6 sm:p-10 text-white border border-stone-800">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1">
                Direct Developer Allocations
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-serif">
                Off-Plan New Projects
              </h2>
              <p className="text-xs sm:text-sm text-stone-400 mt-1 max-w-md">
                Emaar, Nakheel, Sobha and DAMAC developments with attractive 80/20 and post-handover payment plans.
              </p>
            </div>
            <button
              onClick={() => navigateTo('new-projects')}
              className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
            >
              Explore Off-Plan
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {MOCK_PROJECTS.slice(0, 3).map((proj) => (
              <div
                key={proj.id}
                onClick={() => navigateTo('new-projects')}
                className="group bg-stone-800/80 rounded-xl overflow-hidden border border-stone-700 hover:border-emerald-500/50 transition-all cursor-pointer flex flex-col justify-between"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-stone-900">
                  <ImageWithFallback
                    src={proj.image}
                    alt={proj.name}
                    fallbackCategory="project"
                    aspectRatioClass="aspect-[16/10]"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/60 backdrop-blur-xs rounded text-[10px] text-stone-300 font-medium">
                    Handover: {proj.handover}
                  </div>
                </div>
                <div className="p-4 space-y-2">
                  <div className="text-[11px] text-emerald-400 font-semibold">{proj.developer}</div>
                  <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
                    {proj.name}
                  </h3>
                  <p className="text-xs text-stone-400 line-clamp-1">{proj.location}</p>
                  <div className="pt-2 border-t border-stone-700 flex items-center justify-between text-xs">
                    <span className="text-stone-400">Starting from</span>
                    <span className="font-bold text-white tabular-nums">
                      {formatCompactPrice(proj.startingPrice)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Why Use Dar Dubai (Trust & Assurance) */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="text-xs font-semibold text-emerald-800 uppercase tracking-wider mb-1">
            Built for Transparency
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 font-serif">
            Why Rent & Buy with Dar Dubai
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="p-6 bg-white rounded-xl border border-stone-200 space-y-3">
            <div className="w-10 h-10 bg-emerald-50 text-emerald-800 rounded-lg flex items-center justify-center">
              <BadgeCheck className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-stone-900">100% RERA Verified</h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              Every listing is cross-referenced with title deeds and official Dubai Land Department permits to eliminate fake or duplicate ads.
            </p>
          </div>

          <div className="p-6 bg-white rounded-xl border border-stone-200 space-y-3">
            <div className="w-10 h-10 bg-emerald-50 text-emerald-800 rounded-lg flex items-center justify-center">
              <PhoneCall className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-stone-900">Direct WhatsApp Connect</h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              Skip endless phone tags. Contact verified licensed brokers directly on WhatsApp with 1-click viewing booking.
            </p>
          </div>

          <div className="p-6 bg-white rounded-xl border border-stone-200 space-y-3">
            <div className="w-10 h-10 bg-emerald-50 text-emerald-800 rounded-lg flex items-center justify-center">
              <KeyRound className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-stone-900">Verified Roommates</h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              Our rooms marketplace clearly specifies house rules, current occupants, gender preferences, and bills inclusion upfront.
            </p>
          </div>

          <div className="p-6 bg-white rounded-xl border border-stone-200 space-y-3">
            <div className="w-10 h-10 bg-emerald-50 text-emerald-800 rounded-lg flex items-center justify-center">
              <FileCheck className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-stone-900">Zero Commission Off-Plan</h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              Pay 0% agency fees on direct new developer purchases with Golden Visa assistance on qualifying investments.
            </p>
          </div>
        </div>
      </section>

      {/* 10. Featured Verified Agents */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="text-xs font-semibold text-emerald-800 uppercase tracking-wider mb-1">
              Licensed Property Consultants
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 font-serif tracking-tight">
              Featured Dubai Agents
            </h2>
          </div>
          <button
            onClick={() => navigateTo('agents')}
            className="text-xs font-semibold text-emerald-950 hover:text-emerald-800 flex items-center gap-1.5 cursor-pointer"
          >
            <span>All Agents</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {MOCK_AGENTS.slice(0, 4).map((agent) => (
            <div
              key={agent.id}
              onClick={() => navigateTo('agent-detail', { slug: agent.slug })}
              className="group bg-white rounded-xl border border-stone-200 p-5 hover:border-stone-300 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
            >
              <div className="flex items-center gap-3">
                <img
                  src={agent.image}
                  alt={agent.name}
                  className="w-14 h-14 rounded-full object-cover border border-stone-200"
                />
                <div>
                  <div className="flex items-center gap-1">
                    <h3 className="text-sm font-bold text-stone-900 group-hover:text-emerald-900 transition-colors">
                      {agent.name}
                    </h3>
                    {agent.verified && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />}
                  </div>
                  <p className="text-[11px] text-stone-500 line-clamp-1">{agent.agency}</p>
                  <p className="text-[10px] text-emerald-800 font-semibold mt-0.5">
                    {agent.experienceYears} Years Experience
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-600">
                <span>{agent.activeSaleCount + agent.activeRentCount} Active Listings</span>
                <span className="font-semibold text-emerald-900">View Profile →</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 11. List Your Property CTA Banner */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-emerald-950 text-white rounded-2xl p-8 sm:p-12 relative overflow-hidden">
          <div className="relative z-10 max-w-xl space-y-4">
            <span className="text-xs font-semibold text-emerald-300 uppercase tracking-wider">
              For Landlords & Property Owners
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif leading-tight">
              List your Dubai property or room with Dar Dubai.
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              Reach thousands of qualified local tenants, expats, and international buyers every day with verified listings and zero hassle.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={() => navigateTo('list-property')}
                className="px-6 py-3 bg-white text-emerald-950 font-semibold rounded-xl text-xs hover:bg-stone-100 transition-colors shadow-xs cursor-pointer"
              >
                List Your Property Free
              </button>
              <button
                onClick={() => navigateTo('agents')}
                className="px-5 py-3 border border-emerald-700/60 text-emerald-100 rounded-xl text-xs font-medium hover:bg-emerald-900/50 transition-colors cursor-pointer"
              >
                Connect with an Agent
              </button>
            </div>
          </div>

          {/* Decorative subtle architectural outline */}
          <div className="absolute right-0 bottom-0 top-0 w-1/2 opacity-10 pointer-events-none hidden md:block">
            <Building2 className="w-full h-full text-white" />
          </div>
        </div>
      </section>
    </div>
  );
};
