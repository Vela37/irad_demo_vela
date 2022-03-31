import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { TranslateConfigService } from 'src/app/translate-config.service';
import { Chart } from 'chart.js';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  selectedLanguage:string;
  params:any; data:any;
  user={
    "name":"Name",
    "role":"Role",
    "ps":"Police Station",
    "district":"District",
    "state":"State",
    "status":"Status",
  };

  @ViewChild('barChart', {static: false}) barChart;

  @ViewChild('pieChart', {static: false}) pieChart;
  

  accid:any;

 

  bars: any; pie:any;
  colorArray: any;
  ac_count:number[]=[0,0,0,0,0];


  constructor(
    private translateConfigService: TranslateConfigService,
    private api:ApiService
    ){
    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
    console.log('selectedLanguage ',this.selectedLanguage);
  }
  ngOnInit() {
    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
    
    let postDate={
      mode:'accidentcount',
    }
    this.api.post('dashboard',postDate).subscribe((data: any)=>{
      console.log(data.data.report.accidentcount); 
     let count=data.data;
     if(count!=null){
      console.log(count); 
      for(let i=0;i<count.report.accidentcount.length;i++){
        this.ac_count[count.report.accidentcount[i].severity-1]=count.report.accidentcount[i].count;
      }
      console.log('this.ac_count',this.ac_count);
     }
     this.createPieChart();
     });

 

  }

  ionViewWillEnter() {
   /*  setTimeout(() => {
       this.data = {
         'heading': 'Normal text',
         'para1': 'Lorem ipsum dolor sit amet, consectetur',
         'para2': 'adipiscing elit.'
       };
     }, 5000);*/
     //this.createPieChart();
    // this.createBarChart(); 
   }


createPieChart(){

  var config = {
    type: 'pie',
    data: {
      datasets: [{
        data: this.ac_count,
        backgroundColor: [
         'rgb(255, 99, 132)',
         'rgb(255, 159, 64)',
         'rgb(255, 205, 86)',
         'rgb(75, 192, 192)',
         'rgb(54, 162, 235)',
       //  'rgb(153, 102, 255)',
        // 'rgb(201, 203, 207)'
        ],
        label: 'Accident'
      }],
      labels: [
        'FATAL',
        'GRIEVOUS',
        'SIMPLE INJURY (H)',
        'SIMPLE INJURY (NH)',
        'VEHICLE DAMAGE'
      ]
    },
    options: {
      responsive: true,
      legend: {
        display: false,
        labels: {
            fontColor: 'rgb(255, 99, 132)'
        }}
    }
  };

  this.data=config.data; console.log(this.data);
  let ctx = this.pieChart.nativeElement;
 // ctx.height = 300;

  this.pie = new Chart(ctx,config );
}



  createBarChart() {

    var lineChartData = {
      labels: ['2015', '2016', '2017', '2018', '2019'],
      datasets: [
        {
        label: 'Fatal',
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgb(255,255,255,0)',
        fill: false,
        data: [
          3390,1800,2780,2500,2700
        ],
        yAxisID: 'y-axis-1',
      }, {
        label: 'Grievous',
        borderColor: "rgb(255, 205, 86)",
        backgroundColor: 'rgb(255,255,255,0)',
        fill: false,
        data: [
          7350,	4500,	8500,	7540,6400
        ],
        yAxisID: 'y-axis-2'
      },{
        label: 'Simple (Inj H)',
        borderColor: "rgb(153, 102, 255)",
        backgroundColor: 'rgb(255,255,255,0)',
        fill: false,
        data: [
          5570,	5580,	12780,	11730, 10780
        ],
        yAxisID: 'y-axis-2'
      },{
        label: 'Simple (Inj Non H)',
        borderColor: "rgb(54, 162, 235)",
        backgroundColor: 'rgb(255,255,255,0)',
        fill: false,
        data: [
          4570,	6580,	11780,	10730, 8780
        ],
        yAxisID: 'y-axis-2'
      }
    ]
    };

    //this.data=lineChartData;

    
  let ctx = this.barChart.nativeElement;
  //  ctx.height = 200;

    this.bars = new Chart(ctx, {
      type: 'line',
      data: lineChartData,
      options: {
        responsive: true,
        hoverMode: 'index',
        stacked: false,
        legend: {
          display: false,
          labels: {
              fontColor: 'rgb(255, 99, 132)'
          }},
        title: {
          display: true,
          text: 'Sample chart'
        },
        scales: {
          yAxes: [{
            type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
            display: true,
            position: 'left',
            id: 'y-axis-1',
          }, {
            type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
            display: true,
            position: 'right',
            id: 'y-axis-2',

            // grid line settings
            gridLines: {
              drawOnChartArea: false, // only want the grid lines for one axis to show up
            },
          }],
        }
      }
    });
  }
  
   

}
