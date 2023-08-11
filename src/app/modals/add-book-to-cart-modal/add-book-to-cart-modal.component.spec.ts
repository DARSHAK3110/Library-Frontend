import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBookToCartModalComponent } from './add-book-to-cart-modal.component';

describe('AddBookToCartModalComponent', () => {
  let component: AddBookToCartModalComponent;
  let fixture: ComponentFixture<AddBookToCartModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddBookToCartModalComponent]
    });
    fixture = TestBed.createComponent(AddBookToCartModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
