import { Product } from './product.model';

// კალათაში ელემენტი
export interface CartItem {
  product: Product;
  quantity: number;
}
