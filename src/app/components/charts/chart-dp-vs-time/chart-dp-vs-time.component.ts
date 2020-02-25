import { Component, OnInit, Input, SimpleChanges, AfterViewInit } from '@angular/core';
import Chart from 'chart.js';
@Component({
  selector: 'app-chart-dp-vs-time',
  templateUrl: './chart-dp-vs-time.component.html',
  styleUrls: ['./chart-dp-vs-time.component.scss']
})
export class ChartDpVsTimeComponent implements AfterViewInit {
  @Input('chart_data') chart_data : any;  
  @Input('limit_dp') limit_dp : any;
  @Input('chart_id') chart_id : any;
  @Input('selected_values') selected_values : any; 
  private chart: any;
  private chartData:any=[];
  private variableData:any={};
  private verticalLimitChartData:any=[]


  constructor() { 
  }
  
  ngAfterViewInit() {
    this.verticalLimitChartData = [
      {x:0,y:this.limit_dp},
      {x:this.chart_data[this.chart_data.length-1].time.toFixed(4),y:this.limit_dp}
    ]

    for (let i = 0; i < this.chart_data.length; i++) {
      var point = {
        'x':parseFloat(this.chart_data[i].time).toFixed(4),
        'y':parseFloat(this.chart_data[i].drop_pressure).toFixed(4)
      }
      this.chartData.push(point);
      
    }
    if(this.selected_values){
      this.variableData = [{
        'x':parseFloat(this.selected_values.time),
        'y':parseFloat(this.selected_values.drop_pressure)
      }]
    }
    this.initChart();
  }

  ngOnChanges(changes: SimpleChanges){
    if(!changes.selected_values.firstChange){
      this.selected_values = changes.selected_values.currentValue;
      this.variableData = [{
        'x':parseFloat(this.selected_values.time),
        'y':parseFloat(this.selected_values.drop_pressure)
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
                label: 'Dp vs Time',
                data: this.chartData,
                //backgroundColor:'#f2eff9',
                backgroundColor:'#2c00a0',
                borderWidth:1,
                lineTension:0,
                borderColor:'#1C036F',
                pointBackgroundColor: "#222",
                pointBorderColor: "#222",
                pointRadius:'2'
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
                    var label = 'Dp value:' + tooltipItem.yLabel;
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
                    labelString: 'Time of change in months',
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
                  labelString: 'Pressure Drop',
                  fontColor:'#222',
                  fontSize:10,
                },
                ticks: {
                  beginAtZero: true,
                  fontSize:10,
                  //stepSize:0.5
                },
              },
            ],
          }
        }
    });

  }

}
