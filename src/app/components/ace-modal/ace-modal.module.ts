import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AceModalComponent} from './ace-modal.component'

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [AceModalComponent],
  exports:[AceModalComponent]
})
export class AceModalModule { }
