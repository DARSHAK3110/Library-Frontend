import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditAuthorModalComponent } from './add-edit-author-modal.component';

describe('AddEditAuthorModalComponent', () => {
  let component: AddEditAuthorModalComponent;
  let fixture: ComponentFixture<AddEditAuthorModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditAuthorModalComponent]
    });
    fixture = TestBed.createComponent(AddEditAuthorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
