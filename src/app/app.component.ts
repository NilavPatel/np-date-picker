import { Component, ViewChild, OnInit } from '@angular/core';
import { NpUiDatePickerComponent } from 'projects/np-ui-date-picker/src/public-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'np-ui-date-picker';
  date1: Date = new Date(1992, 9, 28);

  date2: Date = new Date(1992, 9, 28);
  selectedDate2 = null;

  date4: Date;
  date9: Date;
  minDate4: Date = new Date();
  maxDate4: Date = new Date();

  disabledDays: string[];
  disabledDates: Date[];

  @ViewChild("datepicker2", { static: true }) datepicker2: NpUiDatePickerComponent;

  constructor() {
    this.minDate4.setMonth(1);
    this.maxDate4.setMonth(3);
  }

  ngOnInit(): void {
    this.disabledDays = ["Su", "Sa"];
    var today = new Date();
    this.disabledDates = [new Date(today.getFullYear(), today.getMonth(), today.getDate()), new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1)];
    var date = new Date();
    date.setMonth(date.getMonth() + 2);
    this.date9 = date;

  }

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
    } else {
      alert("null");
    }
  }
}
