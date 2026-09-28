import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Property, Room, PropertyFilterState, RoomFilterState, ViewingRequest } from '../types/property';
import { MOCK_PROPERTIES } from '../data/properties';
import { MOCK_ROOMS } from '../data/rooms';

export type AppRoute =
  | 'home'
  | 'buy'
  | 'rent'
  | 'rooms'
  | 'new-projects'
  | 'areas'
  | 'area-detail'
  | 'agents'
  | 'agent-detail'
  | 'property-detail'
  | 'room-detail'
  | 'saved'
  | 'list-property'
  | 'profile';

export interface ToastItem {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'warning';
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  isLoggedIn: boolean;
  avatar?: string;
}

interface AppContextType {
  currentRoute: AppRoute;
  routeParams: Record<string, string>;
  navigateTo: (route: AppRoute, params?: Record<string, string>) => void;
  
  // Properties and Rooms Data (includes user-added listings)
  properties: Property[];
  rooms: Room[];
  addProperty: (property: Property) => void;
  
  // Favorites / Saved
  savedIds: string[];
  isSaved: (id: string) => boolean;
  toggleSave: (id: string, title?: string) => void;
  
  // Recently Viewed
  recentlyViewedIds: string[];
  trackRecentlyViewed: (id: string) => void;
  
  // Filter States
  propertyFilters: PropertyFilterState;
  setPropertyFilters: React.Dispatch<React.SetStateAction<PropertyFilterState>>;
  roomFilters: RoomFilterState;
  setRoomFilters: React.Dispatch<React.SetStateAction<RoomFilterState>>;
  resetPropertyFilters: () => void;
  resetRoomFilters: () => void;

  // Viewings
  viewingRequests: ViewingRequest[];
  submitViewingRequest: (req: Omit<ViewingRequest, 'id' | 'createdAt'>) => void;
  activeViewingModal: { isOpen: boolean; property?: Property | Room } | null;
  openViewingModal: (target: Property | Room) => void;
  closeViewingModal: () => void;

  // Auth & Profile
  user: UserProfile;
  setUser: React.Dispatch<React.SetStateAction<UserProfile>>;
  isAuthModalOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;

  // Toasts
  toasts: ToastItem[];
  showToast: (message: string, type?: 'success' | 'info' | 'warning') => void;
  dismissToast: (id: string) => void;

  // Currency
  currency: 'AED';
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Parse route from URL hash or path
  const parseCurrentUrl = (): { route: AppRoute; params: Record<string, string> } => {
    try {
      const hash = window.location.hash.replace('#', '') || '/';
      const [path, search] = hash.split('?');
      const searchParams = new URLSearchParams(search || '');
      const params: Record<string, string> = {};
      searchParams.forEach((v, k) => { params[k] = v; });

      if (path === '/' || path === '') return { route: 'home', params };
      if (path === '/buy') return { route: 'buy', params };
      if (path === '/rent') return { route: 'rent', params };
      if (path === '/rooms') return { route: 'rooms', params };
      if (path === '/new-projects') return { route: 'new-projects', params };
      if (path === '/areas') return { route: 'areas', params };
      if (path.startsWith('/areas/')) return { route: 'area-detail', params: { ...params, slug: path.replace('/areas/', '') } };
      if (path === '/agents') return { route: 'agents', params };
      if (path.startsWith('/agents/')) return { route: 'agent-detail', params: { ...params, slug: path.replace('/agents/', '') } };
      if (path.startsWith('/properties/')) return { route: 'property-detail', params: { ...params, slug: path.replace('/properties/', '') } };
      if (path.startsWith('/rooms/')) return { route: 'room-detail', params: { ...params, slug: path.replace('/rooms/', '') } };
      if (path === '/saved') return { route: 'saved', params };
      if (path === '/list-property') return { route: 'list-property', params };
      if (path === '/profile') return { route: 'profile', params };
    } catch {
      // Fallback
    }
    return { route: 'home', params: {} };
  };

  const initial = parseCurrentUrl();
  const [currentRoute, setCurrentRoute] = useState<AppRoute>(initial.route);
  const [routeParams, setRouteParams] = useState<Record<string, string>>(initial.params);

  // Properties state (Mock + user custom listings from localStorage)
  const [properties, setProperties] = useState<Property[]>(() => {
    try {
      const stored = localStorage.getItem('dar_dubai_custom_properties');
      if (stored) {
        const custom = JSON.parse(stored);
        return [...custom, ...MOCK_PROPERTIES];
      }
    } catch {
      // fallback
    }
    return MOCK_PROPERTIES;
  });

  const [rooms] = useState<Room[]>(MOCK_ROOMS);

