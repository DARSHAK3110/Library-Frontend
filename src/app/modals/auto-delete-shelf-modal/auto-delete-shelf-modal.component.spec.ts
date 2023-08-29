import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoDeleteShelfModalComponent } from './auto-delete-shelf-modal.component';

describe('AutoDeleteShelfModalComponent', () => {
  let component: AutoDeleteShelfModalComponent;
  let fixture: ComponentFixture<AutoDeleteShelfModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AutoDeleteShelfModalComponent]
    });
    fixture = TestBed.createComponent(AutoDeleteShelfModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
