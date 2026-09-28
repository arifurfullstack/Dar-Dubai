import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MOCK_AGENTS } from '../../data/agents';
import { PropertyCard } from '../property/PropertyCard';
import { CheckCircle2, Phone, MessageSquare, Mail, Star, ShieldCheck, ChevronRight, Award, Globe, Building } from 'lucide-react';

interface AgentDetailViewProps {
  slug: string;
}

export const AgentDetailView: React.FC<AgentDetailViewProps> = ({ slug }) => {
  const { properties, navigateTo } = useApp();
  const [activeTab, setActiveTab] = useState<'all' | 'rent' | 'sale'>('all');

  const agent = MOCK_AGENTS.find((a) => a.slug === slug) || MOCK_AGENTS[0];

  const agentProperties = properties.filter((p) => p.agentId === agent.id);
  const displayedProperties = agentProperties.filter((p) => {
    if (activeTab === 'rent') return p.purpose === 'rent';
    if (activeTab === 'sale') return p.purpose === 'sale';
    return true;
  });

  const handleWhatsApp = () => {
    const text = encodeURIComponent(`Hi ${agent.name}, I found your broker profile on Dar Dubai.`);
    window.open(`https://wa.me/${agent.whatsapp.replace(/[^0-9]/g, '')}?text=${text}`, '_blank');
  };

  const handleCall = () => {
    window.open(`tel:${agent.phone.replace(/[^0-9+]/g, '')}`, '_self');
  };

  const handleEmail = () => {
    window.open(`mailto:${agent.email}?subject=Inquiry via Dar Dubai Broker Portal`, '_self');
  };

  return (
    <div className="min-h-screen bg-stone-50 pb-20">
      {/* Breadcrumbs */}
      <div className="bg-white border-b border-stone-200 py-3">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-1.5 text-xs text-stone-500">
          <button onClick={() => navigateTo('home')} className="hover:text-stone-900 cursor-pointer">
            Home
          </button>
          <ChevronRight className="w-3 h-3 text-stone-300" />
          <button onClick={() => navigateTo('agents')} className="hover:text-stone-900 cursor-pointer">
            Agents
          </button>
          <ChevronRight className="w-3 h-3 text-stone-300" />
          <span className="text-stone-800 font-medium">{agent.name}</span>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Agent Profile Header Card */}
        <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <img
                src={agent.image}
                alt={agent.name}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-2 border-stone-200"
              />
              <div className="space-y-1">
                <div className="flex items-center gap-1.5">
                  <h1 className="text-2xl font-bold text-stone-900 font-serif">{agent.name}</h1>
                  {agent.verified && <CheckCircle2 className="w-5 h-5 text-emerald-700" />}
                </div>
                <p className="text-sm font-medium text-emerald-900">{agent.title}</p>
                <p className="text-xs text-stone-500">{agent.agency}</p>
                <div className="flex items-center gap-3 text-xs text-stone-600 pt-1">
                  <div className="flex items-center gap-1 text-amber-600 font-semibold">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    <span>{agent.rating} (Verified Reviews)</span>
                  </div>
                  <span>·</span>
                  <span>{agent.experienceYears} Years in Dubai</span>
                </div>
              </div>
            </div>

            {/* Direct Contact CTAs */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 w-full md:w-auto">
              <button
                onClick={handleWhatsApp}
                className="flex-1 sm:flex-none px-4 py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 text-emerald-700" />
                <span>WhatsApp</span>
              </button>

              <button
                onClick={handleCall}
                className="flex-1 sm:flex-none px-4 py-2.5 bg-emerald-900 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Phone className="w-4 h-4" />
                <span>Call Broker</span>
              </button>

              <button
                onClick={handleEmail}
                className="p-2.5 bg-stone-50 hover:bg-stone-100 border border-stone-200 text-stone-700 rounded-xl text-xs font-semibold flex items-center justify-center transition-colors cursor-pointer"
                title="Send Email"
              >
                <Mail className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Bio & Details */}
          <div className="mt-6 pt-6 border-t border-stone-100 grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
            <div className="md:col-span-2 space-y-2">
              <h2 className="font-bold text-stone-900 text-sm">About {agent.name.split(' ')[0]}</h2>
              <p className="text-stone-600 leading-relaxed">{agent.bio}</p>
            </div>

            <div className="space-y-3 bg-stone-50 p-4 rounded-xl">
              <div>
                <span className="text-[10px] text-stone-400 uppercase font-semibold block">Languages</span>
                <span className="font-medium text-stone-800">{agent.languages.join(', ')}</span>
              </div>
              <div>
                <span className="text-[10px] text-stone-400 uppercase font-semibold block">Specialities</span>
                <span className="font-medium text-stone-800">{agent.specialities.join(', ')}</span>
              </div>
              <div>
                <span className="text-[10px] text-stone-400 uppercase font-semibold block">Community Coverage</span>
                <span className="font-medium text-stone-800">{agent.areas.join(', ')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Portfolio Tabs & Listings */}
        <div className="mt-10">
          <div className="flex items-center justify-between border-b border-stone-200 pb-3 mb-6">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                  activeTab === 'all' ? 'bg-emerald-900 text-white' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                All Listings ({agentProperties.length})
              </button>
              <button
                onClick={() => setActiveTab('rent')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                  activeTab === 'rent' ? 'bg-emerald-900 text-white' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                For Rent ({agentProperties.filter((p) => p.purpose === 'rent').length})
              </button>
              <button
                onClick={() => setActiveTab('sale')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                  activeTab === 'sale' ? 'bg-emerald-900 text-white' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                For Sale ({agentProperties.filter((p) => p.purpose === 'sale').length})
              </button>
            </div>
          </div>

          {displayedProperties.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedProperties.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          ) : (
            <div className="p-8 bg-white rounded-xl border border-stone-200 text-center text-xs text-stone-500">
              No active properties listed under this filter.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
