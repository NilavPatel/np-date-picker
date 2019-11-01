# np-ui-date-picker

<img src="https://raw.githubusercontent.com/NilavPatel/np-ui-data-grid-package/master/src/assets/images/logo-large.png" width="300" height="80">

````
Custom date picker for Angular 8 (Timepicker is also included).
````

<img src="https://raw.githubusercontent.com/NilavPatel/np-date-picker-package/master/src/assets/images/image1.PNG">

### [Demo](https://stackblitz.com/edit/np-ui-date-picker)

````
npm i np-ui-date-picker
````

````
<np-date-picker [(value)]="birthDate" format="dd/MMM/yy"></np-date-picker>
````

### Properties
````
1.  value : Date
    two way date binding model.

2.  format : string
    pass date format as string, date will be shown in given format in text box.
    default format is dd/MM/yyyy

3.  defaultOpen : boolean
    default open datepicker, user can not close this.(no textbox will be shown)

4.  showTimePicker : boolean
    Show time picker or not

5.  minDate : Date
    no date will be shown less than min date

6.  maxDate : Date
    no date will be show greater than max date

7.  disabled : boolean
    true/false - set component disabled
````

### Apis
````
1.  getSelectedDate();
    get selected date

2.  setSelectedDate(date: Date);
    set date as selected

3.  validate();
    returns boolean, selected date is valid or not?
````

## Methods
````
1.  onChange
    on change event binding
````