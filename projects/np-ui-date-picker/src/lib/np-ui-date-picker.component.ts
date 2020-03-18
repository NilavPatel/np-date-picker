import { Component, Input, Output, EventEmitter, HostListener, ElementRef, ChangeDetectionStrategy, ViewEncapsulation, ViewChild, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'np-ui-date-picker',
  templateUrl: './np-ui-date-picker.component.html',
  styleUrls: ['./np-ui-date-picker.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.Default,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NpUiDatePickerComponent),
      multi: true
    }
  ]
})
export class NpUiDatePickerComponent implements ControlValueAccessor {

  _weekDays: string[];
  _monthsList: any[];
  _months: any[];
  _years: number[] = [];
  _days: number[] = [];
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
  _minDate: Date;
  _maxDate: Date;
  _innerValue: Date;
  _isDisabled: boolean = false;
  private onChangeCallback: (_: any) => void;
  private onTouchedCallback: () => void;

  @Input() minDate: Date;
  @Input() maxDate: Date;
  @Input() format: string = "";
  @Input() defaultOpen: boolean = false;
  @Input() placeholder: string = "";
  @Input() showTodayButton: boolean = false;
  @Input() disableWeekDays: string[] = [];
  @Input() disableDates: Date[] = [];
  @Input() dateLabels: any[] = [];
  @Input() isStartMonthWithMonday: boolean = false;

  @Output() onChange: EventEmitter<any> = new EventEmitter();

  @ViewChild('datepickerinput') _inputControl: ElementRef;

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

    this._setYears();
    this._setMonths();
  }

  @HostListener('document:click', ['$event'])
  clickOutSide(event: any) {
    if (!this.elRef.nativeElement.contains(event.target)) {
      this._close();
    }
  }

  get value(): Date {
    return this._innerValue;
  };

  set value(v: Date) {
    if (v !== this._innerValue) {
      this._innerValue = v;
      this.onChangeCallback(v);
      this.onTouchedCallback();
      if (this.onChange) {
        this.onChange.emit(v);
      }
    }
  }

  writeValue(v: Date): void {
    if (v !== this._innerValue) {
      this._innerValue = v;
      if (this._checkDateIsDisabled(v)) {
        this.value = null;
      }
      this._resetVariables();
      this._calculateDays();
    }
  }

  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this._isDisabled = isDisabled;
  }

  ngOnChanges(changes) {
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

    if (changes.isStartMonthWithMonday) {
      this._weekDays = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
    }
  }

  _resetVariables() {
    if (this.value) {
      if (this._minDate && this._minDate > this.value) {
        this.value = null;
      }
      if (this._maxDate && this._maxDate < this.value) {
        this.value = null;
      }
    }

    if (this.value) {
      this._selectedDay = this.value.getDate();
      this._selectedMonth = this.value.getMonth();
      this._selectedYear = this.value.getFullYear();
    } else {
      this._selectedDay = null;
      this._selectedMonth = null;
      this._selectedYear = null;
    }

    var currentDate = this.value ? this.value : new Date();
    if (this._minDate && currentDate < this._minDate) {
      currentDate = this._minDate;
    }
    if (this._maxDate && currentDate > this._maxDate) {
      currentDate = this._maxDate;
    }
    this._currentDay = currentDate.getDate();
    this._currentMonth = currentDate.getMonth();
    this._currentYear = currentDate.getFullYear();
  }

  _calculateDays() {
    this._days = [];
    var _daysInMonth = this._daysInCurrentMonth();
    var _firstWeekDayOfMonth = new Date(this._currentYear, this._currentMonth, 1).getDay();
    for (let index = 0; index < _firstWeekDayOfMonth; index++) {
      this._days.push(null);
    }
    if (this.isStartMonthWithMonday) {
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

  _daysInCurrentMonth() {
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
  }

  _onSelectDate(day: number) {
    if (day == null) {
      return;
    }
    var date = new Date(this._currentYear, this._currentMonth, day);
    this._setSelectedDate(date);
  }

  _selectMonth($event) {
    this._currentMonth = parseInt($event.target.value);
    this._calculateDays();
  }

  _selectYear($event) {
    this._currentYear = parseInt($event.target.value);
    this._setMonths();
    this._calculateDays();
  }

  _toggleDatePicker() {
    if (this._isOpen) {
      this._close();
    } else {
      this._open();
    }
  }

  _open() {
    if (this.defaultOpen == true || this._isDisabled) {
      return;
    }
    this._inputControl.nativeElement.focus();
    this._isOpen = true;
    this._resetVariables();
    this._calculateDays();
    this.onTouchedCallback();
  }

  _close() {
    if (this.defaultOpen == true || this._isDisabled) {
      return;
    }
    this._isOpen = false;
  }

  _setYears() {
    var currentYear = new Date().getFullYear();
    var minYear = currentYear - 100;
    var maxYear = currentYear + 100;
    for (var i = minYear; i <= maxYear; i++) {
      this._years.push(i);
    }
  }

  _setMonths() {
    this._months = this._monthsList;
  }

  _setToday() {
    var today = new Date();
    if (this._checkDateIsDisabled(today)) {
      return;
    }
    this._setSelectedDate(today);
    this._calculateDays();
    this._close();
  }

  _clear() {
    this._setSelectedDate(null);
    this._calculateDays();
    this._close();
  }

  _checkDateDisabled(year: number, month: number, day: number) {
    if (day) {
      return this._checkDateIsDisabled(new Date(year, month, day));
    }
    return true;
  }

  _getToolTip(year: number, month: number, day: number) {
    if (day && this.dateLabels && this.dateLabels.length > 0) {
      var currentDate = new Date(year, month, day);
      var dateLabel: any = this.dateLabels.find(function (item) { return item.date.toDateString() == currentDate.toDateString(); });
      return dateLabel ? dateLabel.label : null;
    }
    return null;
  }

  _checkIsDayDisabled(index: number) {
    var day = this._weekDays[index];
    return this.disableWeekDays.includes(day);
  }

  _checkDateIsDisabled(date: Date) {
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
    return this.disableDates.findIndex(function (item) { return item.toDateString() == date.toDateString() }) > -1;
  }

  _checkIsToday(day: number) {
    return day == this._todayDate && this._currentMonth == this._todayMonth && this._currentYear == this._todayYear;
  }

  _checkIsSelected(day: number) {
    return day == this._selectedDay && this._currentMonth == this._selectedMonth && this._currentYear == this._selectedYear;
  }

  _setSelectedDate(date: Date) {
    if (date) {
      date.setHours(0, 0, 0, 0);
    }
    if (this._checkDateIsDisabled(date)) {
      return;
    }
    this.value = date;
    this._resetVariables();
  }
}
