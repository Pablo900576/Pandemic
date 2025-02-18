import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReglasComponent } from './informacion.component';

describe('ReglasComponent', () => {
  let component: ReglasComponent;
  let fixture: ComponentFixture<ReglasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReglasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReglasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
