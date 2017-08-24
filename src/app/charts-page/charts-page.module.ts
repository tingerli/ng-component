import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsPageComponent } from './charts-page.component';
import {Route, RouterModule} from '@angular/router';
import {AceChartModule } from '@ace/ace-chart/ace-chart.module'

const routes:Route[]=[
  {
    path:"",
    component:ChartsPageComponent
  }
]

@NgModule({
  imports: [
    CommonModule,
    AceChartModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ChartsPageComponent]
})
export class ChartsPageModule { }
