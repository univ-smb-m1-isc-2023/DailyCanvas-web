import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickEntryComponent } from './quick-entry.component';

describe('QuickEntryComponent', () => {
  let component: QuickEntryComponent;
  let fixture: ComponentFixture<QuickEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuickEntryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuickEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
