import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteLocationModalComponent } from './delete-location-modal.component';

describe('DeleteLocationModalComponent', () => {
  let component: DeleteLocationModalComponent;
  let fixture: ComponentFixture<DeleteLocationModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteLocationModalComponent]
    });
    fixture = TestBed.createComponent(DeleteLocationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
