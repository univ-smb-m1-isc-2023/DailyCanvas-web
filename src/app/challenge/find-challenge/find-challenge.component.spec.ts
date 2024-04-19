import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindChallengeComponent } from './find-challenge.component';

describe('FindChallengeComponent', () => {
  let component: FindChallengeComponent;
  let fixture: ComponentFixture<FindChallengeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FindChallengeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FindChallengeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
