import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChechInModalComponent } from './chech-in-modal.component';

describe('ChechInModalComponent', () => {
  let component: ChechInModalComponent;
  let fixture: ComponentFixture<ChechInModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChechInModalComponent]
    });
    fixture = TestBed.createComponent(ChechInModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
