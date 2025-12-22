import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { CartItem } from '../../../core/models/cart-item.model';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
})
export class CartItemComponent {
  // Input() — კალათის ელემენტის გადაცემა
  @Input() item!: CartItem;

  // Output() — წაშლის დროს ვატყობინებთ productId-ს გადავცემთ
  @Output() remove = new EventEmitter<number>();

  // Output() — რაოდენობის ცვლილებაზე ვცვლით quantity-ს
  @Output() quantityChange = new EventEmitter<{ productId: number; quantity: number }>();

  // localQuantity გამოიყენება ngModel-ისთვის -> two-way binding
  localQuantity = 1;

  ngOnChanges(changes: SimpleChanges): void {
    // როცა item იცვლება, localQuantity-ს ვაახლებთ
    if (changes['item'] && this.item) {
      this.localQuantity = this.item.quantity;
    }
  }

  onQuantityChange(): void {
    // შემოწმება 0 ზე და უარყევითი მნიშვნელობებისთვის
    const safeQty = Math.max(1, Number(this.localQuantity) || 1);
    this.localQuantity = safeQty;

    this.quantityChange.emit({
      productId: this.item.product.id,
      quantity: safeQty,
    });
  }
}
