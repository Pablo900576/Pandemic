import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaCargarComponent } from './nueva-cargar.component';

describe('NuevaCargarComponent', () => {
  let component: NuevaCargarComponent;
  let fixture: ComponentFixture<NuevaCargarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NuevaCargarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NuevaCargarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
