export interface Room {
  id: string;
  name: string;
  type: 'Suite' | 'Penthouse' | 'Villa' | 'Chalet' | 'Guest Room' | 'Family Room' | 'Luxury Suite' | 'Accessible Room';
  pricePerNight: number;
  description: string;
  size: number; // in sq meters (m²)
  capacity: number; // guests
  bedType: string;
  features: string[];
  rating: number;
  reviewCount: number;
  images: string[];
  available: boolean;
}

export interface Booking {
  id: string;
  roomId: string; // references Room.id
  checkIn: string; // date string YYYY-MM-DD
  checkOut: string; // date string YYYY-MM-DD
  guests: number;
  totalAmount: number;
  fullName: string;
  email: string;
  status: 'pending' | 'confirmed';
  createdAt: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
  avatar: string;
}
