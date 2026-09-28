import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MOCK_PROJECTS } from '../../data/projects';
import { ImageWithFallback } from '../ui/ImageWithFallback';
import { formatCompactPrice, formatPrice } from '../../utils/helpers';
import { Building, Calendar, DollarSign, Check, FileDown, MessageSquare } from 'lucide-react';

export const NewProjectsView: React.FC = () => {
  const { showToast } = useApp();
  const [selectedDeveloper, setSelectedDeveloper] = useState<string>('all');

  const developers = Array.from(new Set(MOCK_PROJECTS.map((p) => p.developer)));

  const filteredProjects = MOCK_PROJECTS.filter((p) => {
    if (selectedDeveloper !== 'all' && p.developer !== selectedDeveloper) return false;
    return true;
  });

  const handleDownloadBrochure = (projectName: string) => {
    showToast(`Brochure & Floorplans for "${projectName}" downloaded!`, 'success');
  };

  const handleWhatsAppDeveloper = (projectName: string) => {
    const text = encodeURIComponent(`Hi, I would like to request the full payment plan and floor plans for: ${projectName}.`);
    window.open(`https://wa.me/971501234567?text=${text}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-stone-50 pb-20">
      {/* Hero */}
      <div className="bg-stone-900 text-white py-14 border-b border-stone-800">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-2xl">
          <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
            Off-Plan & Future Developments
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold font-serif mt-2 tracking-tight">
            New Projects in Dubai
          </h1>
          <p className="text-xs sm:text-sm text-stone-300 mt-2 leading-relaxed">
            First-access allocations into master-planned developments with 0% agency fees, flexible payment plans, and high projected rental yields.
          </p>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Developer Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6">
          <button
            onClick={() => setSelectedDeveloper('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap cursor-pointer transition-colors ${
              selectedDeveloper === 'all'
                ? 'bg-emerald-900 text-white'
                : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-100'
            }`}
          >
            All Developers
          </button>
          {developers.map((dev) => (
            <button
              key={dev}
              onClick={() => setSelectedDeveloper(dev)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap cursor-pointer transition-colors ${
                selectedDeveloper === dev
                  ? 'bg-emerald-900 text-white'
                  : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-100'
              }`}
            >
              {dev}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((proj) => (
            <div
              key={proj.id}
              className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden bg-stone-900">
                  <ImageWithFallback
                    src={proj.image}
                    alt={proj.name}
                    fallbackCategory="project"
                    aspectRatioClass="aspect-[16/10]"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-xs text-white text-[11px] font-semibold px-2.5 py-1 rounded">
                    Handover: {proj.handover}
                  </div>
                  <div className="absolute bottom-3 left-3 bg-emerald-950/85 backdrop-blur-xs text-emerald-200 text-[11px] font-bold px-2.5 py-1 rounded">
                    From {formatCompactPrice(proj.startingPrice)}
                  </div>
                </div>

                <div className="p-5 space-y-4">
                  <div>
                    <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider">
                      {proj.developer}
                    </span>
                    <h2 className="text-lg font-bold text-stone-900 mt-0.5">{proj.name}</h2>
                    <p className="text-xs text-stone-500 mt-0.5">{proj.location}</p>
                  </div>

                  <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed">
                    {proj.description}
                  </p>

                  <div className="p-3 bg-stone-50 rounded-xl space-y-1.5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-stone-500">Payment Plan:</span>
                      <span className="font-semibold text-stone-800">{proj.paymentPlan}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-500">Inventory:</span>
                      <span className="font-semibold text-emerald-800">{proj.unitsAvailable} Units Remaining</span>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-[10px] text-stone-400 font-semibold uppercase block">Key Highlights</span>
                    <div className="grid grid-cols-2 gap-1 text-[11px] text-stone-700">
                      {proj.features.slice(0, 4).map((f) => (
                        <div key={f} className="flex items-center gap-1 truncate">
                          <Check className="w-3 h-3 text-emerald-700 shrink-0" />
                          <span className="truncate">{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleDownloadBrochure(proj.name)}
                  className="py-2.5 bg-stone-50 hover:bg-stone-100 border border-stone-200 text-stone-800 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <FileDown className="w-3.5 h-3.5 text-stone-500" />
                  <span>Brochure</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleWhatsAppDeveloper(proj.name)}
                  className="py-2.5 bg-emerald-900 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-xs cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
