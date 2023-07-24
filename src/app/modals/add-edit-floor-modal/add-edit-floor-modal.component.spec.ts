import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditFloorModalComponent } from './add-edit-floor-modal.component';

describe('AddEditFloorModalComponent', () => {
  let component: AddEditFloorModalComponent;
  let fixture: ComponentFixture<AddEditFloorModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditFloorModalComponent]
    });
    fixture = TestBed.createComponent(AddEditFloorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
