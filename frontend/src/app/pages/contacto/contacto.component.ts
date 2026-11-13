import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContactService } from '../../services/contact.service';
import { ContactMessage } from '../../models/contact.model';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.scss']
})
export class ContactoComponent {
  private contactService = inject(ContactService);

  formData: ContactMessage = {
    name: '',
    email: '',
    phone: '',
    subject: 'Consulta sobre Catálogo Playero',
    message: ''
  };

  isSubmitting = false;
  submittedSuccess = false;
  errorMessage = '';

  activeFaqIndex: number | null = null;

  faqs = [
    {
      question: '¿La tienda online ZeciaK Store funciona las 24 horas del día?',
      answer: '¡Sí! Nuestra plataforma web transaccional está disponible 24/7, los 365 días del año. Puedes navegar por nuestro catálogo, realizar compras seguras con tarjeta o transferencia y hacer seguimiento a tus pedidos en cualquier momento.'
    },
    {
      question: '¿Hacen entregas en hoteles y balnearios de Canoas de Punta Sal?',
      answer: 'Por supuesto. Si estás de vacaciones o hospedado en un resort o casa de playa en Punta Sal, Zorritos, Máncora o Bocapán, ofrecemos entrega express coordinada directamente hasta la recepción de tu alojamiento.'
    },
    {
      question: '¿Cómo garantizan la seguridad de mis datos y transacciones?',
      answer: 'Implementamos arquitectura Spring Boot con Spring Security y tokens criptográficos JWT (JSON Web Tokens), asegurando que todas las peticiones y transacciones HTTP se transmitan cifradas y blindadas.'
    },
    {
      question: '¿Qué tallas y protección ofrecen las prendas de catálogo?',
      answer: 'Nuestras prendas de Damas, Caballeros y Niños cuentan con certificación de protección solar UV50+ y telas de secado rápido diseñadas especialmente para resistir el sol intenso y la brisa marina del norte peruano.'
    }
  ];

  toggleFaq(index: number): void {
    this.activeFaqIndex = this.activeFaqIndex === index ? null : index;
  }

  onSubmit(): void {
    if (!this.formData.name || !this.formData.email || !this.formData.message) {
      this.errorMessage = 'Por favor completa todos los campos requeridos (*).';
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';
    this.submittedSuccess = false;

    this.contactService.sendMessage(this.formData).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.submittedSuccess = true;
        this.formData = {
          name: '',
          email: '',
          phone: '',
          subject: 'Consulta sobre Catálogo Playero',
          message: ''
        };
      },
      error: (err) => {
        this.isSubmitting = false;
        this.errorMessage = 'No se pudo guardar tu mensaje. Verifica que el backend y PostgreSQL estén activos e inténtalo nuevamente.';
        console.error('Error al guardar el mensaje de contacto:', err);
      }
    });
  }
}
