import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Product, CreateProductDto, UpdateProductDto } from '../models/product.model';

@Injectable({
  providedIn: 'root', 
})
export class ProductService {
  private readonly baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // ყველა პროდუქტის სია
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/products`);
  }

  // პროდუქტი ID-ის მიხედვით
  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/products/${id}`);
  }

  //პროდუქტის დამატება
  addProduct(payload: CreateProductDto): Observable<Product> {
    return this.http.post<Product>(`${this.baseUrl}/products`, payload);
  }

  // პროდუქტის განახლება
  updateProduct(id: number, payload: UpdateProductDto): Observable<Product> {
    return this.http.put<Product>(`${this.baseUrl}/products/${id}`, payload);
  }

  // პროდუქტის წაშლა
  deleteProduct(id: number): Observable<unknown> {
    return this.http.delete(`${this.baseUrl}/products/${id}`);
  }
}
