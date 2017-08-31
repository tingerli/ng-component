import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';

@Component({
  selector: 'ace-date-picker',
  templateUrl: './ace-date-picker.component.html',
  styleUrls: ['./ace-date-picker.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AceDatePickerComponent implements OnInit {

  constructor() {

  }
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
    format: "YYYY-MM-DD HH:mm",
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
    showTwentyFourHours: true,
    timeSeparator: ':',
    multipleYearsNavigateBy: 10,
    showMultipleYearsNavigation: false,
    locale: 'zh-cn',
    // min:'2017-08-29 15:50',
    // minTime:'2017-08-29 15:50'
  };

  ngOnInit() {
    setTimeout(function () {
      $('.dp-input-container').append('<i class="fa fa-calendar" aria-hidden="true"></i>')
    })
  }
  validatorsChanged() {
    $('.dp-current-location-btn').remove();
    

  }
}
