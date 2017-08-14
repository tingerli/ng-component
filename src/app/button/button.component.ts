import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ButtonComponent implements OnInit {
  thead = ['属性','说明','类型','默认值'];
  tableValue=[
    {
      name:'type',
      text:'5种属性可设置，default, warning, info, danger, primary, link',
      type:'string',
      default:'default'
    },
    {
      name:'htmlType',
      text:'设置 button 原生的 type 值，可选值请参考 HTML 标准',
      type:'string',
      default:'button'
    },
    {
      name:'icon',
      text:'设置按钮的图标类型',
      type:'string',
      default:' - '
    },
    {
      name:'size',
      text:'设置按钮大小，可选值为 small large 或者不设',
      type:'string',
      default:'default '
    },
     {
      name:'onClick',
      text:'click 事件的 handler',
      type:'function',
      default:' - '
    },
  ];
  constructor() { }

  ngOnInit() {
    
  }
  getKeys(item:any){
    return [item.name, item.text, item.type, item.default]
  }

}
