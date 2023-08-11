import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveBookFromCartModalComponent } from './remove-book-from-cart-modal.component';

describe('RemoveBookFromCartModalComponent', () => {
  let component: RemoveBookFromCartModalComponent;
  let fixture: ComponentFixture<RemoveBookFromCartModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RemoveBookFromCartModalComponent]
    });
    fixture = TestBed.createComponent(RemoveBookFromCartModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
