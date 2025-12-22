import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../../core/models/product.model';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {
  // პროდუქტის გადაცემა
  @Input() product!: Product;

  // კალათაში დამატება
  @Output() addToCart = new EventEmitter<Product>();
}
