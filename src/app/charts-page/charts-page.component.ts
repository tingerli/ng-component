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
  };
  data = [{                                 //指定数据列
      name: '小明',                          //数据列名
      data: [1, 0, 4]                        //数据
    }, {
      name: '小红',
      data: [5, 7, 3]
    }];
  constructor() { }

  ngOnInit() {
   

  };
  ngAfterViewInit() {
    
  }

}
