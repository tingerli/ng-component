import { Component, OnInit, ViewEncapsulation, Input, Output} from '@angular/core';

@Component({
  selector: 'ace-table',
  templateUrl: './ace-table.component.html',
  styleUrls: ['./ace-table.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AceTableComponent implements OnInit {
  private closeStatus:boolean = false; //收起
  constructor() { }

  ngOnInit() {
  }
  // 收起表单
  close(){
    this.closeStatus = !this.closeStatus;
    if(this.closeStatus){
      (<any>$('.ace-wrap')).slideUp();
    }else{
      (<any>$('.ace-wrap')).slideDown();
    }
  }

  closeIconSty(){
    // return this.closeStatus?{display:'none'}:{display:'block'};
    if(this.closeStatus){
      return {transform:"rotate(180deg)"};
    }else{
      return {transform:"rotate(0)"};
    }
  }
}
