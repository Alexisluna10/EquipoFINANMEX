import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

// Definimos interfaz para los usuarios
export interface User {
  id: number;
  name?: string;
  email: string;
  createdAt?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:3000'; // Cambia esto si tu backend corre en otra URL

  constructor(private http: HttpClient) {}

  // Obtener todos los usuarios
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users`);
  }

  // Crear un nuevo usuario
  createUser(data: { name: string; email: string }): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/users`, data);
  }
  // Obtener usuarios de la tabla 'usuarios'
  getUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/usuarios`);
  }
  // Función de login
login(email: string, password: string) {
  return this.http.post<any>(`${this.baseUrl}/api/login`, { email, password });
} 




}
