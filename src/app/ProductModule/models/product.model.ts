import { Review } from './review.model'; // Review modelini içe aktar

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  rating: {
    rate: number;
    count: number;
  };
}
