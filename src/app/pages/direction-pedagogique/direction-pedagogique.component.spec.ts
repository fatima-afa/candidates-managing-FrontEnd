import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectionPedagogiqueComponent } from './direction-pedagogique.component';

describe('DirectionPedagogiqueComponent', () => {
  let component: DirectionPedagogiqueComponent;
  let fixture: ComponentFixture<DirectionPedagogiqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DirectionPedagogiqueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DirectionPedagogiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
