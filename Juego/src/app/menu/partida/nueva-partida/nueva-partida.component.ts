import { Component, OnInit } from '@angular/core';
import citiesData from './cities.json';

@Component({
  selector: 'app-nueva-partida',
  standalone: true,
  imports: [],
  templateUrl: './nueva-partida.component.html',
  styleUrl: './nueva-partida.component.css'
})
export class NuevaPartidaComponent{
  cities: any[] = [];

  ngOnInit(): void {
      this.cities = citiesData;
  }

  onCityClick(city: any): void {
      console.log('City clicked:', city);
  }
}