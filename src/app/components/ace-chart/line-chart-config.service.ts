import { Injectable } from '@angular/core';

export interface LineData {
  name:string;         //对象的名字
  hoverText?:string;
  data:Array<number>;  //数据的集合
}

export interface LineX {
  text?:string;  //x轴名称
  categories?:Array<string|number>|null;  //默认是null，如果添加了数组，就是区域
}

export interface LineY {
  text?:string;  //y轴名称
  allowDecimals?:boolean; //默认是true 显示小数
  max?:number;            //最大值
  min?:number; //最小值
}


export interface AceChartLine {
  title:string;
  datas:Array<LineData>;
  yAxis?:LineY;
  xAxis:LineX;
}


@Injectable()
export class LineChartConfigService {

  constructor() { }
  check(val:AceChartLine):AceChartLine{
    return val;
  };

}
