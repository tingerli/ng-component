import { Component, OnInit, ViewEncapsulation, Input, Output} from '@angular/core';

@Component({
  selector: 'ace-table',
  templateUrl: './ace-table.component.html',
  styleUrls: ['./ace-table.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AceTableComponent implements OnInit {
  @Input() title:string;      //表格标题
  @Input() loading:boolean;   //加载中
  @Input() dataSource:Array<object> //遍历的数据
  @Input() theadSource:Array<object> //表头数据
  @Input() totalNum:number;    //数据总数
  @Input() currPage:number;    //当前页码
  @Input() selectMode:string;  //单选还是多选

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
