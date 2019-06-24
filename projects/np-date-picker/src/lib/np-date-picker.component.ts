import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'np-date-picker',
  templateUrl: './np-date-picker.component.html',
  styleUrls: ['./np-date-picker.component.css']
})
export class NpDatePickerComponent implements OnInit {

  _isOpen = false;
  _weekDays: string[];
  _monthsList: any[];
  _months: any[];
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
  _selectedAMPM = 'AM';
  _currentDay: number;
  _currentWeekDay: number;
  _currentMonth: number;
  _currentYear: number;
  _format: string;

  _minYear: number;
  _minMonth: number;
  _minDay: number;
  _disablePrevButton = false;
  _maxYear: number;
  _maxMonth: number;
  _maxDay: number;
  _disableNextButton = false;
  _isValidDate = true;

  @Input() value: Date;
  @Input() minDate: Date;
  @Input() maxDate: Date;
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

    this._monthsList = [{ key: 0, value: "Jan" },
    { key: 1, value: "Feb" },
    { key: 2, value: "Mar" },
    { key: 3, value: "Apr" },
    { key: 4, value: "May" },
    { key: 5, value: "Jun" },
    { key: 6, value: "Jul" },
    { key: 7, value: "Aug" },
    { key: 8, value: "Sep" },
    { key: 9, value: "Oct" },
    { key: 10, value: "Nov" },
    { key: 11, value: "Dec" }];

    for (var i = 0; i <= 12; i++) {
      this._hours.push(i);
    }

    for (var i = 0; i <= 60; i++) {
      this._minutes.push(i);
      this._seconds.push(i);
    }

