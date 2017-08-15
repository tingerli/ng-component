import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AceTableComponent } from './ace-table.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [AceTableComponent],
  exports:[AceTableComponent]
})
export class AceTableModule { }
