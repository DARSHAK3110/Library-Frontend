import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBookReservationByUserModalComponent } from './add-book-reservation-by-user-modal.component';

describe('AddBookReservationByUserModalComponent', () => {
  let component: AddBookReservationByUserModalComponent;
  let fixture: ComponentFixture<AddBookReservationByUserModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddBookReservationByUserModalComponent]
    });
    fixture = TestBed.createComponent(AddBookReservationByUserModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
