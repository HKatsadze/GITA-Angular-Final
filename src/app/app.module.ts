import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeComponent } from './pages/home/home.component';
import { CartComponent } from './pages/cart/cart.component';
import { AdminComponent } from './pages/admin/admin.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

import { LoaderComponent } from './shared/components/loader/loader.component';
import { ProductCardComponent } from './shared/components/product-card/product-card.component';
import { CartItemComponent } from './shared/components/cart-item/cart-item.component';

@NgModule({
  declarations: [
    AppComponent,

    // Pages
    HomeComponent,
    CartComponent,
    AdminComponent,
    NotFoundComponent,

    // Shared components
    LoaderComponent,
    ProductCardComponent,
    CartItemComponent,
  ],
  imports: [
    BrowserModule,

    // for HTTP requests
    HttpClientModule,

    // Routing
    AppRoutingModule,

    //Two-way binding - კალათაში რაოდენობისთვის
    FormsModule,

    //Reactive Forms admin ფორმისთვის
    ReactiveFormsModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
