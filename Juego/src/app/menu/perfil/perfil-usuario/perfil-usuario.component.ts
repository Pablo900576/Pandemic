import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../models/usuarios.model';
import { PerfilService } from '../../../services/perfil.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-perfil-usuario',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './perfil-usuario.component.html',
  styleUrl: './perfil-usuario.component.css'
})
export class PerfilUsuarioComponent implements OnInit{
  usuario: Usuario;
  constructor(private perfilService: PerfilService) {
    this.usuario = this.perfilService.usuarioActual;
  };

  ngOnInit(): void{
    console.log(this.usuario);
  }
}
