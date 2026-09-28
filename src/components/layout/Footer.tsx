import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, MapPin, Phone, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateTo } = useApp();

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

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} Dar Dubai Real Estate Technologies Ltd. All rights reserved.</p>
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
