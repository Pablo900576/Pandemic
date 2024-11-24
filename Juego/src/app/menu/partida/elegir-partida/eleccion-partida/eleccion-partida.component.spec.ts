import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EleccionPartidaComponent } from './eleccion-partida.component';

describe('EleccionPartidaComponent', () => {
  let component: EleccionPartidaComponent;
  let fixture: ComponentFixture<EleccionPartidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EleccionPartidaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EleccionPartidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
