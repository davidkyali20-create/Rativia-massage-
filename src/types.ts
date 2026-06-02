export interface Service {
  id: string;
  name: string;
  price: number;
  duration: number; // in minutes
  description: string;
  benefits: string[];
  icon: string;
}

export interface Therapist {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  avatar: string;
  bio: string;
}

export interface CustomerDetails {
  fullName: string;
  email: string;
  phone: string;
  address?: string; // Standardized for door-to-door comfort
}

export interface Booking {
  id: string;
  serviceId: string;
  therapistId: string;
  date: string;
  time: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  status: 'pending' | 'confirmed' | 'dispatched' | 'completed' | 'cancelled';
  notes?: string;
  createdAt: string;
  totalPrice: number;
}

export interface SupportMessage {
  id: string;
  sender: 'customer' | 'concierge';
  text: string;
  timestamp: string;
}
