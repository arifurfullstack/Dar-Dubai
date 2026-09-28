import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, MapPin, Phone, Mail, MessageSquare, ExternalLink, Code2 } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateTo, openDeveloperModal } = useApp();

  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-stone-800">
          {/* Brand & Trust */}
          <div className="lg:col-span-2 space-y-4">
            <span className="text-2xl font-bold tracking-tight text-white font-serif">
              Dar Dubai
            </span>
            <p className="text-sm text-stone-400 max-w-sm leading-relaxed">
              Dubai’s trusted modern real estate marketplace for discovering apartments, luxury villas, executive rooms, and investment properties across the emirate.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium pt-1">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Registered Dubai Real Estate Regulatory Agency (RERA) compliant</span>
            </div>
            <div className="pt-2 text-xs text-stone-500 space-y-1">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-stone-400" />
                <span>Emaar Square, Building 4, Downtown Dubai, UAE</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-stone-400" />
                <span>+971 4 400 1234 (Sunday – Friday, 9am – 6pm GST)</span>
              </div>
            </div>
          </div>

          {/* Properties */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-100 mb-4">
              Properties
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => navigateTo('rent')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Properties for Rent
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('buy')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Properties for Sale
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('rooms')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Rooms & Shared Living
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('new-projects')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  New Off-Plan Projects
                </button>
              </li>
            </ul>
          </div>

          {/* Communities */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-100 mb-4">
              Popular Areas
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => navigateTo('area-detail', { slug: 'dubai-marina' })}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Dubai Marina
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('area-detail', { slug: 'downtown-dubai' })}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Downtown Dubai
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('area-detail', { slug: 'palm-jumeirah' })}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Palm Jumeirah
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('area-detail', { slug: 'business-bay' })}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Business Bay
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('area-detail', { slug: 'jumeirah-village-circle' })}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  JVC (Circle)
                </button>
              </li>
            </ul>
          </div>

          {/* For Landlords & Agents */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-100 mb-4">
              Owners & Agents
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => navigateTo('list-property')}
                  className="hover:text-white transition-colors cursor-pointer text-left text-emerald-400 font-medium"
                >
                  List Your Property
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('agents')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Verified Agents Directory
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('saved')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Saved Properties
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('profile')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Client Portal
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Developer Attribution & Contact Panel */}
        <div className="py-6 border-b border-stone-800 bg-stone-950/40 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 my-2 rounded-2xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="space-y-2 text-xs text-stone-300">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-semibold text-white">Developed by:</span>
              <a
                href="https://huipper.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-bold transition-colors"
              >
                <span>Huipper (huipper.com)</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-stone-400 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="text-stone-300 font-medium">Developer:</span>
                <span className="text-white">Md Arifur Rahman</span>
                <span className="text-stone-600">-</span>
                <a
                  href="https://wa.me/8801756601431?text=Hi%20Md%20Arifur%20Rahman,%20I%20am%20contacting%20you%20regarding%20the%20Dar%20Dubai%20platform%20developed%20by%20Huipper."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 hover:underline font-mono"
                >
                  <MessageSquare className="w-3 h-3 text-emerald-400" />
                  <span>whatsapp: +8801756601431</span>
                </a>
              </div>

              <span className="hidden sm:inline text-stone-700">|</span>

              <div className="flex items-center gap-1.5">
                <span className="text-stone-300 font-medium">Developer:</span>
                <span className="text-white">Sydul Islam</span>
                <span className="text-stone-600">-</span>
                <a
                  href="https://wa.me/8801707991750?text=Hi%20Sydul%20Islam,%20I%20am%20contacting%20you%20regarding%20the%20Dar%20Dubai%20platform%20developed%20by%20Huipper."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 hover:underline font-mono"
                >
                  <MessageSquare className="w-3 h-3 text-emerald-400" />
                  <span>whatsapp: +8801707991750</span>
                </a>
              </div>
            </div>
          </div>

          <button
            onClick={openDeveloperModal}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/30 text-emerald-300 hover:text-white transition-all cursor-pointer shadow-xs whitespace-nowrap active:scale-98"
          >
            <Code2 className="w-4 h-4 text-emerald-400" />
            <span>Developer Credits & Pop-up Modal</span>
          </button>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>
            © {new Date().getFullYear()} Dar Dubai Real Estate Technologies Ltd. Developed by{' '}
            <a
              href="https://huipper.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-400 hover:text-emerald-400 underline font-medium"
            >
              Huipper (huipper.com)
            </a>
            . All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span>Currency: <strong className="text-stone-300">AED (UAE Dirham)</strong></span>
            <span>Language: <strong className="text-stone-300">English (EN)</strong></span>
            <span>RERA ORN: 24910</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
