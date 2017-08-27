import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePickerPageComponent } from './date-picker-page.component';
import {RouterModule,Routes} from '@angular/router';
import { AceDatePickerModule } from "@ace/ace-date-picker/ace-date-picker.module"


const routes:Routes=[
  {
    path:"",
    component:DatePickerPageComponent
  }
] 

@NgModule({
  imports: [
    CommonModule,
    AceDatePickerModule,
    RouterModule.forChild(routes),
  ],
  declarations: [DatePickerPageComponent]
})
export class DatePickerPageModule { }
