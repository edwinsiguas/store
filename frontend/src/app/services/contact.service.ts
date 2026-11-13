import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, timeout } from 'rxjs';
import { environment } from '../../environments/environment';
import { ContactMessage } from '../models/contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = `${environment.apiUrl}/api/contact`;

  constructor(private http: HttpClient) { }

  sendMessage(message: ContactMessage): Observable<ContactMessage> {
    return this.http.post<ContactMessage>(this.apiUrl, message).pipe(
      timeout(15000)
    );
  }
}
