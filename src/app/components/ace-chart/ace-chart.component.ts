import { Component, OnInit, ViewEncapsulation, Input, EventEmitter, Output, OnChanges } from '@angular/core';
import Highcharts from 'highcharts/highstock'
import { LineChartConfigService } from './line-chart-config.service';
import { PieChartConfigService } from './pie-chart-config.service';
export * from './line-chart-config.service';


@Component({
	selector: 'ace-chart',
	templateUrl: './ace-chart.component.html',
	styleUrls: ['./ace-chart.component.scss'],
	encapsulation: ViewEncapsulation.None,
	providers: [LineChartConfigService, PieChartConfigService]
})
export class AceChartComponent implements OnInit, OnChanges {
	_type: string;   //表格类型  直线图  曲线图  柱状图  饼图 
	@Input() get type() {
		return this._type;
	};
	set type(val: string) {
		this._type = val;
	}

	//配置
	_chartSetting;
	@Input() get chartSetting() {
		return this._chartSetting;
	}
	set chartSetting(val) {
		//判断是否有改变，如果有改变，刷新
		console.log(val);
		this._chartSetting = val;
	};


	private chart;//表格实例
	public id;   //id
	charOption: any = {};//最后的配置


	constructor(
		private lineService: LineChartConfigService,
		private PieService: PieChartConfigService
	) {
		var id = "";
		for (var i = 0; i < 10; i++) {
			id = id + Math.floor(Math.random() * 10);
		}
		this.id = 'acechar' + id;
	}
	ngOnChanges() {


	}


	ngOnInit() {
		Promise.resolve().then(() => {
			if (this.type == 'line') {
				this.setBarConfig();
			} else if (this.type == 'pie') {
				this.setPieConfig();
			} else if (this.type == 'bar') {
				this.setBarConfig();
			} else if (this.type == 'column') {
				this.setBarConfig();
			}
		}).then(() => {
			this.initChart();
		})
	};

	//初始化图表
	initChart() {
		this.charOption.credits = {
			enabled: false
		}
		Promise.resolve().then(() => {
			this.chart = new Highcharts.Chart(this.id, this.charOption);
		});
	};

	setPieConfig() {
		this.PieService.check(this.chartSetting);
		this.charOption = {
			chart: {
				plotBackgroundColor: null,
				plotBorderWidth: null,
				plotShadow: false
			},
			title: {
				text: this.chartSetting.title
			},
			tooltip: {
				headerFormat: '{series.name}<br>',
				pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>'
			},
			plotOptions: {
				pie: {
					allowPointSelect: true,
					cursor: 'pointer',
					dataLabels: {
						enabled: true,
						format: '<b>{point.name}</b>: {point.percentage:.1f} %',
						style: {
							color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
						}
					},
					states: {
						hover: {
							enabled: false
						}
					},
					slicedOffset: 20,         // 突出间距
					point: {                  // 每个扇区是数据点对象，所以事件应该写在 point 下面
						events: {
							// 鼠标滑过是，突出当前扇区
							mouseOver: function () {
								this.slice();
							},
							// 鼠标移出时，收回突出显示
							mouseOut: function () {
								this.slice();
							},
							// 默认是点击突出，这里屏蔽掉
							click: function () {
								return false;
							}
						}
					}
				}
			},
			series: [{
				type: 'pie',
				name: this.chartSetting.hoverText,
				data: this.chartSetting.datas
			}]
		}
	};

	// setLineCongig() {
	// 	this.charOption = {};
	// 	this.lineService.check(this.chartSetting);
	// 	this.charOption.chart = {
	// 		type: this.type
	// 	};
	// 	this.charOption.title = {
	// 		text: this.chartSetting.title
	// 	};
	// 	this.charOption.xAxis = this.chartSetting.x;
	// 	this.charOption.yAxis = JSON.parse(JSON.stringify(this.chartSetting.y));
	// 	this.charOption.yAxis.title = {
	// 		text:this.chartSetting.y.title
	// 	}
	// 	this.charOption.series = this.chartSetting.datas;
	// }

	setBarConfig() {
		this.charOption = {};
		var obj = this.lineService.check(this.chartSetting);
		this.charOption.chart = {
			type: this.type
		};
		this.charOption.title = {
			text: this.chartSetting.title
		};
		this.charOption.xAxis = JSON.parse(JSON.stringify(this.chartSetting.x));
		this.charOption.yAxis = JSON.parse(JSON.stringify(this.chartSetting.y));
		this.charOption.yAxis.title = {
			text: this.chartSetting.y.title,
			align: 'high',
		}
		this.charOption.plotOptions = {
			bar: {
				dataLabels: {
					enabled: true
				}
			},
			column: {
				// 关于柱状图数据标签的详细配置参考：https://api.hcharts.cn/highcharts#plotOptions.column.dataLabels
				dataLabels: {
					enabled: true,
					verticalAlign: 'top', // 竖直对齐方式，默认是 center
					inside: true
				}
			}
		};
		this.charOption.series = this.chartSetting.datas;
		this.charOption.tooltip = {
			// shared: true,
			useHTML: true,
			headerFormat: '<small>' + (this.chartSetting.hoverText || "{point.key}") + '</small><table>',
			pointFormat: '<tr><td style="color: {series.color}">{series.name}: </td>' +
			'<td style="text-align: right"><b>{point.y}</b></td></tr>',
			footerFormat: '</table>',
			// valueDecimals: 2
		};
	};


	// setColConfig() {
	// 	this.charOption = {};
	// 	var obj = this.lineService.check(this.chartSetting);
	// 	this.charOption.chart = {
	// 		type: 'column'
	// 	};
	// 	this.charOption.title = {
	// 		text: this.chartSetting.title
	// 	};
	// 	this.charOption.xAxis = JSON.parse(JSON.stringify(this.chartSetting.x));
	// 	this.charOption.yAxis = JSON.parse(JSON.stringify(this.chartSetting.y));
	// 	this.charOption.yAxis.title = {
	// 		text: this.chartSetting.y.title
	// 	}
	// 	this.charOption.series = this.chartSetting.datas;

	// 	// this.charOption.inverted = false;

	// 	this.charOption.tooltip = {
	// 		// shared: true,
	// 		useHTML: true,
	// 		headerFormat: '<small>' + (this.chartSetting.hoverText || "{point.key}") + '</small><table>',
	// 		pointFormat: '<tr><td style="color: {series.color}">{series.name}: </td>' +
	// 		'<td style="text-align: right"><b>{point.y}</b></td></tr>',
	// 		footerFormat: '</table>',
	// 	}
	// }

	//重绘
	rePaint(): void {

	}


}
