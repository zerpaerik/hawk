import { Component, OnInit, Input, SimpleChanges, AfterViewInit, Output, EventEmitter } from '@angular/core';
import Chart from 'chart.js';

@Component({
  selector: 'app-chart-cost-vs-time',
  templateUrl: './chart-cost-vs-time.component.html',
  styleUrls: ['./chart-cost-vs-time.component.scss']
})
export class ChartCostVsTimeComponent implements AfterViewInit {
  @Input('chart_data') chart_data : any;  
  @Input('limit_dp') limit_dp : any; 
  @Input('chart_id') chart_id : any;
  @Input('scale') scale : any;
  @Input('selected_values') selected_values : any; 
  @Output() has_limit = new EventEmitter<number>();

  private chartData: any = [];
  private chart: any;
  private verticalLimitChartData: any;
  private max_cost:any;
  private variableData: { 'x': number; 'y': number; }[];
  constructor() { }

  ngAfterViewInit() {
    for (let i = 0; i < this.chart_data.length; i++) {
      var point = {
        'x':parseFloat(this.chart_data[i].change_out_time).toFixed(4),
        'y':parseFloat(this.chart_data[i].annual_cost).toFixed(4)
      }
      if(this.chart_data[i].is_at_max_operational){
        this.verticalLimitChartData = [
          {x:this.chart_data[i].change_out_time,y:this.chart_data[0].annual_cost},
          {x:this.chart_data[i].change_out_time,y:0},
        ]
      }
      if(this.chart_data[i].is_optimal){
        this.max_cost = Math.floor(this.chart_data[i].annual_cost * 5);
        this.has_limit.emit(this.max_cost);
      }
      this.chartData.push(point); 
    }
    if(this.selected_values){
      this.variableData = [{
        'x':parseFloat(this.selected_values.change_out_time),
        'y':parseFloat(this.selected_values.annual_cost)
      }]
    }
    this.initChart();
  }
  
  ngOnChanges(changes: SimpleChanges){
    if(changes.scale && !changes.scale.firstChange){
      if(changes.scale.currentValue.use){
        this.chart.options.scales.yAxes[0].ticks.max = changes.scale.currentValue.limit_y;
        this.chart.options.scales.xAxes[0].ticks.max = changes.scale.currentValue.limit_x;
        this.chart.update();
      }else{
        this.chart.options.scales.yAxes[0].ticks.max = this.max_cost;
        this.chart.options.scales.xAxes[0].ticks.max = Math.ceil(this.chartData[this.chartData.length-1].x);
        this.chart.update();
      }
    }
    
    if(changes.selected_values && !changes.selected_values.firstChange){
      this.selected_values = changes.selected_values.currentValue;
      this.variableData = [{
        'x':parseFloat(this.selected_values.change_out_time),
        'y':parseFloat(this.selected_values.annual_cost)
      }];
      this.chart.data.datasets[0].data[0] = this.variableData[0];
      this.chart.update();
    }
  }

  initChart(){
    var id = this.chart_id;
    var ctx:HTMLElement = <HTMLElement> document.getElementById(id);
    ctx.style.backgroundColor = '#FFF';
    ctx.style.padding = '10px';

    var canvas : any = document.getElementById(id);
    var ctx2 = canvas.getContext("2d");
    
    this.chart = new Chart(ctx2, {
        type: 'line',
        pointBackgroundColor: "#55bae7",
        pointBorderColor: "#55bae7",
        data: {
            datasets: [
              {
                data:this.variableData,
                pointRadius:'6',
                borderColor:'#1C036F',
                borderWidth:2,
                backgroundColor:'#c7d42d'
              },
              {
                label: 'Cost vs Time',
                data: this.chartData,
                backgroundColor:'#f2eff9',
                borderWidth:1,
                lineTension:0,
                borderColor:'#1C036F',
                pointBackgroundColor: "#222",
                pointBorderColor: "#222",
                pointRadius:'1'
              },
              {
                data:this.verticalLimitChartData,
                pointRadius:'0',
                borderColor:'#1C036F',
                borderWidth:1,
              }
            ]
        },
        options: {
          elements: {
            line: {
              tension: 0.4
            }
          },
          legend:{
            display: false,
          },
          tooltips:{
            callbacks:{
                label:function(tooltipItem, data) {
                    var label = 'Cost:' + tooltipItem.yLabel;
                    return label;
                }
            },
          },
          scales: {
              xAxes: [{
                  type: 'linear',
                  position: 'bottom',
                  scaleLabel: {
                    display: true,
                    labelString: 'Time in months',
                    fontColor:'#222',
                    fontSize:10,
                  },
                  ticks: {
                    //stepSize: 2,
                    fontSize:10,
                  }
                },
              ],
              yAxes: [{
                scaleLabel: {
                  display: true,
                  labelString: 'Cost per year',
                  fontColor:'#222',
                  fontSize:10,
                },
                ticks: {
                  beginAtZero: true,
                  fontSize:10,
                  max:this.max_cost,
                  //stepSize:0.5
                  callback: function(value, index, values) {
                    return "$ " + value;
                  },
                },
              },
            ],
          }
        }
    });

  }

}
