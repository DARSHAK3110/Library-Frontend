import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditLocationModalComponent } from './add-edit-location-modal.component';

describe('AddEditLocationModalComponent', () => {
  let component: AddEditLocationModalComponent;
  let fixture: ComponentFixture<AddEditLocationModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditLocationModalComponent]
    });
    fixture = TestBed.createComponent(AddEditLocationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
