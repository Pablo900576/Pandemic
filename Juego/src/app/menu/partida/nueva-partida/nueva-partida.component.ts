import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CargarCiudadesService } from '../../../services/cargar-ciudades.service';
import { Ciudad } from '../../../models/ciudades.model';
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
    this.cargarCiudad.getCiudades().subscribe(response =>{
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

  zoomLevel: number = 1; // Nivel inicial de zoom
  maxZoom: number = 3; // Nivel máximo
  minZoom: number = 0.5; // Nivel mínimo

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
    return `scale(${this.zoomLevel})`;
  }

  }