  // Saved / Favourites
  const [savedIds, setSavedIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('dar_dubai_saved_ids');
      return stored ? JSON.parse(stored) : ['prop-1', 'prop-3'];
    } catch {
      return ['prop-1', 'prop-3'];
    }
  });

  // Recently Viewed
  const [recentlyViewedIds, setRecentlyViewedIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('dar_dubai_recently_viewed');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // User Profile
  const [user, setUser] = useState<UserProfile>(() => {
    try {
      const stored = localStorage.getItem('dar_dubai_user');
      return stored ? JSON.parse(stored) : {
        name: 'Arifur Rahman',
        email: 'arifur.fullstack@gmail.com',
        phone: '+971 52 345 6789',
        isLoggedIn: true,
      };
    } catch {
      return {
        name: 'Arifur Rahman',
        email: 'arifur.fullstack@gmail.com',
        phone: '+971 52 345 6789',
        isLoggedIn: true,
      };
    }
  });

  // Toasts
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  // Filter States
  const [propertyFilters, setPropertyFilters] = useState<PropertyFilterState>({
    sortBy: 'recommended',
    ...(initial.params.community ? { community: initial.params.community } : {}),
    ...(initial.params.bedrooms ? { bedrooms: initial.params.bedrooms } : {}),
    ...(initial.params.type ? { propertyType: initial.params.type } : {}),
  });

  const [roomFilters, setRoomFilters] = useState<RoomFilterState>({
    sortBy: 'recommended',
  });

  // Viewing Requests
  const [viewingRequests, setViewingRequests] = useState<ViewingRequest[]>(() => {
    try {
      const stored = localStorage.getItem('dar_dubai_viewings');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [activeViewingModal, setActiveViewingModal] = useState<{ isOpen: boolean; property?: Property | Room } | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Sync route on popstate
  useEffect(() => {
    const handlePopState = () => {
      const parsed = parseCurrentUrl();
      setCurrentRoute(parsed.route);
      setRouteParams(parsed.params);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (route: AppRoute, params: Record<string, string> = {}) => {
    setCurrentRoute(route);
    setRouteParams(params);

    // Build URL hash
    let path = '/';
    if (route === 'buy') path = '/buy';
    else if (route === 'rent') path = '/rent';
    else if (route === 'rooms') path = '/rooms';
    else if (route === 'new-projects') path = '/new-projects';
    else if (route === 'areas') path = '/areas';
    else if (route === 'area-detail' && params.slug) path = `/areas/${params.slug}`;
    else if (route === 'agents') path = '/agents';
    else if (route === 'agent-detail' && params.slug) path = `/agents/${params.slug}`;
    else if (route === 'property-detail' && params.slug) path = `/properties/${params.slug}`;
    else if (route === 'room-detail' && params.slug) path = `/rooms/${params.slug}`;
    else if (route === 'saved') path = '/saved';
    else if (route === 'list-property') path = '/list-property';
    else if (route === 'profile') path = '/profile';

    const searchObj = { ...params };
    delete searchObj.slug;
    const query = new URLSearchParams(searchObj).toString();
    const finalHash = `#${path}${query ? `?${query}` : ''}`;
    
    if (window.location.hash !== finalHash) {
      window.history.pushState(null, '', finalHash);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showToast = (message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      dismissToast(id);
    }, 3800);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const isSaved = (id: string) => savedIds.includes(id);

  const toggleSave = (id: string, title?: string) => {
    let next: string[];
    const willSave = !savedIds.includes(id);
    if (willSave) {
      next = [...savedIds, id];
      showToast(title ? `Saved "${title.substring(0, 24)}..." to favourites` : 'Saved to favourites', 'success');
    } else {
      next = savedIds.filter((item) => item !== id);
      showToast('Removed from favourites', 'info');
    }
    setSavedIds(next);
    try {
      localStorage.setItem('dar_dubai_saved_ids', JSON.stringify(next));
    } catch {
      // ignore
    }
  };

  const trackRecentlyViewed = (id: string) => {
    const filtered = recentlyViewedIds.filter((item) => item !== id);
    const next = [id, ...filtered].slice(0, 8);
    setRecentlyViewedIds(next);
    try {
      localStorage.setItem('dar_dubai_recently_viewed', JSON.stringify(next));
    } catch {
      // ignore
    }
  };

  const addProperty = (newProp: Property) => {
    setProperties((prev) => [newProp, ...prev]);
    try {
      const stored = localStorage.getItem('dar_dubai_custom_properties');
      const existing = stored ? JSON.parse(stored) : [];
      localStorage.setItem('dar_dubai_custom_properties', JSON.stringify([newProp, ...existing]));
    } catch {
      // ignore
    }
    showToast('Your property listing has been published!', 'success');
  };

  const submitViewingRequest = (req: Omit<ViewingRequest, 'id' | 'createdAt'>) => {
    const item: ViewingRequest = {
      ...req,
      id: 'req-' + Date.now(),
      createdAt: new Date().toISOString(),
    };
    const next = [item, ...viewingRequests];
    setViewingRequests(next);
    try {
      localStorage.setItem('dar_dubai_viewings', JSON.stringify(next));
    } catch {
      // ignore
    }
    showToast('Viewing requested! Agent will contact you via WhatsApp / Phone.', 'success');
  };

  const openViewingModal = (target: Property | Room) => {
    setActiveViewingModal({ isOpen: true, property: target });
  };

  const closeViewingModal = () => {
    setActiveViewingModal(null);
  };

  const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);

  const resetPropertyFilters = () => {
    setPropertyFilters({
      sortBy: 'recommended',
    });
  };

  const resetRoomFilters = () => {
    setRoomFilters({
      sortBy: 'recommended',
    });
  };

  return (
    <AppContext.Provider
      value={{
        currentRoute,
        routeParams,
        navigateTo,
        properties,
        rooms,
        addProperty,
        savedIds,
        isSaved,
        toggleSave,
        recentlyViewedIds,
        trackRecentlyViewed,
        propertyFilters,
        setPropertyFilters,
        roomFilters,
        setRoomFilters,
        resetPropertyFilters,
        resetRoomFilters,
        viewingRequests,
        submitViewingRequest,
        activeViewingModal,
        openViewingModal,
        closeViewingModal,
        user,
        setUser,
        isAuthModalOpen,
        openAuthModal,
        closeAuthModal,
        toasts,
        showToast,
        dismissToast,
        currency: 'AED',
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
