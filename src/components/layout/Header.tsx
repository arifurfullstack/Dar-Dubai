import React, { useState, useEffect, useRef } from 'react';
import { useApp, AppRoute } from '../../context/AppContext';
import {
  Bookmark,
  Menu,
  X,
  PlusCircle,
  User,
  Phone,
  Building2,
  ChevronRight,
  Sparkles,
  MapPin,
  Home,
  BedDouble,
  KeyRound,
} from 'lucide-react';

export const Header: React.FC = () => {
  const { currentRoute, navigateTo, savedIds, user, openAuthModal } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  const navLinks: { label: string; route: AppRoute; badge?: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { label: 'Buy', route: 'buy', icon: Building2 },
    { label: 'Rent', route: 'rent', icon: KeyRound },
    { label: 'Rooms', route: 'rooms', icon: BedDouble },
    { label: 'New Projects', route: 'new-projects', badge: 'Off-Plan', icon: Sparkles },
    { label: 'Communities', route: 'areas', icon: MapPin },
    { label: 'Brokers', route: 'agents', icon: User },
  ];

  const handleNav = (route: AppRoute) => {
    navigateTo(route);
    setMobileMenuOpen(false);
  };

  const handleConciergeWhatsApp = () => {
    const text = encodeURIComponent('Hi Dar Dubai Concierge, I would like assistance finding a property in Dubai.');
    window.open(`https://wa.me/971501234567?text=${text}`, '_blank');
  };

  // Close mobile menu on desktop resize or on Escape key
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200/80 transition-all">
      {/* 1. Top Luxury Utility Bar (Responsive: adapts to screen size) */}
      <div className="bg-stone-950 text-stone-300 text-[11px] border-b border-stone-900/60 hidden sm:block">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-8 flex items-center justify-between">
          {/* Left: Market Status */}
          <div className="flex items-center gap-2 truncate">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <span className="font-medium truncate">Dubai Real Estate Market</span>
            <span className="text-stone-600 hidden md:inline">·</span>
            <span className="text-stone-400 hidden md:inline">RERA Registered Marketplace</span>
          </div>

          {/* Right: Concierge & Currency */}
          <div className="flex items-center gap-3 sm:gap-5 text-stone-400 shrink-0">
            <button
              onClick={handleConciergeWhatsApp}
              className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
            >
              <Phone className="w-3 h-3 text-emerald-400" />
              <span className="hidden md:inline">Concierge Desk: </span>
              <strong className="text-stone-200 font-semibold">+971 4 800 DAR</strong>
            </button>
            <span className="text-stone-700 hidden sm:inline">|</span>
            <div className="flex items-center gap-1 text-stone-300 font-medium">
              <span>AED</span>
            </div>
            <span className="text-stone-700 hidden lg:inline">|</span>
            <span className="font-serif italic text-stone-400 tracking-wider hidden lg:inline">دار دبي</span>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <div className="max-w-[1400px] mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-4">
        {/* Zone 1: Architectural Brand Mark */}
        <button
          onClick={() => handleNav('home')}
          className="group flex items-center gap-2.5 sm:gap-3 text-left cursor-pointer shrink-0"
        >
          {/* Bespoke Architectural Emblem */}
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-emerald-950 via-emerald-900 to-stone-900 flex items-center justify-center shadow-xs border border-emerald-700/30 text-amber-300 group-hover:scale-105 transition-transform duration-300 shrink-0">
            <Building2 className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300/90" />
          </div>

          <div className="flex flex-col">
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl sm:text-2xl lg:text-[27px] font-serif font-medium tracking-tight text-stone-900 group-hover:text-emerald-950 transition-colors leading-none">
                Dar Dubai
              </span>
              <span className="text-[10px] font-serif text-stone-400 tracking-wider hidden md:inline">
                دار دبي
              </span>
            </div>
            <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.2em] font-semibold text-emerald-900 mt-0.5 sm:mt-1 hidden sm:inline">
              Prime Residences & Rooms
            </span>
          </div>
        </button>

        {/* Zone 2: Desktop Navigation Links (Visible on lg >= 1024px) */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-xs font-semibold uppercase tracking-wider text-stone-600">
          {navLinks.map((link) => {
            const isActive = currentRoute === link.route;
            return (
              <button
                key={link.route}
                onClick={() => handleNav(link.route)}
                className={`py-1.5 relative transition-colors cursor-pointer flex items-center gap-1.5 group ${
                  isActive ? 'text-emerald-950 font-bold' : 'hover:text-stone-950'
                }`}
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-900 uppercase tracking-normal">
                    {link.badge}
                  </span>
                )}
                {/* Active indicator bar */}
                {isActive && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-emerald-900 rounded-full" />
                )}
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-stone-300 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Header Actions & CTAs (Fluidly adapts across mobile, tablet, desktop) */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* Saved properties button */}
          <button
            onClick={() => handleNav('saved')}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer border ${
              currentRoute === 'saved'
                ? 'bg-emerald-50 text-emerald-950 border-emerald-200 shadow-xs'
                : 'bg-stone-50/80 hover:bg-stone-100 text-stone-700 border-stone-200/80 hover:border-stone-300'
            }`}
            title="Saved properties"
            aria-label="Saved properties"
          >
            <Bookmark
              className={`w-3.5 h-3.5 transition-colors ${
                savedIds.length > 0 ? 'fill-emerald-800 text-emerald-800' : 'text-stone-500'
              }`}
            />
            <span className="hidden md:inline">Saved</span>
            {savedIds.length > 0 && (
              <span className="px-1.5 py-0.2 bg-emerald-900 text-white rounded-full text-[10px] tabular-nums font-bold">
                {savedIds.length}
              </span>
            )}
          </button>

          {/* User profile / Sign in button */}
          <button
            onClick={() => {
              if (user.isLoggedIn) {
                handleNav('profile');
              } else {
                openAuthModal();
              }
            }}
            className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-2 text-xs font-semibold text-stone-700 hover:text-stone-950 bg-stone-50/80 hover:bg-stone-100 border border-stone-200/80 hover:border-stone-300 rounded-xl transition-all cursor-pointer"
            aria-label={user.isLoggedIn ? user.name : 'Sign In'}
          >
            {user.isLoggedIn ? (
              <div className="w-5 h-5 rounded-full bg-emerald-900 text-white text-[10px] font-bold flex items-center justify-center">
                {user.name.charAt(0)}
              </div>
            ) : (
              <User className="w-3.5 h-3.5 text-stone-500" />
            )}
            <span className="hidden sm:inline">
              {user.isLoggedIn ? user.name.split(' ')[0] : 'Sign In'}
            </span>
          </button>

          {/* Primary CTA: List Property */}
          <button
            onClick={() => handleNav('list-property')}
            className="flex items-center gap-1.5 px-3 sm:px-4 py-2 sm:py-2.5 text-xs font-semibold text-white bg-emerald-950 hover:bg-emerald-900 rounded-xl transition-all shadow-xs hover:shadow-md border border-emerald-900 whitespace-nowrap cursor-pointer active:scale-98"
          >
            <PlusCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span className="hidden md:inline">List Property</span>
            <span className="md:hidden">List</span>
          </button>

          {/* Mobile hamburger menu toggle (Visible on screens < 1024px) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-stone-700 hover:text-stone-950 rounded-xl hover:bg-stone-100 transition-colors cursor-pointer border border-stone-200 active:scale-95 ml-0.5"
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* 3. Mobile Navigation Drawer & Backdrop Overlay */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop overlay */}
          <div
            className="fixed inset-0 top-[65px] sm:top-[97px] bg-stone-900/40 backdrop-blur-xs z-30 lg:hidden transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Slide-down Drawer */}
          <div
            ref={drawerRef}
            className="relative z-40 lg:hidden border-t border-stone-200 bg-white/98 backdrop-blur-xl px-4 pt-4 pb-6 space-y-4 shadow-2xl animate-in slide-in-from-top-2 max-h-[calc(100vh-100px)] overflow-y-auto"
          >
            {/* Quick Concierge Hotline */}
            <div className="pb-3 border-b border-stone-100 flex items-center justify-between text-xs">
              <span className="text-stone-500 font-medium">Concierge Assistance:</span>
              <button
                onClick={handleConciergeWhatsApp}
                className="font-bold text-emerald-900 flex items-center gap-1.5 hover:underline cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-700" />
                <span>+971 4 800 DAR</span>
              </button>
            </div>

            {/* Navigation Grid (2 columns on mobile/tablet) */}
            <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
              {navLinks.map((link) => {
                const IconComponent = link.icon;
                const isActive = currentRoute === link.route;
                return (
                  <button
                    key={link.route}
                    onClick={() => handleNav(link.route)}
                    className={`text-left p-3 rounded-xl text-xs font-semibold transition-all flex items-center justify-between cursor-pointer border ${
                      isActive
                        ? 'bg-emerald-950 text-white border-emerald-950 shadow-xs'
                        : 'bg-stone-50/80 text-stone-800 border-stone-200/60 hover:bg-stone-100 hover:border-stone-300'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <IconComponent className={`w-4 h-4 shrink-0 ${isActive ? 'text-emerald-400' : 'text-emerald-900'}`} />
                      <span className="truncate">{link.label}</span>
                    </div>
                    {link.badge && (
                      <span
                        className={`text-[9px] px-1.5 py-0.5 rounded font-bold shrink-0 ml-1 ${
                          isActive ? 'bg-emerald-800 text-white' : 'bg-emerald-100 text-emerald-900'
                        }`}
                      >
                        {link.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Account & Saved Shortcuts */}
            <div className="pt-2 border-t border-stone-100 grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                onClick={() => handleNav('saved')}
                className="flex items-center justify-between px-3.5 py-2.5 text-xs font-semibold text-stone-700 bg-stone-50 hover:bg-stone-100 border border-stone-200/60 rounded-xl cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-emerald-800" />
                  <span>Saved Residences</span>
                </span>
                {savedIds.length > 0 && (
                  <span className="px-2 py-0.5 bg-emerald-900 text-white rounded-full text-[10px] font-bold tabular-nums">
                    {savedIds.length}
                  </span>
                )}
              </button>

              <button
                onClick={() => {
                  if (user.isLoggedIn) {
                    handleNav('profile');
                  } else {
                    openAuthModal();
                    setMobileMenuOpen(false);
                  }
                }}
                className="flex items-center justify-between px-3.5 py-2.5 text-xs font-semibold text-stone-700 bg-stone-50 hover:bg-stone-100 border border-stone-200/60 rounded-xl cursor-pointer"
              >
                <span className="flex items-center gap-2 truncate">
                  <User className="w-4 h-4 text-stone-600 shrink-0" />
                  <span className="truncate">{user.isLoggedIn ? `Account (${user.name})` : 'Sign In to Portal'}</span>
                </span>
                <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
              </button>
            </div>
          </div>
        </>
      )}
    </header>
  );
};
