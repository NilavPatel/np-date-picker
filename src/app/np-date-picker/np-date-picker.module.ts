import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NpDatePickerComponent } from './np-date-picker.component';

@NgModule({
  declarations: [NpDatePickerComponent],
  imports: [
    CommonModule
  ],
  exports: [NpDatePickerComponent]
})
export class NpDatePickerModule { }
