import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ButtonComponent} from './ace-btn.component'

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ButtonComponent],
  exports:[ButtonComponent]
})
export class AceBtnModule { }
