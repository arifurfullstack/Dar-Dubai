export type PropertyPurpose = 'rent' | 'sale';

export type PropertyType = 
  | 'apartment'
  | 'villa'
  | 'townhouse'
  | 'penthouse'
  | 'studio'
  | 'duplex'
  | 'commercial'
  | 'room';

export type RentFrequency = 'yearly' | 'monthly' | 'weekly';

export type FurnishingStatus = 'furnished' | 'unfurnished' | 'partly-furnished';

export interface PropertyLocation {
  city: string;
  community: string;
  building?: string;
  subArea?: string;
  lat: number;
  lng: number;
}

export interface Property {
  id: string;
  slug: string;
  title: string;
  purpose: PropertyPurpose;
  propertyType: PropertyType;
  price: number;
  rentFrequency?: RentFrequency;
  currency: 'AED';
  bedrooms: number | 'studio';
  bathrooms: number;
  areaSqFt: number;
  location: PropertyLocation;
  description: string;
  images: string[];
  amenities: string[];
  furnished: FurnishingStatus;
  verified: boolean;
  featured: boolean;
  status: 'ready' | 'off-plan';
  listedBy: 'agent' | 'owner';
  agentId: string;
  reference: string;
  createdAt: string;
  cheques?: number;
  deposit?: number;
  completionYear?: number;
  floor?: number;
}

export type RoomType = 'private' | 'shared' | 'master' | 'partition' | 'bed-space' | 'studio';

export interface Room {
  id: string;
  slug: string;
  title: string;
  monthlyPrice: number;
  currency: 'AED';
  roomType: RoomType;
  location: string;
  community: string;
  building?: string;
  furnished: boolean;
  billsIncluded: boolean;
  availableFrom: string;
  preferredGender?: 'any' | 'male' | 'female';
  amenities: string[];
  images: string[];
  description: string;
  houseRules: string[];
  currentOccupants?: string;
  agentId: string;
  reference: string;
  lat: number;
  lng: number;
}

export interface Area {
  id: string;
  slug: string;
  name: string;
  image: string;
  description: string;
  rentalCount: number;
  saleCount: number;
  roomCount: number;
  avgRentPrice: string;
  avgSalePrice: string;
  popularTypes: string[];
  landmarks: string[];
  lat: number;
  lng: number;
}

export interface Agent {
  id: string;
  slug: string;
  name: string;
  title: string;
  image: string;
  agency: string;
  agencyLogo?: string;
  verified: boolean;
  experienceYears: number;
  languages: string[];
  specialities: string[];
  areas: string[];
  phone: string;
  whatsapp: string;
  email: string;
  activeSaleCount: number;
  activeRentCount: number;
  bio: string;
  rating: number;
}

export interface Project {
  id: string;
  slug: string;
  name: string;
  developer: string;
  location: string;
  startingPrice: number;
  completionDate: string;
  paymentPlan: string;
  image: string;
  propertyTypes: string[];
  handover: string;
  unitsAvailable: number;
  description: string;
  features: string[];
}

export interface PropertyFilterState {
  purpose?: PropertyPurpose;
  community?: string;
  propertyType?: string;
  minPrice?: number;
  maxPrice?: number;
  rentFrequency?: RentFrequency;
  bedrooms?: string; // 'studio', '1', '2', '3', '4', '5+'
  bathrooms?: string;
  furnishing?: string;
  amenities?: string[];
  status?: string; // 'ready', 'off-plan'
  listedBy?: string;
  verifiedOnly?: boolean;
  sortBy?: 'recommended' | 'newest' | 'price-asc' | 'price-desc' | 'area-desc';
}

export interface RoomFilterState {
  community?: string;
  roomType?: string;
  minPrice?: number;
  maxPrice?: number;
  billsIncluded?: boolean;
  furnished?: boolean;
  preferredGender?: string;
  sortBy?: 'recommended' | 'price-asc' | 'price-desc';
}

export interface ViewingRequest {
  id: string;
  propertyId: string;
  propertyTitle: string;
  name: string;
  phone: string;
  email: string;
  preferredDate: string;
  preferredTime: string;
  message: string;
  createdAt: string;
}
