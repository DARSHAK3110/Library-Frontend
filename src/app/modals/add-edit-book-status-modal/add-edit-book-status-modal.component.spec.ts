import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditBookStatusModalComponent } from './add-edit-book-status-modal.component';

describe('AddEditBookStatusModalComponent', () => {
  let component: AddEditBookStatusModalComponent;
  let fixture: ComponentFixture<AddEditBookStatusModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditBookStatusModalComponent]
    });
    fixture = TestBed.createComponent(AddEditBookStatusModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
