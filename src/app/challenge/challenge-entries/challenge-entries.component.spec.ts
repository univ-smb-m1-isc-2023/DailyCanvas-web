import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengeEntriesComponent } from './challenge-entries.component';

describe('ChallengeEntriesComponent', () => {
  let component: ChallengeEntriesComponent;
  let fixture: ComponentFixture<ChallengeEntriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChallengeEntriesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChallengeEntriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
