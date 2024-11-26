import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario} from '../models/usuarios.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl='http://localhost/';

  constructor(private http: HttpClient) { }

  login(login: Usuario):Observable<any>{
  return this.http.post(this.apiUrl+'inicio.php', JSON.stringify(login));

  }
  register(register: Usuario):Observable<any>{
    return this.http.post(this.apiUrl+'insertar_usuario.php', JSON.stringify(register));
  }



}
