import { Component, ViewChild } from '@angular/core';
import { NpDatePickerComponent } from './np-date-picker/np-date-picker.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'np-date-picker';

  selectedDate: Date;

  birthDate = new Date(1992, 9, 28, 20, 45, 0);

  minDate = new Date(2019, 1, 10);
  maxDate = new Date(2020, 5, 10);

  @ViewChild("datepicker") datepicker: NpDatePickerComponent;
  @ViewChild("dateValidations") dateValidations: NpDatePickerComponent;

  getSelectedDate() {
    this.selectedDate = this.datepicker.getSelectedDate();
  }

  setSelectedDate() {
    this.datepicker.setSelectedDate(new Date(1992, 9, 28, 20, 45, 0));
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
