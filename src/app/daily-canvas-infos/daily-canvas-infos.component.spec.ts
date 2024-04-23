import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyCanvasInfosComponent } from './daily-canvas-infos.component';

describe('DailyCanvasInfosComponent', () => {
  let component: DailyCanvasInfosComponent;
  let fixture: ComponentFixture<DailyCanvasInfosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DailyCanvasInfosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DailyCanvasInfosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
