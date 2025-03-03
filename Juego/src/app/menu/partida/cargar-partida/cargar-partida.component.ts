import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuarios.model';
import { PartidaService } from 'src/app/services/partida.service';
import { PerfilService } from 'src/app/services/perfil.service';

@Component({
  selector: 'app-cargar-partida',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cargar-partida.component.html',
  styleUrl: './cargar-partida.component.css'
})
export class CargarPartidaComponent implements OnInit {
  partidas: any[] = [];
  emailUsuario: string; 
  usuario: Usuario;
  constructor(private partidaService: PartidaService, private router: Router, private perfilService: PerfilService) {
    if(this.perfilService.isLoggedIn()){
      this.usuario= perfilService.getUserData()!;
      this.emailUsuario= this.usuario.email!;
    }else{
        console.log("Sin loguear")
    }
  }

  ngOnInit(): void {
    this.obtenerPartidas();
  }

  // Obtener partidas del usuario
  obtenerPartidas(): void {
    this.partidaService.listarPartidas(this.emailUsuario).subscribe({
      next: (response) => {
        this.partidas = response.partidas;
      },
      error: (error) => {
        console.error("Error al obtener partidas:", error);
      }
    });
  }

  // Seleccionar una partida y navegar al juego
  seleccionarPartida(partida_id: number): void {
    this.router.navigate(['/menu/partida/elegirPartida/partida2']);
  }
}