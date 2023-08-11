import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteBookStatusModalComponent } from './delete-book-status-modal.component';

describe('DeleteBookStatusModalComponent', () => {
  let component: DeleteBookStatusModalComponent;
  let fixture: ComponentFixture<DeleteBookStatusModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteBookStatusModalComponent]
    });
    fixture = TestBed.createComponent(DeleteBookStatusModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
