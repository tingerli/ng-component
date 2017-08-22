import { Component, OnInit,ViewEncapsulation,Input, Output, EventEmitter} from '@angular/core';
import { trigger,state,style,transition,animate,keyframes } from '@angular/animations';
interface ModalSetting {
  show:boolean;  //状态
  title:string;  //标题
  enSureBtnText?:string; //确定按钮的文字
  cancelBtnText?:string; //取消按钮的文字
}

@Component({
  selector: 'ace-modal',
  templateUrl: './ace-modal.component.html',
  styleUrls: ['./ace-modal.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [ // 动画的内容
    trigger('slide', [
      state('shown' , style({visibility:"visible",  opacity: 1,  transform: 'translateY(0)'})),
      state('hidden', style({visibility:"hidden",opacity: 0,  transform: 'translateY(-40px)'})),
      transition('shown => hidden', animate('150ms')),
      transition('hidden => shown', animate('200ms')),
    ]),
    trigger('maskAnimate', [
      state('shown' , style({visibility:"visible", opacity: 1})),
      state('hidden', style({visibility:"hidden", opacity: 0})),
      transition('shown => hidden', animate('125ms')),
      transition('hidden => shown', animate('200ms')),
    ])
  ]
})
export class AceModalComponent implements OnInit {
  @Input() state:ModalSetting = {           //控制状态值
    show:false,
    title:'消息框'
  };
  private get animate(){           //动画状态
    return this.state.show?"shown":"hidden"
  };
  private set animate(val){
    
  };

  @Output() onSure = new EventEmitter();  //点击确定按钮
  
  constructor(
  ) { }

  ngOnInit() {
    
  }

  //关闭
  onClose(){
    this.state.show = false;
  }
  
  //确定按钮
  onClickSureBtn(){
    this.onSure.emit();
  }
}
