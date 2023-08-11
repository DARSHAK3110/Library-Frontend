import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeBookStatusModalComponent } from './change-book-status-modal.component';

describe('ChangeBookStatusModalComponent', () => {
  let component: ChangeBookStatusModalComponent;
  let fixture: ComponentFixture<ChangeBookStatusModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChangeBookStatusModalComponent]
    });
    fixture = TestBed.createComponent(ChangeBookStatusModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
