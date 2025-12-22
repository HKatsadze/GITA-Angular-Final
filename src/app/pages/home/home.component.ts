import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../../core/services/product.service';
import { CartService } from '../../core/services/cart.service';
import { Product } from '../../core/models/product.model';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  loading = true;
  errorMessage = '';

  // subscription-ს გაუქმება კომპონენტის დახურვისას
  private destroy$ = new Subject<void>();

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    // GET: პროდუქტების სიის წამოღება API-დან
    this.productService
      .getProducts()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.products = data;
          this.loading = false;
        },
        error: () => {
          this.errorMessage = 'პროდუქტების ჩატვირთვა ვერ მოხერხდა.';
          this.loading = false;
        },
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  //პროდუქტის დამატება კალათაში (CartService-ში)
  onAddToCart(product: Product): void {
    this.cartService.addToCart(product, 1);
  }
}
