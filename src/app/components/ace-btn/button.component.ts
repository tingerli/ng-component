import { Component, OnInit, ViewEncapsulation, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'ace-btn',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ButtonComponent implements OnInit {
  @Input() type:string = 'default';
  @Input() htmlType:string = 'button';
  @Input() icon:string;
  @Input() size:string='default';
  @Input() text:string|undefined;
  @Output() onClick= new EventEmitter();
  constructor() { }

  ngOnInit() {
  }
  getClass(){
    var className;
    className ='btn'+" "+ButtonComponent.checkType(this.type)+' '+ButtonComponent.checkSize(this.size);
    return className;
  }

  static checkType(str:string|undefined){
    let val;
    switch(str) {
      case 'warning':val = 'btn-warning';break;
      case 'info':val = 'btn-info';break;
      case 'danger':val = 'btn-danger';break;
      case 'primary':val = 'btn-primary';break;
      case 'link':val = 'btn-link';break;
      case 'default':;
      case '':val = 'btn-default';break;
      default:
      console.log('ace-btn type is wrong , get '+str);
      val = 'btn-default'
    };
    return val;
  }

  static checkSize(str:string|undefined){
    let val;
    switch(str) {
      case 'small':val = 'btn-sm';break;
      case 'large':val = 'btn-lg';break;
      case 'default':;
      case '':val = 'btn-md';break;
      default:
      console.log('ace-btn size is wrong,get '+str);
      val = 'btn-md'
    };
    return val;
  }

  isClicked(){
    this.onClick.emit()
  }
}
