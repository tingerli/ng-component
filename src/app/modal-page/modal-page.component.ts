import { Component, OnInit, ViewEncapsulation } from '@angular/core';

var initState = {
  show:false,
  title:'消息框',
  enSureBtnText:"确定",
  cancelBtnText:"取消",
  innnerHtml:`
    <div>
      欢迎使用ace-modal
    </div>
  `
};

@Component({
  selector: 'app-modal-page',
  templateUrl: './modal-page.component.html',
  styleUrls: ['./modal-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ModalPageComponent implements OnInit {
  private modalState={
    show:false,
    title:'',
    enSureBtnText:"",
    cancelBtnText:"",
    innnerHtml:`
      <div>
        欢迎使用ace-modal
      </div>
    `
  };
  private modalState2 = {
    show:false
  };
  private btnSetting = {
    text:"弹出",
    type:"info",
    size:"small"
  };

 private demo1:any='';  //demo1 input value
 private demo2:any='';  //demo2 input value
 private demo3:any='';  //demo3 input value
 private demo4:any='';  //demo4 input value
 private demo5:any='';  //demo4 input value
 private demo6:any='';  //demo4 input value
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
  
  onclick(idx:number) {
    this.modalState = JSON.parse(JSON.stringify(initState));
    switch(idx) {
      case 1:
      this.modalState.title = this.demo1?this.demo1:"消息框";
      break;
      case 2:
      this.modalState.enSureBtnText = this.demo2?this.demo2:"确定";
      this.modalState.cancelBtnText = this.demo3?this.demo3:"取消";
      break;
      case 3:
      this.modalState.innnerHtml = this.demo4?this.demo4:this.modalState.innnerHtml;
      break;
      case 4:
      var dom="";
      for(var i=0;i<25;i++){
        dom = dom+"<p>"+i+"</p>";
      }
      this.modalState.innnerHtml = dom;
      break;
    }
    
    this.modalState.show = true;

    
  };

  onclickScroll(){
    this.modalState2.show = true;
  }

}
