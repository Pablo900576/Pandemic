import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuarios.model';


@Injectable({
  providedIn: 'root'
})
export class PerfilService {

    constructor() {}
    usuarioActual: Usuario={
      
    }; 

    setUsuario(usuario: Usuario) 
    {
      this.usuarioActual=usuario; 
    }
  
}

