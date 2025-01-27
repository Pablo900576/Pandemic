import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CargarCiudadesService } from '../../../../services/cargar-ciudades.service';
import { Ciudad } from '../../../../models/ciudades.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nueva-partida',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './nueva-partida.component.html',
  styleUrl: './nueva-partida.component.css'
})
export class NuevaPartidaComponent {

  ciudades: Ciudad[] = [];
  virusColores = ['green', 'red', 'blue', 'yellow']
  constructor(private cargarCiudad: CargarCiudadesService) { }

  ngOnInit() {
    this.cargarCiudad.getCiudadesMundo().subscribe(response => {
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

  cantidadRonda: number = 3;
  cantidadInicial: number = 5;
  numeroRonda: number = 0;
  zoomLevel: number = 1;
  maxZoom: number = 3;
  minZoom: number = 0.5;
  translateX: number = 0;
  translateY: number = 0;
  isDragging: boolean = false;
  startX: number = 0;
  startY: number = 0;

  virus(x: any){
    for(let i = 0; i < x; i++){
      this.incrementarVirus();
    }
  }

  virusIniciales(){
    this.virus(this.cantidadInicial);
  }

  saltarRonda() {
    this.numeroRonda++;
    this.virus(this.cantidadRonda);
  }

  incrementarVirus() {
    // Paso 1: Obtener una ciudad aleatoria
    const ciudadAleatoria = this.obtenerCiudadesAleatorias();

    // Paso 2: Seleccionar un virus aleatorio
    const virusColores = ['green', 'red', 'blue', 'yellow'];
    const virusAleatorio = virusColores[Math.floor(Math.random() * virusColores.length)];

    // Paso 3: Incrementar el virus en la ciudad seleccionada
    if (ciudadAleatoria) {
      ciudadAleatoria.diseaseCount[virusAleatorio as keyof Ciudad['diseaseCount']]++;
      console.log(`El virus ${virusAleatorio} ha sido incrementado en ${ciudadAleatoria.name}`);
    }
  }

  obtenerCiudadesAleatorias(): Ciudad | undefined {
    const randomIndex = Math.floor(Math.random() * this.ciudades.length);
    return this.ciudades[randomIndex];
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

}
