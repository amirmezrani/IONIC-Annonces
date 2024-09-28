import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnnonceService {

  private apiUrl = 'http://localhost:3000/post';

  constructor(private http: HttpClient) { }

  getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    if (token) {
      return new HttpHeaders({ Authorization: `Bearer ${token}` });
    } else {
      return new HttpHeaders();
    }
  }


  createAnnonce(annonce: any) {
    const headers = this.getHeaders();
    return this.http.post(`${this.apiUrl}`, annonce, { headers });
  }

  getAllAnnonces() {
    const headers = this.getHeaders();
    return this.http.get(`${this.apiUrl}`, { headers });
  }

  getAllAnnoncesNews() {
    const headers = this.getHeaders();
    return this.http.get(`${this.apiUrl}/news`, { headers });
  }

  getAllAnnoncesSport() {
    const headers = this.getHeaders();
    return this.http.get(`${this.apiUrl}/sport`, { headers });
  }

  getAnnonceByUser() {
    const headers = this.getHeaders();
    return this.http.get(`${this.apiUrl}/user`, { headers });
  }


  getAnnonceById(annonceId: string) {
    const headers = this.getHeaders();
    return this.http.get(`${this.apiUrl}/${annonceId}`, { headers });
  }

  searchAnnonce(annonce: string) {
    const headers = this.getHeaders();
    return this.http.get(`${this.apiUrl}/find/${annonce}`, { headers });
  }

  updateAnnonce(annonceId: string, annonce: any) {
    const headers = this.getHeaders();
    return this.http.put(`${this.apiUrl}/${annonceId}`, annonce, { headers });
  }


  deleteAnnonce(annonceId: string) {
    const headers = this.getHeaders();
    return this.http.delete(`${this.apiUrl}/${annonceId}`, { headers });

  }


}
