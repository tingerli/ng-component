import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalPageComponent } from './modal-page.component';
import {Routes,RouterModule} from '@angular/router'
import { AceModalModule} from '@ace/ace-modal/ace-modal.module'

const routes:Routes = [
  {
    path:'',
    component:ModalPageComponent,
  }
];

@NgModule({
  imports: [
    CommonModule,
    AceModalModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ModalPageComponent]
})
export class ModalPageModule { }
