import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = `${environment.apiUrl}/api/products`;

  // Catálogo base con los assets locales para disponibilidad 24/7 y visualización offline
  private readonly fallbackProducts: Product[] = [
    // DAMAS
    {
      id: 1,
      name: 'Bikini Tropical Canoas de Punta Sal',
      description: 'Bikini exclusivo de 2 piezas elaborado con tela de secado rápido y protección UV 50+. Diseño floral inspirado en el atardecer norteño.',
      price: 129.90,
      stock: 15,
      category: 'Damas',
      imageUrl: 'assets/images/Gemini_Generated_Image_ (12).png',
      featured: true,
      rating: 4.9
    },
    {
      id: 2,
      name: 'Salida de Baño Crochet Artesanal',
      description: 'Prenda ligera tejida a mano por artesanas costeras de Tumbes. Elegancia y frescura para caminar por la orilla del mar.',
      price: 89.90,
      stock: 8,
      category: 'Damas',
      imageUrl: 'assets/images/Gemini_Generated_Image_ (13).png',
      featured: true,
      rating: 4.8
    },
    {
      id: 3,
      name: 'Vestido Playero Brisa de Punta Sal',
      description: 'Vestido vaporoso 100% lino y algodón suave. Ideal para veladas frente al mar, cenas en resorts y paseos al atardecer.',
      price: 145.00,
      stock: 10,
      category: 'Damas',
      imageUrl: 'assets/images/Gemini_Generated_Image_ (16).png',
      featured: false,
      rating: 4.7
    },
    {
      id: 4,
      name: 'Bañador Enterizo Océano Pacífico',
      description: 'Traje de baño de una sola pieza con soporte anatómico y corte estilizador. Resiste el cloro y el agua salina.',
      price: 135.50,
      stock: 12,
      category: 'Damas',
      imageUrl: 'assets/images/Gemini_Generated_Image_ (1).png',
      featured: false,
      rating: 4.9
    },

    // CABALLEROS
    {
      id: 5,
      name: 'Short Bañador Surfista Punta Sal',
      description: 'Short playero técnico con cordón ajustable y bolsillo impermeable. Secado ultra veloz y tejido elástico 4-way stretch.',
      price: 79.90,
      stock: 20,
      category: 'Caballeros',
      imageUrl: 'assets/images/Gemini_Generated_Image_d1bxoxd1bxoxd1bx.png',
      featured: true,
      rating: 4.9
    },
    {
      id: 6,
      name: 'Camisa de Lino Palmeras & Sol',
      description: 'Camisa casual con botones de coco y corte suelto. Diseñada especialmente para el clima cálido constante de Canoas de Punta Sal.',
      price: 110.00,
      stock: 14,
      category: 'Caballeros',
      imageUrl: 'assets/images/Gemini_Generated_Image_ (6).png',
      featured: true,
      rating: 4.8
    },
    {
      id: 7,
      name: 'Polo Algodón Pima ZeciaK Edición Océano',
      description: 'Polo 100% Algodón Pima Peruano de máxima suavidad y frescura. Estampado serigráfico que rinde homenaje a las olas norteñas.',
      price: 65.00,
      stock: 25,
      category: 'Caballeros',
      imageUrl: 'assets/images/Gemini_Generated_Image_ (7).png',
      featured: false,
      rating: 4.6
    },
    {
      id: 8,
      name: 'Short Playero Ballena Jorobada',
      description: 'Bañador masculino con motivo ilustrado de las ballenas jorobadas de Canoas de Punta Sal. Forro interior de malla suave.',
      price: 85.00,
      stock: 11,
      category: 'Caballeros',
      imageUrl: 'assets/images/Gemini_Generated_Image_ (9).png',
      featured: false,
      rating: 4.7
    },

    // NIÑOS
    {
      id: 9,
      name: 'Conjunto Playero Protección UV 50+ Niños',
      description: 'Conjunto infantil de 2 piezas (polo manga larga y short) con máxima protección solar certificada para juegos seguros bajo el sol.',
      price: 75.00,
      stock: 18,
      category: 'Niños',
      imageUrl: 'assets/images/Gemini_Generated_Image_nl1awdnl1awdnl1a.png',
      featured: true,
      rating: 5.0
    },
    {
      id: 10,
      name: 'Ropa de Baño Sirenita de Punta Sal',
      description: 'Ropa de baño enteriza con volantes y colores vibrantes. Confeccionada con telas suaves que protegen la piel infantil.',
      price: 69.90,
      stock: 15,
      category: 'Niños',
      imageUrl: 'assets/images/Gemini_Generated_Image_nl1awdnl1awdnl1a (2).png',
      featured: false,
      rating: 4.8
    },
    {
      id: 11,
      name: 'Poncho Toalla Infantil Cangrejito',
      description: 'Toalla tipo poncho 100% microfibra absorbente con capucha de personaje marino. Seca a los pequeños en segundos.',
      price: 55.00,
      stock: 22,
      category: 'Niños',
      imageUrl: 'assets/images/Gemini_Generated_Image_mfptvumfptvumfpt.png',
      featured: false,
      rating: 4.9
    },

    // ACCESORIOS
    {
      id: 12,
      name: 'Lentes de Sol Polarizados Marina UV400',
      description: 'Gafas de sol polarizadas con marco flotante ultraligero y filtro UV400 categoría 3. Visión nítida bajo el sol tropical.',
      price: 49.90,
      stock: 30,
      category: 'Accesorios',
      imageUrl: 'assets/images/Gemini_Generated_Image_ (12).png',
      featured: true,
      rating: 4.8
    },
    {
      id: 13,
      name: 'Sombrero de Paja Toquilla Norteño',
      description: 'Sombrero clásico de ala ancha tejido por maestros artesanos. Bloquea el 98% de radiación solar con distinción.',
      price: 65.00,
      stock: 16,
      category: 'Accesorios',
      imageUrl: 'assets/images/Gemini_Generated_Image_ (13).png',
      featured: false,
      rating: 4.9
    },
    {
      id: 14,
      name: 'Bolso Playero Ecológico Yute ZeciaK',
      description: 'Espacioso bolso de playa confeccionado en fibras naturales de yute con forro interior impermeable y asas reforzadas.',
      price: 58.00,
      stock: 28,
      category: 'Accesorios',
      imageUrl: 'assets/images/Gemini_Generated_Image_ (16).png',
      featured: false,
      rating: 4.7
    },
    {
      id: 15,
      name: 'Tomatodo Térmico Acero Inoxidable 750ml',
      description: 'Botella térmica con aislamiento al vacío de doble pared. Conserva tus bebidas heladas hasta por 24 horas bajo el calor costero.',
      price: 42.00,
      stock: 35,
      category: 'Accesorios',
      imageUrl: 'assets/images/Gemini_Generated_Image_d1bxoxd1bxoxd1bx.png',
      featured: false,
      rating: 4.9
    }
  ];

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl).pipe(
      catchError(err => {
        console.warn('Backend no disponible en ' + this.apiUrl + '. Utilizando catálogo local ZeciaK Store:', err);
        return of(this.fallbackProducts);
      })
    );
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`).pipe(
      catchError(err => {
        const found = this.fallbackProducts.find(p => p.id === id) || this.fallbackProducts[0];
        return of(found);
      })
    );
  }

  getProductsByCategory(category: string): Observable<Product[]> {
    if (!category || category.toLowerCase() === 'todos') {
      return this.getAllProducts();
    }
    return this.http.get<Product[]>(`${this.apiUrl}/category/${category}`).pipe(
      catchError(() => {
        const filtered = this.fallbackProducts.filter(
          p => p.category.toLowerCase() === category.toLowerCase()
        );
        return of(filtered);
      })
    );
  }

  getFeaturedProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/featured`).pipe(
      catchError(() => {
        return of(this.fallbackProducts.filter(p => p.featured));
      })
    );
  }
}
