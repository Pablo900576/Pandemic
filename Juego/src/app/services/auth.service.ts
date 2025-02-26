import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario} from '../models/usuarios.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { Ciudad } from '../models/ciudades.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/';  // 



  usuarioActual = new BehaviorSubject<Usuario | null>(this.getUserData());

  constructor(private http: HttpClient, private router: Router) {}

  // Iniciar sesión
  login(login: Usuario): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrl}auth/login`, JSON.stringify(login), { headers });
  }

  // Registrar usuario
  register(register: Usuario): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrl}auth/registro`, JSON.stringify(register), { headers });
  }

  // Guardar usuario en el BehaviorSubject y en localStorage
  setUserData(user: Usuario) {
    localStorage.setItem('user', JSON.stringify(user));
    this.usuarioActual.next(user);  // 
  }

  // Obtener usuario almacenado
  getUserData(): Usuario | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  // Verificar si hay un usuario autenticado
  isLoggedIn(): boolean {
    return this.getUserData() !== null;
  }

  logout() {
    localStorage.removeItem('user');
    this.usuarioActual.next(null);  //
  }
}