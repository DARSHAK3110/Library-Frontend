import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptReservationModalComponent } from './accept-reservation-modal.component';

describe('AcceptReservationModalComponent', () => {
  let component: AcceptReservationModalComponent;
  let fixture: ComponentFixture<AcceptReservationModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AcceptReservationModalComponent]
    });
    fixture = TestBed.createComponent(AcceptReservationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
