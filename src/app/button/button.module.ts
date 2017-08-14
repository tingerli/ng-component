import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes,RouterModule} from '@angular/router'
import {AceBtnModule} from '@ace/ace-btn/button.module'
import {ButtonComponent } from './button.component'
const routes:Routes = [
  {
    path:'',
    component:ButtonComponent,
  }
];
@NgModule({
  imports: [
    CommonModule,
    AceBtnModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    ButtonComponent
  ]
})
export class ButtonModule { }
