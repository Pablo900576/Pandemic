import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuarios.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PerfilService {
  private apiUrl = 'http://localhost:5000/';
  usuarioActual = new BehaviorSubject<Usuario | null>(this.getUserData());

  constructor(private http: HttpClient) {}

  // Obtener los datos de usuario desde localStorage
  getUserData(): Usuario | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  // Actualizar el usuario actual
  setUserData(user: Usuario) {
    localStorage.setItem('user', JSON.stringify(user));
    this.usuarioActual.next(user);
  }

  // Verificar si el usuario está logueado
  isLoggedIn(): boolean {
    return this.getUserData() !== null;
  }

  // Obtener el token de localStorage
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Obtener la información del usuario utilizando el token
  getUsuarioProfile(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`
    });

    return this.http.get(`${this.apiUrl}perfil`, { headers });
  }
}
