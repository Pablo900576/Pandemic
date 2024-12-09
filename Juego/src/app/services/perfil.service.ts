import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuarios.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

    constructor() {

    }
    usuarioActual: Usuario={
      
    }; 

    setUsuario(usuario: Usuario) 
    {
      this.usuarioActual=usuario; 
    }
  
}

