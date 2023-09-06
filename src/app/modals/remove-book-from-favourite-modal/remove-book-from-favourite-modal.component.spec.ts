import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveBookFromFavouriteModalComponent } from './remove-book-from-favourite-modal.component';

describe('RemoveBookFromFavouriteModalComponent', () => {
  let component: RemoveBookFromFavouriteModalComponent;
  let fixture: ComponentFixture<RemoveBookFromFavouriteModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RemoveBookFromFavouriteModalComponent]
    });
    fixture = TestBed.createComponent(RemoveBookFromFavouriteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
