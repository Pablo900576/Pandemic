import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-perfil-usuario',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './perfil-usuario.component.html',
  styleUrl: './perfil-usuario.component.css'
})
export class PerfilUsuarioComponent {
  user = {
    username: 'Gamer123',
    level: 25,
    avatar: 'https://via.placeholder.com/150', // Puedes usar una URL de avatar
    achievements: [
      { name: 'First Blood', description: 'Ganaste tu primera partida' },
      { name: 'Sharpshooter', description: 'Alcanzaste un 80% de precisión' },
    ],
    friends: ['PlayerOne', 'DragonSlayer', 'AceHunter'],
    bio: '¡Amante de los juegos de aventuras y RPG!',
  };
}
