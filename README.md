# np-ui-date-picker
Date picker for Angular 8 and 8+

## [Demo](https://stackblitz.com/edit/np-ui-date-picker)

## NPM
````
npm i np-ui-date-picker
````

## HTML
````
<np-ui-date-picker [(value)]="date" [format]="'dd/MMM/yy'"></np-ui-date-picker>
````

## Properties
````
1.  value : Date
    two way date binding model.
    value is always date type object.

2.  format : string
    pass date format as string, date will be shown in given format in text box.
    default format is dd/MM/yyyy

3.  defaultOpen : boolean
    default open datepicker, user can not close this.(no textbox will be shown).

4.  minDate : Date
    no date will be shown less than min date.
    Default calender shows min year upto CurrentYear - 100, but if need to set years less than that,
    then set minDate validation with less year numbers.

5.  maxDate : Date
    no date will be show greater than max date.
    Default calender shows max year upto CurrentYear + 100, but if need to set years more than that,
    then set maxDate validation with high year numbers.

6.  disabled : boolean
    true/false - set component disabled.

7.  placeholder : string
    set placeholder for datepicker

8.  showToday : boolean
    show/hide Today link in datepicker pop up, on click of link today's date will be set as selected.

9.  required : boolean
    default value is false.
    add required attribute to input textbox.

10. name : string
    add name attribute to input textbox.
````

## Apis
````
1.  getSelectedDate();
    get selected date.

2.  setSelectedDate(date: Date);
    set date as selected.

3.  validate();
    returns boolean, selected date is valid or not?.
    Check min and max date validation if used. else returns true always.
    If date is set by Api, then use validate Api to check weather date is within min max range or not.
````

## Methods
````
1.  onChange
    on change event binding.
````

## All np-ui packages for Angular
1. [Data grid](https://www.npmjs.com/package/np-ui-data-grid)
2. [Date picker](https://www.npmjs.com/package/np-ui-date-picker)
3. [Time picker](https://www.npmjs.com/package/np-ui-time-picker)
4. [Color picker](https://www.npmjs.com/package/np-ui-color-picker)

<img src="https://raw.githubusercontent.com/NilavPatel/nilavpatel.github.io/master/images/logo-large.png" width="300" height="80">