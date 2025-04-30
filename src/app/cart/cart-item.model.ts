import { Product } from '../ProductModule/models/product.model';

export interface CartItem {
  product: Product;
  quantity: number;
}
