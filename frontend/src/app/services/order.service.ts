import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { Product } from '../models/product.model';
import { Order, OrderRequest } from '../models/order.model';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = `${environment.apiUrl}/api/orders`;
  
  private cartItems: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>([]);
  public cart$ = this.cartSubject.asObservable();

  public itemCount$ = this.cart$.pipe(
    map(items => items.reduce((acc, item) => acc + item.quantity, 0))
  );

  public totalAmount$ = this.cart$.pipe(
    map(items => items.reduce((acc, item) => acc + (item.product.price * item.quantity), 0))
  );

  constructor(private http: HttpClient) { 
    this.loadCartFromStorage();
  }

  private loadCartFromStorage(): void {
    try {
      const stored = localStorage.getItem('zeciak_cart');
      if (stored) {
        this.cartItems = JSON.parse(stored);
        this.cartSubject.next(this.cartItems);
      }
    } catch {
      this.cartItems = [];
    }
  }

  private persistCart(): void {
    try {
      localStorage.setItem('zeciak_cart', JSON.stringify(this.cartItems));
    } catch (e) {
      console.warn('Error persisting cart:', e);
    }
    this.cartSubject.next(this.cartItems);
  }

  addToCart(product: Product, quantity = 1): void {
    const existingIndex = this.cartItems.findIndex(i => i.product.id === product.id);
    if (existingIndex > -1) {
      this.cartItems[existingIndex].quantity += quantity;
    } else {
      this.cartItems.push({ product, quantity });
    }
    this.persistCart();
  }

  updateQuantity(productId: number, quantity: number): void {
    const item = this.cartItems.find(i => i.product.id === productId);
    if (item) {
      item.quantity = Math.max(1, quantity);
      this.persistCart();
    }
  }

  removeFromCart(productId: number): void {
    this.cartItems = this.cartItems.filter(item => item.product.id !== productId);
    this.persistCart();
  }

  clearCart(): void {
    this.cartItems = [];
    this.persistCart();
  }

  getCartItems(): CartItem[] {
    return [...this.cartItems];
  }

  getCartTotal(): number {
    return this.cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  }

  checkout(): Observable<Order> {
    const orderRequest: OrderRequest = {
      items: this.cartItems.map(item => ({
        productId: item.product.id,
        quantity: item.quantity
      }))
    };
    return this.http.post<Order>(this.apiUrl, orderRequest);
  }

  getMyOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/my-orders`);
  }
}
