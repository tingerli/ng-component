import { Component, OnInit,ViewEncapsulation,Input, Output, EventEmitter, NgZone, ElementRef} from '@angular/core';
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
      state('shown' , style({visibility:"visible",  opacity: 1,  transform: 'translate(-50%,0) '})),
      state('hidden', style({visibility:"hidden",opacity: 0,  transform: 'translate(-50%,-40px)'})),
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
    title:'消息框',
    enSureBtnText:"确定",
    cancelBtnText:"取消"
  };
  @Input() maxHeight:any;  //最大高度
  @Input() width:any;      //固定宽度
  private get title():string{
    return this.state.title?this.state.title:"信息框"
  }
  private set title(val){

  }
  private get sureText():string{
    return this.state.enSureBtnText?this.state.enSureBtnText:"确定"
  }
  private set sureText(val){

  }
  private get cancelText():string{
    return this.state.cancelBtnText?this.state.cancelBtnText:"确定"
  }
  private set cancelText(val){

  }
  private get animate(){   //动画状态

    return this.state.show?"shown":"hidden"
  };
  private set animate(val){
    
  };
  private windowH:number ;  //窗口高度
  @Output() onSure = new EventEmitter();  //点击确定按钮
  private headerEle:any ;  //header区
  private bodyEle:any ;  //body区
  private footerEle:any ;  //footer区
  private headerHeight:number ;  //header区高度
  private bodyHeight:number ;  //body区高度
  private footerHeight:number ;  //footer区高度
  constructor(
   private zone:NgZone,
   private el:ElementRef
  ) { }

  ngOnInit() {
    var self = this;
    window.addEventListener('resize',function(){
      
      self.zone.run(()=>{
        self.windowH = window.innerHeight;
      })
    });

    this.headerEle = $(this.el.nativeElement).find('.ace-modal-header');
    this.bodyEle = $(this.el.nativeElement).find('.ace-modal-body');
    this.footerEle = $(this.el.nativeElement).find('.ace-modal-footer');
    this.computedHeight();
    this.windowH = window.innerHeight;
  }

  //关闭
  onClose(){
    this.state.show = false;
  }
  
  //确定按钮
  onClickSureBtn(){
    this.onSure.emit();
  }
  
  //compute高度
  computedHeight(){
    this.headerHeight = parseInt($(this.headerEle).css("height"));
    this.bodyHeight = parseInt($(this.bodyEle).css("height"));
    this.footerHeight = parseInt($(this.footerEle).css("height"));
  }

  //body样式
  getBodySty(){
    if(this.headerHeight==0||this.bodyHeight==0||this.footerHeight==0){
      return {}
    }
    var totalHeight = this.headerHeight + this.bodyHeight + this.footerHeight ;
    let num;

    if(this.maxHeight){
      if(this.maxHeight.indexOf("%")==-1){
        num = this.maxHeight-0
      }else{

        num = Math.floor(this.windowH*(parseInt(this.maxHeight)/100));
      }
    }else{
      num = this.windowH*0.8;
    }

    num = Math.floor(num);
    if(totalHeight+10<=num || this.animateState.hide==true){
      return {}
    }else{
      return {"overflow-y":"scroll",height:num -this.headerHeight - this.footerHeight +"px"}
    }
  }
  //动画当前状态
  public animateState = {
    show:false,
    hide:true
  };

  //动画开始前
  animateStart(){
    if(this.state.show==true){
      this.animateState.hide = false ;
      this.computedHeight();
      $(document.body).css("overflow","hidden");
    }else {
      this.animateState.show = false ;
    }

  }

   //动画完成
  animateDone(){
    
    if(this.state.show==false){
      this.animateState.hide = true;
      $(document.body).css("overflow","visible");
    }else{
      this.animateState.show = true;
    }
  }
  
  //设置宽度
  modalSty(){
    var val = this.width;
    if(this.width.indexOf("%")>-1){
      val = parseInt(val)/100*window.innerWidth;
    }else {
      val = val-0;
    };
    if(this.width && val>0){
      return {width:val+"px"}
    }else{
      return {}
    }
  }
}
