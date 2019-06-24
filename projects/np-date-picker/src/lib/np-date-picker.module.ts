import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NpDatePickerComponent } from './np-date-picker.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [NpDatePickerComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [NpDatePickerComponent]
})
export class NpDatePickerModule { }
