import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AceChartComponent } from './ace-chart.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [AceChartComponent],
  exports:[AceChartComponent]
})
export class AceChartModule { }
