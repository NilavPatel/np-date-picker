import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter, HostListener, ElementRef, ChangeDetectionStrategy, ViewEncapsulation, ViewChild } from '@angular/core';

@Component({
  selector: 'np-ui-date-picker',
  templateUrl: './np-ui-date-picker.component.html',
  styleUrls: ['./np-ui-date-picker.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.Default
})
export class NpUiDatePickerComponent implements OnInit {

  _weekDays: string[] = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  _monthsList: any[];
  _months: any[];
  _years: number[] = [];
  _days: number[] = [];
  _selectedDate: Date;
  _format: string;
  _selectedDay: number;
  _selectedMonth: number;
  _selectedYear: number;
  _currentDay: number;
  _currentMonth: number;
  _currentYear: number;
  _minYear: number;
  _minMonth: number;
  _minDay: number;
  _maxYear: number;
  _maxMonth: number;
  _maxDay: number;
  _todayDate: number;
  _todayMonth: number;
  _todayYear: number;
  _isOpen = false;
  _disablePrevButton = false;
  _disableNextButton = false;
  _isValidDate = true;
  _minDate: Date;
  _maxDate: Date;

  @Input() value: Date;
  @Input() minDate: Date;
  @Input() maxDate: Date;
  @Input() format: string;
  @Input() defaultOpen: boolean = false;
  @Input() disabled: boolean;
  @Input() placeholder: string = "";
  @Input() showToday: boolean;
  @Input() required: boolean = false;
  @Input() name: string = "";
  @Input() disabledDays: string[] = [];
  @Input() disabledDates: Date[] = [];
  @Input() dateLabels: any[] = [];
  @Output() valueChange: EventEmitter<any> = new EventEmitter();
  @Output() onChange: EventEmitter<any> = new EventEmitter();

  @ViewChild('datepickerinput') input: ElementRef;

  constructor(private elRef: ElementRef) {
  }

  @HostListener('document:click', ['$event'])
  clickOutSide(event: any) {
    if (!this.elRef.nativeElement.contains(event.target)) {
      this._close();
    }
  }

  ngOnInit() {

    this._monthsList = [{ key: 0, value: "January" },
    { key: 1, value: "February" },
    { key: 2, value: "March" },
    { key: 3, value: "April" },
    { key: 4, value: "May" },
    { key: 5, value: "June" },
    { key: 6, value: "July" },
    { key: 7, value: "August" },
    { key: 8, value: "September" },
    { key: 9, value: "October" },
    { key: 10, value: "November" },
    { key: 11, value: "December" }];


    if (this.minDate) {
      this._minDay = this.minDate.getDate();
      this._minMonth = this.minDate.getMonth();
      this._minYear = this.minDate.getFullYear();
      this._minDate = new Date(this._minYear, this._minMonth, this._minDay);
    }

    if (this.maxDate) {
      this._maxDay = this.maxDate.getDate();
      this._maxMonth = this.maxDate.getMonth();
      this._maxYear = this.maxDate.getFullYear();
      this._maxDate = new Date(this._maxYear, this._maxMonth, this._maxDay);
    }

    if (this.format && this.format.length > 0) {
      this._format = this.format;
    } else {
      this._format = "dd/MM/yyyy";
    }

    if (this.value != undefined && this.value != null) {
      this._selectedDate = this.value;
    }

    var today = new Date();
    this._todayDate = today.getDate();
    this._todayMonth = today.getMonth();
    this._todayYear = today.getFullYear();

    this._resetVariables();
    this._setYears();
    this._setMonths();
    this._calculateDays();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.value != undefined && changes.value.currentValue != this._selectedDate) {
      if (this._checkDateIsDisabled(changes.value.currentValue) == false) {
        this._selectedDate = changes.value.currentValue;
      } else {
        this._selectedDate = null;
      }
      this._resetVariables();
      if (!changes.value.firstChange) {
        this.onChange.emit(this._selectedDate);
      }
    }
  }

  private _resetVariables() {
    if (this._selectedDate) {
      if (this._minDate && this._minDate > this._selectedDate) {
        this._selectedDate = null;
      }
      if (this._maxDate && this._maxDate < this._selectedDate) {
        this._selectedDate = null;
      }
    }

    if (this._selectedDate) {
      this._selectedDay = this._selectedDate.getDate();
      this._selectedMonth = this._selectedDate.getMonth();
      this._selectedYear = this._selectedDate.getFullYear();
    } else {
      this._selectedDay = null;
      this._selectedMonth = null;
      this._selectedYear = null;
    }

    var currentDate = this._selectedDate ? this._selectedDate : new Date();
    if (currentDate < this._minDate) {
      currentDate = this._minDate;
    }
    if (currentDate > this._maxDate) {
      currentDate = this._maxDate;
    }
    this._currentDay = currentDate.getDate();
    this._currentMonth = currentDate.getMonth();
    this._currentYear = currentDate.getFullYear();
    this._toggleNextPrevButtons();
  }

  private _calculateDays() {
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

  private _daysInThisMonth() {
    return new Date(this._currentYear, this._currentMonth + 1, 0).getDate();
  }

  _daysArrayFromTo(from: number, to: number) {
    return this._days.slice(from, to);
  }

  _toggleNextPrevButtons() {
    if (this._currentYear == this._minYear && this._currentMonth == this._minMonth) {
      this._disablePrevButton = true;
    } else {
      this._disablePrevButton = false;
    }
    if (this._currentYear == this._maxYear && this._currentMonth == this._maxMonth) {
      this._disableNextButton = true;
    } else {
      this._disableNextButton = false;
    }
  }

  _prevMonth() {
    if (this._disablePrevButton) {
      return;
    }
    if (this._currentMonth == 0) {
      this._currentMonth = 11;
      this._currentYear = this._currentYear - 1;
      this._setMonths();
    } else {
      this._currentMonth = this._currentMonth - 1;
    }
    this._calculateDays();
    this._toggleNextPrevButtons();
  }

  _nextMonth() {
    if (this._disableNextButton) {
      return;
    }
    if (this._currentMonth == 11) {
      this._currentMonth = 0;
      this._currentYear = this._currentYear + 1;
      this._setMonths();
    } else {
      this._currentMonth = this._currentMonth + 1;
    }
    this._calculateDays();
    this._toggleNextPrevButtons();
  }

  _onSelectDate(day: number) {
    if (day == null) {
      return;
    }
    var date = new Date(this._currentYear, this._currentMonth, day);
    if (this._checkDateIsDisabled(date)) {
      return;
    }
    this._selectedDate = date;
    this._resetVariables();
    this._isOpen = false;
    this.valueChange.emit(this._selectedDate);
    this._isValidDate = true;
    this.onChange.emit(this._selectedDate);
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
    if (this.disabled) {
      return;
    }
    this._isOpen = !this._isOpen;
    if (this._isOpen) {
      this.input.nativeElement.focus();
    }
  }

  _close() {
    if (this.defaultOpen == true) {
      return;
    }
    this._isOpen = false;
  }

  private _setYears() {
    var currentYear = new Date().getFullYear();
    var minYear = this._minYear ? this._minYear : currentYear - 100;
    var maxYear = this._maxYear ? this._maxYear : currentYear + 100;
    for (var i = minYear; i <= maxYear; i++) {
      this._years.push(i);
    }
  }

  private _setMonths() {
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
  }

  private _setDate() {
    if (this._selectedYear > 0 && this._selectedMonth > 0 && this._selectedDay > 0) {
      var date = new Date(this._selectedYear, this._selectedMonth, this._selectedDay)
      if (this._checkDateIsDisabled(date)) {
        return;
      }
      this._selectedDate = date;
      this.valueChange.emit(this._selectedDate);
      this.onChange.emit(this._selectedDate);
    }
  }

  private _validate() {
    if ((this._minDate && this._selectedDate < this._minDate) || (this._maxDate && this._selectedDate > this._maxDate)) {
      return false;
    } else {
      return true
    }
  }

  _setToday() {
    var today = new Date();
    if (this._checkDateIsDisabled(today)) {
      return;
    }
    this.setSelectedDate(today);
    this._close();
  }

  _clear() {
    this.setSelectedDate(null);
    this._close();
  }

  validate() {
    if (this._validate() == false) {
      return false;
    }
    return this._checkDateIsDisabled(this._selectedDate);
  }

  getSelectedDate() {
    return this._selectedDate;
  }

  setSelectedDate(date: Date) {
    if (this._checkDateIsDisabled(date)) {
      return;
    }
    this.value = date;
    this._selectedDate = date;
    this._resetVariables();
    this._calculateDays();
    this.valueChange.emit(this._selectedDate);
    this.onChange.emit(this._selectedDate);
  }

  _checkDateDisabled(year: number, month: number, day: number) {
    if (day) {
      return this._checkDateIsDisabled(new Date(year, month, day));
    }
    return true;
  }

  _getTitle(year: number, month: number, day: number) {
    if (day && this.dateLabels.length > 0) {
      var currentDate = new Date(year, month, day);
      var dateLabel: any = this.dateLabels.find(function (item) { return item.date.toDateString() == currentDate.toDateString(); });
      return dateLabel ? dateLabel.label : null;
    }
    return null;
  }

  private _checkIsDayDisabled(index: number) {
    var day = this._weekDays[index];
    return this.disabledDays.includes(day);
  }

  private _checkDateIsDisabled(date: Date) {
    if (date == undefined || date == null) {
      return false;
    }
    var day = date.getDay();
    if (this._checkIsDayDisabled(day)) {
      return true;
    }
    return this.disabledDates.findIndex(function (item) { return item.toDateString() == date.toDateString() }) > -1;
  }
}
