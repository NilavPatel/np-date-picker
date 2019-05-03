import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-np-date-picker',
  templateUrl: './np-date-picker.component.html',
  styleUrls: ['./np-date-picker.component.css']
})
export class NpDatePickerComponent implements OnInit {

  _weekDays: string[] = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  _months: string[] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  _years: number[] = [];

  _days: number[] = [];

  _selectedDate = new Date();
  _selectedDay = this._selectedDate.getDate();
  _selectedWeekDay = this._selectedDate.getDay();
  _selectedMonth = this._selectedDate.getMonth();
  _selectedYear = this._selectedDate.getFullYear();

  _currentDay = this._selectedDate.getDate();
  _currentWeekDay = this._selectedDate.getDay();
  _currentMonth = this._selectedDate.getMonth();
  _currentYear = this._selectedDate.getFullYear();

  constructor() {
  }

  ngOnInit() {
    this._calculateDays();
    for (var i = 1900; i <= 2100; i++) {
      this._years.push(i);
    }
  }

  _calculateDays() {
    this._days = [];
    var _daysInThisMonth = this.daysInThisMonth();
    var _firstWeekDayOfMonth = new Date(this._currentYear, this._currentMonth, 1).getDay();
    for (let index = 0; index < _firstWeekDayOfMonth; index++) {
      this._days.push(null);
    }
    for (let index = 1; index <= _daysInThisMonth; index++) {
      this._days.push(index);
    }
    for (let index = this._days.length; index <= 42; index++) {
      this._days.push(null);
    }
  }

  daysInThisMonth() {
    return new Date(this._currentYear, this._currentMonth + 1, 0).getDate();
  }

  daysArrayFromTo(from: number, to: number) {
    return this._days.slice(from, to);
  }

  _prevMonth() {
    if (this._currentMonth == 0) {
      this._currentMonth = 11;
      this._currentYear = this._currentYear - 1;
    } else {
      this._currentMonth = this._currentMonth - 1;
    }
    this._calculateDays();
  }

  _nextMonth() {
    if (this._currentMonth == 11) {
      this._currentMonth = 0;
      this._currentYear = this._currentYear + 1;
    } else {
      this._currentMonth = this._currentMonth + 1;
    }
    this._calculateDays();
  }

  _selectDate(day: number) {
    this._selectedDay = day;
    this._selectedMonth = this._currentMonth;
    this._selectedYear = this._currentYear;
    this._selectedDate = new Date(this._selectedYear, this._selectedMonth, day);
  }

  _selectMonth($event){
    this._currentMonth = parseInt($event.target.value);
    this._calculateDays();
  }

  _selectYear($event){
    this._currentYear = parseInt($event.target.value);
    this._calculateDays();
  }
}
