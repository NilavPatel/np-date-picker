import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NpDatePickerComponent } from './np-date-picker.component';

describe('NpDatePickerComponent', () => {
  let component: NpDatePickerComponent;
  let fixture: ComponentFixture<NpDatePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NpDatePickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NpDatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
