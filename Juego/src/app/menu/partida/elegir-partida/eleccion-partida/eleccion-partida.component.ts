import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Ciudad } from 'src/app/models/ciudades.model';
import { Usuario } from 'src/app/models/usuarios.model';
import { CargarCiudadesService } from 'src/app/services/cargar-ciudades.service';
import { PartidaService } from 'src/app/services/partida.service';
import { PerfilService } from 'src/app/services/perfil.service';

@Component({
  selector: 'app-eleccion-partida',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './eleccion-partida.component.html',
  styleUrl: './eleccion-partida.component.css'
})
export class EleccionPartidaComponent {
  usuario: Usuario;
  ciudades: Ciudad[]=[]

  constructor(private perfilService: PerfilService, private ciudadesService:CargarCiudadesService,private partidaService: PartidaService){
    if(perfilService.isLoggedIn()){
      this.usuario= perfilService.getUserData()!;
      ciudadesService.getCiudadesEuropa().subscribe(response=>{
        this.ciudades= response;
      })
    }else{
      console.log("Usuario no logueado");
    }
  }
  

  crearPartida(){
    this.partidaService.crearPartida(this.usuario.email!, this.ciudades).subscribe(
      (response) =>{
        console.log("Respuesta del servidor: ", response);
      },
      (error)=>{
        console.error("Error al crear la partida: ", error)
      }
    );
  }

}
