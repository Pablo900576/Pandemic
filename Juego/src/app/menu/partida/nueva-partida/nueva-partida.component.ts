import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nueva-partida',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nueva-partida.component.html',
  styleUrl: './nueva-partida.component.css'
})
export class NuevaPartidaComponent{

  selectedCity: any = null; 
  selectCity(city: any) {
    this.selectedCity = city;
  }

  closeCityInfo() {
    this.selectedCity = null;
  }

  cities=[
      {
        "name": "San Francisco",
        "region": 0,
        "coordinates": {
          "x": 235,
          "y": 315
        },
        "connectedCities": [
          "Chicago",
          "Los Angeles",
          "Manila",
          "Tokio"
        ],
        "characters": [],
        "researchCenter": false,
        "diseaseCount": {
          "green": 0,
          "red": 0,
          "blue": 0,
          "yellow": 0
        }
      },
      {
        "name": "Chicago",
        "region": 0,
        "coordinates": {
          "x": 300,
          "y": 280
        },
        "connectedCities": [
          "San Francisco",
          "Montreal",
          "Atlanta",
          "Mexico DF",
          "Los Angeles"
        ],
        "characters": [],
        "researchCenter": false,
        "diseaseCount": {
          "green": 0,
          "red": 0,
          "blue": 0,
          "yellow": 0
        }
      },
      {
        "name": "Atlanta",
        "region": 0,
        "coordinates": {
          "x": 320,
          "y": 320
        },
        "connectedCities": [
          "Chicago",
          "Miami",
          "Washington"
        ],
        "characters": [],
        "researchCenter": false,
        "diseaseCount": {
          "green": 0,
          "red": 0,
          "blue": 0,
          "yellow": 0
        }
      },
      {
        "name": "Montreal",
        "region": 0,
        "coordinates": {
          "x": 350,
          "y": 280
        },
        "connectedCities": [
          "Chicago",
          "Nueva York",
          "Washington"
        ],
        "characters": [],
        "researchCenter": false,
        "diseaseCount": {
          "green": 0,
          "red": 0,
          "blue": 0,
          "yellow": 0
        }
      },
      {
        "name": "Nueva York",
        "region": 0,
        "coordinates": {
          "x": 380,
          "y": 290
        },
        "connectedCities": [
          "Montreal",
          "Washington",
          "Londres",
          "Madrid"
        ],
        "characters": [],
        "researchCenter": false,
        "diseaseCount": {
          "green": 0,
          "red": 0,
          "blue": 0,
          "yellow": 0
        }
      },
      {
        "name": "Washington",
        "region": 0,
        "coordinates": {
          "x": 360,
          "y": 330
        },
        "connectedCities": [
          "Montreal",
          "Nueva York",
          "Atlanta",
          "Miami"
        ],
        "characters": [],
        "researchCenter": false,
        "diseaseCount": {
          "green": 0,
          "red": 0,
          "blue": 0,
          "yellow": 0
        }
      },
      {
        "name": "Londres",
        "region": 0,
        "coordinates": {
          "x": 700,
          "y": 230
        },
        "connectedCities": [
          "Nueva York",
          "Madrid",
          "Paris",
          "Essen"
        ],
        "characters": [],
        "researchCenter": false,
        "diseaseCount": {
          "green": 0,
          "red": 0,
          "blue": 0,
          "yellow": 0
        }
      },
      {
        "name": "Madrid",
        "region": 0,
        "coordinates": {
          "x": 687,
          "y": 290
        },
        "connectedCities": [
          "Nueva York",
          "Londres",
          "Paris",
          "Sao Paulo",
          "Argel"
        ],
        "characters": [],
        "researchCenter": false,
        "diseaseCount": {
          "green": 0,
          "red": 0,
          "blue": 0,
          "yellow": 0
        }
      },
      {
        "name": "Paris",
        "region": 0,
        "coordinates": {
          "x": 727,
          "y": 250
        },
        "connectedCities": [
          "Madrid",
          "Londres",
          "Essen",
          "Argel",
          "Milan"
        ],
        "characters": [],
        "researchCenter": false,
        "diseaseCount": {
          "green": 0,
          "red": 0,
          "blue": 0,
          "yellow": 0
        }
      },
      {
        "name": "Essen",
        "region": 0,
        "coordinates": {
          "x": 755,
          "y": 190
        },
        "connectedCities": [
          "Londres",
          "Paris",
          "San Petersburgo",
          "Milan"
        ],
        "characters": [],
        "researchCenter": false,
        "diseaseCount": {
          "green": 0,
          "red": 0,
          "blue": 0,
          "yellow": 0
        }
      },
      {
        "name": "Milan",
        "region": 0,
        "coordinates": {
          "x": 755,
          "y": 235
        },
        "connectedCities": [
          "Essen",
          "Paris",
          "Estambul"
        ],
        "characters": [],
        "researchCenter": false,
        "diseaseCount": {
          "green": 0,
          "red": 0,
          "blue": 0,
          "yellow": 0
        }
      },
      {
        "name": "San Petersburgo",
        "region": 0,
        "coordinates": {
          "x": 815,
          "y": 210
        },
        "connectedCities": [
          "Essen",
          "Estambul",
          "Moscu"
        ],
        "characters": [],
        "researchCenter": false,
        "diseaseCount": {
          "green": 0,
          "red": 0,
          "blue": 0,
          "yellow": 0
        }
      },
      {
        "name": "Los Angeles",
        "region": 3,
        "coordinates": {
          "x": 275,
          "y": 355
        },
        "connectedCities": [
          "San Francisco",
          "Mexico DF",
          "Chicago",
          "Sidney"
        ],
        "characters": [],
        "researchCenter": false,
        "diseaseCount": {
          "green": 0,
          "red": 0,
          "blue": 0,
          "yellow": 0
        }
      },
      {
        "name": "Miami",
        "region": 3,
        "coordinates": {
          "x": 380,
          "y": 360
        },
        "connectedCities": [
          "Washington",
          "Atlanta",
          "Mexico DF",
          "Bogota"
        ],
        "characters": [],
        "researchCenter": false,
        "diseaseCount": {
          "green": 0,
          "red": 0,
          "blue": 0,
          "yellow": 0
        }
      },
      {
        "name": "Mexico DF",
        "region": 3,
        "coordinates": {
          "x": 300,
          "y": 385
        },
        "connectedCities": [
          "Los Angeles",
          "Miami",
          "Chicago",
          "Bogota",
          "Lima"
        ],
        "characters": [],
        "researchCenter": false,
        "diseaseCount": {
          "green": 0,
          "red": 0,
          "blue": 0,
          "yellow": 0
        }
      },
      {
        "name": "Bogota",
        "region": 3,
        "coordinates": {
          "x": 400,
          "y": 460
        },
        "connectedCities": [
          "Miami",
          "Mexico DF",
          "Lima",
          "Sao Paulo",
          "Buenos Aires"
        ],
        "characters": [],
        "researchCenter": false,
        "diseaseCount": {
          "green": 0,
          "red": 0,
          "blue": 0,
          "yellow": 0
        }
      },
      {
        "name": "Lima",
        "region": 3,
        "coordinates": {
          "x": 395,
          "y": 520
        },
        "connectedCities": [
          "Mexico DF",
          "Bogota",
          "Santiago de Chile"
        ],
        "characters": [],
        "researchCenter": false,
        "diseaseCount": {
          "green": 0,
          "red": 0,
          "blue": 0,
          "yellow": 0
        }
      },
      {
        "name": "Santiago de Chile",
        "region": 3,
        "coordinates": {
          "x": 430,
          "y": 620
        },
        "connectedCities": [
          "Lima"
        ],
        "characters": [],
        "researchCenter": false,
        "diseaseCount": {
          "green": 0,
          "red": 0,
          "blue": 0,
          "yellow": 0
        }
      },
      {
        "name": "Buenos Aires",
        "region": 3,
        "coordinates": {
          "x": 453,
          "y": 670
        },
        "connectedCities": [
          "Sao Paulo",
          "Bogota"
        ],
        "characters": [],
        "researchCenter": false,
        "diseaseCount": {
          "green": 0,
          "red": 0,
          "blue": 0,
          "yellow": 0
        }
      },
      {
        "name": "Sao Paulo",
        "region": 3,
        "coordinates": {
          "x": 520,
          "y": 570
        },
        "connectedCities": [
          "Bogota",
          "Buenos Aires",
          "Lagos",
          "Madrid"
        ],
        "characters": [],
        "researchCenter": false,
        "diseaseCount": {
          "green": 0,
          "red": 0,
          "blue": 0,
          "yellow": 0
        }
      },
      {
        "name": "Lagos",
        "region": 3,
        "coordinates": {
          "x": 710,
          "y": 450
        },
        "connectedCities": [
          "Sao Paulo",
          "Kinsasa",
          "Jartum"
        ],
        "characters": [],
        "researchCenter": false,
        "diseaseCount": {
          "green": 0,
          "red": 0,
          "blue": 0,
          "yellow": 0
        }
      },
      {
        "name": "Kinsasa",
        "region": 3,
        "coordinates": {
          "x": 770,
          "y": 540
        },
        "connectedCities": [
          "Lagos",
          "Jartum",
          "Johannesburgo"
        ],
        "characters": [],
        "researchCenter": false,
        "diseaseCount": {
          "green": 0,
          "red": 0,
          "blue": 0,
          "yellow": 0
        }
      },
      {
        "name": "Jartum",
        "region": 3,
        "coordinates": {
          "x": 815,
          "y": 450
        },
        "connectedCities": [
          "El Cairo",
          "Lagos",
          "Kinsasa",
          "Johannesburgo"
        ],
        "characters": [],
        "researchCenter": false,
        "diseaseCount": {
          "green": 0,
          "red": 0,
          "blue": 0,
          "yellow": 0
        }
      },
      {
        "name": "Johannesburgo",
        "region": 3,
        "coordinates": {
          "x": 815,
          "y": 630
        },
        "connectedCities": [
          "Kinsasa",
          "Jartum"
        ],
        "characters": [],
        "researchCenter": false,
        "diseaseCount": {
          "green": 0,
          "red": 0,
          "blue": 0,
          "yellow": 0
        }
      },
      {
        "name": "Argel",
        "region": 2,
        "coordinates": {
          "x": 730,
          "y": 330
        },
        "connectedCities": [
          "Madrid",
          "Paris",
          "Estambul",
          "El Cairo"
        ],
        "characters": [],
        "researchCenter": false,
        "diseaseCount": {
          "green": 0,
          "red": 0,
          "blue": 0,
          "yellow": 0
        }
      },
      {
        "name": "El Cairo",
        "region": 2,
        "coordinates": {
          "x": 820,
          "y": 350
        },
        "connectedCities": [
          "Argel",
          "Estambul",
          "Bagdad"
        ],
        "characters": [],
        "researchCenter": false,
        "diseaseCount": {
          "green": 0,
          "red": 0,
          "blue": 0,
          "yellow": 0
        }
      },
      {
        "name": "Riad",
        "region": 2,
        "coordinates": {
          "x": 895,
          "y": 385
        },
        "connectedCities": [
          "El Cairo",
          "Bagdad",
          "Karachi"
        ],
        "characters": [],
        "researchCenter": false,
        "diseaseCount": {
          "green": 0,
          "red": 0,
          "blue": 0,
          "yellow": 0
        }
      },
      {
        "name": "Estambul",
        "region": 2,
        "coordinates": {
          "x": 830,
          "y": 294
        },
        "connectedCities": [
          "Argel",
          "El Cairo",
          "Bagdad",
          "Moscu"
        ],
        "characters": [],
        "researchCenter": false,
        "diseaseCount": {
          "green": 0,
          "red": 0,
          "blue": 0,
          "yellow": 0
        }
      },
      {
        "name": "Bagdad",
        "region": 2,
        "coordinates": {
          "x": 880,
          "y": 320
        },
        "connectedCities": [
          "Estambul",
          "Karachi",
          "Riad",
          "El Cairo"
        ],
        "characters": [],
        "researchCenter": false,
        "diseaseCount": {
          "green": 0,
          "red": 0,
          "blue": 0,
          "yellow": 0
        }
      },
      {
        "name": "Moscu",
        "region": 2,
        "coordinates": {
          "x": 890,
          "y": 230
        },
        "connectedCities": [
          "Teheran",
          "Estambul",
          "San Petersburgo"
        ],
        "characters": [],
        "researchCenter": false,
        "diseaseCount": {
          "green": 0,
          "red": 0,
          "blue": 0,
          "yellow": 0
        }
      },
      {
        "name": "Teheran",
        "region": 2,
        "coordinates": {
          "x": 920,
          "y": 310
        },
        "connectedCities": [
          "Moscu",
          "Bagdad",
          "Karachi",
          "Nueva Delhi"
        ],
        "characters": [],
        "researchCenter": false,
        "diseaseCount": {
          "green": 0,
          "red": 0,
          "blue": 0,
          "yellow": 0
        }
      },
      {
        "name": "Karachi",
        "region": 2,
        "coordinates": {
          "x": 980,
          "y": 355
        },
        "connectedCities": [
          "Teheran",
          "Bagdad",
          "Nueva Delhi",
          "Riad",
          "Bombay"
        ],
        "characters": [],
        "researchCenter": false,
        "diseaseCount": {
          "green": 0,
          "red": 0,
          "blue": 0,
          "yellow": 0
        }
      },
      {
        "name": "Bombay",
        "region": 2,
        "coordinates": {
          "x": 1005,
          "y": 395
        },
        "connectedCities": [
          "Karachi",
          "Nueva Delhi",
          "Madras"
        ],
        "characters": [],
        "researchCenter": false,
        "diseaseCount": {
          "green": 0,
          "red": 0,
          "blue": 0,
          "yellow": 0
        }
      },
      {
        "name": "Nueva Delhi",
        "region": 2,
        "coordinates": {
          "x": 1025,
          "y": 330
        },
        "connectedCities": [
          "Teheran",
          "Karachi",
          "Bombay",
          "Madras",
          "Calcuta"
        ],
        "characters": [],
        "researchCenter": false,
        "diseaseCount": {
          "green": 0,
          "red": 0,
          "blue": 0,
          "yellow": 0
        }
      },
      {
        "name": "Calcuta",
        "region": 2,
        "coordinates": {
          "x": 1070,
          "y": 370
        },
        "connectedCities": [
          "Nueva Delhi",
          "Hong Kong",
          "Madras",
          "Bangkok"
        ],
        "characters": [],
        "researchCenter": false,
        "diseaseCount": {
          "green": 0,
          "red": 0,
          "blue": 0,
          "yellow": 0
        }
      },
      {
        "name": "Madras",
        "region": 2,
        "coordinates": {
          "x": 1035,
          "y": 410
        },
        "connectedCities": [
          "Bombay",
          "Nueva Delhi",
          "Calcula",
          "Bangkok",
          "Yakarta"
        ],
        "characters": [],
        "researchCenter": false,
        "diseaseCount": {
          "green": 0,
          "red": 0,
          "blue": 0,
          "yellow": 0
        }
      },
      {
        "name": "Bombay",
        "region": 2,
        "coordinates": {
          "x": 1005,
          "y": 395
        },
        "connectedCities": [
          "Karachi",
          "Madras",
          "Nueva Delhi"
        ],
        "characters": [],
        "researchCenter": false,
        "diseaseCount": {
          "green": 0,
          "red": 0,
          "blue": 0,
          "yellow": 0
        }
      },
      {
        "name": "Yakarta",
        "region": 1,
        "coordinates": {
          "x": 1150,
          "y": 525
        },
        "connectedCities": [
          "Madras",
          "Bangkok",
          "Ho Chi Minh",
          "Sidney"
        ],
        "characters": [],
        "researchCenter": false,
        "diseaseCount": {
          "green": 0,
          "red": 0,
          "blue": 0,
          "yellow": 0
        }
      },
      {
        "name": "Bangkok",
        "region": 1,
        "coordinates": {
          "x": 1120,
          "y": 415
        },
        "connectedCities": [
          "Yakarta",
          "Calcuta",
          "Madras",
          "Ho Chi Minh",
          "Hong Kong"
        ],
        "characters": [],
        "researchCenter": false,
        "diseaseCount": {
          "green": 0,
          "red": 0,
          "blue": 0,
          "yellow": 0
        }
      },
      {
        "name": "Hong Kong",
        "region": 1,
        "coordinates": {
          "x": 1165,
          "y": 370
        },
        "connectedCities": [
          "Bangkok",
          "Ho Chi Minh",
          "Taipei",
          "Manila",
          "Shanghai"
        ],
        "characters": [],
        "researchCenter": false,
        "diseaseCount": {
          "green": 0,
          "red": 0,
          "blue": 0,
          "yellow": 0
        }
      },
      {
        "name": "Shanghai",
        "region": 1,
        "coordinates": {
          "x": 1195,
          "y": 355
        },
        "connectedCities": [
          "Pekin",
          "Hong Kong",
          "Seul",
          "Tokio",
          "Taipei"
        ],
        "characters": [],
        "researchCenter": false,
        "diseaseCount": {
          "green": 0,
          "red": 0,
          "blue": 0,
          "yellow": 0
        }
      },
      {
        "name": "Pekin",
        "region": 1,
        "coordinates": {
          "x": 1175,
          "y": 300
        },
        "connectedCities": [
          "Seul",
          "Shanghai"
        ],
        "characters": [],
        "researchCenter": false,
        "diseaseCount": {
          "green": 0,
          "red": 0,
          "blue": 0,
          "yellow": 0
        }
      },
      {
        "name": "Seul",
        "region": 1,
        "coordinates": {
          "x": 1225,
          "y": 297
        },
        "connectedCities": [
          "Pekin",
          "Tokio"
        ],
        "characters": [],
        "researchCenter": false,
        "diseaseCount": {
          "green": 0,
          "red": 0,
          "blue": 0,
          "yellow": 0
        }
      },
      {
        "name": "Tokio",
        "region": 1,
        "coordinates": {
          "x": 1280,
          "y": 290
        },
        "connectedCities": [
          "San Francisco",
          "Seul",
          "Osaka",
          "Shanghai"
        ],
        "characters": [],
        "researchCenter": false,
        "diseaseCount": {
          "green": 0,
          "red": 0,
          "blue": 0,
          "yellow": 0
        }
      },
      {
        "name": "Osaka",
        "region": 1,
        "coordinates": {
          "x": 1255,
          "y": 320
        },
        "connectedCities": [
          "Tokio",
          "Taipei"
        ],
        "characters": [],
        "researchCenter": false,
        "diseaseCount": {
          "green": 0,
          "red": 0,
          "blue": 0,
          "yellow": 0
        }
      },
      {
        "name": "Taipei",
        "region": 1,
        "coordinates": {
          "x": 1205,
          "y": 375
        },
        "connectedCities": [
          "Osaka",
          "Shanghai",
          "Hong Kong",
          "Manila"
        ],
        "characters": [],
        "researchCenter": false,
        "diseaseCount": {
          "green": 0,
          "red": 0,
          "blue": 0,
          "yellow": 0
        }
      },
      {
        "name": "Ho Chi Minh",
        "region": 1,
        "coordinates": {
          "x": 1148,
          "y": 429
        },
        "connectedCities": [
          "Yakarta",
          "Bangkok",
          "Hong Kong",
          "Manila"
        ],
        "characters": [],
        "researchCenter": false,
        "diseaseCount": {
          "green": 0,
          "red": 0,
          "blue": 0,
          "yellow": 0
        }
      },
      {
        "name": "Manila",
        "region": 1,
        "coordinates": {
          "x": 1200,
          "y": 420
        },
        "connectedCities": [
          "San Francisco",
          "Ho Chi Minh",
          "Taipei",
          "Hong Kong",
          "Sidney"
        ],
        "characters": [],
        "researchCenter": false,
        "diseaseCount": {
          "green": 0,
          "red": 0,
          "blue": 0,
          "yellow": 0
        }
      },
      {
        "name": "Sidney",
        "region": 1,
        "coordinates": {
          "x": 1320,
          "y": 645
        },
        "connectedCities": [
          "Los Angeles",
          "Manila",
          "Yakarta"
        ],
        "characters": [],
        "researchCenter": false,
        "diseaseCount": {
          "green": 0,
          "red": 0,
          "blue": 0,
          "yellow": 0
        }
      }
    ];
  }
