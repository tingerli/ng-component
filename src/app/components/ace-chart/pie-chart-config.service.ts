import { Injectable } from '@angular/core';
interface AceChartPie {
  datas:Array<[string,number]>;   //数据源
  title:string;       //标题
  hoverText:string;   //悬浮时候公共的名字
}

@Injectable()
export class PieChartConfigService {

  constructor() { }
  check(data:AceChartPie):AceChartPie{
    return data;
  }

}
