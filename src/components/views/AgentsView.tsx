import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MOCK_AGENTS } from '../../data/agents';
import { CheckCircle2, Phone, MessageSquare, Star, Search, ShieldCheck, ChevronRight } from 'lucide-react';

export const AgentsView: React.FC = () => {
  const { navigateTo } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [selectedArea, setSelectedArea] = useState('');

  const filteredAgents = MOCK_AGENTS.filter((agent) => {
    if (searchTerm && !agent.name.toLowerCase().includes(searchTerm.toLowerCase()) && !agent.agency.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    if (selectedLanguage && !agent.languages.includes(selectedLanguage)) {
      return false;
    }
    if (selectedArea && !agent.areas.includes(selectedArea)) {
      return false;
    }
    return true;
  });

  const allLanguages = Array.from(new Set(MOCK_AGENTS.flatMap((a) => a.languages)));
  const allAreas = Array.from(new Set(MOCK_AGENTS.flatMap((a) => a.areas)));

  return (
    <div className="min-h-screen bg-stone-50 pb-20">
      <div className="bg-stone-900 text-white py-14 border-b border-stone-800">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-2xl">
          <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
            Licensed Real Estate Advisors
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold font-serif mt-2 tracking-tight">
            Find a Verified Dubai Agent
          </h1>
          <p className="text-xs sm:text-sm text-stone-300 mt-2 leading-relaxed">
            Connect with top-performing brokers registered with the Dubai Real Estate Regulatory Agency (RERA).
          </p>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Filters */}
        <div className="bg-white p-4 rounded-xl border border-stone-200 mb-8 flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search agent name or agency..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-10 pl-9 pr-3 bg-stone-50 border border-stone-200 rounded-lg text-xs"
            />
          </div>

          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="h-10 px-3 bg-stone-50 border border-stone-200 rounded-lg text-xs text-stone-700 cursor-pointer"
          >
            <option value="">All Languages</option>
            {allLanguages.map((lang) => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>

          <select
            value={selectedArea}
            onChange={(e) => setSelectedArea(e.target.value)}
            className="h-10 px-3 bg-stone-50 border border-stone-200 rounded-lg text-xs text-stone-700 cursor-pointer"
          >
            <option value="">All Areas</option>
            {allAreas.map((area) => (
              <option key={area} value={area}>{area}</option>
            ))}
          </select>

          {(searchTerm || selectedLanguage || selectedArea) && (
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedLanguage('');
                setSelectedArea('');
              }}
              className="text-xs text-emerald-950 font-semibold hover:underline"
            >
              Reset
            </button>
          )}
        </div>

        {/* Agents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredAgents.map((agent) => (
            <div
              key={agent.id}
              onClick={() => navigateTo('agent-detail', { slug: agent.slug })}
              className="group bg-white rounded-2xl border border-stone-200 p-6 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3">
                  <img
                    src={agent.image}
                    alt={agent.name}
                    className="w-16 h-16 rounded-full object-cover border border-stone-200"
                  />
                  <div>
                    <div className="flex items-center gap-1">
                      <h3 className="text-sm font-bold text-stone-900 group-hover:text-emerald-900 transition-colors">
                        {agent.name}
                      </h3>
                      {agent.verified && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />}
                    </div>
                    <p className="text-[11px] text-stone-500 font-medium line-clamp-1">{agent.agency}</p>
                    <div className="flex items-center gap-1 text-[11px] text-amber-600 mt-1">
                      <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                      <span className="font-bold">{agent.rating}</span>
                      <span className="text-stone-400">· {agent.experienceYears}y exp</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-100 space-y-2 text-xs">
                  <div>
                    <span className="text-[10px] text-stone-400 uppercase font-semibold block">Focus Areas</span>
                    <span className="text-stone-700 line-clamp-1 font-medium">{agent.areas.join(', ')}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-stone-400 uppercase font-semibold block">Languages</span>
                    <span className="text-stone-700 line-clamp-1 font-medium">{agent.languages.join(', ')}</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                <span className="font-semibold text-stone-800">
                  {agent.activeSaleCount + agent.activeRentCount} Active Listings
                </span>
                <span className="text-emerald-950 font-bold group-hover:translate-x-1 transition-transform flex items-center gap-0.5">
                  View Profile <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
