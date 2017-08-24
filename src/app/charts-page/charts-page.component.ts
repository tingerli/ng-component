import { Component, OnInit, ViewEncapsulation, ViewChild, ViewChildren, QueryList } from '@angular/core';

@Component({
  selector: 'app-charts-page',
  templateUrl: './charts-page.component.html',
  styleUrls: ['./charts-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ChartsPageComponent implements OnInit {
  charSetting= {
    title:'表格1',
    type:"line",
    x:{
      categories:{

      }
    },
    y:{
      title:'Y轴'
    }
  }
  constructor() { }

  ngOnInit() {
    // var chart = new Highcharts.Chart('container', {// 图表初始化函数，其中 container 为图表的容器 div               
    //   chart: {
    //       type: 'bar'                           //指定图表的类型，默认是折线图（line）
    //   },
    //   title: {
    //       text: '我的第一个图表'                 //指定图表标题
    //   },
    //   xAxis: {
    //       categories: ['苹果', '香蕉', '橙子']   //指定x轴分组
    //   },
    //   yAxis: {
    //       title: {
    //           text: 'something'                 //指定y轴的标题
    //       }
    //   },
    //   series: [{                                 //指定数据列
    //       name: '小明',                          //数据列名
    //       data: [1, 0, 4]                        //数据
    //   }, {
    //       name: '小红',
    //       data: [5, 7, 3]
    //   }]
    // });

  };
  ngAfterViewInit() {
    
  }

}
