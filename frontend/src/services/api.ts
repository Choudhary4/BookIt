import axios from 'axios';
import type {
  Experience,
  BookingFormData,
  Booking,
  PromoCodeValidation,
} from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Experience APIs
export const experienceService = {
  getAll: async (filters?: {
    category?: string;
    location?: string;
    minPrice?: number;
    maxPrice?: number;
  }) => {
    const response = await api.get<{
      success: boolean;
      count: number;
      data: Experience[];
    }>('/experiences', { params: filters });
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get<{
      success: boolean;
      data: Experience;
    }>(`/experiences/${id}`);
    return response.data;
  },
};

// Booking APIs
export const bookingService = {
  create: async (bookingData: BookingFormData) => {
    const response = await api.post<{
      success: boolean;
      message: string;
      data: Booking;
    }>('/bookings', bookingData);
    return response.data;
  },

  getByReference: async (reference: string) => {
    const response = await api.get<{
      success: boolean;
      data: Booking;
    }>(`/bookings/${reference}`);
    return response.data;
  },
};

// Promo Code APIs
export const promoService = {
  validate: async (code: string, amount: number) => {
    const response = await api.post<{
      success: boolean;
      data: PromoCodeValidation;
    }>('/promo/validate', { code, amount });
    return response.data;
  },
};

export default api;
