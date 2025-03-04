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
  constructor(private http: HttpClient) {}

  crearPartida(email: string, ciudades: any[]):Observable<any>{
    return this.http.post(`${this.apiURL}game/nuevaPartida`, {email, ciudades});
  }

  guardarPartida(partida_id: number, ciudades: any[], numeroRonda: number): Observable<any> {
    return this.http.post(`${this.apiURL}game/guardarPartida`, { partida_id, ciudades, numeroRonda });
  }


  cargarPartida(partida_id: number): Observable<any> {
    return this.http.get(`${this.apiURL}game/cargarPartida/${partida_id}`);
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

}