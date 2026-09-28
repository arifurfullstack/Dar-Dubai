import React from 'react';
import { useApp } from '../../context/AppContext';
import { Home, Search, BedDouble, Bookmark, User } from 'lucide-react';

export const MobileNav: React.FC = () => {
  const { currentRoute, navigateTo, savedIds } = useApp();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200 px-2 py-1.5 flex items-center justify-around h-14">
      <button
        onClick={() => navigateTo('home')}
        className={`flex flex-col items-center justify-center w-14 py-1 text-[10px] font-medium transition-colors ${
          currentRoute === 'home' ? 'text-emerald-900 font-semibold' : 'text-stone-500'
        }`}
      >
        <Home className="w-4 h-4 mb-0.5" />
        <span>Home</span>
      </button>

      <button
        onClick={() => navigateTo('rent')}
        className={`flex flex-col items-center justify-center w-14 py-1 text-[10px] font-medium transition-colors ${
          currentRoute === 'rent' || currentRoute === 'buy' ? 'text-emerald-900 font-semibold' : 'text-stone-500'
        }`}
      >
        <Search className="w-4 h-4 mb-0.5" />
        <span>Browse</span>
      </button>

      <button
        onClick={() => navigateTo('rooms')}
        className={`flex flex-col items-center justify-center w-14 py-1 text-[10px] font-medium transition-colors ${
          currentRoute === 'rooms' || currentRoute === 'room-detail' ? 'text-emerald-900 font-semibold' : 'text-stone-500'
        }`}
      >
        <BedDouble className="w-4 h-4 mb-0.5" />
        <span>Rooms</span>
      </button>

      <button
        onClick={() => navigateTo('saved')}
        className={`flex flex-col items-center justify-center w-14 py-1 text-[10px] font-medium transition-colors relative ${
          currentRoute === 'saved' ? 'text-emerald-900 font-semibold' : 'text-stone-500'
        }`}
      >
        <div className="relative">
          <Bookmark className={`w-4 h-4 mb-0.5 ${savedIds.length > 0 && currentRoute === 'saved' ? 'fill-emerald-900' : ''}`} />
          {savedIds.length > 0 && (
            <span className="absolute -top-1 -right-2 px-1 bg-emerald-800 text-white rounded-full text-[9px] font-bold leading-tight">
              {savedIds.length}
            </span>
          )}
        </div>
        <span>Saved</span>
      </button>

      <button
        onClick={() => navigateTo('profile')}
        className={`flex flex-col items-center justify-center w-14 py-1 text-[10px] font-medium transition-colors ${
          currentRoute === 'profile' ? 'text-emerald-900 font-semibold' : 'text-stone-500'
        }`}
      >
        <User className="w-4 h-4 mb-0.5" />
        <span>Profile</span>
      </button>
    </nav>
  );
};
