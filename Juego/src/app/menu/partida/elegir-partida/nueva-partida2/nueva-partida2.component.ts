import { Component } from '@angular/core';
import { CargarCiudadesService } from '../../../../services/cargar-ciudades.service';
import { Ciudad } from '../../../../models/ciudades.model';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { AuthService } from 'src/app/services/auth.service';
import { PerfilService } from 'src/app/services/perfil.service';
import { Usuario } from 'src/app/models/usuarios.model';


type Virus = "green" | "red" | "blue" | "yellow";

@Component({
  selector: 'app-nueva-partida2',
  standalone: true,
  imports: [CommonModule, RouterLink, ScrollingModule],
  templateUrl: './nueva-partida2.component.html',
  styleUrl: './nueva-partida2.component.css'
})
export class NuevaPartida2Component {

  constructor(private perfilService: PerfilService, private partidaService: AuthService, private cargarCiudad: CargarCiudadesService, private router: Router) {
    this.usuario= this.perfilService.usuarioActual;
  }
  //Variables para todo el documento
  usuario: Usuario;

  ciudades: Ciudad[] = [];

  cantidadRonda: number = 3;

  cantidadInicial = 5;

  accionesRonda = 3;

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

  antidotoVerde = false;

  antidotoAmarillo = false;

  antidotoRojo = false;

  antidotoAzul = false;

  numeroAG = 0;

  numeroAR = 0;

  numeroAB = 0;

  numeroAY = 0;

  pastillaR = false;
  
  pastillaB = false;
  
  pastillaY = false;
  
  pastillaG = false;


  ngOnInit() {
    this.cargarCiudad.getCiudadesEuropa().subscribe(response => {
      this.ciudades = response
      this.virusIniciales();
      console.table(this.ciudadesInfectadas);
     // this.crearNuevaPartida();
    })

  }

