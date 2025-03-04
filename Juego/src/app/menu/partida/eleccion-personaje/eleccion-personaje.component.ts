import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PartidaService } from 'src/app/services/partida.service';

@Component({
  selector: 'app-eleccion-personaje',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './eleccion-personaje.component.html',
  styleUrl: './eleccion-personaje.component.css'
})
export class EleccionPersonajeComponent {
  constructor(private partidaService: PartidaService){}
  seleccionPersonaje(virusIniciales: number, virusRonda: number){
    this.partidaService.setDartosPersonajes(virusIniciales, virusRonda);
  }
}
