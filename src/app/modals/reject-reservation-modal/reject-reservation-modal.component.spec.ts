import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectReservationModalComponent } from './reject-reservation-modal.component';

describe('RejectReservationModalComponent', () => {
  let component: RejectReservationModalComponent;
  let fixture: ComponentFixture<RejectReservationModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RejectReservationModalComponent]
    });
    fixture = TestBed.createComponent(RejectReservationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
