import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CargarCiudadesService } from '../../../../services/cargar-ciudades.service';
import { Ciudad } from '../../../../models/ciudades.model';
import { RouterLink } from '@angular/router';
import { ScrollingModule } from '@angular/cdk/scrolling';

type Virus = "green" | "red" | "blue" | "yellow";

@Component({
  selector: 'app-nueva-partida',
  standalone: true,
  imports: [CommonModule, RouterLink, ScrollingModule],
  templateUrl: './nueva-partida.component.html',
  styleUrl: './nueva-partida.component.css'
})
export class NuevaPartidaComponent {

  ciudades: Ciudad[] = [];
  constructor(private cargarCiudad: CargarCiudadesService) { }

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
  ciudadesInfectadas: any[] = [];
  accionesRonda=3;

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
      console.log(",")
    }
  
    saltarRonda() {
      this.numeroRonda++;
      this.virus(this.cantidadRonda);
      console.log(",")
  
    }
    incrementarVirusEnCiudadesConectadas() {
      this.ciudades.forEach(ciudad => {
        (Object.keys(ciudad.diseaseCount) as Virus[]).forEach(virus => {
          if (ciudad.diseaseCount[virus] === 3 && ciudad.brotes[virus] == false) {
            ciudad.brotes[virus]=true;
  
            console.log(`Ciudad ${ciudad.name} en brote del virus ${virus}`);
            
  
            ciudad.connectedCities.forEach(conectada => {
              const ciudadConectada = this.ciudades.find(c => c.name === conectada);
  
              if (ciudadConectada) {
                if (ciudadConectada.diseaseCount[virus] >= 3) {
                  console.log(`La ciudad conectada de ${ciudad.name}: ${ciudadConectada.name} ya tiene nivel 3 de virus ${virus}`)
                } else {
                  ciudadConectada.diseaseCount[virus]++;
                  console.log(`Incrementado el virus ${virus} en la ciudad conectada de ${ciudad.name}: ${ciudadConectada.name}`);
                  ciudad.brotes[virus]=false;
                }
              }
            });
          }else if(ciudad.brotes[virus]==true){
            console.log(`Ciudad ${ciudad.name} ya tuvo un brote del virus ${virus}`);
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
      const manolo=ciudadAleatoria;
  
      const virus = ['green', 'red', 'blue', 'yellow'];
      const virusAleatorio = virus[Math.floor(Math.random() * virus.length)];
  
      if (ciudadAleatoria) {
        if (ciudadAleatoria.diseaseCount[virusAleatorio as keyof Ciudad['diseaseCount']] == 3 && ciudadAleatoria.brotes[virusAleatorio as keyof Ciudad['brotes']]==false) {
  
  
          this.incrementarVirusEnCiudadesConectadas();
        
        
        }else if(ciudadAleatoria.diseaseCount[virusAleatorio as keyof Ciudad['diseaseCount']] == 3 && ciudadAleatoria.brotes[virusAleatorio as keyof Ciudad['brotes']]==true){
          
  
          
          const ciudadAleatoria= this.ciudadesSinBrote();
          console.log(`CARMENCITA!!!!!!!!!!!!!!!!! en ${manolo?.name} pasa a ${ciudadAleatoria?.name}`);
          if(ciudadAleatoria){
  
          const nuevosVirus = (Object.keys(ciudadAleatoria.diseaseCount) as Virus[])
          .filter(virus => ciudadAleatoria.diseaseCount[virus] < 3);
          
          const nuevoVirus = nuevosVirus[Math.floor(Math.random() * nuevosVirus.length)];
  
  
          ciudadAleatoria.diseaseCount[nuevoVirus as keyof Ciudad['diseaseCount']]++;
          console.log(`El virus ${nuevoVirus} ha sido incrementado en ${ciudadAleatoria.name}`);
        }else{
          console.log("NO QUEDAN CIUDADES A LAS QUE INFECTAR!!!!!!!!")
        }
      }else {
  
          ciudadAleatoria.diseaseCount[virusAleatorio as keyof Ciudad['diseaseCount']]++;
          console.log(`El virus ${virusAleatorio} ha sido incrementado en ${ciudadAleatoria.name}`);
        }
  
  
        if (!this.ciudadesInfectadas.some(ciudad => ciudad.name === ciudadAleatoria.name)) {
          this.ciudadesInfectadas.push(ciudadAleatoria);
        }
      }
    }

    vacunas(ciudad:any, virus: Virus){
      const ciudadVacunar= this.ciudades.find(city=>city.name===ciudad.name);
      if(ciudadVacunar && ciudadVacunar.diseaseCount[virus]>0){
        ciudadVacunar.diseaseCount[virus]--;

        if(Object.values(ciudadVacunar.diseaseCount).every(virus=> virus===0)){
          const index = this.ciudadesInfectadas.findIndex(c => c.name === ciudadVacunar.name);
          if (index !== -1) {
            this.ciudadesInfectadas.splice(index, 1);
          }
        }
        console.log(`Vacuna aplicada a ${virus} en ${ciudadVacunar.name}`);
        this.accionesRonda--;
      }else{
        console.error("Ciudad no encontrada o vacuna no aplicada");
      }
    
    }



  
    ciudadesSinBrote(): Ciudad | undefined {
      const ciudadesFiltradas = this.ciudades.filter(ciudad => 
        Object.values(ciudad.diseaseCount).some(virus=> virus<3)
      );
      
      if (ciudadesFiltradas.length === 0) {
          return undefined;
      }
  
      const ciudadAleatoria = Math.floor(Math.random() * ciudadesFiltradas.length);
      return ciudadesFiltradas[ciudadAleatoria];
  }
  
  
  
    obtenerCiudadesAleatorias(): Ciudad | undefined {
      const ciudadAleatoria = Math.floor(Math.random() * this.ciudades.length);
      return this.ciudades[ciudadAleatoria];
    }
  }