import { Component, ViewChild } from '@angular/core';
import { NpUiDatePickerComponent } from 'projects/np-ui-date-picker/src/public-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'np-ui-date-picker';
  selectedDate: Date;
  birthDate = new Date(1992, 9, 28);  
  minDate = new Date(2019, 1, 10);
  maxDate = new Date(2020, 5, 10);

  @ViewChild("datepicker", { static: true }) datepicker: NpUiDatePickerComponent;
  @ViewChild("dateValidations", { static: true }) dateValidations: NpUiDatePickerComponent;

  getSelectedDate() {
    this.selectedDate = this.datepicker.getSelectedDate();
  }

  setSelectedDate() {
    this.datepicker.setSelectedDate(new Date(1992, 9, 28));
  }

  onChange(date: Date) {
    if (date != null) {
      alert(date.toString());
    }
  }

  setInvalidDate() {
    this.dateValidations.setSelectedDate(new Date(2019, 1, 1));
  }
}
