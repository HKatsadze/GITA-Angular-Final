// Product 
export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;

  // rating 
  rating?: {
    rate: number;
    count: number;
  };
}

// პროდუქტის შექმნისთვის 
export interface CreateProductDto {
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

// პროდუქტის განახლებისთვის 
export interface UpdateProductDto extends CreateProductDto {}
