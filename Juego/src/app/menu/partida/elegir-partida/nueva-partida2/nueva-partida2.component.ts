import { Component } from '@angular/core';
import { CargarCiudadesService } from '../../../../services/cargar-ciudades.service';
import { Ciudad } from '../../../../models/ciudades.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nueva-partida2',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nueva-partida2.component.html',
  styleUrl: './nueva-partida2.component.css'
})
export class NuevaPartida2Component {
  ciudades: Ciudad[] = [];
  constructor(private cargarCiudad: CargarCiudadesService){}

  ngOnInit(){
    this.cargarCiudad.getCiudadesEuropa().subscribe(response =>{
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

