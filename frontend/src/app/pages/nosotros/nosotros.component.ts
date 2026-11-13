import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-nosotros',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './nosotros.component.html',
  styleUrls: ['./nosotros.component.scss']
})
export class NosotrosComponent {
  // Estadísticas de impacto
  stats = [
    { value: '+5,000', label: 'Viajeros y Clientes Felices' },
    { value: '24/7', label: 'Atención y Pedidos Online' },
    { value: '100%', label: 'Algodón & Fibras de Calidad' },
    { value: '300+', label: 'Días de Sol en Punta Sal' }
  ];

  // Pilares y Valores
  values = [
    {
      icon: 'fa-solid fa-umbrella-beach',
      title: 'Identidad Costera',
      description: 'Nacimos en Canoas de Punta Sal, inspirados por la calidez de su gente, sus olas cristalinas y sus atardeceres mágicos.'
    },
    {
      icon: 'fa-solid fa-gem',
      title: 'Calidad Premium',
      description: 'Prendas con filtro UV50+, telas de secado ultra rápido y algodón pima peruano resistente al sol y al salitre.'
    },
    {
      icon: 'fa-solid fa-hand-holding-heart',
      title: 'Turismo Sostenible',
      description: 'Colaboramos activamente con artesanos de Tumbes y promovemos la preservación de la fauna marina (ballenas y tortugas).'
    },
    {
      icon: 'fa-solid fa-clock',
      title: 'Disponibilidad Continua 24/7',
      description: 'Infraestructura tecnológica moderna para que adquieras tu equipamiento playero en cualquier momento y lugar.'
    }
  ];

  onImageError(event: any): void {
    event.target.src = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=70';
  }
}
