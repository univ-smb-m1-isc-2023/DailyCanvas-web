import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPasswordGoogleComponent } from './add-password-google.component';

describe('AddPasswordGoogleComponent', () => {
  let component: AddPasswordGoogleComponent;
  let fixture: ComponentFixture<AddPasswordGoogleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddPasswordGoogleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddPasswordGoogleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
