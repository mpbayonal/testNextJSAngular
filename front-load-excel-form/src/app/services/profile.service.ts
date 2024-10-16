import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Profile } from '../models/profile.model';

const baseUrl = 'http://localhost:3000/candidate/load';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Profile[]> {
    return this.http.get<Profile[]>(baseUrl);
  }

  create(data: any): Observable<any> {
    const formData = new FormData();
    console.log(data.file);
    formData.append('file', data.file);
    formData.append('name', data.name);
    formData.append('surname', data.surname);
    const headers = new HttpHeaders({ enctype: 'multipart/form-data' });
    return this.http.post(baseUrl, formData, { headers: headers });
  }
}
