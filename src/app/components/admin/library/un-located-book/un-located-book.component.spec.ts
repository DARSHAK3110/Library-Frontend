import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnLocatedBookComponent } from './un-located-book.component';

describe('UnLocatedBookComponent', () => {
  let component: UnLocatedBookComponent;
  let fixture: ComponentFixture<UnLocatedBookComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnLocatedBookComponent]
    });
    fixture = TestBed.createComponent(UnLocatedBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
