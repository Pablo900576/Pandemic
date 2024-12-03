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
  usuario: Usuario={
    nombre:'',
    apellido:'',
    email:'',
  }

  user = {
    username: this.usuario.nombre,
    avatar: 'https://th.bing.com/th/id/OIP.nkHYQR6Y2L-8VNEsG-S6FwHaHa?rs=1&pid=ImgDetMain',
    level: 5,
    levelProgress: 75,
    achievements: [
      { name: 'Maestro del Combate' },
      { name: 'Explorador Legendario' }
    ],
    friends: [
      { name: 'Guerrero Azul' },
      { name: 'Mago Estelar' }
    ]
  };
}
