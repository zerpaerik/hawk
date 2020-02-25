import { Component, OnInit, ViewChild, Input } from '@angular/core';
import Chart from 'chart.js';
@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {
  @ViewChild('chart',{static:false}) chart:any;
  @Input('current_cost') current_cost : any;
  @Input('savings') savings : any;
  @Input('optimal_cost') optimal_cost : any;
  @Input('size') size : any;
  
  public myChart:any;
  public pieChart:any;
  constructor() { }

  ngOnInit() {
    
  }

  ngAfterViewInit(){
    this.initPieChart();
  }

  initPieChart(){
    var canvas : any = document.getElementById("chart");
    var ctx2 = canvas.getContext("2d");

    this.pieChart = new Chart(ctx2,{
      type: 'doughnut',
      data: {
        labels: ['Optimal Cost', "Savings"],
        datasets: [{
          backgroundColor: ["#21b3ad", "#9933ff"],
          data: [this.optimal_cost.toFixed(2),this.savings.toFixed(2)]
        }]
      },
      options: {      
        legend: {  
          display: false  
        },  
        scales: {  
          xAxes: [{  
            display: false  
          }],  
          yAxes: [{  
            display: false  
          }],  
        },
        rotation:0,
        cutoutPercentage: 70,
        tooltips:{
          callbacks:{
            label: function(tooltipItem, data) {
              var label_index =  tooltipItem.index;
              var label_name = data.labels[label_index];
              var label_value = data.datasets[0].data[label_index];
              return label_name+ " : " + label_value + " $";
            }
          },
        },  
      }  
    });
  }

}
