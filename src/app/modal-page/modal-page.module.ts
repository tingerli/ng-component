import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalPageComponent } from './modal-page.component';
import {Routes,RouterModule} from '@angular/router'
import { AceModalModule} from '@ace/ace-modal/ace-modal.module'
import {AceBtnModule} from '@ace/ace-btn/ace-btn.module'
import { FormsModule } from '@angular/forms'
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
    AceBtnModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ModalPageComponent]
})
export class ModalPageModule { }
