import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'np-ui-date-picker examples';
  date1: Date = new Date();
  date2: Date = new Date();
  date3: Date;
  date4: Date = new Date();
  date5: Date = new Date();
  date6: Date;
  date7: Date;
  disableDates7: any[] = [];
  date81: Date;
  date82: Date;
  date9: Date;
  date10: Date;
  date11: Date;
  date12: Date;
  dateLabels12: any[] = [];
  date13: Date;

  constructor() {
  }

  ngOnInit(): void {
    this.disableDates7.push(new Date());
    this.dateLabels12.push({
      date: new Date(),
      label: "Today"
    })
  }

  setDate1() {
    this.date1 = new Date(1992, 9, 28);
  }

  setDate1AsNull() {
    this.date1 = null;
  }

  setDate7() {
    this.date7 = new Date();
  }

  onChangeDate13(e) {
    alert("selected value is " + e);
  }
}
