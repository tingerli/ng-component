import { Component, OnInit, ViewEncapsulation, animate, transition,Input, trigger,state,style} from '@angular/core';


@Component({
  selector: 'ace-modal',
  templateUrl: './ace-modal.component.html',
  styleUrls: ['./ace-modal.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [ // 动画的内容
    trigger('slide', [
      state('shown' , style({  opacity: 1,  transform: 'translateY(0)'})),
      state('hidden', style({  opacity: 0,  transform: 'translateY(-40px)'})),
      transition('shown => hidden', animate('150ms')),
      transition('hidden => shown', animate('300ms')),
    ]),
    trigger('maskAnimate', [
      // state 控制不同的状态下对应的不同的样式
      state('shown' , style({ opacity: 1})),
      state('hidden', style({ opacity: 0})),
      transition('shown => hidden', animate('100ms')),
      transition('hidden => shown', animate('300ms')),
    ])
  ]
})
export class AceModalComponent implements OnInit {
  private eleState:string = 'hidden';
  private maskClass:string;
  private modalClass:string;
  constructor() { }

  ngOnInit() {

  }
  
  //关闭
  onClose(){
    this.maskClass = "ace-modal-hidden";
    this.openModal();
  }
  
  openModal(){
    if(this.eleState=='shown'){
      this.eleState = 'hidden';
    }else{
      this.eleState = 'shown';
    }
  }
}
