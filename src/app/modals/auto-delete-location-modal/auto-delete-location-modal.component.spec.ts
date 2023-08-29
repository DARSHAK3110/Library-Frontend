import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoDeleteLocationModalComponent } from './auto-delete-location-modal.component';

describe('AutoDeleteLocationModalComponent', () => {
  let component: AutoDeleteLocationModalComponent;
  let fixture: ComponentFixture<AutoDeleteLocationModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AutoDeleteLocationModalComponent]
    });
    fixture = TestBed.createComponent(AutoDeleteLocationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
