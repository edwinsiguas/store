import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductService } from '../../services/product.service';
import { OrderService } from '../../services/order.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private productService = inject(ProductService);
  private orderService = inject(OrderService);

  featuredProducts$!: Observable<Product[]>;
  addedProductId: number | null = null;

  categories = [
    {
      name: 'Damas',
      slug: 'Damas',
      tagline: 'Bikinis, salidas de baño & vestidos vaporosos',
      image: 'assets/images/Gemini_Generated_Image_ (12).png',
      count: 'Colección Verano'
    },
    {
      name: 'Caballeros',
      slug: 'Caballeros',
      tagline: 'Bañadores surf, camisas de lino & polos pima',
      image: 'assets/images/Gemini_Generated_Image_d1bxoxd1bxoxd1bx.png',
      count: 'Estilo Náutico'
    },
    {
      name: 'Niños',
      slug: 'Niños',
      tagline: 'Protección solar UV50+, ponchos & bañadores',
      image: 'assets/images/Gemini_Generated_Image_nl1awdnl1awdnl1a.png',
      count: 'Línea Infantil'
    },
    {
      name: 'Accesorios',
      slug: 'Accesorios',
      tagline: 'Lentes UV400, sombreros toquilla & bolsos',
      image: 'assets/images/Gemini_Generated_Image_ (13).png',
      count: 'Esenciales Playa'
    }
  ];

  ngOnInit(): void {
    this.featuredProducts$ = this.productService.getFeaturedProducts();
  }

  addToCart(product: Product): void {
    this.orderService.addToCart(product);
    this.addedProductId = product.id;
    setTimeout(() => {
      this.addedProductId = null;
    }, 2000);
  }

  onImageError(event: any): void {
    event.target.src = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=70';
  }
}
