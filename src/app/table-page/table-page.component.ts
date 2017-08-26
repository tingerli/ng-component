import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import '../../assets/js/jquery.jqGrid.min.js';
import '../../assets/js/bootstrap-datepicker.min.js';
import '../../assets/js/grid.locale-en.js'

var list = [{id:"1",name:"Desktop Computer",note:"note",stock:"Yes",ship:"FedEx", sdate:"2007-12-03"},
			{id:"2",name:"Laptop",note:"Long text ",stock:"Yes",ship:"InTime",sdate:"2007-12-03"},
			{id:"3",name:"LCD Monitor",note:"note3",stock:"Yes",ship:"TNT",sdate:"2007-12-03"},
			{id:"4",name:"Speakers",note:"note",stock:"No",ship:"ARAMEX",sdate:"2007-12-03"},
			{id:"5",name:"Laser Printer",note:"note2",stock:"Yes",ship:"FedEx",sdate:"2007-12-03"},
			{id:"6",name:"Play Station",note:"note3",stock:"No", ship:"FedEx",sdate:"2007-12-03"},
			{id:"7",name:"Mobile Telephone",note:"note",stock:"Yes",ship:"ARAMEX",sdate:"2007-12-03"},
			{id:"8",name:"Server",note:"note2",stock:"Yes",ship:"TNT",sdate:"2007-12-03"},
			{id:"9",name:"Matrix Printer",note:"note3",stock:"No", ship:"FedEx",sdate:"2007-12-03"},
			{id:"10",name:"Desktop Computer",note:"note",stock:"Yes",ship:"FedEx", sdate:"2007-12-03"},
			{id:"11",name:"Laptop",note:"Long text ",stock:"Yes",ship:"InTime",sdate:"2007-12-03"}]

