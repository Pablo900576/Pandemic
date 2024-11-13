import { TestBed } from '@angular/core/testing';

import { CargarCiudadesService } from './cargar-ciudades.service';

describe('CargarCiudadesService', () => {
  let service: CargarCiudadesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CargarCiudadesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
