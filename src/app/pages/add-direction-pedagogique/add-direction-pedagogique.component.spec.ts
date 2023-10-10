import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDirectionPedagogiqueComponent } from './add-direction-pedagogique.component';

describe('AddDirectionPedagogiqueComponent', () => {
  let component: AddDirectionPedagogiqueComponent;
  let fixture: ComponentFixture<AddDirectionPedagogiqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDirectionPedagogiqueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDirectionPedagogiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
