export type ProductCategory = 'Todos' | 'Damas' | 'Caballeros' | 'Niños' | 'Accesorios';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
  category: string;
  featured?: boolean;
  rating?: number;
}
