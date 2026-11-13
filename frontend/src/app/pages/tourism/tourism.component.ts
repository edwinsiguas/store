import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TouristService } from '../../services/tourist.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tourism',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tourism.component.html',
  styleUrls: ['./tourism.component.scss']
})
export class TourismComponent implements OnInit {
  private touristService = inject(TouristService);
  
  attractions$: Observable<any[]> | undefined;

  ngOnInit(): void {
    this.attractions$ = this.touristService.getAllAttractions();
  }
}
