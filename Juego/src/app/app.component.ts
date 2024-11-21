import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NuevaPartida2Component } from "./menu/partida/elegir-partida/nueva-partida2/nueva-partida2.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NuevaPartida2Component, NuevaPartida2Component],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Juego';
}
