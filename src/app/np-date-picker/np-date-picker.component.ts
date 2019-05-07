import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-np-date-picker',
  templateUrl: './np-date-picker.component.html',
  styleUrls: ['./np-date-picker.component.css']
})
export class NpDatePickerComponent implements OnInit {

  _isOpen = false;
  _weekDays: string[];
  _months: string[];
  _years: number[] = [];
  _days: number[] = [];
  _hours: number[] = [];
  _minutes: number[] = [];
  _seconds: number[] = [];
  _selectedDate: Date;
  _selectedDay: number;
  _selectedMonth: number;
  _selectedYear: number;
  _selectedHour: number;
  _selectedMinute: number;
  _selectedSecond: number;  
  _currentDay: number;
  _currentWeekDay: number;
  _currentMonth: number;
  _currentYear: number;
  _format: string;

  @Input() value: Date;
  @Output() valueChange = new EventEmitter();
  @Input() format: string;
  @Input() iconClass: string;
  @Input() showTimePicker: boolean = false;
  @Input() defaultOpen: boolean = false;
  @Output() onChange: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
    this._weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

    this._months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    for (var i = 0; i <= 24; i++) {
      this._hours.push(i);
    }

    for (var i = 0; i <= 60; i++) {
      this._minutes.push(i);
      this._seconds.push(i);
    }

    for (var i = 1900; i <= 2100; i++) {
      this._years.push(i);
    }

    if (this.format && this.format.length > 0) {
      this._format = this.format;
    } else {
      this._format = "dd/MM/yyyy";
    }

    if (this.value != undefined && this.value != null) {
      this._selectedDate = this.value;
    }
    
    this._resetVariables();
    this._calculateDays();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.value != undefined && changes.value.currentValue != this._selectedDate) {
      this._selectedDate = changes.value.currentValue;
      this._resetVariables();
    }
    if(changes.value != undefined && changes.value != null){
      this.onChange.emit();
    }
  }

  _resetVariables() {
    var currentDate = this._selectedDate == null ? new Date() : this._selectedDate;

    this._selectedDay = currentDate.getDate();
    this._selectedMonth = currentDate.getMonth();
    this._selectedYear = currentDate.getFullYear();

    if (this.showTimePicker) {
      this._selectedHour = currentDate.getHours();
      this._selectedMinute = currentDate.getMinutes();
      this._selectedSecond = currentDate.getSeconds();
    }

    this._currentDay = currentDate.getDate();
    this._currentWeekDay = currentDate.getDay();
    this._currentMonth = currentDate.getMonth();
    this._currentYear = currentDate.getFullYear();
  }

  _calculateDays() {
    this._days = [];
    var _daysInMonth = this._daysInThisMonth();
    var _firstWeekDayOfMonth = new Date(this._currentYear, this._currentMonth, 1).getDay();
    for (let index = 0; index < _firstWeekDayOfMonth; index++) {
      this._days.push(null);
    }
    for (let index = 1; index <= _daysInMonth; index++) {
      this._days.push(index);
    }
    for (let index = this._days.length; index <= 42; index++) {
      this._days.push(null);
    }
  }

  _daysInThisMonth() {
    return new Date(this._currentYear, this._currentMonth + 1, 0).getDate();
  }

  _daysArrayFromTo(from: number, to: number) {
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

  _onSelectDate(day: number) {
    this._selectedDate = new Date(this._currentYear, this._currentMonth, day);
    this._resetVariables();
    this._isOpen = false;
    this.valueChange.emit(this._selectedDate);    
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

  _changeTime($event, arg) {
    if (arg == "hour") {
      this._selectedHour = parseInt($event.target.value);
    }
    else if (arg == "minute") {
      this._selectedMinute = parseInt($event.target.value);
    }
    else if (arg == "second") {
      this._selectedSecond = parseInt($event.target.value);
    }
    this._selectedDate = new Date(this._selectedYear, this._selectedMonth, this._selectedDay, this._selectedHour, this._selectedMinute, this._selectedSecond);
    this.valueChange.emit(this._selectedDate);    
  }

  getSelectedDate() {
    return this._selectedDate;
  }

  setSelectedDate(date: Date) {
    this.value = date;
    this._selectedDate = date;
    this._resetVariables();
    this._calculateDays();
    this.valueChange.emit(this._selectedDate);    
  }
}
