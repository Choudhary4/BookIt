export interface Experience {
  _id: string;
  title: string;
  description: string;
  shortDescription: string;
  location: string;
  category: 'adventure' | 'cultural' | 'nature' | 'food' | 'wellness' | 'sightseeing';
  duration: string;
  images: string[];
  basePrice: number;
  rating: number;
  reviewCount: number;
  highlights: string[];
  included: string[];
  notIncluded: string[];
  slots?: Slot[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Slot {
  _id: string;
  date: string;
  startTime: string;
  endTime: string;
  availableSpots: number;
  totalSpots: number;
  price: number;
}

export interface CustomerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
}

export interface Pricing {
  basePrice: number;
  discount: number;
  promoCode: string | null;
  totalAmount: number;
}

export interface Booking {
  _id: string;
  experienceId: string;
  slotId: string;
  customerInfo: CustomerInfo;
  numberOfPeople: number;
  slotDetails: {
    date: string;
    startTime: string;
    endTime: string;
  };
  pricing: Pricing;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  bookingReference: string;
  createdAt: string;
  updatedAt: string;
}

export interface PromoCodeValidation {
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  discount: number;
  finalAmount: number;
}

export interface BookingFormData {
  experienceId: string;
  slotId: string;
  customerInfo: CustomerInfo;
  numberOfPeople: number;
  pricing: Pricing;
}
