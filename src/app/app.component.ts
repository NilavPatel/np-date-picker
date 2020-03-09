import { Component, ViewChild, OnInit } from '@angular/core';
import { NpUiDatePickerComponent } from 'projects/np-ui-date-picker/src/public-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'np-ui-date-picker examples';
  date1: Date = new Date();
  date2: Date = new Date();
  date3: Date = new Date();
  date4: Date = new Date();
  selectedDate3: Date;
  minDate6: Date = new Date();
  maxDate6: Date = new Date();
  disabledDays11: string[];
  disabledDates11: Date[];
  dateLabels12: any[];
  date5Enabled: boolean = false;
  format = 'dd-MM-yyyy';

  @ViewChild("datepicker2", { static: true }) datepicker2: NpUiDatePickerComponent;

  constructor() {
    this.minDate6.setMonth(1);
    this.maxDate6.setMonth(3);
  }

  ngOnInit(): void {
    this.disabledDays11 = ["Su", "Sa"];
    var today = new Date();
    this.disabledDates11 = [new Date(today.getFullYear(), today.getMonth(), today.getDate()), new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1)];
    var date = new Date();
    date.setMonth(date.getMonth() + 2);
    this.dateLabels12 = [{
      date: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
      label: "Today"
    },
    {
      date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1),
      label: "Tomorrow"
    }];
  }

  getSelectedDate() {
    this.selectedDate3 = this.datepicker2.getSelectedDate();
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

  changeFormat() {
    this.format = "dd/MMM/yyyy";
  }
}
