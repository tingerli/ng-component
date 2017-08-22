import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-modal-page',
  templateUrl: './modal-page.component.html',
  styleUrls: ['./modal-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ModalPageComponent implements OnInit {
  private modalState={
    show:false
  };

  constructor() { }

  ngOnInit() {
  }
  
  openModal(){
    this.modalState.show = true;
  }

  thead = ['属性','说明','类型',"接口",'默认值'];
  tableValue=[
    {
      name:'state',
      text:'设置modal框的状态',
      type:'object',
      default:`
      {  <br>
        &nbsp;&nbsp;show:false,<br>
        &nbsp;&nbsp;title:'消息框'<br>
      }`,
      iterface:`interface ModalSetting {<br>
        &nbsp;&nbsp;show:boolean;  &nbsp;&nbsp;//状态<br>
        &nbsp;&nbsp;title:string;  &nbsp;&nbsp;//标题<br>
        &nbsp;&nbsp;enSureBtnText?:string; &nbsp;&nbsp;//确定按钮的文字<br>
        &nbsp;&nbsp;cancelBtnText?:string; &nbsp;&nbsp;//取消按钮的文字<br>
      }`
    },
  ];
  eventHeader = ['事件','说明',"返回值"];
  eventValue = [
    {
      name:'onSure',
      text:"点击确定按钮后触发",
      cb:"无"
    }
  ];
  getKeys(item:any){
    return [item.name, item.text, item.type,item.iterface,item.default]
  }

  getEventKeys(item:any) {
    return [item.name, item.text, item.cb]
  }
  
  onclick(val) {
    console.log(val);
  }
}
