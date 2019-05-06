# np-datepicker

![image login](https://github.com/NilavPatel/np-date-picker/blob/master/src/assets/images/image1.PNG)

Angular Version 7.1.0 or newer, 

````
Custom date picker for Angular.
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
````


### Apis
````
1.  getSelectedDate();
    get selected date

2.  setSelectedDate(date: Date);
    set date as selected
````

### How to configure?
````
1.  Copy folder np-date-picker into app folder
2.  import { NpDatePickerModule } from './np-date-picker' in app.module.ts;
````