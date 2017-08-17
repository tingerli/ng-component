import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AceTableComponent } from './ace-table.component';
import {FormsModule} from '@angular/forms'


@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [AceTableComponent],
  exports:[AceTableComponent]
})
export class AceTableModule { }
