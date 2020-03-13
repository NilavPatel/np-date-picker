import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter, HostListener, ElementRef, ChangeDetectionStrategy, ViewEncapsulation, ViewChild } from '@angular/core';

@Component({
  selector: 'np-ui-date-picker',
  templateUrl: './np-ui-date-picker.component.html',
  styleUrls: ['./np-ui-date-picker.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.Default
})
export class NpUiDatePickerComponent implements OnInit {

  _weekDays: string[];
  _monthsList: any[];
  _months: any[];
  _years: number[] = [];
  _days: number[] = [];
  _selectedDate: Date;
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
  @Input() format: string = "";
  @Input() defaultOpen: boolean = false;
  @Input() disabled: boolean = false;
  @Input() placeholder: string = "";
  @Input() showToday: boolean = false;;
  @Input() required: boolean = false;
  @Input() name: string = "";
  @Input() disabledDays: string[] = [];
  @Input() disabledDates: Date[] = [];
  @Input() dateLabels: any[] = [];
  @Input() startWithMonday: boolean = false;
  @Output() valueChange: EventEmitter<any> = new EventEmitter();
  @Output() onChange: EventEmitter<any> = new EventEmitter();

  @ViewChild('datepickerinput') input: ElementRef;

  constructor(private elRef: ElementRef) {
    this._monthsList = [
      { key: 0, value: "January" },
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
      { key: 11, value: "December" }
    ];

    var today = new Date();
    this._todayDate = today.getDate();
    this._todayMonth = today.getMonth();
    this._todayYear = today.getFullYear();

    this.format = "dd/MM/yyyy";

    this._weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  }

  @HostListener('document:click', ['$event'])
  clickOutSide(event: any) {
    if (!this.elRef.nativeElement.contains(event.target)) {
      this._close();
    }
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.value && changes.value.currentValue == this._selectedDate) {
      return;
    }

    if (changes.minDate) {
      if (this.minDate) {
        this.minDate.setHours(0, 0, 0, 0);
        this._minDay = this.minDate.getDate();
        this._minMonth = this.minDate.getMonth();
        this._minYear = this.minDate.getFullYear();
        this._minDate = this.minDate;
      }
      else {
        this._minDay = null;
        this._minMonth = null;
        this._minYear = null;
        this._minDate = null;
      }
    }

    if (changes.maxDate) {
      if (this.maxDate) {
        this.maxDate.setHours(0, 0, 0, 0);
        this._maxDay = this.maxDate.getDate();
        this._maxMonth = this.maxDate.getMonth();
        this._maxYear = this.maxDate.getFullYear();
        this._maxDate = this.maxDate;
      } else {
        this._maxDay = null;
        this._maxMonth = null;
        this._maxYear = null;
        this._maxDate = null;
      }
    }

    if (changes.value) {
      if (this._checkDateIsDisabled(changes.value.currentValue) == false) {
        var val = changes.value.currentValue;
        val.setHours(0, 0, 0, 0);
        this._selectedDate = val;
      } else {
        this._selectedDate = null;
      }
    }

    if (changes.startWithMonday) {
      this._weekDays = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
    }

    this._resetVariables();
    this._setYears();
    this._setMonths();
    this._calculateDays();
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
  }

  private _calculateDays() {
    this._days = [];
    var _daysInMonth = this._daysInCurrentMonth();
    var _firstWeekDayOfMonth = new Date(this._currentYear, this._currentMonth, 1).getDay();
    for (let index = 0; index < _firstWeekDayOfMonth; index++) {
      this._days.push(null);
    }
    if (this.startWithMonday) {
      if (_firstWeekDayOfMonth == 0) {
        this._days.push(null, null, null, null, null, null);
      } else {
        this._days.pop();
      }
    }
    for (let index = 1; index <= _daysInMonth; index++) {
      this._days.push(index);
    }
  }

  private _daysInCurrentMonth() {
    var days = 0;
    switch (this._currentMonth) {
      case 0:
      case 2:
      case 4:
      case 6:
      case 8:
      case 10:
        days = 31;
        break;
      case 3:
      case 5:
      case 7:
      case 9:
      case 11:
        days = 30;
        break;
      case 1:
        days = this._currentYear % 4 == 0 ? 29 : 28;
        break;
    }
    return days;
  }

  private _prevMonth() {
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
  }

  private _nextMonth() {
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
  }

  private _onSelectDate(day: number) {
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
    this._isValidDate = true;
    this.valueChange.emit(this._selectedDate);
    this.onChange.emit(this._selectedDate);
  }

  private _selectMonth($event) {
    this._currentMonth = parseInt($event.target.value);
    this._calculateDays();
  }

  private _selectYear($event) {
    this._currentYear = parseInt($event.target.value);
    this._setMonths();
    this._calculateDays();
  }

  private _toggleDatePicker() {
    if (this.disabled) {
      return;
    }
    this._isOpen = !this._isOpen;
    if (this._isOpen) {
      this.input.nativeElement.focus();
    }
  }

  private _close() {
    if (this.defaultOpen == true) {
      return;
    }
    this._isOpen = false;
  }

  private _setYears() {
    var currentYear = new Date().getFullYear();
    var minYear = currentYear - 100;
    var maxYear = currentYear + 100;
    for (var i = minYear; i <= maxYear; i++) {
      this._years.push(i);
    }
  }

  private _setMonths() {
    this._months = this._monthsList;
  }

  private _validate() {
    if ((this._minDate && this._selectedDate < this._minDate) || (this._maxDate && this._selectedDate > this._maxDate)) {
      return false;
    } else {
      return true
    }
  }

  private _setToday() {
    var today = new Date();
    if (this._checkDateIsDisabled(today)) {
      return;
    }
    this.setSelectedDate(today);
    this._close();
  }

  private _clear() {
    this.setSelectedDate(null);
    this._close();
  }

  private _checkDateDisabled(year: number, month: number, day: number) {
    if (day) {
      return this._checkDateIsDisabled(new Date(year, month, day));
    }
    return true;
  }

  private _getToolTip(year: number, month: number, day: number) {
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
    if (this.minDate && date < this.minDate) {
      return true;
    }
    if (this.maxDate && date > this.maxDate) {
      return true;
    }
    return this.disabledDates.findIndex(function (item) { return item.toDateString() == date.toDateString() }) > -1;
  }

  private _checkIsToday(day) {
    return day == this._todayDate && this._currentMonth == this._todayMonth && this._currentYear == this._todayYear;
  }

  private _checkIsSelected(day) {
    return day == this._selectedDay && this._currentMonth == this._selectedMonth && this._currentYear == this._selectedYear;
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
    if (date) {
      date.setHours(0, 0, 0, 0);
    }
    if (this._checkDateIsDisabled(date)) {
      return;
    }
    this.value = date;
    this._selectedDate = date;
    this._resetVariables();
    this._calculateDays();
    this._isValidDate = true;
    this.valueChange.emit(this._selectedDate);
    this.onChange.emit(this._selectedDate);
  }
}
