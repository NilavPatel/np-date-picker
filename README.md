# np-ui-date-picker
Angular 9 Native date picker component.

## Check demo [Here](https://stackblitz.com/edit/np-ui-date-picker9)

## NPM
`$ npm i np-ui-date-picker`

## HTML
````html
<np-ui-date-picker 
    [(ngModel)]="startDate">
</np-ui-date-picker>
````

## Properties
1.  `ngModel` : Date  
    two way date binding model value.  
    value must be date type object.  
2.  `format` : string  
    pass date format as string, date will be shown in given format in text box.  
    default format is dd/MM/yyyy  
3.  `disabled` : boolean  
    true/false - set component disabled.  
4.  `required` : boolean  
    default value is false. add required attribute to input textbox. 
5.  `defaultOpen` : boolean  
    default open datepicker, user can not close this. no textbox will be shown.  
6.  `minDate` : Date  
    no date will be selected less than min date.  
    Default calender shows min year upto CurrentYear - 100, but if need to set years less than that,   
    then set minDate validation with less year numbers.  
7.  `maxDate` : Date  
    no date will be selected greater than max date.  
    Default calender shows max year upto CurrentYear + 100, but if need to set years more than that, then set maxDate   validation with high year numbers.  
8.  `placeholder` : string  
    set placeholder for datepicker  
9.  `showTodayButton` : boolean  
    show/hide Today link in datepicker pop up, on click of link today's date will be set as selected.   
10. `disableWeekDays` : string[]  
    disable week days for date picker. Possible values for array are "Su", "Mo", "Tu", "We", "Th", "Fr", "Sa".  
11. `disableDates` : Date[]  
    disable dates in date picker. Assign array of dates to this property.  
12. `dateLabels`: any[]
    Example: [{ date : new Date(), label: "Today"}]
    Lables tooltip will be shown on hover of dates passed in this property.
13. `isStartMonthWithMonday` : boolean
    If set to true then month will be start with Monday, default value is false.  
14. `styleClass` : string  
    set name of css class.  

## Methods  
1.  `onChange`  
    on change event binding.  

## Other np-ui components for Angular
1. [Data grid](https://www.npmjs.com/package/np-ui-data-grid)
2. [Date picker](https://www.npmjs.com/package/np-ui-date-picker)
3. [Time picker](https://www.npmjs.com/package/np-ui-time-picker)
4. [Color picker](https://www.npmjs.com/package/np-ui-color-picker)

## License
This project is licensed under the MIT License.

## Contributors
![](https://raw.githubusercontent.com/NilavPatel/nilavpatel.github.io/master/images/logo-large.png)