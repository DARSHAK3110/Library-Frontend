import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowingComponent } from './borrowing.component';

describe('BorrowingComponent', () => {
  let component: BorrowingComponent;
  let fixture: ComponentFixture<BorrowingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BorrowingComponent]
    });
    fixture = TestBed.createComponent(BorrowingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
