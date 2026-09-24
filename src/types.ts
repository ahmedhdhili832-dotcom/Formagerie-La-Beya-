export type Language = 'ar' | 'fr';

export type CheeseCategory = 'all' | 'affines' | 'frais' | 'pates_molles' | 'speciaux' | 'plateaux';

export interface CheeseProduct {
  id: string;
  nameFr: string;
  nameAr: string;
  category: CheeseCategory;
  descriptionFr: string;
  descriptionAr: string;
  unitFr: string; // e.g., "Pièce affinée (250g)" or "Au poids / Portion"
  unitAr: string; // e.g., "قطعة معتقة (250غ)" or "بالوزن / حصة"
  image: string;
  milkTypeFr: string;
  milkTypeAr: string;
  agingFr?: string;
  agingAr?: string;
  intensity: 1 | 2 | 3 | 4 | 5; // Taste intensity
  pairingsFr: string[];
  pairingsAr: string[];
  isBestSeller?: boolean;
  isArtisanSpecial?: boolean;
}

export interface CustomerReview {
  id: string;
  authorNameFr: string;
  authorNameAr: string;
  authorCityFr: string;
  authorCityAr: string;
  rating: number;
  commentFr: string;
  commentAr: string;
  dateFr: string;
  dateAr: string;
  favoriteCheeseFr: string;
  favoriteCheeseAr: string;
  avatar: string;
  verified: boolean;
}

export interface OrderItemEntry {
  productId: string;
  productNameFr: string;
  productNameAr: string;
  quantity: number;
  weightOrUnit: string;
}

export interface OrderSubmission {
  id?: string;
  createdAt: string;
  customerName: string;
  phone: string;
  city: string;
  address?: string;
  items: OrderItemEntry[];
  deliveryMethod: 'delivery' | 'pickup';
  notes?: string;
  status: 'new' | 'confirmed' | 'preparing' | 'delivered' | 'cancelled';
}
