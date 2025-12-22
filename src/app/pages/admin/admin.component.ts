import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ProductService } from '../../core/services/product.service';
import { Product, CreateProductDto, UpdateProductDto } from '../../core/models/product.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  products: Product[] = [];
  loading = true;

  //შეტყობინებები
  message = '';
  errorMessage = '';

 
  selectedId: number | null = null;

  // Reactive Form — პროდუქტის დამატება/რედაქტირება
  form = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    price: [0, [Validators.required, Validators.min(0.01)]],
    description: ['', [Validators.required, Validators.minLength(10)]],
    image: ['', [Validators.required]],
    category: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  // API-დან პროდუქტების ჩამოტვირთვა (admin list)
  fetchProducts(): void {
    this.loading = true;
    this.productService.getProducts().subscribe({
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

  // პროდუქტების რედაქტირება
  startEdit(p: Product): void {
    this.selectedId = p.id;
    this.message = '';
    this.errorMessage = '';

    this.form.patchValue({
      title: p.title,
      price: p.price,
      description: p.description,
      image: p.image,
      category: p.category,
    });
  }

  // ფორმის reset და create 
  resetForm(): void {
    this.selectedId = null;
    this.form.reset({
      title: '',
      price: 0,
      description: '',
      image: '',
      category: '',
    });
    this.message = '';
    this.errorMessage = '';
  }

  // Submit
  submit(): void {
    this.message = '';
    this.errorMessage = '';

    if (this.form.invalid) {
      // ვალიდაციისთვის ყველა field-ს touch-ს ვუკეთებთ შეცდომების ჩვენებისთვის
      this.form.markAllAsTouched();
      return;
    }

    const payload = this.form.value as CreateProductDto;

    // ✅ Create (POST)
    if (this.selectedId === null) {
      this.productService.addProduct(payload).subscribe({
        next: () => {
          this.message = 'პროდუქტი წარმატებით დაემატა';
          this.fetchProducts();
          this.resetForm();
        },
        error: () => {
          this.errorMessage = 'პროდუქტის დამატება ვერ მოხერხდა';
        },
      });

      return;
    }

    // Update 
    const updatePayload: UpdateProductDto = payload;
    this.productService.updateProduct(this.selectedId, updatePayload).subscribe({
      next: () => {
        this.message = `პროდუქტი განახლდა, id=${this.selectedId}.`;
        this.fetchProducts();
        this.resetForm();
      },
      error: () => {
        this.errorMessage = 'პროდუქტის განახლება ვერ მოხერხდა';
      },
    });
  }

  // Delete 
  deleteProduct(id: number): void {
    this.message = '';
    this.errorMessage = '';

    this.productService.deleteProduct(id).subscribe({
      next: () => {
        this.fetchProducts();
 
      },
      error: () => {
        this.errorMessage = 'პროდუქტის წაშლა ვერ მოხერხდა';
      },
    });
  }

  // შემოწმება edit რეჟიმია თუ არა
  get isEditMode(): boolean {
    return this.selectedId !== null;
  }
}
