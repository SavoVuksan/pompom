import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreakCounterComponent } from './break-counter.component';

describe('BreakCounterComponent', () => {
  let component: BreakCounterComponent;
  let fixture: ComponentFixture<BreakCounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreakCounterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BreakCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
