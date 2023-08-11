import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteAuthorComponent } from './delete-author.component';

describe('DeleteAuthorComponent', () => {
  let component: DeleteAuthorComponent;
  let fixture: ComponentFixture<DeleteAuthorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteAuthorComponent]
    });
    fixture = TestBed.createComponent(DeleteAuthorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
