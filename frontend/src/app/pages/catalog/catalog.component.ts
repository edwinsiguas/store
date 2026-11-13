import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { OrderService } from '../../services/order.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {
  private productService = inject(ProductService);
  private orderService = inject(OrderService);
  private route = inject(ActivatedRoute);

  allProducts: Product[] = [];
  filteredProducts: Product[] = [];
  isLoading = true;
  errorFetching = false;

  // Filtros dinámicos
  activeCategory: string = 'Todos';
  searchQuery: string = '';
  sortBy: string = 'featured'; // 'featured', 'price-asc', 'price-desc', 'name'

  // Notificación de añadido al carrito
  addedProductId: number | null = null;
  toastMessage: string | null = null;

  readonly categories = ['Todos', 'Damas', 'Caballeros', 'Niños', 'Accesorios'];

  ngOnInit(): void {
    // Escuchar parámetros de consulta si el usuario llega desde la sección categorías de Inicio
    this.route.queryParams.subscribe(params => {
      if (params['category']) {
        const found = this.categories.find(c => c.toLowerCase() === params['category'].toLowerCase());
        if (found) {
          this.activeCategory = found;
        }
      }
      this.loadProducts();
    });
  }

  loadProducts(): void {
    this.isLoading = true;
    this.productService.getAllProducts().subscribe({
      next: (products) => {
        this.allProducts = products;
        this.applyFilters();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al conectar con la API de productos:', err);
        this.errorFetching = true;
        this.isLoading = false;
      }
    });
  }

  setCategory(category: string): void {
    this.activeCategory = category;
    this.applyFilters();
  }

  onSearchChange(): void {
    this.applyFilters();
  }

  onSortChange(): void {
    this.applyFilters();
  }

  applyFilters(): void {
    let result = [...this.allProducts];

    // 1. Filtrado por categoría dinámica: Damas, Caballeros, Niños, Accesorios
    if (this.activeCategory !== 'Todos') {
      result = result.filter(p => 
        p.category && p.category.toLowerCase() === this.activeCategory.toLowerCase()
      );
    }

    // 2. Búsqueda por texto (nombre o descripción)
    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase().trim();
      result = result.filter(p => 
        p.name.toLowerCase().includes(q) || 
        (p.description && p.description.toLowerCase().includes(q))
      );
    }

    // 3. Ordenamiento
    switch (this.sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'featured':
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }

    this.filteredProducts = result;
  }

  addToCart(product: Product): void {
    this.orderService.addToCart(product);
    this.addedProductId = product.id;
    this.toastMessage = `¡"${product.name}" añadido al carrito!`;

    setTimeout(() => {
      this.addedProductId = null;
      this.toastMessage = null;
    }, 2500);
  }

  onImageError(event: any): void {
    // Si la imagen local no carga por alguna razón, se usa un fallback estético de playa
    event.target.src = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=70';
  }
}
