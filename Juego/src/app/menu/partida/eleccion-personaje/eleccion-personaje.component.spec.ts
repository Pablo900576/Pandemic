import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EleccionPersonajeComponent } from './eleccion-personaje.component';

describe('EleccionPersonajeComponent', () => {
  let component: EleccionPersonajeComponent;
  let fixture: ComponentFixture<EleccionPersonajeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EleccionPersonajeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EleccionPersonajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
