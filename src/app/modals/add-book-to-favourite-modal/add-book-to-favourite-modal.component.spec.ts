import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBookToFavouriteModalComponent } from './add-book-to-favourite-modal.component';

describe('AddBookToCartModalComponent', () => {
  let component: AddBookToFavouriteModalComponent;
  let fixture: ComponentFixture<AddBookToFavouriteModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddBookToFavouriteModalComponent]
    });
    fixture = TestBed.createComponent(AddBookToFavouriteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
