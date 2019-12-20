import { Component, ViewChild } from '@angular/core';
import { NpUiDatePickerComponent } from 'projects/np-ui-date-picker/src/public-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'np-ui-date-picker';
  date1: Date = new Date(1992, 9, 28);

  date2: Date = new Date(1992, 9, 28);
  selectedDate2 = null;

  minDate4: Date = new Date();
  maxDate4: Date = new Date();

  constructor() {    
    this.minDate4.setMonth(1);
    this.maxDate4.setMonth(2);
  }

  @ViewChild("datepicker2", { static: true }) datepicker2: NpUiDatePickerComponent;

  getSelectedDate() {
    this.selectedDate2 = this.datepicker2.getSelectedDate();
  }

  setSelectedDate() {
    this.datepicker2.setSelectedDate(new Date(1992, 9, 28));
  }

  setNullSelectedDate() {
    this.datepicker2.setSelectedDate(undefined);
  }

  onChange(date: Date) {
    if (date != null) {
      alert(date.toString());
    }
  }
}
