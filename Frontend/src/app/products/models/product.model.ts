import { User } from '../../core/services/auth.service';
import { Review } from './review.model'; // Review modelini içe aktar

export interface Seller {
  id: number;
  fullName: string;
  email: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  stock: number;
  category?: string;  // Optional hale getirilirse daha güvenli
  rating?: number;    // Optional
  ratingCount?: number; // Optional
  status: 'PENDING' | 'ACTIVE' | 'BANNED';
  seller?: Seller; // Optional (?)
}
