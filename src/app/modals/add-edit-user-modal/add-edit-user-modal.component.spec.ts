import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditUserModalComponent } from './add-edit-user-modal.component';

describe('AddEditUserModalComponent', () => {
  let component: AddEditUserModalComponent;
  let fixture: ComponentFixture<AddEditUserModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditUserModalComponent]
    });
    fixture = TestBed.createComponent(AddEditUserModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
