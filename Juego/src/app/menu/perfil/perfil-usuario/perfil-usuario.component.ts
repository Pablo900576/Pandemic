import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Usuario } from '../../../models/usuarios.model';
import { AuthService } from '../../../services/auth.service';
import { PerfilService } from '../../../services/perfil.service';

@Component({
  selector: 'app-perfil-usuario',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './perfil-usuario.component.html',
  styleUrl: './perfil-usuario.component.css'
})
export class PerfilUsuarioComponent {
  usuario:Usuario = {
    avatar: '',
    nombre: '',
    apellido: '',
    email: '',
    nick: '',
    nivel: 0,
    nivelProgress: 0,
    logros: [],
    colegas: []
  };

  constructor(private authService: AuthService) {}

  cargarUsuario() {
    this.authService.login(this.usuario).subscribe((response) => {
      this.usuario = {
        nombre: response.nombre,
        nick: response.nick,
        email: response.email,
        avatar: 'https://th.bing.com/th/id/OIP.nkHYQR6Y2L-8VNEsG-S6FwHaHa?rs=1&pid=ImgDetMain',
        nivel: 5,
        nivelProgress: 75,
        logros: [
          { name: 'Maestro del Combate' },
          { name: 'Explorador Legendario' },
        ],
        colegas: [
          { name: 'Guerrero Azul' },
          { name: 'Mago Estelar' },
        ],
      };
    });
  }
}
