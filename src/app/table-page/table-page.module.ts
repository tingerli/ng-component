import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablePageComponent } from './table-page.component';
import {Routes,RouterModule} from '@angular/router';
import {AceTableModule} from '@ace/ace-table/ace-table.module'
//table
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

const routes:Routes = [
  {
    path:'',
    component:TablePageComponent
  }
]
@NgModule({
  imports: [
    CommonModule,
    NgxDatatableModule,
    AceTableModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TablePageComponent]
})
export class TablePageModule { }
