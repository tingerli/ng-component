import { Component, OnInit, ViewEncapsulation, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { ToolService } from '../core/tool.service'
@Component({
  selector: 'app-charts-page',
  templateUrl: './charts-page.component.html',
  styleUrls: ['./charts-page.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [ToolService]
})
export class ChartsPageComponent implements OnInit {
  th = ['名字', '说明', '类型', '接口', '默认值'];
  propValue = [
    {
      name: 'type',
      text: "表格的类型，暂时支持line(直线图), pie(饼图)， bar(条型图), column(柱型图)",
      type: "string",
      interface: " - ",
      default: " - "
    },
    {
      name: 'chartSetting',
      text: "配置表格属性",
      type: "AceChartLine || AceChartPie",
      interface: `
      <span class='text-danger'>//line ， bar  , column</span><br>
      interface AceChartLine { <br>
       &nbsp;&nbsp; title:string; // 标题<br>
       &nbsp;&nbsp; hoverText:string; // 悬浮时候的悬浮框标题<br>
       &nbsp;&nbsp; unit:string; // 悬浮框的单位<br>
       &nbsp;&nbsp; y?:{ //Y轴<br>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;title?:string;  //y轴名称<br>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;max?:number;            //最大值<br>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;min?:number; //最小值<br>
        &nbsp;&nbsp;},<br>
       &nbsp;&nbsp; x:{<br>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;text?:string;  //x轴名称<br>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;categories?:Array<string|number>|null;  //默认是null，如果添加了数组，就是区域<br>
        &nbsp;&nbsp;&nbsp;&nbsp;}<br>
        &nbsp;&nbsp; datas:Array<LineData>:{<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;name:string;         //对象的名字<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;data:Array<number>;  //数据的集合<br>
          &nbsp;&nbsp; };
          <br>}<br><br>
        <span class='text-danger'>//pie</span><br>
        interface AceChartPie {<br>
          &nbsp;&nbsp;&nbsp;&nbsp;datas:Array<[string,number]>;   //数据源<br>
          &nbsp;&nbsp;&nbsp;&nbsp;title:string;       //标题<br>
          &nbsp;&nbsp;&nbsp;&nbsp; hoverText:string;   //悬浮时候公共的名字<br>
        }
      `,
      default: " - "
    }
  ]
  lineChartSetting = {
    title: '线型图Demo',
    hoverText:"小明期末考试成绩",
    x: {
      categories: ["2011", '2012', '2013', 2014],
    },
    y:{
      title:"分数",
      min:20,
      max:110,
    },
    datas: [
      {
        name:'数学',
        data:[50,60,70,80]
      },
      {
        name: '英语',
        data: [150, 60, 40, 30]
      }
    ]
  };
  pieChartSetting = {
    datas: [
      ['苹果', 40],
      ['雪梨', 120],
      ['香蕉', 99]
    ],
    title: "饼图Demo",
    hoverText: "广州水果销量占比"
  };
  barChartSetting = {
    title: '条形图Demo',
    hoverText:"小明期末考试成绩",
    x: {
      categories: ["2011", '2012', '2013', 2014],
    },
    y:{
      title:"分数",
    },
    datas: [
      {
        name:'数学',
        data:[50,60,70,80]
      },
      {
        name: '英语',
        data: [150, 60, 40, 30]
      }
    ]
  };
  columnChartSetting = {
    title: '柱状图Demo',
    // hoverText:"小明期末考试成绩",
    unit:"百万",
    x: {
      categories: ["小米", '华为', '苹果', '三星',"小米", '华为', '苹果', '三星'],
    },
    y:{
      title:"分数",
    },
    datas: [
      {
        name:'国外',
        data:[50,60,70,80,50,60,70,80]
      },
      {
        name: '国内',
        data: [150, 60, 40, 30,50,60,70,80]
      }
    ]
  };
  constructor(
    private tool: ToolService,
  ) { }

  ngOnInit() {


  };
  ngAfterViewInit() {

  }

}
