import { Component, OnInit, ViewEncapsulation, Input, Output, ElementRef, NgZone} from '@angular/core';


@Component({
  selector: 'ace-table',
  templateUrl: './ace-table.component.html',
  styleUrls: ['./ace-table.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AceTableComponent implements OnInit {
  @Input() title:string='表格';      //表格标题
  @Input() loading:boolean;   //加载中
  @Input() dataSource:Array<object> //遍历的数据
  @Input() theadSource:Array<object> //表头数据
  @Input() totalNum:number;    //数据总数
  @Input() currPage:number;    //当前页码
  @Input() selectMode:string;  //单选还是多选
  @Input() widths:Array<number>=[]; //默认宽度100;
  @Input() minWidth:number = 100;//最小宽度
  @Input() tableHeight:number;   //设置了table高度，如果内容超过该高度自动滚动
  @Input() rowNumber:number;   //一页的函数，默认10

  private wrapEle:any;       //容器
  private tableEle:any;      //表格区
  private theadEle:any;      //头部
  private thOffsetLeft:number = 0; //头部偏移量
  private contentEle:any;      //内容区
  private moveBlock:any;     //拖动的模型
  private lineEle:any;       //标志线
  private wrapWidth:number;  //容器宽度
  private tableWidth:number;      //表格区宽度
  private colsWidth:Array<number>=[]; //每一列的实际宽度
  private movedCol:number;   //可以移动的列的下标

  private colSetVals:Array<number>=[];  //用户设置的固定宽度，包括拖动，固定宽度
  private setColsTotal:number;   //设置的值的固定宽度
  private tdpadding:number;     //td,td padding值
  private closeStatus:boolean = false; //收起
  constructor(private el:ElementRef,
    private zone:NgZone,
  ) { }
  
  ngOnChanges(){
    setTimeout(()=>{
      this.tableResize();
    });
  }

  ngOnInit() {
    if(!this.theadSource){
      throw new Error('theadSource is undefined.theadSource is required.')
    };
    var p = new Promise(function(resolve,reject){
      resolve();
    });
    p.then(()=>{
      this.init();
      this.getElementWidth();
      if("colsWidth" in this){
          this.setUserSettingWidth()?this.styInit():"";
      }else{
        this.styInit()
      }
      
    }).then(()=>{
      //绑定事件
      let timeout;
      window.onresize = (e) =>{
        clearTimeout(timeout);
        setTimeout(()=>{
          this.zone.run(() => {
            this.tableResize();
          });
        },200)
      };
    })
  }
  
  //获取关键节点
  init() {
    this.wrapEle = (<any>$(this.el.nativeElement)).find('.ace-wrap');
    this.tableEle = $(this.wrapEle).find('.ace-table-content');
    this.theadEle = (<any>$(this.el.nativeElement)).find('.ace-table-thead');
    this.contentEle = (<any>$(this.el.nativeElement)).find('.ace-table-list');
    this.moveBlock = (<any>$(this.el.nativeElement)).find('.ace-move-block');
    this.lineEle = (<any>$(this.el.nativeElement)).find('.ace-move-line');
  }
  
  //计算没设置固定宽度td的宽度
  styInit(){
    if('tableHeight' in this ){
      //设置默认高度
      $(this.tableEle).height(this.tableHeight);
    }


    this.setColsTotal = this.colsWidth.reduce((total,next)=>{
      return total+next;
    },0);
    //默认值minWidth不足以填满table
    var val;
    if(this.tableWidth>(this.setColsTotal+this.minWidth*(this.theadSource.length-this.colsWidth.length))){
      //平均分配
      val = Math.floor((this.tableWidth-this.setColsTotal)/(this.theadSource.length-this.colsWidth.length));
    }else{
      //统一设置为this.minWidth
      val=this.minWidth
    }
    for(let i=this.colsWidth.length;i<this.theadSource.length;i++){
      this.colsWidth[i]=val;
    }
  }

  //获取宽度,wrap 跟table，如果table大于wrap，需要添加滚动属性给wrap
  getElementWidth(){
    this.wrapWidth = $(this.wrapEle).width();
    this.tableWidth = $(this.tableEle).width()-17;
  }
  
  //设置用户自定义的宽度
  setUserSettingWidth(){
    
    //widths不够
    if(this.widths.length<this.theadSource.length){

      this.widths.forEach((val,idx)=>{
        this.colSetVals[idx] = val;
        this.colsWidth.push(val);
      })
     return true
    }else{
      //widths过多，不需要计算默认值
      this.widths.forEach((val,idx)=>{
        if(idx>this.colsWidth.length) return
        val>this.minWidth?this.colsWidth[idx]=val:this.colsWidth[idx]=this.minWidth;
      });
      return false
    }
  }
  
  //resize table
  tableResize(){
    if(!this.wrapEle) return
    
    this.getElementWidth();

    //没设置宽度的td计算
    var nosetArr=[];
    this.theadSource.forEach((val,idx)=>{
      if(!this.colSetVals[idx]){
        nosetArr.push(idx)
      }
    });

    let x = Math.floor((this.tableWidth - this.setColsTotal)/nosetArr.length);
    x = x>this.minWidth?x:this.minWidth;
    nosetArr.forEach((val)=>{
      this.colsWidth[val]=x;
    });
    this.checkScroll();
  }
  
  //判断是否需要  横向滚动条  或者纵向滚动条
  checkScroll(){
    //纵向
    var scrollY = 'visible',scollX = 'visible';
    if('tableHeight' in this){
      let contentH = $(this.theadEle).height()+$(this.contentEle).height();
      if(contentH>this.tableHeight){
        scrollY = 'scroll'
        // $(this.theadEle).css('padding-right',0);
        $(this.contentEle).css('padding-right',0);
      }else{
        // $(this.theadEle).css('padding-right',20);
        $(this.contentEle).css('padding-right',20);
      }
    }

    var total = this.colsWidth.reduce((pre,next)=>{
      return pre+next;
    });
    if(total>this.tableWidth){
       scollX = 'scroll'
    }

    $(this.tableEle).css({overflowX:scollX,overflowY:scrollY})
  }

  //计算th宽度
  getThSty(idx){
    return "colsWidth" in this?{width:this.colsWidth[idx]+"px"}:'';
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
  
  //关闭表单时候的按钮动画
  closeIconSty(){
    // return this.closeStatus?{display:'none'}:{display:'block'};
    if(this.closeStatus){
      return {transform:"rotate(180deg)"};
    }else{
      return {transform:"rotate(0)"};
    }
  }
  
  //获取key值
  getKeys(data:any){
    var arr=[];
    this.theadSource.forEach(function(val:any,idx:number){
      arr.push(data[val.name]);
    });
    return arr;
  }

  //拖动横向滚动条
  tableScroll(e:any){
    console.log(e.target.scrollLeft);
    this.thOffsetLeft = -e.target.scrollLeft;
  }

  //th拖动事件
  //1.只能在右边拖动
  //2.20px是触发的条件
  //3.鼠标变形
  //4.点击之后，隐藏标签出现，获取offsetX
  //5.隐藏标签有mouseon事件，竖条跟着走。
  //6.松开鼠标结束
  //7.判断能否移动到该位置（过小的问题）
  thMoving(e:any,idx){
    if(this.colsWidth[idx]-e.offsetX<20){
      $(e.target).css({cursor:'e-resize'})
    }else{
      $(e.target).css({cursor:'default'})
    }
    
  }
  
  //记录下移动的th的下标
  tdisClilked(e:any,idx){
    if(this.colsWidth[idx]-e.offsetX<20){
      this.movedCol = idx;
      $(this.moveBlock).css('z-index',10);
    }
  }
  
  //坐标线位置
  moveBlockEvent(e:any){
    let offsetX = e.offsetX;
    $(this.lineEle).css('transform','translateX('+offsetX+'px)');
  }
  
}
