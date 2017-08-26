import { Component, OnInit, ViewEncapsulation, Input, Output, ElementRef, NgZone, EventEmitter } from '@angular/core';

interface DataInfo {
  page: number;
  totalPage?: number;
  total?: number;
  startId?: number;
  endId?: number;
}

interface ModalState {
  show: boolean;
  text?: string;
}

@Component({
  selector: 'ace-table',
  templateUrl: './ace-table.component.html',
  styleUrls: ['./ace-table.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AceTableComponent implements OnInit {
  @Input() title: string = '表格';      //表格标题
  @Input() dataSource: Array<object> //遍历的数据
  @Input() theadSource: Array<object> //表头数据
  @Input() widths: Array<number> = []; //默认宽度100;
  @Input() minWidth: number = 100;//最小宽度
  @Input() tableHeight: number;   //设置了table高度，如果内容超过该高度自动滚动
  @Input() rowNumber: number = 10;   //一页的函数，默认10
  @Input() multipleChoice: boolean = true; //是否可以多选
  @Input() loading: boolean = false;   //加载动画
  @Input() dataInf: DataInfo = {     //数据的相关信息
    page: 1,
    totalPage: 1,
    total: 0,
    startId: 0,
    endId: 0
  };
  @Input() modalState: ModalState = { //modal框的设置
    show: false
  };
  @Input() operateState: boolean = false;  //控制开关状态


  @Output() onSelect = new EventEmitter();  //选中了某一行触发的事件
  @Output() onChangeRows = new EventEmitter();  //改变了每页行数的事件
  @Output() onChangePage = new EventEmitter();  //翻页


  private wrapEle: any;       //容器
  private tableEle: any;      //表格区
  private theadEle: any;      //头部
  private thOffsetLeft: number = 0; //头部偏移量
  private contentEle: any;      //内容区
  private moveBlock: any;     //拖动的模型
  private lineEle: any;       //标志线
  private wrapWidth: number;  //容器宽度
  private tableWidth: number;      //表格区宽度
  private colsWidth: Array<number> = []; //每一列的实际宽度
  private movedCol: number | null;   //可以移动的列的下标
  private moveStarX: number | null = null;  //初始位置
  private moveCurrX: number | null = null;  //最新的位置
  private colSetVals: Array<number> = [];  //用户设置的固定宽度，包括拖动，固定宽度
  private setColsTotal: number;   //设置的值的固定宽度
  private tdpadding: number;     //td,td padding值
  private closeStatus: boolean = false; //收起
  private checkRow: object = {};   //选中的行
  private selectAll: boolean = false;   //选中的行
  private windowResize: any;     //window.onresize 绑定的函数
  private mouseUpFunction: any;     //window.mouseup 绑定的函数
  private inPutEle: any;      //底部页数输入框
  private inputValue: any = 1;     //底部页数输入框 输入的值
  private inputTextSty: object = {  //输入框样式
    "z-index": 5
  };
  private operaRefresh: Array<boolean>;
  constructor(private el: ElementRef,
    private zone: NgZone,
  ) { }

  ngOnChanges() {
    setTimeout(() => {
      this.tableResize();
    });
    this.inputValue = this.dataInf.page;
  }

  ngOnInit() {
    if (!this.theadSource) {
      throw new Error('theadSource is undefined.theadSource is required.')
    };

    Promise.resolve().then(() => {
      this.init();
      this.getElementWidth();
    
      if ("colsWidth" in this) {
        this.setUserSettingWidth() ? this.styInit() : "";
      } else {
        this.styInit()
      }
      if(this.operateState){
        this.operaRefresh = [];
        for(let i=0;i<this.dataSource.length;i++){
          this.operaRefresh.push(false);
        }
      }
    }).then(() => {
      //绑定事件
      let timeout;
      this.windowResize = function () {
        clearTimeout(timeout);
        setTimeout(() => {
          this.zone.run(() => {
            this.tableResize();
          });
        }, 200)
      };
      this.windowResize = this.windowResize.bind(this);
      window.addEventListener('resize', this.windowResize);

    }).then(() => {
      this.mouseUpFunction = this.mouseUp.bind(this);
      document.body.addEventListener('mouseup', this.mouseUpFunction);
    })
  }

  ngOnDestroy() {
    document.body.removeEventListener('mouseup', this.mouseUpFunction);
    window.removeEventListener('resize', this.windowResize);

  }


  //获取关键节点
  init() {
    this.wrapEle = (<any>$(this.el.nativeElement)).find('.ace-wrap');
    this.tableEle = $(this.wrapEle).find('.ace-table-content');
    this.theadEle = (<any>$(this.el.nativeElement)).find('.ace-table-thead');
    this.contentEle = (<any>$(this.el.nativeElement)).find('.ace-table-list');
    this.moveBlock = (<any>$(this.el.nativeElement)).find('.ace-move-block');
    this.lineEle = (<any>$(this.el.nativeElement)).find('.ace-move-line');
    this.inPutEle = (<any>$(this.el.nativeElement)).find('.text-area-view').find('input');
  }

  //计算没设置固定宽度td的宽度
  styInit() {
    if ('tableHeight' in this) {
      //设置默认高度:
      $(this.tableEle).css({ height: this.tableHeight + 'px', overflow: "hidden" });

    }

    this.setColsTotal = this.colsWidth.reduce((total, next) => {
      return total + next;
    }, 0);
    //默认值minWidth不足以填满table
    var val;
    if (this.tableWidth > (this.setColsTotal + this.minWidth * (this.theadSource.length - this.colsWidth.length))) {
      //平均分配
      val = Math.floor((this.tableWidth - this.setColsTotal) / (this.theadSource.length - this.colsWidth.length));
    } else {
      //统一设置为this.minWidth
      val = this.minWidth
    }
    for (let i = this.colsWidth.length; i < this.theadSource.length; i++) {
      this.colsWidth[i] = val;
    }
  }

  //获取宽度,wrap 跟table，如果table大于wrap，需要添加滚动属性给wrap
  getElementWidth() {
    this.wrapWidth = $(this.wrapEle).width();
    this.tableWidth = $(this.tableEle).width() - 17;
  }

  //设置用户自定义的宽度
  setUserSettingWidth() {

    //widths不够
    if (this.widths.length < this.theadSource.length) {

      this.widths.forEach((val, idx) => {
        this.colSetVals[idx] = val;
        this.colsWidth.push(val);
      })
      return true
    } else {
      //widths过多，不需要计算默认值
      this.widths.forEach((val, idx) => {
        if (idx > this.colsWidth.length) return
        val > this.minWidth ? this.colsWidth[idx] = val : this.colsWidth[idx] = this.minWidth;
      });
      return false
    }
  }



  //resize table
  tableResize() {
    if (!this.wrapEle) return

    this.getElementWidth();

    //没设置宽度的td计算
    var nosetArr = [];
    this.theadSource.forEach((val, idx) => {
      if (!this.colSetVals[idx]) {
        nosetArr.push(idx)
      }
    });
    let x = Math.floor((this.tableWidth - this.setColsTotal - (this.multipleChoice ? 50 : 0) - (this.operateState ? 200 : 0)) / nosetArr.length);
    x = x > this.minWidth ? x : this.minWidth;

    nosetArr.forEach((val) => {
      this.colsWidth[val] = x;
    });
    this.checkScroll();
  }

  //判断是否需要  横向滚动条  或者纵向滚动条
  checkScroll() {
    //纵向
    var scrollY = 'hidden', scollX = 'hidden';
    if ('tableHeight' in this) {
      var h = $(this.contentEle).height();
      var contentH = $(this.theadEle).height() + h;

      if (contentH > this.tableHeight || h < 10) {
        scrollY = 'scroll'
        $(this.contentEle).css('padding-right', 0);
      } else {
        $(this.contentEle).css('padding-right', 20);
      }
    }

    var total = this.colsWidth.reduce((pre, next) => {
      return pre + next;
    }, ((this.multipleChoice ? 50 : 0) + (this.operateState ? 200 : 0)));
    if (total > this.tableWidth) {
      scollX = 'scroll'
    }
    $(this.tableEle).css({ overflowX: scollX, overflowY: scrollY })
  }

  //计算th宽度
  getThSty(idx) {
    return "colsWidth" in this ? { width: this.colsWidth[idx] + "px" } : '';
  }

  // 收起表单
  close() {
    this.closeStatus = !this.closeStatus;
    if (this.closeStatus) {
      (<any>$(this.wrapEle)).slideUp();
    } else {
      (<any>$(this.wrapEle)).slideDown();
    }
  }

  //关闭表单时候的按钮动画
  closeIconSty() {
    // return this.closeStatus?{display:'none'}:{display:'block'};
    if (this.closeStatus) {
      return { transform: "rotate(180deg)" };
    } else {
      return { transform: "rotate(0)" };
    }
  }

  //获取key值
  getKeys(data: any) {
    var arr = [];
    this.theadSource.forEach(function (val: any, idx: number) {
      arr.push(data[val.name]);
    });
    return arr;
  }

  //拖动横向滚动条
  tableScroll(e: any) {
    if (e.target.scrollLeft != -this.thOffsetLeft) {
      this.thOffsetLeft = -e.target.scrollLeft;
    }
  }

  //th拖动事件
  //1.只能在右边拖动
  //2.20px是触发的条件
  //3.鼠标变形
  //4.点击之后，隐藏标签出现，获取offsetX
  //5.隐藏标签有mouseon事件，竖条跟着走。
  //6.松开鼠标结束
  //7.判断能否移动到该位置（过小的问题）
  thMoving(e: any, idx) {
    if (this.colsWidth[idx] - e.offsetX < 20) {
      $(e.target).css({ cursor: 'e-resize' })
    } else {
      $(e.target).css({ cursor: 'default' })
    }

  }

  //记录下移动的th的下标
  tdisClilked(e: any, idx) {
    if (this.colsWidth[idx] - e.offsetX < 20) {
      this.movedCol = idx;
      console.log(idx);
      $(this.moveBlock).css('z-index', 10);
    }
  }

  //坐标线位置, 移动中
  moveBlockEvent(e: any) {
    if ('style' in this.lineEle[0] == false || this.lineEle[0].style.opacity == 0) {
      $(this.lineEle).css({ opacity: 1 })
      this.moveStarX = e.clientX;
    }
    let offsetX = e.offsetX;
    this.moveCurrX = e.clientX;
    $(this.lineEle).css('transform', 'translateX(' + offsetX + 'px)');
  }

  //松开鼠标
  mouseUp(e) {
    if (this.lineEle[0].style.opacity == 1) {
      if (this.movedCol == null) return
      $(this.lineEle).css('opacity', 0);
      $(this.moveBlock).css('z-index', -1);
      //计算移动的距离
      let moveSize = this.moveCurrX - this.moveStarX;
      if (this.colsWidth[this.movedCol] + moveSize < this.minWidth) {
        this.colsWidth[this.movedCol] = this.minWidth;
      } else {
        this.colsWidth[this.movedCol] = this.colsWidth[this.movedCol] + moveSize;
      }
      this.colSetVals[this.movedCol] = this.colsWidth[this.movedCol];
      console.log('move num', this.colsWidth[this.movedCol] + moveSize);
      this.setColsTotal = this.colSetVals.reduce((pre, next) => {
        if (next) {
          return pre + next;
        } else {
          return pre;
        }
      })
      this.tableResize();
      this.moveCurrX = null;
      this.moveStarX = null;
      this.movedCol = null;
    }
  }

  //选中一行
  onCheckRow(idx: number) {
    setTimeout(() => {
      var num = 0;
      for (var i in this.checkRow) {
        if (this.checkRow[i] == false) break;
        num++
      };
      this.emitSelect()
      this.selectAll = num == this.dataSource.length;
    })
  }

  //全选
  onSelectedAll() {
    setTimeout(() => {
      this.dataSource.forEach((val, idx) => {
        this.checkRow[idx] = this.selectAll
      })
      this.emitSelect();
    }, 30)
  }

  //output 返回选中的数据
  emitSelect() {
    var arr = [];
    for (var i in this.checkRow) {
      if (this.checkRow[i]) {
        arr.push(this.dataSource[i])
      }
    }
    this.onSelect.emit(arr);
  }

  //改变每页行数
  onPageNumerChanged(e: any) {
    this.onChangeRows.emit(e.target.value);
  }

  //翻页 
  onToPage(page: any) {
    if (page == 1) {
      if (this.dataInf.page != 1) {
        this.onChangePage.emit(page);
      }
    } else if (page == this.dataInf.totalPage) {
      if (this.dataInf.page != this.dataInf.totalPage) this.onChangePage.emit(page);
    } else if (page > 1 && page < this.dataInf.totalPage) {
      this.onChangePage.emit(page)
    }
  }

  //键盘输入 页数
  onInputPageNum() {
    this.inputTextSty["z-index"] = -1;
    Promise.resolve().then(() => {
      this.inPutEle.focus();
    })
  }
  //检查输入的值
  onCheckInputValue(e: any) {
    if (this.modalState.show) {
      e.preventDefault();
      return
    }
    var value = e.target.value;
    var pro = new Promise(function (resolve, reject) {
      resolve();
    });

    pro.then(() => {
      if (/^[0-9]+$/.test(value) == false) {
        throw new Error('输入的值无效')
      }
    }).then(() => {
      if (value >= 1 && value <= this.dataInf.totalPage) {
        this.inPutEle.blur();
        this.onToPage(value);
        this.inputTextSty["z-index"] = 5;
      } else {
        throw new Error('超出了页数范围')
      }
    }).catch(err => {
      this.modalState.show = true;
      this.modalState.text = err;
      setTimeout(() => {
        this.inputValue = this.dataInf.page;
        this.modalState.show = false
      }, 1500)
    })
  }

  //输入框失去焦点
  onInputBlur() {
    this.inputTextSty["z-index"] = 5;
  }
  //鼠标变形
  onCheckChangePageAU(order: string | any) {

    //首页
    switch (order) {
      case "first":
        if (this.dataInf.page == 1) {
          return { disable: true }
        }
        break;
      case "pre":
        if (this.dataInf.page - 1 <= 0) {
          return { disable: true }
        };
        break;
      case "last":
        if (this.dataInf.page >= this.dataInf.totalPage) {
          return { disable: true }
        }; break;
      case "next": if (this.dataInf.page - 0 + 1 > this.dataInf.totalPage) {
        return { disable: true }
      }; break;
    }
  }
  
  //设置刷新动画
  getReflreshSty(idx:number):string{
    if(!this.operaRefresh) return ""
    return this.operaRefresh[idx]?"fa-spin":""
  }

  //改变刷新动画的状态
  onChangeReflreshState(idx:number):void {

    this.operaRefresh[idx] = !this.operaRefresh[idx];
  }

}
