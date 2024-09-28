import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface LoginResponse {
  accessToken: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/user';

  constructor(private http: HttpClient) { }

  getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    if (token) {
      return new HttpHeaders({ Authorization: `Bearer ${token}` });
    } else {
      return new HttpHeaders();
    }
  }

  createUser(user: any) {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  loginUser(userData: any): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/auth`, userData);
  }

  getUserById(userId: string) {
    return this.http.get(`${this.apiUrl}/${userId}`);
  }


  getCurrentUser() {
    const headers = this.getHeaders();
    return this.http.get(`${this.apiUrl}/curent`, { headers });
  }

  getAllUsers() {
    return this.http.get(`${this.apiUrl}`);
  }

  updateUser(user: any) {
    return this.http.put(`${this.apiUrl}/`, user);
  }

  deleteUser(userId: string) {
    return this.http.delete(`${this.apiUrl}/${userId}`);
  }
}
