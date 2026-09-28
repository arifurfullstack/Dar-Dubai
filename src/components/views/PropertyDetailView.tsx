import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { MOCK_AGENTS } from '../../data/agents';
import { PropertyCard } from '../property/PropertyCard';
import { ImageWithFallback } from '../ui/ImageWithFallback';
import { formatPrice, formatBedrooms, formatBathrooms, formatArea, copyToClipboard } from '../../utils/helpers';
import {
  Bookmark,
  Share2,
  CheckCircle2,
  Phone,
  MessageSquare,
  Mail,
  Calendar,
  MapPin,
  Building,
  ShieldCheck,
  ChevronRight,
  Maximize2,
  X,
  Compass,
  Check,
  Train,
  ShoppingBag,
  Waves,
  Plane,
} from 'lucide-react';

interface PropertyDetailViewProps {
  slug: string;
}

export const PropertyDetailView: React.FC<PropertyDetailViewProps> = ({ slug }) => {
  const { properties, navigateTo, isSaved, toggleSave, openViewingModal, trackRecentlyViewed, showToast } = useApp();

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const [descriptionExpanded, setDescriptionExpanded] = useState(false);

  // Find target property
  const property = properties.find((p) => p.slug === slug) || properties[0];
  const agent = MOCK_AGENTS.find((a) => a.id === property.agentId) || MOCK_AGENTS[0];
  const saved = isSaved(property.id);

  // Track recently viewed
  useEffect(() => {
    if (property) {
      trackRecentlyViewed(property.id);
    }
  }, [property.id]);

  const similarProperties = properties
    .filter((p) => p.id !== property.id && (p.location.community === property.location.community || p.purpose === property.purpose))
    .slice(0, 3);

  const handleShare = () => {
    copyToClipboard(window.location.href);
    showToast('Property link copied to clipboard!', 'info');
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(`Hi ${agent.name}, I am inquiring about: ${property.title} (Ref: ${property.reference}) on Dar Dubai.`);
    window.open(`https://wa.me/${agent.whatsapp.replace(/[^0-9]/g, '')}?text=${text}`, '_blank');
  };

  const handleCall = () => {
    window.open(`tel:${agent.phone.replace(/[^0-9+]/g, '')}`, '_self');
  };

  const handleEmail = () => {
    window.open(`mailto:${agent.email}?subject=Inquiry: ${encodeURIComponent(property.title)}&body=Ref: ${property.reference}`, '_self');
  };

  const priceSuffix = property.purpose === 'rent' ? ` / ${property.rentFrequency === 'monthly' ? 'month' : 'year'}` : '';

  return (
    <div className="min-h-screen bg-stone-50 pb-24">
      {/* 1. Breadcrumbs & Top Bar */}
      <div className="bg-white border-b border-stone-200 py-3">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs text-stone-500">
          <nav className="flex items-center gap-1.5 flex-wrap">
            <button onClick={() => navigateTo('home')} className="hover:text-stone-900 cursor-pointer">
              Home
            </button>
            <ChevronRight className="w-3 h-3 text-stone-300" />
            <button onClick={() => navigateTo(property.purpose === 'rent' ? 'rent' : 'buy')} className="hover:text-stone-900 capitalize cursor-pointer">
              {property.purpose === 'rent' ? 'For Rent' : 'For Sale'}
            </button>
            <ChevronRight className="w-3 h-3 text-stone-300" />
            <button
              onClick={() => navigateTo('area-detail', { slug: property.location.community.toLowerCase().replace(/\s+/g, '-') })}
              className="hover:text-stone-900 cursor-pointer"
            >
              {property.location.community}
            </button>
            <ChevronRight className="w-3 h-3 text-stone-300 hidden sm:inline" />
            <span className="text-stone-800 font-medium truncate max-w-xs hidden sm:inline">
              {property.title}
            </span>
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleSave(property.id, property.title)}
              className={`p-1.5 rounded-lg border flex items-center gap-1.5 text-xs font-medium transition-colors cursor-pointer ${
                saved ? 'bg-emerald-50 text-emerald-900 border-emerald-300' : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${saved ? 'fill-emerald-800 text-emerald-800' : ''}`} />
              <span className="hidden sm:inline">{saved ? 'Saved' : 'Save'}</span>
            </button>

            <button
              onClick={handleShare}
              className="p-1.5 rounded-lg border border-stone-200 bg-white hover:bg-stone-50 text-stone-700 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Share</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Photo Gallery (Editorial 3-frame layout on desktop, swipeable on mobile) */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="relative rounded-2xl overflow-hidden shadow-sm border border-stone-200/80 bg-stone-900">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2 h-[340px] sm:h-[460px]">
            {/* Primary Large Image */}
            <div
              onClick={() => {
                setActivePhotoIdx(0);
                setLightboxOpen(true);
              }}
              className="md:col-span-3 relative h-full cursor-pointer group overflow-hidden bg-stone-800"
            >
              <ImageWithFallback
                src={property.images[0]}
                alt={property.title}
                aspectRatioClass="h-full w-full"
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
            </div>

            {/* Right Thumbnails Column */}
            <div className="hidden md:flex flex-col gap-2 h-full">
              {property.images.slice(1, 3).map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setActivePhotoIdx(idx + 1);
                    setLightboxOpen(true);
                  }}
                  className="relative flex-1 cursor-pointer group overflow-hidden bg-stone-800"
                >
                  <ImageWithFallback
                    src={img}
                    alt={`${property.title} ${idx + 2}`}
                    aspectRatioClass="h-full w-full"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                </div>
              ))}
            </div>
          </div>

          {/* View All Photos Button */}
          <button
            onClick={() => setLightboxOpen(true)}
            className="absolute bottom-4 right-4 px-4 py-2 bg-white/90 hover:bg-white text-stone-900 rounded-xl text-xs font-semibold shadow-md backdrop-blur-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>View all {property.images.length} photos</span>
          </button>
        </div>
      </div>

      {/* 3. Main Content + Sticky Agent Card Rail */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          {/* Left 2 Columns: Property Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header info */}
            <div className="bg-white p-6 rounded-2xl border border-stone-200 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-extrabold text-stone-900 font-serif tabular-nums tracking-tight">
                    {formatPrice(property.price, property.currency)}
                  </span>
                  {priceSuffix && (
                    <span className="text-sm font-medium text-stone-500">{priceSuffix}</span>
                  )}
                </div>

                <div className="flex items-center gap-2 text-xs">
                  {property.verified && (
                    <span className="inline-flex items-center gap-1 text-emerald-800 font-semibold bg-emerald-50 px-2.5 py-1 rounded">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      RERA Verified
                    </span>
                  )}
                  <span className="text-stone-400">Ref: {property.reference}</span>
                </div>
              </div>

              <h1 className="text-xl sm:text-2xl font-bold text-stone-900">
                {property.title}
              </h1>

              <div className="flex items-center gap-2 text-xs text-stone-600">
                <MapPin className="w-4 h-4 text-emerald-800 shrink-0" />
                <span>
                  {property.location.building ? `${property.location.building}, ` : ''}
                  {property.location.community}, Dubai, UAE
                </span>
              </div>

              {/* Overview Specs Row (Zero-Pill discipline) */}
              <div className="pt-4 border-t border-stone-100 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                <div className="p-3 bg-stone-50 rounded-xl">
                  <div className="text-[11px] text-stone-400 uppercase font-semibold">Bedrooms</div>
                  <div className="text-sm font-bold text-stone-900 mt-0.5">
                    {formatBedrooms(property.bedrooms)}
                  </div>
                </div>
                <div className="p-3 bg-stone-50 rounded-xl">
                  <div className="text-[11px] text-stone-400 uppercase font-semibold">Bathrooms</div>
                  <div className="text-sm font-bold text-stone-900 mt-0.5">
                    {formatBathrooms(property.bathrooms)}
                  </div>
                </div>
                <div className="p-3 bg-stone-50 rounded-xl">
                  <div className="text-[11px] text-stone-400 uppercase font-semibold">Built-Up Area</div>
                  <div className="text-sm font-bold text-stone-900 mt-0.5 tabular-nums">
                    {formatArea(property.areaSqFt)}
                  </div>
                </div>
                <div className="p-3 bg-stone-50 rounded-xl">
                  <div className="text-[11px] text-stone-400 uppercase font-semibold">Furnishing</div>
                  <div className="text-sm font-bold text-stone-900 mt-0.5 capitalize">
                    {property.furnished}
                  </div>
                </div>
              </div>
            </div>

            {/* Key-Value Property Overview Table */}
            <div className="bg-white p-6 rounded-2xl border border-stone-200 space-y-4">
              <h2 className="text-base font-bold text-stone-900 font-serif">Property Overview</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-8 text-xs">
                <div className="flex justify-between py-2 border-b border-stone-100">
                  <span className="text-stone-500">Property Type</span>
                  <span className="font-semibold text-stone-900 capitalize">{property.propertyType}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-stone-100">
                  <span className="text-stone-500">Purpose</span>
                  <span className="font-semibold text-stone-900 capitalize">{property.purpose}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-stone-100">
                  <span className="text-stone-500">Community</span>
                  <span className="font-semibold text-stone-900">{property.location.community}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-stone-100">
                  <span className="text-stone-500">Building</span>
                  <span className="font-semibold text-stone-900">{property.location.building || 'Private Development'}</span>
                </div>
                {property.floor && (
                  <div className="flex justify-between py-2 border-b border-stone-100">
                    <span className="text-stone-500">Floor Level</span>
                    <span className="font-semibold text-stone-900">Floor {property.floor}</span>
                  </div>
                )}
                {property.cheques && (
                  <div className="flex justify-between py-2 border-b border-stone-100">
                    <span className="text-stone-500">Cheques Accepted</span>
                    <span className="font-semibold text-stone-900">{property.cheques} Cheques</span>
                  </div>
                )}
                {property.deposit && (
                  <div className="flex justify-between py-2 border-b border-stone-100">
                    <span className="text-stone-500">Security Deposit</span>
                    <span className="font-semibold text-stone-900 tabular-nums">AED {property.deposit.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between py-2 border-b border-stone-100">
                  <span className="text-stone-500">RERA Permit ID</span>
                  <span className="font-semibold text-stone-900">{property.reference}</span>
                </div>
              </div>
            </div>

            {/* Description (Expandable) */}
            <div className="bg-white p-6 rounded-2xl border border-stone-200 space-y-4">
              <h2 className="text-base font-bold text-stone-900 font-serif">Description</h2>
              <div className="text-xs sm:text-sm text-stone-600 leading-relaxed space-y-3">
                <p className={descriptionExpanded ? '' : 'line-clamp-4'}>
                  {property.description}
                </p>
                {descriptionExpanded && (
                  <div className="space-y-2 pt-2 border-t border-stone-100 text-xs text-stone-500">
                    <p>• Premium high-spec finishes with floor-to-ceiling double-glazed solar control windows.</p>
                    <p>• Covered dedicated parking with 24-hour concierge and security card access.</p>
                    <p>• Direct connectivity to arterial transit hubs, metro stations, and signature Dubai landmarks.</p>
                  </div>
                )}
              </div>
              <button
                onClick={() => setDescriptionExpanded(!descriptionExpanded)}
                className="text-xs font-bold text-emerald-900 hover:text-emerald-800 transition-colors cursor-pointer"
              >
                {descriptionExpanded ? 'Read Less ↑' : 'Read More ↓'}
              </button>
            </div>

            {/* Amenities Grid */}
            <div className="bg-white p-6 rounded-2xl border border-stone-200 space-y-4">
              <h2 className="text-base font-bold text-stone-900 font-serif">Features & Amenities</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {property.amenities.map((amenity) => (
                  <div key={amenity} className="flex items-center gap-2 p-2.5 bg-stone-50 rounded-xl text-xs text-stone-800">
                    <Check className="w-4 h-4 text-emerald-800 shrink-0" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Nearby Highlights & Commute Times */}
            <div className="bg-white p-6 rounded-2xl border border-stone-200 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-stone-900 font-serif">Location & Nearby Places</h2>
                <span className="text-[11px] text-stone-400">Approximate commute times</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3 bg-stone-50 rounded-xl space-y-1">
                  <div className="flex items-center gap-1.5 text-stone-500">
                    <Train className="w-3.5 h-3.5 text-emerald-800" />
                    <span>Dubai Metro</span>
                  </div>
                  <div className="text-sm font-bold text-stone-900">4 mins</div>
                </div>

                <div className="p-3 bg-stone-50 rounded-xl space-y-1">
                  <div className="flex items-center gap-1.5 text-stone-500">
                    <ShoppingBag className="w-3.5 h-3.5 text-emerald-800" />
                    <span>Shopping Mall</span>
                  </div>
                  <div className="text-sm font-bold text-stone-900">6 mins</div>
                </div>

                <div className="p-3 bg-stone-50 rounded-xl space-y-1">
                  <div className="flex items-center gap-1.5 text-stone-500">
                    <Waves className="w-3.5 h-3.5 text-emerald-800" />
                    <span>Open Beach</span>
                  </div>
                  <div className="text-sm font-bold text-stone-900">8 mins</div>
                </div>

                <div className="p-3 bg-stone-50 rounded-xl space-y-1">
                  <div className="flex items-center gap-1.5 text-stone-500">
                    <Plane className="w-3.5 h-3.5 text-emerald-800" />
                    <span>DXB Airport</span>
                  </div>
                  <div className="text-sm font-bold text-stone-900">22 mins</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Rail: Sticky Agent Contact Card (Desktop) */}
          <div className="lg:col-span-1 sticky top-22 space-y-4">
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-5">
              <div className="flex items-center gap-3">
                <img
                  src={agent.image}
                  alt={agent.name}
                  className="w-16 h-16 rounded-full object-cover border border-stone-200"
                />
                <div>
                  <div className="flex items-center gap-1">
                    <h3 className="text-sm font-bold text-stone-900">{agent.name}</h3>
                    {agent.verified && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-800" />}
                  </div>
                  <p className="text-xs text-stone-500">{agent.agency}</p>
                  <p className="text-[11px] text-stone-400 mt-0.5">Languages: {agent.languages.join(', ')}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-1">
                <button
                  onClick={() => openViewingModal(property)}
                  className="w-full py-3 bg-emerald-900 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Request Viewing</span>
                </button>

                <button
                  onClick={handleWhatsApp}
                  className="w-full py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-700" />
                  <span>Chat on WhatsApp</span>
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={handleCall}
                    className="py-2.5 bg-stone-50 hover:bg-stone-100 border border-stone-200 text-stone-800 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Phone className="w-3.5 h-3.5 text-stone-500" />
                    <span>Call Agent</span>
                  </button>

                  <button
                    onClick={handleEmail}
                    className="py-2.5 bg-stone-50 hover:bg-stone-100 border border-stone-200 text-stone-800 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Mail className="w-3.5 h-3.5 text-stone-500" />
                    <span>Email</span>
                  </button>
                </div>
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-center gap-1.5 text-[11px] text-stone-400 text-center">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-800" />
                <span>Verified RERA agent · Direct connection</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Similar Properties */}
        {similarProperties.length > 0 && (
          <div className="mt-16 pt-10 border-t border-stone-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-stone-900 font-serif">Similar Properties in Dubai</h2>
              <button
                onClick={() => navigateTo(property.purpose === 'rent' ? 'rent' : 'buy')}
                className="text-xs font-semibold text-emerald-950 hover:underline cursor-pointer"
              >
                View all in {property.location.community} →
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarProperties.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 5. Mobile Sticky Bottom Bar (15% cap compliant) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200 px-4 py-2.5 flex items-center justify-between gap-3 shadow-lg">
        <div>
          <div className="text-xs text-stone-500">Price</div>
          <div className="text-sm font-bold text-stone-900 tabular-nums">
            {formatPrice(property.price, property.currency)}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleWhatsApp}
            className="p-2.5 bg-emerald-50 text-emerald-900 rounded-xl border border-emerald-200"
            aria-label="WhatsApp Agent"
          >
            <MessageSquare className="w-4 h-4 text-emerald-700" />
          </button>
          <button
            onClick={() => openViewingModal(property)}
            className="px-4 py-2.5 bg-emerald-900 text-white rounded-xl text-xs font-semibold shadow-xs"
          >
            Request Viewing
          </button>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between p-4 sm:p-6 animate-in fade-in">
          <div className="flex items-center justify-between text-white">
            <span className="text-xs font-semibold">
              {activePhotoIdx + 1} of {property.images.length}
            </span>
            <button
              onClick={() => setLightboxOpen(false)}
              className="p-2 text-white/80 hover:text-white rounded-full bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 flex items-center justify-center p-4">
            <img
              src={property.images[activePhotoIdx]}
              alt={`Gallery ${activePhotoIdx + 1}`}
              className="max-h-[75vh] max-w-full object-contain rounded-lg shadow-2xl"
            />
          </div>

          {/* Thumbnails strip */}
          <div className="flex items-center justify-center gap-2 overflow-x-auto py-2">
            {property.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActivePhotoIdx(idx)}
                className={`w-16 h-12 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                  activePhotoIdx === idx ? 'border-white scale-105' : 'border-transparent opacity-60'
                }`}
              >
                <img src={img} alt="thumb" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
