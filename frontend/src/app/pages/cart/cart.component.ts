import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  orderService = inject(OrderService);
  private router = inject(Router);

  cartItems$ = this.orderService.cart$;
  isProcessing = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  getTotal() {
    return this.orderService.getCartTotal();
  }

  removeItem(productId: number) {
    this.orderService.removeFromCart(productId);
  }

  checkout() {
    this.isProcessing = true;
    this.errorMessage = null;
    
    this.orderService.checkout().subscribe({
      next: (order) => {
        this.isProcessing = false;
        this.successMessage = `¡Tu pedido #${order.id} ha sido confirmado!`;
        this.orderService.clearCart();
        setTimeout(() => this.router.navigate(['/']), 3000);
      },
      error: (err) => {
        this.isProcessing = false;
        this.errorMessage = err.error?.message || 'Error al procesar la compra. Verifica el stock.';
        console.error(err);
      }
    });
  }
}
