import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CartItem } from '../../core/models/cart-item.model';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  // კალათის items observable — ავტომატურად განახლდებისთვის 
  items$: Observable<CartItem[]> = this.cartService.getCart$();

  // total observable — ითვლის მთლიან თანხის ჯამს
  total$ = this.cartService.getTotal$(this.items$);

  constructor(private cartService: CartService) {}

  onRemove(productId: number): void {
    this.cartService.removeFromCart(productId);
  }

  onQuantityChange(e: { productId: number; quantity: number }): void {
    this.cartService.updateQuantity(e.productId, e.quantity);
  }
}
