import { User } from '../../core/services/auth.service';
import { Review } from './review.model'; // Review modelini içe aktar

export interface Seller {
  id: number;
  fullName: string;
  email: string;
}
export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  stock: number;
  category: string;
  rating: {
    rate: number;
    count: number;
  };

  status: 'PENDING' | 'ACTIVE' | 'BANNED';
  seller: User;
}
