import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CondidatTemplateComponent } from './condidat-template.component';

describe('CondidatTemplateComponent', () => {
  let component: CondidatTemplateComponent;
  let fixture: ComponentFixture<CondidatTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CondidatTemplateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CondidatTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
