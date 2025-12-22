import { Component } from '@angular/core';
import { CartService } from './core/services/cart.service';
import { ThemeService } from './core/services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  //კალათაში არსებული ნივთების რაოდენობა
  cartCount$ = this.cartService.count$;

  constructor(
    private cartService: CartService,
    private themeService: ThemeService
  ) {}

  // Dark-Light
  toggleTheme(): void {
    this.themeService.toggle();
  }
}
