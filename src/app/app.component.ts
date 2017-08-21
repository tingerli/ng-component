import { Component } from '@angular/core';

class Setting {
  path:string;
  iconClass:string;
  text:string;
}

const sideBarSetting:Setting[] = [
  {
    path:'/home',
    iconClass:'menu-icon fa fa-home',
    text:'首页'
  },
  {
    path:'/button',
    iconClass:'menu-icon fa fa-bomb',
    text:'按钮'
  },
  {
    path:'/table',
    iconClass:'menu-icon fa fa-table',
    text:'表单'
  },
  {
    path:'/modal',
    iconClass:'menu-icon fa fa-dribbble',
    text:'对话框'
  }
]

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  sibarSetting=sideBarSetting;
  
  isActive(hash:string){
    if(location.href.indexOf(hash)>-1){
      return "active"
    }
  }

  ngOnInit(){
   
  }
}
