import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookInDetailedComponent } from './book-in-detailed.component';

describe('BookInDetailedComponent', () => {
  let component: BookInDetailedComponent;
  let fixture: ComponentFixture<BookInDetailedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookInDetailedComponent]
    });
    fixture = TestBed.createComponent(BookInDetailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
