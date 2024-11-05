import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {CdkAccordionModule} from '@angular/cdk/accordion';
@Component({
  selector: 'app-informacion',
  standalone: true,
  imports: [RouterLink, CdkAccordionModule],
  templateUrl: './informacion.component.html',
  styleUrl: './informacion.component.css'
})
export class InformacionComponent {
  items = [
    { label: 'Personajes', description: 'Habrá distintos tipos de personajes los cuales influirán en la jugabilidad (aún por desarrollar)' },
    { label: 'Niveles de dificultad', description: '3 tipos distintos de niveles: Facil, medio y dificil; influirán en como empiezas la partida, como se expanden los virus, etc...(aún por desarrollar)' },
    { label: 'Ciudades', description: '48 distintas ciudades en donde cada una tiene ciertas ciudades colindantes.' },
    { label: 'Virus', description: '3 distintos tipos de virus, con 3 distintos niveles y 1 vacuna para cada uno. Si una ciudad supera el nivel 3 de cualquier virus ocurrirá un brote, es decir, se expande ese virus a las ciudades colindantes.' },
    { label: 'Tienda', description: 'En desarrollo...' },
    { label: 'Cómo terminar la partida', description: 'Al superar x nivel de contagio, pierdes. Al completar las 3 vacunas, ganas.' },
  ];
  
  expandedIndex = 0;
}


