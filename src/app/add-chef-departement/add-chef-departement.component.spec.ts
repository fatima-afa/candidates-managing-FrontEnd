import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddChefDepartementComponent } from './add-chef-departement.component';

describe('AddChefDepartementComponent', () => {
  let component: AddChefDepartementComponent;
  let fixture: ComponentFixture<AddChefDepartementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddChefDepartementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddChefDepartementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