    if (this.minDate) {
      this._minDay = this.minDate.getDate();
      this._minMonth = this.minDate.getMonth();
      this._minYear = this.minDate.getFullYear();
    }
    if (this.maxDate) {
      this._maxDay = this.maxDate.getDate();
      this._maxMonth = this.maxDate.getMonth();
      this._maxYear = this.maxDate.getFullYear();
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

    this._setYears();

    this._setMonths();

    this._calculateDays();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.value != undefined && changes.value.currentValue != this._selectedDate) {
      this._selectedDate = changes.value.currentValue;
      this._resetVariables();
    }
    if (changes.value != undefined && changes.value != null) {
      this.onChange.emit();
    }
  }

  _resetVariables() {
    var currentDate = this._selectedDate == null ? new Date() : this._selectedDate;

    if (this._selectedDate) {
      this._selectedDay = currentDate.getDate();
      this._selectedMonth = currentDate.getMonth();
      this._selectedYear = currentDate.getFullYear();

      if (this.showTimePicker) {
        var _hour = currentDate.getHours();
        this._selectedAMPM = _hour >= 12 ? "PM" : "AM";
        _hour = _hour % 12;
        this._selectedHour = _hour ? _hour : 12; // the hour '0' should be '12'      
        this._selectedMinute = currentDate.getMinutes();
        this._selectedSecond = currentDate.getSeconds();
      }
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
      // min/max day validation
      if ((this._currentYear == this._minYear && this._currentMonth == this._minMonth && index < this._minDay) ||
        (this._currentYear == this._maxYear && this._currentMonth == this._maxMonth && index > this._maxDay)) {
        this._days.push(null);
      } else {
        this._days.push(index);
      }
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

  _toggleNextPrevButtons() {
    if (this._currentYear == this._minYear && (this._currentMonth - 1) == this._minMonth) {
      this._disablePrevButton = true;
    } else {
      this._disablePrevButton = false;
    }
    if (this._currentYear == this._maxYear && (this._currentMonth + 1) == this._maxMonth) {
      this._disableNextButton = true;
    } else {
      this._disableNextButton = false;
    }
  }

  _prevMonth() {
    this._toggleNextPrevButtons();
    if (this._currentMonth == 0) {
      this._currentMonth = 11;
      this._currentYear = this._currentYear - 1;
      this._setMonths();
    } else {
      this._currentMonth = this._currentMonth - 1;
    }
    this._calculateDays();
  }

  _nextMonth() {
    this._toggleNextPrevButtons();
    if (this._currentMonth == 11) {
      this._currentMonth = 0;
      this._currentYear = this._currentYear + 1;
      this._setMonths();
    } else {
      this._currentMonth = this._currentMonth + 1;
    }
    this._calculateDays();
  }

  _onSelectDate(day: number) {
    this._selectedDate = new Date(this._currentYear, this._currentMonth, day,
      this.showTimePicker ? (this._selectedAMPM == "PM" ? this._selectedHour + 12 : this._selectedHour) : 0, this.showTimePicker ? this._selectedMinute : 0, this.showTimePicker ? this._selectedSecond : 0);
    this._resetVariables();
    this._isOpen = false;
    this.valueChange.emit(this._selectedDate);
    this._isValidDate = true;
  }

  _selectMonth($event) {
    this._currentMonth = parseInt($event.target.value);
    this._toggleNextPrevButtons();
    this._calculateDays();
  }

  _selectYear($event) {
    this._currentYear = parseInt($event.target.value);
    this._setMonths();
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
    else if (arg == "AMPM") {
      this._selectedAMPM = $event.target.value;
    }
    this._setDate();
  }

  _setYears() {
    var minYear = this._minYear ? this._minYear : 1900;
    var maxYear = this._maxYear ? this._maxYear : 2100;
    for (var i = minYear; i <= maxYear; i++) {
      this._years.push(i);
    }
  }

  _setMonths() {
    if (this._minYear && this._minYear == this._currentYear && this._maxYear != this._currentYear) {
      this._months = [];
      for (var i = this._minMonth; i <= 11; i++) {
        this._months.push(this._monthsList[i]);
      }
    } else if (this._maxYear && this._maxYear == this._currentYear && this._minYear != this._currentYear) {
      this._months = [];
      for (var i = 0; i <= this._maxMonth; i++) {
        this._months.push(this._monthsList[i]);
      }
    } else if (this._minYear && this._minYear == this._maxYear && this._maxYear) {
      this._months = [];
      for (var i = this._minMonth; i <= this._maxMonth; i++) {
        this._months.push(this._monthsList[i]);
      }
    } else {
      this._months = this._monthsList;
    }
    if (this._currentMonth + 1 > this._months.length) {
      this._currentMonth = this._months.length - 1;
    }
  }

  _setDate() {
    this._selectedDate = new Date(this._selectedYear, this._selectedMonth, this._selectedDay, this._selectedAMPM == "PM" ? this._selectedHour + 12 : this._selectedHour, this._selectedMinute, this._selectedSecond);
    this.valueChange.emit(this._selectedDate);
  }

  _minusHour() {
    this._selectedHour = this._selectedHour == 0 ? 12 : this._selectedHour - 1;
    this._setDate();
  }

  _minusMinute() {
    this._selectedMinute = this._selectedMinute == 0 ? 60 : this._selectedMinute - 1;
    this._setDate();
  }

  _minusSecond() {
    this._selectedSecond = this._selectedSecond == 0 ? 60 : this._selectedSecond - 1;
    this._setDate();
  }

  _addHour() {
    this._selectedHour = this._selectedHour == 12 ? 0 : this._selectedHour + 1;
    this._setDate();
  }

  _addMinute() {
    this._selectedMinute = this._selectedMinute == 60 ? 0 : this._selectedMinute + 1;
    this._setDate();
  }

  _addSecond() {
    this._selectedSecond = this._selectedSecond == 60 ? 0 : this._selectedSecond + 1;
    this._setDate();
  }

  validate() {
    if ((this.minDate && this._selectedDate < this.minDate) || (this.maxDate && this._selectedDate > this.maxDate)) {
      this._isValidDate = false;
      this._selectedDate = null;
    } else {
      this._isValidDate = true;
    }
    return this._isValidDate;
  }

  getSelectedDate() {
    return this._selectedDate;
  }

  setSelectedDate(date: Date) {
    if ((this.minDate && date < this.minDate) || (this.maxDate && date > this.maxDate)) {
      this._isValidDate = false;
      this._selectedDate = null;
      this._resetVariables();
      return;
    }
    this.value = date;
    this._selectedDate = date;
    this._resetVariables();
    this._calculateDays();
    this.valueChange.emit(this._selectedDate);
  }
}