@Component({
  selector: 'app-table-page',
  templateUrl: './table-page.component.html',
  styleUrls: ['./table-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TablePageComponent implements OnInit {
	constructor() { }
		demo4 = {
		title:'Demo1 设置前5列的的宽度为200',
		widths:[200,200,200,200,200],
		dataSource:[
			{id:"1",name:"Desktop Computer",note:"note",stock:"Yes",ship:"FedEx", sdate:"2007-12-03",detail:"我是细节1"},
			{id:"2",name:"Laptop",note:"Long text ",stock:"Yes",ship:"InTime",sdate:"2007-12-03",detail:"我是细节2"},
			{id:"3",name:"LCD Monitor",note:"note3",stock:"Yes",ship:"TNT",sdate:"2007-12-03",detail:"我是细节3"},
			{id:"4",name:"Speakers",note:"note",stock:"No",ship:"ARAMEX",sdate:"2007-12-03",detail:"我是细节4"},
			{id:"5",name:"Laser Printer",note:"note2",stock:"Yes",ship:"FedEx",sdate:"2007-12-03",detail:"我是细节5"},
			{id:"6",name:"Play Station",note:"note3",stock:"No", ship:"FedEx",sdate:"2007-12-03",detail:"我是细节6"},
			{id:"7",name:"Mobile Telephone",note:"note",stock:"Yes",ship:"ARAMEX",sdate:"2007-12-03",detail:"我是细节7"},
			{id:"8",name:"Server",note:"note2",stock:"Yes",ship:"TNT",sdate:"2007-12-03",detail:"我是细节8"},
			{id:"9",name:"Matrix Printer",note:"note3",stock:"No", ship:"FedEx",sdate:"2007-12-03",detail:"我是细节0"},
			{id:"10",name:"Desktop Computer",note:"note",stock:"Yes",ship:"FedEx", sdate:"2007-12-03",detail:"我是细节11"},
			{id:"11",name:"Laptop",note:"Long text ",stock:"Yes",ship:"InTime",sdate:"2007-12-03",detail:"我是细节12"},
		],
		modalState:{
			show:false,
			text:'初次打开页面不加载数据，请组合条件进行搜索数据...'
		},
		dataInf:{
			page:1,
			totalPage:3,
			total:32,
			startId:1,
			endId:10
		},
		loading:false,
		rowNumber:10
	};
	demo1 = {
		title:'Demo2 提示框',
		widths:[],
		dataSource:[],
		modalState:{
			show:true,
			text:'初次打开页面不加载数据，请组合条件进行搜索数据...'
		}
	};
	demo2 = {
		title:'Demo3 不设置表格高度tableHeight',
		widths:[],
		dataSource:[
			{id:"1",name:"Desktop Computer",note:"note",stock:"Yes",ship:"FedEx", sdate:"2007-12-03"},
			{id:"2",name:"Laptop",note:"Long text ",stock:"Yes",ship:"InTime",sdate:"2007-12-03"},
			{id:"3",name:"LCD Monitor",note:"note3",stock:"Yes",ship:"TNT",sdate:"2007-12-03"},
			{id:"4",name:"Speakers",note:"note",stock:"No",ship:"ARAMEX",sdate:"2007-12-03"},
			{id:"5",name:"Laser Printer",note:"note2",stock:"Yes",ship:"FedEx",sdate:"2007-12-03"},
			{id:"6",name:"Play Station",note:"note3",stock:"No", ship:"FedEx",sdate:"2007-12-03"},
			{id:"7",name:"Mobile Telephone",note:"note",stock:"Yes",ship:"ARAMEX",sdate:"2007-12-03"},
			{id:"8",name:"Server",note:"note2",stock:"Yes",ship:"TNT",sdate:"2007-12-03"},
			{id:"9",name:"Matrix Printer",note:"note3",stock:"No", ship:"FedEx",sdate:"2007-12-03"},
			{id:"10",name:"Desktop Computer",note:"note",stock:"Yes",ship:"FedEx", sdate:"2007-12-03"},
			{id:"11",name:"Laptop",note:"Long text ",stock:"Yes",ship:"InTime",sdate:"2007-12-03"},
		],
		modalState:{
			show:false,
			text:'初次打开页面不加载数据，请组合条件进行搜索数据...'
		}
	};
	demo3 = {
		title:'Demo4 设置表格宽度tableHeight  最小值为150 ',
		widths:[],
		dataSource:[
			{id:"1",name:"Desktop Computer",note:"note",stock:"Yes",ship:"FedEx", sdate:"2007-12-03"},
			{id:"2",name:"Laptop",note:"Long text ",stock:"Yes",ship:"InTime",sdate:"2007-12-03"},
			{id:"3",name:"LCD Monitor",note:"note3",stock:"Yes",ship:"TNT",sdate:"2007-12-03"},
			{id:"4",name:"Speakers",note:"note",stock:"No",ship:"ARAMEX",sdate:"2007-12-03"},
			{id:"5",name:"Laser Printer",note:"note2",stock:"Yes",ship:"FedEx",sdate:"2007-12-03"},
			{id:"6",name:"Play Station",note:"note3",stock:"No", ship:"FedEx",sdate:"2007-12-03"},
			{id:"7",name:"Mobile Telephone",note:"note",stock:"Yes",ship:"ARAMEX",sdate:"2007-12-03"},
			{id:"8",name:"Server",note:"note2",stock:"Yes",ship:"TNT",sdate:"2007-12-03"},
			{id:"9",name:"Matrix Printer",note:"note3",stock:"No", ship:"FedEx",sdate:"2007-12-03"},
			{id:"10",name:"Desktop Computer",note:"note",stock:"Yes",ship:"FedEx", sdate:"2007-12-03"},
			{id:"11",name:"Laptop",note:"Long text ",stock:"Yes",ship:"InTime",sdate:"2007-12-03"},
		],
		modalState:{
			show:false,
			text:'初次打开页面不加载数据，请组合条件进行搜索数据...'
		}
	};

	demo5 = {
		title:'Demo5 不要选择框 [multipleChoice]',
		widths:[],
		multipleChoice:false,
		dataSource:[
			{id:"1",name:"Desktop Computer",note:"note",stock:"Yes",ship:"FedEx", sdate:"2007-12-03"},
			{id:"2",name:"Laptop",note:"Long text ",stock:"Yes",ship:"InTime",sdate:"2007-12-03"},
			{id:"3",name:"LCD Monitor",note:"note3",stock:"Yes",ship:"TNT",sdate:"2007-12-03"},
			{id:"4",name:"Speakers",note:"note",stock:"No",ship:"ARAMEX",sdate:"2007-12-03"},
			{id:"5",name:"Laser Printer",note:"note2",stock:"Yes",ship:"FedEx",sdate:"2007-12-03"},
			{id:"6",name:"Play Station",note:"note3",stock:"No", ship:"FedEx",sdate:"2007-12-03"},
			{id:"7",name:"Mobile Telephone",note:"note",stock:"Yes",ship:"ARAMEX",sdate:"2007-12-03"},
			{id:"8",name:"Server",note:"note2",stock:"Yes",ship:"TNT",sdate:"2007-12-03"},
			{id:"9",name:"Matrix Printer",note:"note3",stock:"No", ship:"FedEx",sdate:"2007-12-03"},
			{id:"10",name:"Desktop Computer",note:"note",stock:"Yes",ship:"FedEx", sdate:"2007-12-03"},
			{id:"11",name:"Laptop",note:"Long text ",stock:"Yes",ship:"InTime",sdate:"2007-12-03"},
		]
	};
	theadSource = [
		{name:'id',text:'编号'},
		{name:'name',text:'名字'},
		{name:'note',text:'笔记'},
		{name:'stock',text:'stock'},
		{name:'ship',text:'邮寄方式'},
		{name:'sdate',text:'时间'}
	];

	proTable = {
		th:['属性','说明','类型',"Demo",'默认值'],
		tbody:[
			 {
	      name:'title',
	      text:'表格标题',
				type:'string',
				demo:" - ",
	      default:' - '
			},
			{
	      name:'dataSource',
	      text:'表格遍历的数据，每一个对象的 key 值对应着theadSource 数据的name值',
				type:'Array<object>',
				demo:`[{id:"11"}]`,
	      default:' - '
	    },
			{
	      name:'theadSource',
	      text:'表头遍历的数据',
				type:'Array<object>',
				demo:"[{name:'id',text:'编号'}]",
	      default:' - '
			},
			{
	      name:'widths',
	      text:'设置每一列的宽度',
				type:'Array<number>',
				demo:"[200,200]",
	      default:'[ ]'
			},
			{
	      name:'minWidth',
	      text:'每一列的最小宽度',
				type:'number',
				demo:" - ",
	      default:'100'
			},
			{
	      name:'tableHeight',
	      text:'表格的高度，设置了就会出现滚动条，最小为 150px',
				type:'number',
				demo:" - ",
	      default:'- '
			},
			{
	      name:'loading',
	      text:'加载动画',
				type:'boolean',
				demo:" - ",
	      default:'false '
			},
			{
	      name:'multipleChoice',
	      text:'是否出现多选框',
				type:'boolean',
				demo:" - ",
	      default:' true'
			},
			{
	      name:'dataInf',
				text:`列表相关数据 , 如果不填就是 X<br>
				{<br>
					 &nbsp;&nbsp; page:number;  <i>//当前页码</i><br>   
					  &nbsp;&nbsp; totalPage?:number;<i>//全部页数</i><br>
					  &nbsp;&nbsp; total?:number;<i>//数据总数</i><br>
					  &nbsp;&nbsp; startId?:number;<i>//当前页开始数据的id</i><br>
					  &nbsp;&nbsp; endId?:number;<i>//当前页最后数据的id</i><br>
					}
				`,
				type:'object',
				demo:" - ",
	      default:`{<br>
						page:1,<br>
				    totalPage:1,<br>
				    total:10,<br>
				    startId:1,<br>
				    endId:10<br>}`
			},
			{
	      name:'modalState',
				text:`设置modal 相关配置<br>
				{<br>
					 &nbsp;&nbsp; show:boolean; <i>//modal状态</i><br>
  				 &nbsp;&nbsp; text?:string; <i>//文字 </i><br>
					}
				`,
				type:'object',
				demo:`{<br>
					&nbsp;&nbsp; show:true,<br>
					&nbsp;&nbsp; text:'无更多数据'<br>
				}`,
	      default:'{show:false}'
	    },
		]
	};
	eventTable = {
		th:['事件','说明','返回类型'],
		tbody:[
			{
				event:'onSelect',
				text:"<b>multipleChoice 为 true 才能触发</b> , 勾选了多选框，或者选择了全选 , 返回的是整行数据",
				type:'Array<object>'
			},
			{
				event:'onChangeRows',
				text:"更改了每页显示的行数时候触发",
				type:'number'
			},
			{
				event:'onChangePage',
				text:"翻页时候触发",
				type:'number'
			},
		]
	};

	getKeys(item:any){
	    return [item.name, item.text, item.type,item.demo, item.default]
	}
	getEventKeys(item:any){
	    return [item.event, item.text, item.type]
	}
	selectedRow=[];
	mySelector(e:any){
		this.selectedRow = e;
	}

  ngOnInit() {
		setTimeout(()=>{
		
		},500)

	}
	
	//demo4换页
	changeDemo4Page(page:number){
		var arr = [];
		this.demo4.dataInf.page = page;
		this.demo4.loading = true;
		
		if(page<3){
			for(var i=0;i<this.demo4.rowNumber;i++){
				let obj = JSON.parse(JSON.stringify(list[Math.floor(Math.random()*10)]));
				obj.id =( page-1)*this.demo4.rowNumber+i+1;
				arr.push(obj);
			}
		}else{
			for(var i=0;i<2;i++){
				let obj = JSON.parse(JSON.stringify(list[Math.floor(Math.random()*10)]));
				obj.id =( page-1)*this.demo4.rowNumber+i+1;
				arr.push(obj);
			}
		}
		

		setTimeout(()=>{
			this.demo4.dataSource = arr;
			this.demo4.loading = false;
			this.demo4.dataInf.startId = (page-1)*this.demo4.rowNumber+1;
			this.demo4.dataInf.endId = (page-1)*this.demo4.rowNumber+arr.length;
		},1000)
	}
	
	//demo4 换显示数量
	changeDemo4Rows(num:number){
		if(this.demo4.rowNumber!=num){ 
			 this.demo4.rowNumber = num;
			this.changeDemo4Page(this.demo4.dataInf.page)
		}
	}
}
