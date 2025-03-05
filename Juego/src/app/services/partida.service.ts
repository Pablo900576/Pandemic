import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PartidaService {

  private apiURL= 'http://localhost:5000/'
  private virusIniciales=0;
  private virusRonda=0;
  private STORAGE_KEY = 'partidaGuardada';

  constructor(private http: HttpClient) {}

  crearPartida(email: string, ciudades: any[]):Observable<any>{
    return this.http.post(`${this.apiURL}game/nuevaPartida`, {email, ciudades});
  }

  guardarPartida(partida_id: number, numeroRonda: number ,ciudades: any[]) {
    const partida = { partida_id,  numeroRonda, ciudades };
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(partida));
  }

  cargarPartida(partida_id: number): Observable<any> {
    const partidaGuardada = localStorage.getItem(this.STORAGE_KEY);
    if (partidaGuardada) {
      console.log("Partida cargada desde localStorage");
      return new Observable(observer => {
        observer.next(JSON.parse(partidaGuardada)); 
        observer.complete();
      });
    } else {
      console.log("Cargando partida desde el servidor");
      return this.http.get(`${this.apiURL}game/cargarPartida/${partida_id}`);
    }
  }

  listarPartidas(email: string): Observable<any> {
    return this.http.get(`${this.apiURL}game/listarPartidas/${email}`);
  }

  obtenerIdPartida(email:string): Observable<any>{
    return this.http.get(`${this.apiURL}game/obtenerPartida/${email}`)
  }


  setDartosPersonajes(virusIniciales: number, virusRonda: number){
    this.virusIniciales= virusIniciales;
    this.virusRonda= virusRonda
  }

  getDatosPersonajes(){
    return{ virusIniciales: this.virusIniciales, virusRonda: this.virusRonda};
  }

  reiniciarPartida(): void {
    localStorage.removeItem(this.STORAGE_KEY);
    console.log("Partida eliminada del localStorage");
  }

}