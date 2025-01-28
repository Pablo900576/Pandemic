import { Component } from '@angular/core';
import { CargarCiudadesService } from '../../../../services/cargar-ciudades.service';
import { Ciudad } from '../../../../models/ciudades.model';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import {ScrollingModule} from '@angular/cdk/scrolling';


type Virus = "green" | "red" | "blue" | "yellow";

@Component({
  selector: 'app-nueva-partida2',
  standalone: true,
  imports: [CommonModule, RouterLink, ScrollingModule],
  templateUrl: './nueva-partida2.component.html',
  styleUrl: './nueva-partida2.component.css'
})
export class NuevaPartida2Component {
  ciudades: Ciudad[] = [];
  constructor(private cargarCiudad: CargarCiudadesService) {

  }



  cantidadRonda: number = 3;
  cantidadInicial = 5;

  numeroRonda: number = 0;
  zoomLevel: number = 1;
  maxZoom: number = 3;
  minZoom: number = 0.5;
  translateX: number = 0;
  translateY: number = 0;
  isDragging: boolean = false;
  startX: number = 0;
  startY: number = 0;
  ciudadesInfectadas: any[] = [];



  ngOnInit() {
    this.cargarCiudad.getCiudadesEuropa().subscribe(response => {
      this.ciudades = response
      this.virusIniciales();
    })
  }

  ciudadSeleccionada: any = null;
  selectCity(ciudad: any) {
    this.ciudadSeleccionada = ciudad;
  }

  closeCityInfo() {
    this.ciudadSeleccionada = null;
  }



  zoomIn() {
    if (this.zoomLevel < this.maxZoom) {
      this.zoomLevel += 0.1;
    }
  }

  zoomOut() {
    if (this.zoomLevel > this.minZoom) {
      this.zoomLevel -= 0.1;
    }
  }

  get zoomTransform(): string {
    return `scale(${this.zoomLevel}) translate(${this.translateX}px, ${this.translateY}px)`;
  }

  onMouseDown(event: MouseEvent) {
    this.isDragging = true;

    this.startX = event.clientX - this.translateX;
    this.startY = event.clientY - this.translateY;

  }

  onMouseMove(event: MouseEvent) {
    if (this.isDragging) {
      this.translateX = event.clientX - this.startX;
      this.translateY = event.clientY - this.startY;
    }
  }

  async onMouseUp() {
    this.isDragging = false;
  }


  getCityCoordinates(cityName: string): { x: number, y: number } | null {
    const city = this.ciudades.find(ciudad => ciudad.name === cityName);
    return city ? city.coordinates : null;
  }

  isConnectionRendered(source: string, target: string): boolean {
    return this.renderedConnections.has(`${source}-${target}`) ||
      this.renderedConnections.has(`${target}-${source}`);
  }

  renderedConnections: Set<string> = new Set();

  virus(x: any) {
    for (let i: number = 0; i < x; i++) {
      this.incrementarVirus();
    }
  }

  virusIniciales() {
    this.virus(this.cantidadInicial);
  }

  saltarRonda() {
    this.numeroRonda++;
    this.virus(this.cantidadRonda);

    this.incrementarVirusEnCiudadesConectadas();
  }
  incrementarVirusEnCiudadesConectadas() {
    this.ciudades.forEach(ciudad => {
      (Object.keys(ciudad.diseaseCount) as Virus[]).forEach(virus => {
        if (ciudad.diseaseCount[virus] === 3) {
          console.log(`Ciudad ${ciudad.name} tiene un ${virus} con valor 3`);

          ciudad.connectedCities.forEach(conectada => {
            const ciudadConectada = this.ciudades.find(c => c.name === conectada);

            if (ciudadConectada) {
              if (ciudadConectada.diseaseCount[virus] == 3) {
                console.log(`${ciudadConectada.name} ya tiene nivel 3 de virus ${virus}`)
              } else {
                ciudadConectada.diseaseCount[virus]++;
                console.log(`Incrementado el virus ${virus} en la ciudad ${ciudadConectada.name}`);
              }
            }
          });
        }
      });
    });
  }
  obtenerVirus(diseaseCount: { [key: string]: number }): { color: string; cantidad: number }[] {
    return Object.entries(diseaseCount)
      .filter(([_, cantidad]) => cantidad > 0)
      .map(([color, cantidad]) => ({ color, cantidad }));
  }

  incrementarVirus() {

    const ciudadAleatoria = this.obtenerCiudadesAleatorias();


    const virus = ['green', 'red', 'blue', 'yellow'];
    const virusAleatorio = virus[Math.floor(Math.random() * virus.length)];

    if (ciudadAleatoria) {
      if(ciudadAleatoria.diseaseCount[virusAleatorio as keyof Ciudad['diseaseCount']] === 3) {
        const nuevosVirus = virus.filter(v => v !== virusAleatorio);
        const nuevoVirus = nuevosVirus[Math.floor(Math.random() * nuevosVirus.length)];
        console.log(`El virus ${virusAleatorio} ya está en nivel 3 en ${ciudadAleatoria.name}. Cambiando a ${nuevoVirus}`);

        ciudadAleatoria.diseaseCount[nuevoVirus as keyof Ciudad['diseaseCount']]++;
        console.log(`El virus ${nuevoVirus} ha sido incrementado en ${ciudadAleatoria.name}`);
      } else {
        ciudadAleatoria.diseaseCount[virusAleatorio as keyof Ciudad['diseaseCount']]++;
        console.log(`El virus ${virusAleatorio} ha sido incrementado en ${ciudadAleatoria.name}`);
      }
      if (!this.ciudadesInfectadas.some(ciudad => ciudad.name === ciudadAleatoria.name)) {
        this.ciudadesInfectadas.push(ciudadAleatoria);
      }
    }
  }



  obtenerCiudadesAleatorias(): Ciudad | undefined {
    const randomIndex = Math.floor(Math.random() * this.ciudades.length);
    return this.ciudades[randomIndex];
  }
}