import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Property, PropertyPurpose, PropertyType, FurnishingStatus } from '../../types/property';
import { MOCK_AREAS } from '../../data/areas';
import { PropertyCard } from '../property/PropertyCard';
import {
  Check,
  ChevronRight,
  ChevronLeft,
  Upload,
  CheckCircle2,
  Building,
  Image as ImageIcon,
  DollarSign,
  MapPin,
  FileText,
  Trash2,
} from 'lucide-react';

export const ListPropertyWizard: React.FC = () => {
  const { addProperty, navigateTo } = useApp();

  const [step, setStep] = useState<number>(1);
  const [purpose, setPurpose] = useState<PropertyPurpose>('rent');
  const [propertyType, setPropertyType] = useState<PropertyType>('apartment');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<number>(120000);
  const [bedrooms, setBedrooms] = useState<number | 'studio'>(2);
  const [bathrooms, setBathrooms] = useState<number>(2);
  const [areaSqFt, setAreaSqFt] = useState<number>(1150);
  const [furnishing, setFurnishing] = useState<FurnishingStatus>('furnished');
  const [community, setCommunity] = useState<string>('Dubai Marina');
  const [building, setBuilding] = useState<string>('');
  const [cheques, setCheques] = useState<number>(4);

  // Photo upload simulator with preset high-quality choices
  const samplePhotos = [
    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80',
  ];

  const [images, setImages] = useState<string[]>([samplePhotos[0], samplePhotos[1]]);
  const [submitted, setSubmitted] = useState(false);
  const [newPropId, setNewPropId] = useState<string>('');

  const handleAddSamplePhoto = (url: string) => {
    if (!images.includes(url)) {
      setImages([...images, url]);
    }
  };

  const handleRemovePhoto = (idx: number) => {
    if (images.length > 1) {
      setImages(images.filter((_, i) => i !== idx));
    }
  };

  const areaObj = MOCK_AREAS.find((a) => a.name === community) || MOCK_AREAS[0];

  const constructedProperty: Property = {
    id: newPropId || `custom-${Date.now()}`,
    slug: (title || 'new-dubai-property').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    title: title || 'Bright Modern Dubai Residence',
    purpose,
    propertyType,
    price: Number(price) || 120000,
    rentFrequency: purpose === 'rent' ? 'yearly' : undefined,
    currency: 'AED',
    bedrooms,
    bathrooms: Number(bathrooms) || 2,
    areaSqFt: Number(areaSqFt) || 1150,
    location: {
      city: 'Dubai',
      community,
      building: building || undefined,
      lat: areaObj.lat,
      lng: areaObj.lng,
    },
    description: description || 'Modern Dubai property with exceptional finishes and community amenities.',
    images: images.length > 0 ? images : [samplePhotos[0]],
    amenities: ['Balcony', 'Pool', 'Gym', 'Covered Parking', '24/7 Security', 'Central AC'],
    furnished: furnishing,
    verified: true,
    featured: true,
    status: 'ready',
    listedBy: 'owner',
    agentId: 'agent-1',
    reference: `DXB-OWN-${Math.floor(10000 + Math.random() * 90000)}`,
    createdAt: new Date().toISOString().split('T')[0],
    cheques,
    deposit: purpose === 'rent' ? Math.round(price * 0.05) : undefined,
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addProperty(constructedProperty);
    setNewPropId(constructedProperty.id);
    setSubmitted(true);
  };

  const stepsList = [
    { num: 1, label: 'Type' },
    { num: 2, label: 'Details' },
    { num: 3, label: 'Location' },
    { num: 4, label: 'Photos' },
    { num: 5, label: 'Review' },
  ];

  return (
    <div className="min-h-screen bg-stone-50 pb-20">
      {/* Wizard Header */}
      <div className="bg-white border-b border-stone-200 py-8">
        <div className="max-w-[900px] mx-auto px-4 sm:px-6">
          <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wider block">
            Owner & Landlord Portal
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 font-serif mt-1">
            List Your Dubai Property
          </h1>

          {/* Stepper */}
          <div className="mt-8 flex items-center justify-between relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-stone-200 w-full z-0" />
            {stepsList.map((s) => {
              const isCompleted = step > s.num;
              const isCurrent = step === s.num;
              return (
                <div key={s.num} className="relative z-10 flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      isCompleted
                        ? 'bg-emerald-800 text-white'
                        : isCurrent
                        ? 'bg-emerald-950 text-white ring-4 ring-emerald-100'
                        : 'bg-white border-2 border-stone-300 text-stone-400'
                    }`}
                  >
                    {isCompleted ? <Check className="w-4 h-4" /> : s.num}
                  </div>
                  <span className={`text-[11px] font-medium mt-1.5 ${isCurrent ? 'text-emerald-950 font-bold' : 'text-stone-500'}`}>
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-[900px] mx-auto px-4 sm:px-6 pt-10">
        {submitted ? (
          /* Submission Celebration */
          <div className="bg-white rounded-2xl border border-stone-200 p-8 sm:p-12 text-center max-w-lg mx-auto shadow-sm">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-stone-900 font-serif">
              Property Submitted Successfully!
            </h2>
            <p className="text-xs text-stone-600 mt-2 leading-relaxed">
              Your listing <strong className="text-stone-900">{constructedProperty.title}</strong> is now live on Dar Dubai under Reference ID <span className="font-mono text-emerald-900 font-bold">{constructedProperty.reference}</span>.
            </p>

            <div className="mt-6 p-4 bg-stone-50 rounded-xl text-left text-xs space-y-1 border border-stone-100">
              <div className="flex justify-between">
                <span className="text-stone-500">Location:</span>
                <span className="font-semibold">{community}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Listed Price:</span>
                <span className="font-semibold">AED {price.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Status:</span>
                <span className="text-emerald-800 font-bold">Active & Published</span>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => navigateTo('property-detail', { slug: constructedProperty.slug })}
                className="w-full sm:w-auto px-6 py-2.5 bg-emerald-900 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold shadow-xs cursor-pointer"
              >
                View Live Property Page
              </button>
              <button
                type="button"
                onClick={() => navigateTo('profile')}
                className="w-full sm:w-auto px-6 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-semibold cursor-pointer"
              >
                View in My Listings
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-10 shadow-xs">
            {/* Step 1: Property Type & Purpose */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-bold text-stone-900 font-serif">1. Purpose & Category</h2>
                  <p className="text-xs text-stone-500 mt-0.5">Are you listing for annual rent or sale?</p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-2">Listing Purpose</label>
                  <div className="grid grid-cols-2 gap-3 max-w-sm">
                    <button
                      type="button"
                      onClick={() => setPurpose('rent')}
                      className={`py-3 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                        purpose === 'rent'
                          ? 'bg-emerald-950 text-white border-emerald-950 shadow-xs'
                          : 'bg-stone-50 text-stone-700 border-stone-200 hover:border-stone-300'
                      }`}
                    >
                      For Rent
                    </button>
                    <button
                      type="button"
                      onClick={() => setPurpose('sale')}
                      className={`py-3 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                        purpose === 'sale'
                          ? 'bg-emerald-950 text-white border-emerald-950 shadow-xs'
                          : 'bg-stone-50 text-stone-700 border-stone-200 hover:border-stone-300'
                      }`}
                    >
                      For Sale
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-2">Property Type</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {[
                      { id: 'apartment', label: 'Apartment' },
                      { id: 'villa', label: 'Villa' },
                      { id: 'townhouse', label: 'Townhouse' },
                      { id: 'penthouse', label: 'Penthouse' },
                      { id: 'studio', label: 'Studio' },
                      { id: 'room', label: 'Private Room' },
                    ].map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setPropertyType(t.id as any)}
                        className={`p-3 text-left rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                          propertyType === t.id
                            ? 'bg-emerald-50 text-emerald-950 border-emerald-400 ring-2 ring-emerald-200'
                            : 'bg-stone-50 text-stone-700 border-stone-200 hover:border-stone-300'
                        }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Property Details */}
            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <h2 className="text-lg font-bold text-stone-900 font-serif">2. Property Details</h2>
                  <p className="text-xs text-stone-500 mt-0.5">Enter core dimensions, pricing, and description</p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Listing Headline / Title</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Modern 2 Bed Apartment with Full Marina View"
                    className="w-full h-11 px-3 bg-stone-50 border border-stone-200 rounded-lg text-xs"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      {purpose === 'rent' ? 'Annual Rent (AED)' : 'Sale Price (AED)'}
                    </label>
                    <input
                      type="number"
                      required
                      value={price}
                      onChange={(e) => setPrice(Number(e.target.value))}
                      className="w-full h-11 px-3 bg-stone-50 border border-stone-200 rounded-lg text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Built-Up Area (Sq Ft)</label>
                    <input
                      type="number"
                      required
                      value={areaSqFt}
                      onChange={(e) => setAreaSqFt(Number(e.target.value))}
                      className="w-full h-11 px-3 bg-stone-50 border border-stone-200 rounded-lg text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Bedrooms</label>
                    <select
                      value={bedrooms}
                      onChange={(e) => setBedrooms(e.target.value === 'studio' ? 'studio' : Number(e.target.value))}
                      className="w-full h-11 px-3 bg-stone-50 border border-stone-200 rounded-lg text-xs cursor-pointer"
                    >
                      <option value="studio">Studio</option>
                      <option value={1}>1 Bedroom</option>
                      <option value={2}>2 Bedrooms</option>
                      <option value={3}>3 Bedrooms</option>
                      <option value={4}>4 Bedrooms</option>
                      <option value={5}>5+ Bedrooms</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Bathrooms</label>
                    <select
                      value={bathrooms}
                      onChange={(e) => setBathrooms(Number(e.target.value))}
                      className="w-full h-11 px-3 bg-stone-50 border border-stone-200 rounded-lg text-xs cursor-pointer"
                    >
                      <option value={1}>1 Bathroom</option>
                      <option value={2}>2 Bathrooms</option>
                      <option value={3}>3 Bathrooms</option>
                      <option value={4}>4+ Bathrooms</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Furnishing</label>
                    <select
                      value={furnishing}
                      onChange={(e) => setFurnishing(e.target.value as any)}
                      className="w-full h-11 px-3 bg-stone-50 border border-stone-200 rounded-lg text-xs cursor-pointer"
                    >
                      <option value="furnished">Furnished</option>
                      <option value="unfurnished">Unfurnished</option>
                      <option value="partly-furnished">Partly Furnished</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Detailed Description</label>
                  <textarea
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe view, kitchen appliances, balcony features, and parking allocations..."
                    className="w-full p-3 bg-stone-50 border border-stone-200 rounded-lg text-xs"
                  />
                </div>
              </div>
            )}

            {/* Step 3: Location */}
            {step === 3 && (
              <div className="space-y-4">
                <div>
                  <h2 className="text-lg font-bold text-stone-900 font-serif">3. Community & Address</h2>
                  <p className="text-xs text-stone-500 mt-0.5">Where is the property located in Dubai?</p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Community</label>
                  <select
                    value={community}
                    onChange={(e) => setCommunity(e.target.value)}
                    className="w-full h-11 px-3 bg-stone-50 border border-stone-200 rounded-lg text-xs cursor-pointer"
                  >
                    {MOCK_AREAS.map((a) => (
                      <option key={a.id} value={a.name}>
                        {a.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Building or Project Name</label>
                  <input
                    type="text"
                    value={building}
                    onChange={(e) => setBuilding(e.target.value)}
                    placeholder="e.g. Marina Gate 2, Burj Crown, Shoreline 9"
                    className="w-full h-11 px-3 bg-stone-50 border border-stone-200 rounded-lg text-xs"
                  />
                </div>

                <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100 flex items-center gap-3 text-xs text-emerald-950">
                  <MapPin className="w-5 h-5 text-emerald-800 shrink-0" />
                  <span>
                    Your property will appear on the Dubai Interactive Map in <strong>{community}</strong> with nearby transit indicators.
                  </span>
                </div>
              </div>
            )}

            {/* Step 4: Photos */}
            {step === 4 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-bold text-stone-900 font-serif">4. Photos & Media</h2>
                  <p className="text-xs text-stone-500 mt-0.5">Select high-resolution photos for the gallery</p>
                </div>

                {/* Upload Simulator */}
                <div className="border-2 border-dashed border-stone-300 rounded-2xl p-6 text-center bg-stone-50 space-y-2">
                  <Upload className="w-8 h-8 text-stone-400 mx-auto" />
                  <div className="text-xs font-semibold text-stone-800">
                    Upload Property Photography
                  </div>
                  <p className="text-[11px] text-stone-400">
                    Click to add sample luxury Dubai interiors or exteriors
                  </p>

                  <div className="flex flex-wrap gap-2 justify-center pt-2">
                    {samplePhotos.map((img, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => handleAddSamplePhoto(img)}
                        className="text-[11px] px-2.5 py-1 bg-white border border-stone-200 text-stone-700 rounded-lg hover:border-emerald-800 cursor-pointer"
                      >
                        + Add Scene {i + 1}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Current Photos */}
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-2">
                    Selected Photos ({images.length})
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {images.map((img, idx) => (
                      <div key={idx} className="relative aspect-[4/3] rounded-xl overflow-hidden border border-stone-200 group">
                        <img src={img} alt="Property" className="w-full h-full object-cover" />
                        {idx === 0 && (
                          <span className="absolute top-2 left-2 bg-emerald-950 text-white text-[9px] px-1.5 py-0.5 rounded font-bold">
                            Cover
                          </span>
                        )}
                        <button
                          type="button"
                          onClick={() => handleRemovePhoto(idx)}
                          className="absolute top-2 right-2 p-1 bg-black/60 hover:bg-red-600 text-white rounded transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Review & Preview */}
            {step === 5 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-bold text-stone-900 font-serif">5. Preview & Submit</h2>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Review how your listing appears to tenants and buyers on Dar Dubai.
                  </p>
                </div>

                <div className="max-w-md mx-auto">
                  <PropertyCard property={constructedProperty} />
                </div>
              </div>
            )}

            {/* Stepper Navigation Buttons */}
            <div className="mt-8 pt-5 border-t border-stone-100 flex items-center justify-between">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="px-5 py-2.5 border border-stone-200 text-stone-700 rounded-xl text-xs font-semibold hover:bg-stone-50 flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>
              ) : (
                <div />
              )}

              {step < 5 ? (
                <button
                  type="button"
                  onClick={() => setStep(step + 1)}
                  className="px-6 py-2.5 bg-emerald-900 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold flex items-center gap-1 transition-colors shadow-xs cursor-pointer"
                >
                  <span>Continue</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="px-8 py-3 bg-emerald-900 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-colors shadow-md cursor-pointer flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Publish Property Listing</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
