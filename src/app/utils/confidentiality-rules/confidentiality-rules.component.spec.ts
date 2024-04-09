import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfidentialityRulesComponent } from './confidentiality-rules.component';

describe('ConfidentialityRulesComponent', () => {
  let component: ConfidentialityRulesComponent;
  let fixture: ComponentFixture<ConfidentialityRulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfidentialityRulesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfidentialityRulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
