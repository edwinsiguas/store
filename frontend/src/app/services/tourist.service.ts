import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { TouristAttraction } from '../models/tourist-attraction.model';

@Injectable({
  providedIn: 'root'
})
export class TouristService {
  private apiUrl = `${environment.apiUrl}/api/tourist-attractions`;

  private readonly fallbackAttractions: TouristAttraction[] = [
    {
      id: 1,
      name: 'Balneario de Canoas de Punta Sal',
      description: 'Considerada una de las playas más hermosas del Perú. Aguas cálidas todo el año (24°C promedio), arenas doradas y un mar calmo perfecto para nadar y relajarse en familia.',
      location: 'Km 1187 Panamericana Norte, Canoas de Punta Sal, Tumbes',
      imageUrl: 'assets/images/Gemini_Generated_Image_ (12).png'
    },
    {
      id: 2,
      name: 'Avistamiento de Ballenas Jorobadas',
      description: 'Espectáculo natural de julio a octubre. Gigantes cetáceos saltan y danzan en las aguas cálidas de Punta Sal en su ciclo de apareamiento y cría.',
      location: 'Caleta de Canoas de Punta Sal',
      imageUrl: 'assets/images/Gemini_Generated_Image_d1bxoxd1bxoxd1bx.png'
    },
    {
      id: 3,
      name: 'Pozas Termales y Lodos de Hervideros',
      description: 'Manantiales de aguas termales mineromedicinales y barros curativos naturales ricos en minerales para rejuvenecer la piel.',
      location: 'Zona termal de Bocapán - Canoas',
      imageUrl: 'assets/images/Gemini_Generated_Image_ (13).png'
    },
    {
      id: 4,
      name: 'Gastronomía Marina Tumbesina',
      description: 'Exquisito ceviche de conchas negras, majarisco tumbesino y langostas frescas obtenidas en pesca artesanal por los pescadores de Punta Sal.',
      location: 'Boulevard Gastronómico de Punta Sal',
      imageUrl: 'assets/images/Gemini_Generated_Image_ (16).png'
    }
  ];

  constructor(private http: HttpClient) { }

  getAllAttractions(): Observable<TouristAttraction[]> {
    return this.http.get<TouristAttraction[]>(this.apiUrl).pipe(
      catchError(err => {
        console.warn('Backend turístico offline, cargando datos locales de Punta Sal:', err);
        return of(this.fallbackAttractions);
      })
    );
  }

  getAttractionById(id: number): Observable<TouristAttraction> {
    return this.http.get<TouristAttraction>(`${this.apiUrl}/${id}`).pipe(
      catchError(() => {
        const found = this.fallbackAttractions.find(a => a.id === id) || this.fallbackAttractions[0];
        return of(found);
      })
    );
  }
}
