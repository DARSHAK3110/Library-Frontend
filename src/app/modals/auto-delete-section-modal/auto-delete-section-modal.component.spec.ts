import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoDeleteSectionModalComponent } from './auto-delete-section-modal.component';

describe('AutoDeleteSectionModalComponent', () => {
  let component: AutoDeleteSectionModalComponent;
  let fixture: ComponentFixture<AutoDeleteSectionModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AutoDeleteSectionModalComponent]
    });
    fixture = TestBed.createComponent(AutoDeleteSectionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
