import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'ace-date-picker',
  templateUrl: './ace-date-picker.component.html',
  styleUrls: ['./ace-date-picker.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AceDatePickerComponent implements OnInit {
  
  constructor() { }
  selectedDate;
  config = {
    firstDayOfWeek: 'su',
    monthFormat: 'MMM, YYYY',
    disableKeypress: false,
    allowMultiSelect: false,
    closeOnSelect: undefined,
    closeOnSelectDelay: 100,
    onOpenDelay: 0,
    weekDayFormat: 'ddd',
    appendTo: document.body,
    drops: 'down',
    opens: 'right',
    showNearMonthDays: true,
    showWeekNumbers: false,
    enableMonthSelector: true,
    yearFormat: 'YYYY',
    showGoToCurrent: true,
    dayBtnFormat: 'DD',
    monthBtnFormat: 'MMM',
    hours12Format: 'hh',
    hours24Format: 'HH',
    meridiemFormat: 'A',
    minutesFormat: 'mm',
    minutesInterval: 1,
    secondsFormat: 'ss',
    secondsInterval: 1,
    showSeconds: false,
    showTwentyFourHours: false,
    timeSeparator: ':',
    multipleYearsNavigateBy: 10,
    showMultipleYearsNavigation: false,
    locale: 'en'
  };
  
  ngOnInit() {
  }
  log(e){
    console.log(e);
  }
}
