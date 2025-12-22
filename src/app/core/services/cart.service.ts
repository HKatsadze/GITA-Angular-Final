import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { CartItem } from '../models/cart-item.model';
import { Product } from '../models/product.model';
import { LOCAL_STORAGE } from '../tokens/storage.token';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  // ✅ localStorage-ში შესანახი გასაღები
  private readonly storageKey = 'student_ecommerce_cart';

  // ✅ BehaviorSubject ინახავს კალათის მიმდინარე მდგომარეობას და ნებისმიერ კომპონენტს შეუძლია გამოწერა
  private readonly cartSubject = new BehaviorSubject<CartItem[]>(this.loadFromStorage());

  // ✅ count$ — კალათაში საერთო რაოდენობა (ბეჯისთვის Header-ში)
  readonly count$: Observable<number> = this.cartSubject.asObservable().pipe(
    map((items) => items.reduce((sum, x) => sum + x.quantity, 0))
  );

  constructor(
    // ✅ @Inject — მოთხოვნისთვის: localStorage-ს ინჟექტი token-ით
    @Inject(LOCAL_STORAGE) private storage: Storage
  ) {}

  // ✅ კალათის observable (UI რომ ავტომატურად განახლდეს)
  getCart$(): Observable<CartItem[]> {
    return this.cartSubject.asObservable();
  }

  // ✅ Snapshot — სწრაფი წვდომა მიმდინარე მნიშვნელობაზე (ზოგჯერ საჭიროა)
  private get snapshot(): CartItem[] {
    return this.cartSubject.value;
  }

  // ✅ პროდუქტის დამატება კალათაში
  addToCart(product: Product, quantity: number = 1): void {
    const items = [...this.snapshot];
    const found = items.find((x) => x.product.id === product.id);

    if (found) {
      found.quantity += quantity;
    } else {
      items.push({ product, quantity });
    }

    this.persist(items);
  }

  // ✅ კალათიდან წაშლა
  removeFromCart(productId: number): void {
    const items = this.snapshot.filter((x) => x.product.id !== productId);
    this.persist(items);
  }

  // ✅ რაოდენობის შეცვლა (two-way binding-ით cart-ში)
  updateQuantity(productId: number, quantity: number): void {
    const safeQty = Math.max(1, Number(quantity) || 1);

    const items = [...this.snapshot];
    const found = items.find((x) => x.product.id === productId);
    if (!found) return;

    found.quantity = safeQty;
    this.persist(items);
  }

  // ამოწმებს პროდუქტი უკვე კალათაშია თუ არა 
  isInCart(productId: number): boolean {
    return this.snapshot.some((x) => x.product.id === productId);
  }

  // მთლიანი თანხის გამოთვლა
  getTotal$(items$: Observable<CartItem[]>): Observable<number> {
    return items$.pipe(
      map((items) => items.reduce((sum, x) => sum + x.product.price * x.quantity, 0))
    );
  }

  // localStorage-ში შენახვა და subject-ის განახლება
  private persist(items: CartItem[]): void {
    this.cartSubject.next(items);
    this.storage.setItem(this.storageKey, JSON.stringify(items));
  }

  // localStorage-დან ჩატვირთვა აპის გაშვებისას
  private loadFromStorage(): CartItem[] {
    try {
      const raw = this.storage.getItem(this.storageKey);
      if (!raw) return [];
      return JSON.parse(raw) as CartItem[];
    } catch {
      return [];
    }
  }
}
