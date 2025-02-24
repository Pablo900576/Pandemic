import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario} from '../models/usuarios.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { Ciudad } from '../models/ciudades.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl='http://localhost:5000/';
  usuarioActual = new BehaviorSubject<Usuario | null>(null); 

  constructor(private http: HttpClient) { }

  login(login: Usuario):Observable<any>{
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  return this.http.post(`${this.apiUrl}login`, JSON.stringify(login), {headers});
  }
  register(register: Usuario):Observable<any>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrl}/registro`, JSON.stringify(register), {headers});
  }
  nuevaPartida(email: string|null|undefined, ciudades: Ciudad[]):Observable<any>{
    return this.http.post(`${this.apiUrl}/nuevaPartida`, {email, ciudades});
  }
  setUsuario(usuario: Usuario): void {
    this.usuarioActual.next(usuario); 
  }

}
