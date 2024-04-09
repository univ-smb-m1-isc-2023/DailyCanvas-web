import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilisationConditionsComponent } from './utilisation-conditions.component';

describe('UtilisationConditionsComponent', () => {
  let component: UtilisationConditionsComponent;
  let fixture: ComponentFixture<UtilisationConditionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UtilisationConditionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UtilisationConditionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
