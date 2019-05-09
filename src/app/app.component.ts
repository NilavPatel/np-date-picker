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

  minDate = new Date(1990, 1, 1);

  @ViewChild("datepicker") datepicker: NpDatePickerComponent;

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
}
