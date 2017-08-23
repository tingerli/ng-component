import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AceModalComponent} from './ace-modal.component'
import {AceBtnModule} from '@ace/ace-btn/ace-btn.module'


@NgModule({
  imports: [
    CommonModule,
    AceBtnModule,
  ],
  declarations: [AceModalComponent],
  exports:[AceModalComponent]
})
export class AceModalModule { }
