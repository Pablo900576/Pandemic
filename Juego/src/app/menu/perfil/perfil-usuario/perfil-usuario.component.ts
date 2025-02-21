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
    if(this.usuario.nombre==undefined && this.usuario.nick==undefined){
      console.log(this.usuario);
      this.usuario.nombre="Sin nombre";
      this.usuario.avatar="https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/e40b6ea6361a1abe28f32e7910f63b66/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg"
      this.usuario.nick="Player190243";
      this.usuario.nivel = 1;
      this.usuario.logros=[
        {name: "No tienes una mierda"}
      ];
      this.usuario.colegas=[
        {name: "No tienes amigos"}
      ];
      console.log("adios")
    }else{
      console.log("hola")
      this.usuario.avatar="https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/e40b6ea6361a1abe28f32e7910f63b66/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg"
    }
  }
}
