# np-datepicker

![image login](https://github.com/NilavPatel/np-date-picker/blob/master/src/assets/images/image1.PNG)

Angular Version 7.1.0 or newer, 

````
Custom date picker for Angular (Timepicker also included).
With Two way data binding.
````

````
<app-np-date-picker [(selectedDate)]="birthDate" format="dd/MMM/yy" iconClass="fa fa-calendar"></app-np-date-picker>
````
### Properties
````
1.  selectedDate
    two way date binding model.

2.  format
    pass date format as string, date will be shown in given format in text box.
    default format is dd/MM/yyyy

3.  iconClass
    icon class css, to dispaly icon in button for datepicker.

4.  defaultOpen
    default open datepicker, user can not close this.(no textbox will be shown)

5.  showTimePicker
    Show time picker or not

6.  minDate
    no date will be shown less than min date

7.  maxDate
    no date will be show greater than max date
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

### How to configure?
````
1.  Copy folder np-date-picker into app folder
2.  import { NpDatePickerModule } from './np-date-picker' in app.module.ts;
````