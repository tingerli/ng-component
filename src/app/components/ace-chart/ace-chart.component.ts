import { Component, OnInit, ViewEncapsulation, Input, EventEmitter, Output, OnChanges } from '@angular/core';
import Highcharts from 'highcharts/highstock'

//x轴接口
interface XAxis {
  categories:Array<number|string>;
}

//y轴接口
interface YAxis {
  title:string;
};

//数据源接口
interface NormalData {
  name:string;
  data:Array<number>;
}

@Component({
  selector: 'ace-chart',
  templateUrl: './ace-chart.component.html',
  styleUrls: ['./ace-chart.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AceChartComponent implements OnInit,OnChanges {
  _type:string;   //表格类型  直线图  曲线图  柱状图  饼图 
  @Input() get type(){
    return this._type;
  };
  set type(val:string){
    this._type = val;
  }

   //标题
  _title:string;  
  @Input() get title(){
    return this._title;
  };
  set title(val:string){
    this._title = val;
  };

  //x轴
  _x:XAxis;  
  @Input() get x(){
    return this._x;
  };
  set x(val:XAxis){
    this._x = val;
  };
  
  //y轴
  _y:YAxis;  
  @Input() get y(){
    return this._y;
  };
  set y(val:YAxis){
    this._y = val;
  };
  
  //普通数据源
  _normalData:Array<NormalData>;
  @Input() get normalData(){
    return this._normalData;
  };
  set normalData(val:Array<NormalData>){
    this._normalData = val;
  };
  //饼图数据源
  _pieData:Array<NormalData>;
  @Input() get pieData(){
    return this._pieData;
  };
  set pieData(val:Array<NormalData>){
    this._pieData = val;
  };
  

  private chart;//表格实例


  constructor() {}
  ngOnChanges(){
    
  }
  
  checkData(){
    var j = ["title","x",'y','type'];
    for(var i=0;i<j.length;i++){
      if(this[j[i]]==undefined ){
        throw new Error('ace-chart component property of '+j[i]+' is undefined');
      }
    }
  };
  
  ngOnInit() {
    //主要是检查几个数据是否齐全
    //特别是饼图
    
    Promise.resolve().then(()=>{
      this.checkData();
     }).then(()=>{
       this.initChart();
     }).catch((err)=>{
       
         console.error(err);
     })
  };
  
  //初始化图表
  initChart(){
    this.chart = new Highcharts.Chart('container', {// 图表初始化函数，其中 container 为图表的容器 div               
      chart: {
          type: this.type                        //指定图表的类型，默认是折线图（line）
      },
      title: {
          text: this.title               //指定图表标题
      },
      xAxis: this.x,
      yAxis: {
        title: {
         text: this.y.title                //指定y轴的标题
        },
      },
      series: this.type=="pie"?this._pieData:this.normalData,
    });
  
  }
  

}
