import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-np-date-picker',
  templateUrl: './np-date-picker.component.html',
  styleUrls: ['./np-date-picker.component.css']
})
export class NpDatePickerComponent implements OnInit {

  _isOpen = false;

  _weekDays: string[] = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  _months: string[] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  _years: number[] = [];

  _days: number[] = [];

  @Input()  selectedDate: Date;
  
  @Output() selectedDateChange = new EventEmitter();

  @Input() format: string;

  @Input() iconClass: string;

  _selectedDate: Date;
  _selectedDay: number;
  _selectedWeekDay: number;
  _selectedMonth: number;
  _selectedYear: number;

  _currentDay: number;
  _currentWeekDay: number;
  _currentMonth: number;
  _currentYear: number;

  _format = "dd/MM/yyyy";

  constructor() {
  }

  ngOnInit() {
    this._refreshDate()
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.selectedDate != undefined) {
      this._refreshDate()
    }
  }

  _refreshDate() {
    if (this.selectedDate != undefined && this.selectedDate != null) {
      this._selectedDate = this.selectedDate;
    } else {
      this._selectedDate = new Date();
    }
    this._selectedDay = this._selectedDate.getDate();
    this._selectedWeekDay = this._selectedDate.getDay();
    this._selectedMonth = this._selectedDate.getMonth();
    this._selectedYear = this._selectedDate.getFullYear();

    this._currentDay = this._selectedDate.getDate();
    this._currentWeekDay = this._selectedDate.getDay();
    this._currentMonth = this._selectedDate.getMonth();
    this._currentYear = this._selectedDate.getFullYear();

    this._calculateDays();
    for (var i = 1900; i <= 2100; i++) {
      this._years.push(i);
    }
    if (this.format && this.format.length > 0) {
      this._format = this.format;
    }    
    this.selectedDateChange.emit(this._selectedDate);
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
    this._isOpen = false;
    this.selectedDateChange.emit(this._selectedDate);
  }

  _selectMonth($event) {
    this._currentMonth = parseInt($event.target.value);
    this._calculateDays();
  }

  _selectYear($event) {
    this._currentYear = parseInt($event.target.value);
    this._calculateDays();
  }

  _toggleDatePicker() {
    this._isOpen = !this._isOpen;
  }

  _close() {
    this._isOpen = false;
  }

  getSelectedDate() {
    return this._selectedDate;
  }

  setSelectedDate(date: Date) {
    this.selectedDate = date;    
    this._refreshDate();
  }
}
