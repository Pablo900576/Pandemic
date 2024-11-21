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
export class NuevaPartidaComponent{

  ciudades: Ciudad[] = [];
  constructor(private cargarCiudad: CargarCiudadesService){}

  ngOnInit(){
    this.cargarCiudad.getCiudadesMundo().subscribe(response =>{
      this.ciudades = response
    })
  }

  ciudadSeleccionada: any = null; 
  selectCity(ciudad: any) {
    this.ciudadSeleccionada = ciudad;
  }

  closeCityInfo() {
    this.ciudadSeleccionada = null;
  }

  zoomLevel: number = 1;
  maxZoom: number = 3; 
  minZoom: number = 0.5;
  translateX: number = 0;
  translateY: number = 0;
  isDragging: boolean = false;
  startX: number = 0;
  startY: number = 0;

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


}
