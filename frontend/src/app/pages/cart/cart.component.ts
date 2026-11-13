import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { OrderService, CartItem } from '../../services/order.service';
import { AuthService } from '../../services/auth.service';
import { Order } from '../../models/order.model';

export type PaymentMethod = 'card' | 'yape';
export type DeliveryMode = 'pickup' | 'delivery';

// Validador de fecha de vencimiento MM/AA
function expiryValidator(control: AbstractControl): ValidationErrors | null {
  if (!control.value) return null;
  const value = control.value.trim();
  if (!/^\d{2}\/\d{2}$/.test(value)) {
    return { invalidFormat: true };
  }
  const [monthStr, yearStr] = value.split('/');
  const month = parseInt(monthStr, 10);
  const year = parseInt('20' + yearStr, 10);
  if (month < 1 || month > 12) {
    return { invalidMonth: true };
  }
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;
  if (year < currentYear || (year === currentYear && month < currentMonth)) {
    return { expired: true };
  }
  return null;
}

// Validador de número de tarjeta (16 dígitos)
function cardNumberValidator(control: AbstractControl): ValidationErrors | null {
  if (!control.value) return null;
  const clean = control.value.replace(/\D/g, '');
  if (clean.length !== 16) {
    return { invalidLength: true };
  }
  return null;
}

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  orderService = inject(OrderService);
  authService = inject(AuthService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  cartItems$ = this.orderService.cart$;

  // Estado del Modal y Pasarela
  isPaymentModalOpen = false;
  selectedMethod: PaymentMethod = 'card';
  selectedDeliveryMode: DeliveryMode = 'pickup';
  isProcessing = false;
  processingStep = '';
  modalErrorMessage: string | null = null;
  pageErrorMessage: string | null = null;

  // Estado del Comprobante / Voucher
  showVoucher = false;
  completedOrder: Order | null = null;
  paymentMethodUsed = '';
  deliveryInfoUsed = '';
  voucherDate: Date = new Date();
  purchasedItems: CartItem[] = [];
  purchasedTotal = 0;

  // Formularios Reactivos
  cardForm!: FormGroup;
  yapeForm!: FormGroup;
  deliveryForm!: FormGroup;

  ngOnInit(): void {
    this.initForms();
  }

  private initForms(): void {
    this.cardForm = this.fb.group({
      cardNumber: ['', [Validators.required, cardNumberValidator]],
      cardHolder: ['', [Validators.required, Validators.minLength(3)]],
      cardExpiry: ['', [Validators.required, expiryValidator]],
      cardCvv: ['', [Validators.required, Validators.pattern(/^\d{3,4}$/)]]
    });

    this.yapeForm = this.fb.group({
      phone: ['', [Validators.required, Validators.pattern(/^9\d{8}$/)]],
      approvalCode: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]]
    });

    this.deliveryForm = this.fb.group({
      address: [''],
      phone: ['', [Validators.pattern(/^9\d{8}$/)]]
    });
  }

  setDeliveryMode(mode: DeliveryMode): void {
    this.selectedDeliveryMode = mode;
    const addressCtrl = this.deliveryForm.get('address');
    if (mode === 'delivery') {
      addressCtrl?.setValidators([Validators.required, Validators.minLength(5)]);
    } else {
      addressCtrl?.clearValidators();
    }
    addressCtrl?.updateValueAndValidity();
  }

  getTotal(): number {
    return this.orderService.getCartTotal();
  }

  increaseQuantity(item: CartItem): void {
    this.orderService.updateQuantity(item.product.id, item.quantity + 1);
  }

  decreaseQuantity(item: CartItem): void {
    if (item.quantity > 1) {
      this.orderService.updateQuantity(item.product.id, item.quantity - 1);
    } else {
      this.removeItem(item.product.id);
    }
  }

  removeItem(productId: number): void {
    this.orderService.removeFromCart(productId);
  }

  // Formateo y visualización en vivo de la tarjeta
  onCardNumberInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const raw = input.value.replace(/\D/g, '').slice(0, 16);
    const formatted = raw.match(/.{1,4}/g)?.join(' ') || raw;
    this.cardForm.get('cardNumber')?.setValue(formatted, { emitEvent: false });
  }

  onExpiryInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    let raw = input.value.replace(/\D/g, '').slice(0, 4);
    if (raw.length >= 2) {
      raw = raw.slice(0, 2) + '/' + raw.slice(2);
    }
    this.cardForm.get('cardExpiry')?.setValue(raw, { emitEvent: false });
  }

  get cardBrand(): 'visa' | 'mastercard' | 'generic' {
    const num = (this.cardForm?.get('cardNumber')?.value || '').replace(/\D/g, '');
    if (num.startsWith('4')) return 'visa';
    if (/^(5[1-5]|2[2-7])/.test(num)) return 'mastercard';
    return 'generic';
  }

  get maskedCardNumber(): string {
    const num = (this.cardForm?.get('cardNumber')?.value || '').replace(/\D/g, '');
    const padded = num.padEnd(16, '•');
    return (padded.match(/.{1,4}/g) || []).join(' ');
  }

  get displayCardHolder(): string {
    const val = this.cardForm?.get('cardHolder')?.value;
    return val && val.trim().length > 0 ? val.toUpperCase() : 'NOMBRE DEL TITULAR';
  }

  get displayCardExpiry(): string {
    const val = this.cardForm?.get('cardExpiry')?.value;
    return val && val.trim().length > 0 ? val : 'MM/AA';
  }

  // Apertura y control del Modal
  openPaymentModal(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }
    if (this.orderService.getCartItems().length === 0) {
      return;
    }
    this.modalErrorMessage = null;
    this.pageErrorMessage = null;
    this.isProcessing = false;
    this.isPaymentModalOpen = true;
  }

  closePaymentModal(): void {
    if (this.isProcessing) return;
    this.isPaymentModalOpen = false;
    this.modalErrorMessage = null;
  }

  switchMethod(method: PaymentMethod): void {
    if (this.isProcessing) return;
    this.selectedMethod = method;
    this.modalErrorMessage = null;
  }

  // Procesamiento simulado y llamada real al backend
  submitPayment(): void {
    // 1. Validar método de pago
    let paymentDesc = '';
    if (this.selectedMethod === 'card') {
      if (this.cardForm.invalid) {
        this.cardForm.markAllAsTouched();
        return;
      }
      const brand = this.cardBrand === 'visa' ? 'Visa' : (this.cardBrand === 'mastercard' ? 'Mastercard' : 'Tarjeta');
      const rawNum = (this.cardForm.get('cardNumber')?.value || '').replace(/\D/g, '');
      const last4 = rawNum.slice(-4) || '9012';
      paymentDesc = `${brand} terminada en •••• ${last4}`;
    } else if (this.selectedMethod === 'yape') {
      if (this.yapeForm.invalid) {
        this.yapeForm.markAllAsTouched();
        return;
      }
      const code = this.yapeForm.get('approvalCode')?.value || '';
      paymentDesc = `Yape / Plin (Cód. #${code})`;
    }

    // 2. Validar modalidad de entrega
    if (this.selectedDeliveryMode === 'delivery') {
      if (this.deliveryForm.invalid) {
        this.deliveryForm.markAllAsTouched();
        return;
      }
    }

    // Determinar descripción de entrega para el voucher
    let deliveryDesc = '';
    if (this.selectedDeliveryMode === 'pickup') {
      deliveryDesc = 'Recojo en Tienda (Av. Panamericana Norte Km 1187, Canoas de Punta Sal)';
    } else {
      const addr = this.deliveryForm.get('address')?.value?.trim() || '';
      const phone = this.deliveryForm.get('phone')?.value?.trim() || '';
      deliveryDesc = `Delivery a Domicilio: ${addr}${phone ? ' (Tel: ' + phone + ')' : ''}`;
    }

    // Resguardar copia de los ítems para el comprobante antes de vaciar el carrito
    this.purchasedItems = [...this.orderService.getCartItems()];
    this.purchasedTotal = this.getTotal();

    this.isProcessing = true;
    this.modalErrorMessage = null;
    this.processingStep = 'Conectando con pasarela segura SSL 256-bit...';

    // Etapa 2 de la simulación
    setTimeout(() => {
      if (!this.isProcessing) return;
      this.processingStep = 'Validando autorización y fondos bancarios...';
    }, 750);

    // Ejecución transaccional real contra Spring Boot
    setTimeout(() => {
      this.orderService.checkout().subscribe({
        next: (order) => {
          this.isProcessing = false;
          this.isPaymentModalOpen = false;
          this.completedOrder = order;
          this.paymentMethodUsed = paymentDesc;
          this.deliveryInfoUsed = deliveryDesc;
          this.voucherDate = new Date();
          this.orderService.clearCart();
          this.showVoucher = true;
        },
        error: (err) => {
          this.isProcessing = false;
          this.modalErrorMessage = err.error?.message || 'Error al procesar la compra. Verifica el stock disponible de los productos.';
          console.error('Error during checkout:', err);
        }
      });
    }, 1500);
  }

  goToCatalog(): void {
    this.showVoucher = false;
    this.router.navigate(['/catalog']);
  }

  printVoucher(): void {
    window.print();
  }
}
