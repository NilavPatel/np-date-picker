# np-ui-date-picker
Date picker custom component for Angular 8 and 8+, Created using only Angular.

## Check demo [Here](https://stackblitz.com/edit/np-ui-date-picker)

## NPM
`$ npm i np-ui-date-picker`

## HTML
````html
<np-ui-date-picker 
    [(value)]="startDate" 
    [format]="'dd/MMM/yy'">
</np-ui-date-picker>
````

## Properties
1.  `value` : Date  
    two way date binding model value.  
    value must be date type object.  
2.  `format` : string  
    pass date format as string, date will be shown in given format in text box.  
    default format is dd/MM/yyyy  
3.  `defaultOpen` : boolean  
    default open datepicker, user can not close this. no textbox will be shown.  
4.  `minDate` : Date  
    no date will be selected less than min date.  
    Default calender shows min year upto CurrentYear - 100, but if need to set years less than that,   
    then set minDate validation with less year numbers.  
5.  `maxDate` : Date  
    no date will be selected greater than max date.  
    Default calender shows max year upto CurrentYear + 100, but if need to set years more than that, then set maxDate   validation with high year numbers.  
6.  `disabled` : boolean  
    true/false - set component disabled.  
7.  `placeholder` : string  
    set placeholder for datepicker  
8.  `showToday` : boolean  
    show/hide Today link in datepicker pop up, on click of link today's date will be set as selected.  
9.  `required` : boolean  
    default value is false. add required attribute to input textbox.  
10. `name` : string  
    add name attribute to input textbox.  

## Apis  
1.  `getSelectedDate()`  
    get selected date.  
2.  `setSelectedDate(date: Date)`  
    set date as selected.  
3.  `validate()`  
    returns boolean, selected date is valid or not?  
    Check min and max date validation if used. else returns true always.  
    If date is set by Api, then use validate Api to check weather date is within min max range or not.  

## Methods  
1.  `onChange`  
    on change event binding.  

## Other np-ui components for Angular
1. [Data grid](https://www.npmjs.com/package/np-ui-data-grid)
2. [Date picker](https://www.npmjs.com/package/np-ui-date-picker)
3. [Time picker](https://www.npmjs.com/package/np-ui-time-picker)
4. [Color picker](https://www.npmjs.com/package/np-ui-color-picker)

## License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Contributors
![](https://raw.githubusercontent.com/NilavPatel/nilavpatel.github.io/master/images/logo-large.png)