import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChechOutModalComponent } from './chech-out-modal.component';

describe('ChechOutModalComponent', () => {
  let component: ChechOutModalComponent;
  let fixture: ComponentFixture<ChechOutModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChechOutModalComponent]
    });
    fixture = TestBed.createComponent(ChechOutModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
