import { Component, OnInit, ViewChild, Input, SimpleChanges } from '@angular/core';
import Chart from 'chart.js';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {

  @ViewChild('bar_chart',{static:false}) bar_chart:any;
  @Input('current_cost') current_cost : any;
  @Input('optimized_cost') optimized_cost : any;
  @Input('selected_cost') selected_cost :any;
  @Input('chart_id') chart_id : any;
  public myChart:any;
  private barChart:any;
  labels: string[];
  constructor() { }

  ngOnInit() {
    console.log(this.current_cost);
    console.log(this.optimized_cost);
    console.log(this.selected_cost);
  }

  ngAfterViewInit(){
    this.initBarChart();
  }

  ngOnChanges(changes: SimpleChanges){
    var selected_cost = changes.selected_cost.currentValue;
    if (selected_cost){
      if(changes.selected_cost.firstChange){
        this.labels = ['CURRENT COST','OPTIMIZED COST','SELECTED COST'];
        this.selected_cost = selected_cost;
      }else{
        this.barChart.data.labels = ['CURRENT COST','OPTIMIZED COST','SELECTED COST'];
        this.barChart.data.datasets[2].data[2] = this.selected_cost.toFixed(2);
        this.barChart.update();
      }
    }else{
      if(changes.selected_cost.firstChange){
        this.labels = ['CURRENT COST','OPTIMIZED COST']
        this.selected_cost = 0;
      }else{
        this.barChart.data.labels = ['CURRENT COST','OPTIMIZED COST']
        this.selected_cost = 0;
        this.barChart.update();
      }
    }
  }

  initBarChart(){
    var id = this.chart_id;
    var canvas : any = document.getElementById(id);
    var ctx2 = canvas.getContext("2d");
    var data =  {
      labels:this.labels,
      datasets: [
        {
          barPercentage: 0.5,
          label: 'CURRENT COST',
          data: [this.current_cost.toFixed(2),0,0],
          backgroundColor: '#2c00a0'
        },
        {
          barPercentage: 0.5,
          label: 'OPTIMIZED COST',
          data: [0, this.optimized_cost.toFixed(2), 0],
          backgroundColor: '#52c0bb'
        },
        {
          barPercentage: 0.5,
          label: 'SELECTED COST',
          data: [0, 0, this.selected_cost.toFixed(2)],
          backgroundColor: '#c7d42d'
        },{
          barPercentage: 0.5,
          label: 'SAVINGS',
          data: [0,(this.current_cost - this.optimized_cost).toFixed(2),0],
          backgroundColor: '#9933ff'
        }
      ],
    };
    var options = {
      title: {
        display: false,
        text: ''
      },
      legend: {
        position: 'bottom',
        display:false,
      },
      scales: {
        xAxes: [{
          stacked: true,
          ticks: {
              display: true,
              fontSize:10,
          }
        }],
        yAxes: [{
            stacked: true,
            display: true,
            ticks: {
                beginAtZero: true,
                stepSize:200,
                fontSize:10,
                callback: function(value, index, values) {
                  return "$ " + value;
                }
            }
        }]
      },
      tooltips:{
        callbacks:{
          label: function(tooltipItem, data) {
            var label = data.datasets[tooltipItem.datasetIndex].label || '';
            var data = data.datasets[tooltipItem.datasetIndex];
            var value = data.data[tooltipItem.index];
            return label + ": "+ value + " $";
          }
        },
      },
    }
    this.barChart = new Chart(ctx2,{
      type: 'bar',
      data: data,
      options: options
    });
  }

}
