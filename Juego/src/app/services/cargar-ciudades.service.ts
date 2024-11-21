import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CargarCiudadesService {

  private jsonURL="/ciudades.json";
  private jsonURLEuropa="/ciudadesEuropa.json";
  constructor(private http: HttpClient) { }

  getCiudadesMundo(): Observable<any>{
    return this.http.get<any>(this.jsonURL);
  }
  getCiudadesEuropa(): Observable<any>{
    return this.http.get<any>(this.jsonURLEuropa);
    
  }
}
