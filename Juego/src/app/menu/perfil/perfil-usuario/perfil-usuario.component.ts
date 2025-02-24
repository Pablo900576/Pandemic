import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../models/usuarios.model';
import { PerfilService } from '../../../services/perfil.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-perfil-usuario',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './perfil-usuario.component.html',
  styleUrl: './perfil-usuario.component.css'
})
export class PerfilUsuarioComponent implements OnInit{
  usuario: Usuario;
  avatarUrl: string = "https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/e40b6ea6361a1abe28f32e7910f63b66/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg";

  constructor(private perfilService: PerfilService, private router: Router) {
    // Si el usuario no está logueado, redirigir al login
    if (!this.perfilService.isLoggedIn()) {
      this.router.navigate(['/login']);
    } else {
      this.usuario = this.perfilService.getUserData()!;
    }
  }

  ngOnInit(): void {
   
    if (!this.usuario || !this.usuario.nombre || !this.usuario.nick) {
      console.log("Datos de usuario no disponibles. Recuperando desde el servidor...");
      this.perfilService.getUsuarioProfile().subscribe(
        (data) => {
          this.usuario = data;
          this.perfilService.setUserData(this.usuario);
        },
        (error) => {
          console.error("Error al obtener el perfil:", error);
        }
      );
    } else {
      console.log("Perfil cargado desde localStorage");
    }


    if(!this.usuario.nombre){
      this.usuario.nombre = "Sin nombre";
    }
    if(!this.usuario.nick){
      this.usuario.nick = "Player190243";
    }
    if(!this.usuario.avatar){
      this.usuario.avatar= this.avatarUrl;
    }
  };
    

  // Cerrar sesión
  cerrarSesion() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    window.location.reload()
  }
}
