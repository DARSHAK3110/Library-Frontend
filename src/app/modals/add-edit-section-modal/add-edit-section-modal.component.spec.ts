import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditSectionModalComponent } from './add-edit-section-modal.component';

describe('AddEditSectionModalComponent', () => {
  let component: AddEditSectionModalComponent;
  let fixture: ComponentFixture<AddEditSectionModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditSectionModalComponent]
    });
    fixture = TestBed.createComponent(AddEditSectionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
