import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AceDatePickerComponent}from './ace-date-picker.component'
import {DpDatePickerModule} from 'ng2-date-picker';
import {FormsModule} from '@angular/forms'


@NgModule({
  imports: [
    DpDatePickerModule,
    FormsModule,
    CommonModule
  ],
  declarations: [AceDatePickerComponent],
  exports:[AceDatePickerComponent]
})
export class AceDatePickerModule { }