  crearNuevaPartida(){
    this.partidaService.nuevaPartida(this.usuario.email, this.ciudades).subscribe(
      (response) =>{
        console.log("Respuesta del servidor: ", response);
      },
      (error)=>{
        console.error("Error al crear la partida: ", error)
      }
    );
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
    this.accionesRonda=3;
    this.virus(this.cantidadRonda);
    this.resultadoPartida();
    console.log(",");

  }
  incrementarVirusEnCiudadesConectadas() {
    this.ciudades.forEach(ciudad => {
      (Object.keys(ciudad.diseaseCount) as Virus[]).forEach(virus => {
        if (ciudad.diseaseCount[virus] === 3 && ciudad.brotes[virus] == false) {
          ciudad.brotes[virus] = true;

          console.log(`Ciudad ${ciudad.name} en brote del virus ${virus}`);


          ciudad.connectedCities.forEach(conectada => {
            const ciudadConectada = this.ciudades.find(c => c.name === conectada);

            if (ciudadConectada) {
              if (ciudadConectada.diseaseCount[virus] >= 3) {
                console.log(`La ciudad conectada de ${ciudad.name}: ${ciudadConectada.name} ya tiene nivel 3 de virus ${virus}`)
              } else {
                ciudadConectada.diseaseCount[virus]++;
                console.log(`Incrementado el virus ${virus} en la ciudad conectada de ${ciudad.name}: ${ciudadConectada.name}`);
                ciudad.brotes[virus] = false;
              }
            }
          });
        } else if (ciudad.brotes[virus] == true) {
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
    const manolo = ciudadAleatoria;

    const virus = ['green', 'red', 'blue', 'yellow'];
    const virusAleatorio = virus[Math.floor(Math.random() * virus.length)];

    if (ciudadAleatoria) {
      if (ciudadAleatoria.diseaseCount[virusAleatorio as keyof Ciudad['diseaseCount']] == 3 &&
        ciudadAleatoria.brotes[virusAleatorio as keyof Ciudad['brotes']] == false) {


        this.incrementarVirusEnCiudadesConectadas();


      } else if (ciudadAleatoria.diseaseCount[virusAleatorio as keyof Ciudad['diseaseCount']] == 3 && ciudadAleatoria.brotes[virusAleatorio as keyof Ciudad['brotes']] == true) {



        const ciudadAleatoria = this.ciudadesSinBrote();
        console.log(`CARMENCITA!!!!!!!!!!!!!!!!! en ${manolo?.name} pasa a ${ciudadAleatoria?.name}`);
        if (ciudadAleatoria) {

          const nuevosVirus = (Object.keys(ciudadAleatoria.diseaseCount) as Virus[])
            .filter(virus => ciudadAleatoria.diseaseCount[virus] < 3);

          const nuevoVirus = nuevosVirus[Math.floor(Math.random() * nuevosVirus.length)];
          this.añadirCiudad(ciudadAleatoria);

          ciudadAleatoria.diseaseCount[nuevoVirus as keyof Ciudad['diseaseCount']]++;
          console.log(`El virus ${nuevoVirus} ha sido incrementado en ${ciudadAleatoria.name}`);
        } else {
          this.resultadoPartida();
          console.log("NO QUEDAN CIUDADES A LAS QUE INFECTAR!!!!!!!!")
        }
      } else {
        if (ciudadAleatoria.exterminado[virusAleatorio as keyof Ciudad['exterminado']] == false) {
          ciudadAleatoria.diseaseCount[virusAleatorio as keyof Ciudad['diseaseCount']]++;
          console.log(`El virus ${virusAleatorio} ha sido incrementado en ${ciudadAleatoria.name}`);
          this.añadirCiudad(ciudadAleatoria);
        }
      }



    }
  }

  añadirCiudad(ciudadAleatoria: any) {
    if (!this.ciudadesInfectadas.some(ciudad => ciudad.name === ciudadAleatoria.name)) {
      this.ciudadesInfectadas.push(ciudadAleatoria);
    }
  }

  ciudadesSinBrote(): Ciudad | undefined {
    const ciudadesFiltradas = this.ciudades.filter(ciudad =>
      Object.values(ciudad.diseaseCount).some(virus => virus < 3)
    );

    if (ciudadesFiltradas.length === 0) {
      return undefined;
    }

    const ciudadAleatoria = Math.floor(Math.random() * ciudadesFiltradas.length);
    return ciudadesFiltradas[ciudadAleatoria];
  }

  vacunas(ciudad: any, virus: Virus) {
    const ciudadVacunar = this.ciudades.find(city => city.name === ciudad.name);
    if (ciudadVacunar && ciudadVacunar.diseaseCount[virus] > 0) {
      ciudadVacunar.diseaseCount[virus]--;
      if (Object.values(ciudadVacunar.diseaseCount).every(virus => virus === 0)) {
        const index = this.ciudadesInfectadas.findIndex(c => c.name === ciudadVacunar.name);
        if (index !== -1) {
          this.ciudadesInfectadas.splice(index, 1);
        }
      }
      console.log(`Vacuna aplicada a ${virus} en ${ciudadVacunar.name}`);
      this.accionesRonda--;
    } else {
      console.error("Ciudad no encontrada o vacuna no aplicada");
    }
  }




  curar(x: Virus) {
    if (x == "green") {
      this.pastillaG = true;
    } else if (x == "blue") {
      this.pastillaB = true;
    } else if (x == "red") {
      this.pastillaR = true;
    } else if (x == "yellow") {
      this.pastillaY = true;
    }
    this.ciudades.forEach(ciudad => {
      ciudad.exterminado[x] = true;
      if (ciudad.diseaseCount[x] > 0) {

        ciudad.diseaseCount[x] = 0;
        console.log(`Virus ${x} exterminado en ${ciudad.name}`)
        if (Object.values(ciudad.diseaseCount).every(virus => virus === 0)) {
          const index = this.ciudadesInfectadas.findIndex(c => c.name === ciudad.name);
          if (index !== -1) {
            this.ciudadesInfectadas.splice(index, 1);
          }
        }
      }
    });
    this.accionesRonda -= 3;

  }


  sumar(x: string) {
    if (x == "green") {
      if (this.antidotoVerde == false) {
        if (this.numeroAG < 2) {
          this.numeroAG++;
        } else {
          this.antidotoVerde = true;
        }
      }
    } else if (x == "red") {
      if (this.antidotoRojo == false) {
        if (this.numeroAR < 2) {
          this.numeroAR++;
        } else {
          this.antidotoRojo = true;
        }
      }
    } else if (x == "blue") {
      if (this.antidotoAzul == false) {
        if (this.numeroAB < 2) {
          this.numeroAB++;
        } else {
          this.antidotoAzul = true;
        }
      }
    } else if (x == "yellow") {
      if (this.antidotoAmarillo == false) {
        if (this.numeroAY < 2) {
          this.numeroAY++;
        } else {
          this.antidotoAmarillo = true;
        }
        
      }
    } else {
      console.error("Antidoto invalido")
    }
    this.accionesRonda -= 3;
  }


  obtenerCiudadesAleatorias(): Ciudad | undefined {
    const ciudadAleatoria = Math.floor(Math.random() * this.ciudades.length);
    return this.ciudades[ciudadAleatoria];
  }

  resultadoPartida() {
    const todasInfectadas = this.ciudades.every(ciudad =>
      Object.values(ciudad.diseaseCount).every(cantidad => cantidad == 2)
    );

    const noInfectadas = this.ciudades.every(ciudad =>
      Object.values(ciudad.diseaseCount).every(cantidad => cantidad == 0)
    );

    if (todasInfectadas) {
      alert("PERDISTEEE PRINGADO!!")

    } else if (noInfectadas) {
      alert("GANASTE MONGOL")
      this.router.navigate(['/menu']);
    }
  }

}