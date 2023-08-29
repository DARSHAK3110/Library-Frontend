import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoDeleteFloorModalComponent } from './auto-delete-floor-modal.component';

describe('AutoDeleteFloorModalComponent', () => {
  let component: AutoDeleteFloorModalComponent;
  let fixture: ComponentFixture<AutoDeleteFloorModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AutoDeleteFloorModalComponent]
    });
    fixture = TestBed.createComponent(AutoDeleteFloorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
