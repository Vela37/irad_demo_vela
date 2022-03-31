import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateConfigService } from '../../../translate-config.service';
import { AuthService, AuthResponseData } from '../../../commonpages/login/auth.service';
import { ApiService } from '../../../services/api.service';

import { AlertController, ModalController } from '@ionic/angular';
import { LogindetailsComponent } from './logindetails/logindetails.component';
import { CountdetailsComponent } from '../../../popups/countdetails/countdetails.component';

import { FilterdetailsComponent } from './filterdetails/filterdetails.component';
import { DatePipe } from '@angular/common';
import { Chart } from 'chart.js';
import { Router } from '@angular/router';
import { of, Subscription } from 'rxjs';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  @ViewChild('barChart', { static: false }) barChart;

  @ViewChild('lineCanvas', { static: false }) lineCanvas;

  @ViewChild('lineCanvas2', { static: false }) lineCanvas2;

  lineChart: any;  tl_flag:any; cf_flag:any='C1'; dev:boolean=false;
  lineChart2: any;  dashboardview:string='PD';

  selectedLanguage: string; params: any;
  states:any;districts:any;stations:any; hwdata:any; pending:any; highwaystable:any; transdata:any; transportdata:any; transportdatatable:any;

  selection = { 'state': '', 'district': '', 'station': '', 'year': '' };
  accid: any;
  data: any = null; fromdate:Date=null;todate:Date=null; today: String = new Date().toISOString();
  dead: number = 0; injured: number = 0; year: any = ''; totaccident: number = 0;
  ac_count: number[] = [0, 0, 0, 0, 0];
//-----------------------------------------
  role:any; dept:any;
  pendingflag:boolean=true;
  inprocessflag:boolean=true;
  submittedflag:boolean=true;
  toggle1:boolean = false;
  greeed: boolean=true;
  greedaccstate:boolean=true;
  greeddistrict:boolean=true;
  greedhosstate:boolean=true;
  greedhosdistrict:boolean=true;
  label:any = 'State';
  checked : boolean = true;
  statename:any;
  rtoname:any;
  mviname:any;
  private userSub: Subscription;
  clicked: any;
  policedata:boolean=false;
  datacombo=true; 
  statelist:any;
  rtolist:any;
  mvilist:any;
  fullvalue:any;
  result:any;
  policeresult:any;
  totalinspection:number=123456;
  i=0;
  //--------------------------------


  user: any;
  bars: any;
  colorArray: any;
  title: string=null;
  linedata = { label: [], value: [] ,fatal:[],grev:[],sih:[],sinh:[],ni:[]};

  linedatas = [{ label: [], value: [] }];


  public config = {
    animation: 'count',
    format: ',ddd',
    theme: 'default',
    value: 50,
    auto: true,
  }

   dashboard = {
    title: 'Loading ...',
    subtitle:'',
    fatal : 0,
    grevious:0,
    simple_injury_h:0,
    simple_injury_nh:0,
    no_injury:0,
    injured:0,
    dead:0,
    totaccident : 0,
    totalperson: 0,
    request:0,
    pending:0,
    completed:0,
    total:0
  };



  constructor(private translateConfigService: TranslateConfigService,
    private api: ApiService, private modalctrl: ModalController, private router: Router, public datepipe: DatePipe,
    private authService: AuthService,
  ) {
    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
    this.tabLoading();
  }

  ngOnInit() {
    this.loadhighways(); 
    this.loadhighwaytable();
    this.loadTransportTable();
   // this.loadTransportData();
    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
    if(this.dept=='1') {this.dashboardview='PD'; this.loaddeatils();}
    else if(this.dept=='2') {this.dashboardview='PD'}
   // this.loaddeatils();
    
    if(this.dept=='2' && this.role=='31')
    {  this.loaddeatils();
     // this.cf_flag='C2';
     this.loadrto('1');
        
    }
    if(this.dept=='2' && this.role=='35')
    {  this.loaddeatils();
     // this.cf_flag='C2'
     this.loadmvi("1");
        
    }

    //this.loadDashboard();
  }
  public loadrto(id){

    //    alert(this.user.state_code);
    if(id==1)
    {
      if(this.user.state_code!='')
      {
        this.statename=this.user.state_code;
      }
     
    }
        this.fullvalue=null;
    this.rtolist=null;
    let postDate = {
      mode: "load_rtobyintrest",
      statename:this.statename,
      level:'state'
    };
    
          this.api.post("dashboard.php", postDate).subscribe((data: any) => {
            this.rtolist=data.rtolist;
            this.fullvalue=data.total;
            if(data.policeflag=='1')
            {
            this.policedata=true;
            this.policeresult=data.station;
            }
            else
            {
              this.policedata=false;
              this.policeresult=null;
            }
            this.result=data.dataresult;
          //  this.statelist=data.state;
          this.label='RTO / DMTO';
    });
    
    }
    public changedata(){
      //alert("hiiiii");
      this.fullvalue=null;
    this.pendingflag=false;
    this.pendingflag=false;
      let postDate = {
        mode: "load_mvidata",
        rto:this.rtoname,
        state:this.statename,
        mvi:this.mviname
      };
      this.api.post("dashboard.php", postDate).subscribe((data: any) => {
        this.fullvalue=data.total;
        if(data.policeflag=='1')
        {
        this.policedata=true;
        this.policeresult=data.station;
        }
        else
        {
          this.policedata=false;
          this.policeresult=null;
        }
        this.result=data.dataresult;
    
      });
    }
    public loadmvi(id){
      if(id==1)
      {
        if(this.user.state_code!='')
          {
                   this.rtoname= this.user.office_id;
          }
      }
      this.fullvalue=null;
    //this.rtolist=null;
      //alert('hiii');
      //select name,username as id from master.irad_users where dept_code='2' and role_code='37' and office_id='TN23'
    this.pendingflag=false;
      let postDate = {
        mode: "load_mvibyintrest",
        rto:this.rtoname,
        state:this.user.state_code
      };
      
            this.api.post("dashboard.php", postDate).subscribe((data: any) => {
              this.mvilist=data.mvilist;
              this.fullvalue=data.total;
            if(data.policeflag=='1')
            {
            this.policedata=true;
            this.policeresult=data.station;
            }
            else
            {
              this.policedata=false;
              this.policeresult=null;
            }
            this.result=data.dataresult;
            this.label="MVI /MTO";
      });
    
    }
    public loaddeatils(){
    //return false;
       this.pendingflag=true;
       this.inprocessflag=true;
       this.submittedflag=true;
    
       this.statename = " ";
       this.rtoname = " ";
       this.mviname = " ";
    
      let postDate = {
        mode: "basicdetails",
      };
    
          this.api.post("dashboard.php", postDate).subscribe((data: any) => {
            this.fullvalue=data.total;
            if(data.policeflag=='1')
            {
            this.policedata=true;
            this.policeresult=data.station;
            }
            else
            {
              this.policedata=false;
              this.policeresult=null;
            }
            this.result=data.dataresult;
            this.statelist=data.state;
          
            console.log(this.fullvalue);
    
      });
    }

    public loadhighways()
    {
      this.greeed= true;
      this.greedhosstate=true;
     let postDate = 
     {
      //  mode: "highwayrequest",
      mode: "highwayrequest",
       
     };
   
         this.api.post("dashboard.php", postDate).subscribe((data: any) => 
         {
          this.hwdata=data.hwdata[0];
           this.pending = this.hwdata.total - this.hwdata.completed;
          
          
     });
    }
  
      public loadTransportTable()
  {
    let postDate = 
    {
     //  mode: "highwayrequest",
     mode: "transportdashboard",
      
    };
  
        this.api.post("dashboard.php", postDate).subscribe((data: any) => 
        {
          this.transportdata=data.data1;
          this.transdata=this.transportdata[0];
          this.transportdatatable=data.data2; 
   
         
         
    });
  }
  
  
    public loadhighwaytable()
    {
      let postDate = 
      {
       //  mode: "highwayrequest",
       mode: "highwayrequest_roaddept",
      };
          this.api.post("dashboard.php", postDate).subscribe((data: any) => 
          {
           this.highwaystable=data.hwdata;
           
            console.log("highwaystable",this.highwaystable);        
      });
    }
    
 
    tabLoading(){
  

    this.authService.autoLogin();
    this.userSub = this.authService.user.subscribe(user => {
      console.log("---");
     console.log(user);
     this.user=user;
      this.dept=user.dept;
      this.role=user.role;
      this.statename=user.state_code;
      console.log("---");
      this.rtoname=user.office_id;
//        alert(user.office_id);
//alert(user.state_code);
//alert(user.dept);
//alert(user.role);
    
  });

}
  ngAfterViewInit() {
    let dtl=localStorage.getItem('dtl');
    this.dev = (localStorage.getItem('dev') === 'true');
    this.timeLine(dtl);
  }

  chartChange(flag){
    console.log(flag);

    if(flag=='C1'){

      this.lineChart.data.datasets.splice(1, 5);
      this.lineChart.update();
     // return false;
    }else if(flag=='C2'){
      this.lineChart.data.datasets.splice(1, 5);
      this.linechartaddDataset('fatal');
      this.linechartaddDataset('grev');
      this.linechartaddDataset('sih');
      this.linechartaddDataset('sinh');
      this.linechartaddDataset('ni');    
    }    else
    {

      if (this.lineChart) this.lineChart.destroy();
      this.lineChart.data.datasets.splice(1, 5);
      this.lineChart = new Chart(this.lineCanvas.nativeElement,    
      
        {
        type: 'bar',
        
        data:
         {
          labels: this.linedata.label,
        
          datasets: [
            // {
            //   data: this.linedata.value,
            //   label: 'No. of Accidents',
            //   backgroundColor: '#013a6e',                      
            // },
            {
              data: this.linedata.fatal,
              label: 'Fatal',
              backgroundColor: '#ff718e',
            },
            {
              data:this.linedata.grev,
              label: 'Grevious',
              backgroundColor: '#ffac59',
            },
            {
              data: this.linedata.sih,
              label: 'Simple Injury(H)',
              backgroundColor: '#ffd265',
            },
            {
              data: this.linedata.sinh,
              label: 'Simple Injury(Non H)',
              backgroundColor: '#79d9d9',
            },
            {
              data: this.linedata.ni,
              label: 'No Injury',
              backgroundColor: '#7dbfec',
            },
          ],
        },
        options : {
        
          scales: {      
             yAxes: [{
              stacked: true,
             }],
             xAxes: [{
                stacked: true,
             }]
          }
       }   
      });
      
       

    }

    



   // this.cf_flag=flag;

   // let dtl=localStorage.getItem('dtl');
  //  this.timeLine(dtl);

  }
  timeLine(flag) {
   
    this.dashboard.title='Loading ...'; this.dashboard.subtitle='';
   this.dashboard.fatal=0;
   this.dashboard.grevious=0;
   this.dashboard.simple_injury_h=0;
   this.dashboard.simple_injury_nh=0;
   this.dashboard.no_injury=0;
   this.totaccident=0;
   this.dashboard.injured=0;
   this.dashboard.dead=0;
   this.dashboard.totalperson=0;


    console.log(flag);
    let xaxis;

    if (flag == '1D' || flag==null) {
      xaxis = "Today (by Hours)";
    } else if (flag == '1W') {
      xaxis = "Last 7 Days";
    } else if (flag == '1M') {
      xaxis = "Last 30 Days";
    } else if (flag == '3M') {
      xaxis = "Last 3 Months";
    } else if (flag == '6M') {
      xaxis = "Last 6 Months";
    } else if (flag == '1Y') {
      xaxis = "Last 1 Year";
    } else if (flag == 'ALL') {
      xaxis = "Since 1st January 2021";
    } else if(flag=='CUSTOM'){
      xaxis =' From '+ this.datepipe.transform(this.fromdate, 'd-MMM-yyyy') ;
      if(this.todate!=null){
        xaxis +=' To '+ this.datepipe.transform(this.todate, 'd-MMM-yyyy') ;
      }else{
        xaxis +=' To TODAY';
      }
    }else{
      flag = '1D';
      xaxis = "Today (by Hours)";
    }
    this.tl_flag=flag;
    localStorage.setItem('dtl',flag);
    let postDate = {
      mode: 'timeline',
      'range': flag,
      'selection': this.selection,
      'fromdate':this.fromdate,
      'todate':this.todate,
    }
    if(flag=='CUSTOM'){
        postDate = {
        mode: 'timeline',
        'range': flag,
        'selection': this.selection,
        'fromdate':this.fromdate,
        'todate':this.todate,
        
      }
    }
    this.api.post('dashboard.php', postDate).subscribe((data: any) => {

     
      if(data.error!=undefined){
        console.log('resdata',data);
        this.authService.logout();
        this.router.navigate(['/home']);
      }

      let label = new Array();
      let value = new Array(); let fatal = new Array(); let grev = new Array(); let sih = new Array(); let sinh = new Array(); let ni=new Array();
      let linedata = data.timeline;
      for (let i = 0; i < linedata.length; i++) {
        label[i] = linedata[i]['label'];
        value[i] = linedata[i]['value'];
        fatal[i] = linedata[i]['fatal'];
        grev[i] = linedata[i]['grev'];
        sih[i] = linedata[i]['sih'];
        sinh[i] = linedata[i]['sinh'];
        ni[i] = linedata[i]['ni'];
      }
      this.linedata.label = label;
      this.linedata.value = value;
      this.linedata.fatal = fatal;
      this.linedata.grev = grev;
      this.linedata.sih = sih;
      this.linedata.sinh = sinh;
      this.linedata.ni = ni;
      //console.clear();
     // console.log(this.linedata);
      

    if(this.cf_flag=='C1'){
      this.lineChartMethod(xaxis);
    }else{
      //this.lineChartMethod2(xaxis);
    }


      let sevwise = data.severitywise;
      for (let i = 0; i < sevwise.length; i++) {
        if(sevwise[i].severity==1) this.dashboard.fatal=sevwise[i].count;
        if(sevwise[i].severity==2) this.dashboard.grevious=sevwise[i].count;
        if(sevwise[i].severity==3) this.dashboard.simple_injury_h=sevwise[i].count;
        if(sevwise[i].severity==4) this.dashboard.simple_injury_nh=sevwise[i].count;
        if(sevwise[i].severity==5) this.dashboard.no_injury=sevwise[i].count;
      }
     
       this.dashboard.totaccident= this.dashboard.fatal +  this.dashboard.grevious+this.dashboard.simple_injury_h+this.dashboard.simple_injury_nh+this.dashboard.no_injury;
       

      let personcount = data.personcount;
      this.dashboard.injured=personcount.injured;
      this.dashboard.dead=personcount.dead;
      this.dashboard.totalperson= this.dashboard.injured+this.dashboard.dead;
      this.dashboard.title=data.title;
      this.dashboard.subtitle=xaxis;
       

      this.chartChange(this.cf_flag);
    });

  }


  lineChartMethod(xaxis) {
    if (this.lineChart) this.lineChart.destroy();
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: this.linedata.label,//['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'November', 'December'],
        datasets: [
          {
            label: 'No. of Accidents',
            fill: true,
            lineTension: 0.1,
            backgroundColor: 'rgba(1, 58, 110,0.1)',
            borderColor: 'rgba(1, 58, 110,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(1, 58, 110,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(1, 58, 110,1)',
            pointHoverBorderColor: 'rgba(1, 58, 110,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 2,
            pointHitRadius: 10,
            data: this.linedata.value, // [65, 59, 80, 81, 56, 55, 40, 10, 5, 50, 10, 15],
            spanGaps: false,

          }
        ]
      },
      options: {

        legend: {
          display: true,
          fill:true,
          labels: {
            fontColor: '#666666',
           // fontStyle:"bold"
          }
        },
        scales: {
          xAxes: [{
            ticks: {
              // Make labels vertical
              // https://stackoverflow.com/questions/28031873/make-x-label-horizontal-in-chartjs
              //minRotation: 90,

              // Limit number of labels
              // https://stackoverflow.com/questions/22064577/limit-labels-number-on-chartjs-line-chart
              autoSkip: true,
              maxTicksLimit: 10
            },
            display: true,
            scaleLabel: {
              display: true,
              labelString: xaxis
            }
          }],
          yAxes: [{
            display: true,
            ticks: {
              autoSkip: true,
              beginAtZero: true,
             // stepSize: 1,
              maxTicksLimit: 10
            },
            scaleLabel: {
              display: true,
              labelString: 'No. of Accidents'
            }
          }],
        }
      },
    });
  }

  linechartaddDataset(flag){

console.log(this.lineChart.data.datasets.length);
let ldata; let color='255, 99, 132'; let label='';
if(flag=='fatal'){
  label="Fatal";
  ldata=this.linedata.fatal;
  color='255, 99, 132';
   
}else if(flag=='grev'){
  label="Grievous";
   ldata=this.linedata.grev;
   color='245, 179, 121';
}else if(flag=='sih'){
  color="255, 210, 101"
  label="Simple Injury(H)";
   ldata=this.linedata.sih;
}else if(flag=='sinh'){
  color='121, 217, 217';
  label="Simple Injury(Non H)";
   ldata=this.linedata.sinh;
}else if(flag=='ni'){
  color='121, 161, 189';
  label="No Injury";
  ldata=this.linedata.ni;
}

   
      //this.lineChart.data.datasets.pop();

      for(let i=1;i<this.lineChart.data.datasets.length;i++){
        console.log(this.lineChart.data.datasets[i].label,'==',label);
        if(this.lineChart.data.datasets[i].label==label){ console.log('in');
          this.lineChart.data.datasets.splice(i, 1);
          this.lineChart.update(); return false;
          }

      }



     // this.lineChart.update();
   
   

      const newDataset = 
        {
          label: label,
          fill: true,
          lineTension: 0.1,
          backgroundColor: 'rgba('+color+',0.0)',
          borderColor: 'rgba('+color+',1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba('+color+',1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba('+color+',1)',
          pointHoverBorderColor: 'rgba('+color+',1)',
          pointHoverBorderWidth: 2,
          pointRadius: 2,
          pointHitRadius: 10,
          data: ldata ,// [65, 59, 80, 81, 56, 55, 40, 10, 5, 50, 10, 15],
          spanGaps: false,

        
      };
      this.lineChart.data.datasets.push(newDataset);
     // this.lineChart.update();
    
    this.lineChart.update();
  }


  lineChartMethod2(xaxis) {
    if (this.lineChart2) this.lineChart2.destroy();
    this.lineChart2 = new Chart(this.lineCanvas2.nativeElement, {
      type: 'line',
      data: {
        labels: this.linedata.label,//['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'November', 'December'],
        datasets: [
          {
            label: 'No. of Accidents',
            fill: true,
            lineTension: 0.1,
            backgroundColor: 'rgba(255, 99, 132,0.1)',
            borderColor: 'rgba(255, 99, 132,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(255, 99, 132,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(255, 99, 132,1)',
            pointHoverBorderColor: 'rgba(255, 99, 132,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 2,
            pointHitRadius: 10,
            data: this.linedatas[1].value, // [65, 59, 80, 81, 56, 55, 40, 10, 5, 50, 10, 15],
            spanGaps: false,

          },

          {
            label: 'No. of Accidents',
            fill: true,
            lineTension: 0.1,
            backgroundColor: 'rgba(255, 99, 132,0.1)',
            borderColor: 'rgba(255, 99, 132,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(255, 99, 132,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(255, 99, 132,1)',
            pointHoverBorderColor: 'rgba(255, 99, 132,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 2,
            pointHitRadius: 10,
            data: this.linedatas[2].value, // [65, 59, 80, 81, 56, 55, 40, 10, 5, 50, 10, 15],
            spanGaps: false,

          }

        ]
      },
      options: {

        legend: {
          display: false,
          fill:true,
          labels: {
            fontColor: '#DF2B1D',
            fontStyle:"bold"
          }
        },
        scales: {
          xAxes: [{
            ticks: {
              // Make labels vertical
              // https://stackoverflow.com/questions/28031873/make-x-label-horizontal-in-chartjs
              //minRotation: 90,

              // Limit number of labels
              // https://stackoverflow.com/questions/22064577/limit-labels-number-on-chartjs-line-chart
              autoSkip: true,
              maxTicksLimit: 10
            },
            display: true,
            scaleLabel: {
              display: true,
              labelString: xaxis
            }
          }],
          yAxes: [{
            display: true,
            ticks: {
              autoSkip: true,
              beginAtZero: true,
             // stepSize: 1,
              maxTicksLimit: 10
            },
            scaleLabel: {
              display: true,
              labelString: 'No. of Accidents'
            }
          }],
        }
      },
    });
  }


  loadDashboard1() {
    console.log('loadingdashboard');

    let postDate = {
      mode: 'accidentcount',
      'selection': this.selection
    }
    this.api.post('dashboard.php', postDate).subscribe((data: any) => { 
      //console.log(data.data.report.accidentcount); 
      // this.data=data.data.report; console.log('this.data',this.data);
      let count = data.data;
      if (count.report.accidentcount != undefined) {
        //  console.log(count); 
        for (let i = 0; i < count.report.accidentcount.length; i++) {
          this.ac_count[count.report.accidentcount[i].severity - 1] = count.report.accidentcount[i].count;
        }
        //console.log('this.ac_count',count);
        this.dead = count.report.personcount.dead;
        this.injured = count.report.personcount.injured;
        this.year = count.report.year;
        this.totaccident = count.report.acccount;
        this.title = count.report.title;
        if (this.year != 0) { this.title += ' - ' + this.year; }


      } else {

        for (let i = 0; i < 5; i++) {
          this.ac_count[i] = 0;
        }
        this.dead = 0;
        this.injured = 0;
        this.year = count.report.year;
        this.totaccident = count.report.acccount;
        this.title = count.report.title;
        if (this.year != 0) { this.title += ' - Year ' + this.year; }

      }
      // if(this.totaccident!=0){  this.createBarChart(); }
      //this.createBarChart();
    });
  }


  ionViewDidEnter() {
    this.greeed= true;
    this.greedhosstate=true;
   
    //this.createBarChart();
    // this.loadDashboard();
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    
    this.timeLine(localStorage.getItem('dtl'));
    //this.loadDashboard();
    refresher.target.complete();


  }



  createBarChart() {



    var horizontalBarChartData = {
      labels: ['S1', 'S2', 'S3', 'S4', 'S5'],
      datasets: [{
        label: 'No of Accidents ',
        borderWidth: 4,
        backgroundColor: [
          'rgb(255, 99, 132,0.5)',
          'rgb(255, 159, 64,0.5)',
          'rgb(255, 205, 86,0.5)',
          'rgb(75, 192, 192,0.5)',
          'rgb(54, 162, 235,0.5)',
        ],
        borderColor: [
          'rgb(255, 99, 132,1)',
          'rgb(255, 159, 64,1)',
          'rgb(255, 205, 86,1)',
          'rgb(75, 192, 192,1)',
          'rgb(54, 162, 235,1)',
        ],
        yAxisID: 'y-axis-1',
        data: this.ac_count

      }


      ]

    };

    var lineChartData = {
      labels: ['2015', '2016', '2017', '2018'],
      datasets: [
        {
          label: 'Fatal',
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgb(255,255,255,0)',
          fill: false,
          data: [
            12, 4, 6, 2, 7
          ],
          yAxisID: 'y-axis-1',
        }, {
          label: 'Grievous',
          borderColor: "rgb(255, 205, 86)",
          backgroundColor: 'rgb(255,255,255,0)',
          fill: false,
          data: [
            3, 5, 7, 9, 4
          ],
          yAxisID: 'y-axis-2'
        }, {
          label: 'Simple (Inj H)',
          borderColor: "rgb(153, 102, 255)",
          backgroundColor: 'rgb(255,255,255,0)',
          fill: false,
          data: [
            29411, 30095, 34374, 35538
          ],
          yAxisID: 'y-axis-2'
        }, {
          label: 'Simple (Inj Non H)',
          borderColor: "rgb(54, 162, 235)",
          backgroundColor: 'rgb(255,255,255,0)',
          fill: false,
          data: [
            1404, 1121, 1377, 1683
          ],
          yAxisID: 'y-axis-2'
        }
      ]
    };

    this.data = horizontalBarChartData;
    if (this.bars) this.bars.destroy();
    this.bars = new Chart(this.barChart.nativeElement, {
      type: 'bar',
      data: horizontalBarChartData,
      options: {
        responsive: true,
        hoverMode: 'index',
        stacked: false,
        title: {
          display: true,
          text: 'Accidents Based on Serverity'
        },
        legend: {
          display: false,
          labels: {
            fontColor: 'rgb(255, 99, 132)'
          }
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

  async funCounts() {

    const modalped = await this.modalctrl.create({
      component: CountdetailsComponent,
      componentProps: { 'selection': this.selection }
      /* componentProps: {
         'visibility':this.data.accinfo.visibilty,
         'refhp':'test',
       }*/

    });

    modalped.onWillDismiss().then(dataReturned => {
      //   this.histroyreturn = dataReturned.data;
      console.log('Receive: ', dataReturned.data);

    });
    return await modalped.present().then(_ => {
      //  console.log('Sending: ', this.phyopnion);
    });
    
  }

  drilDown(){
    this.router.navigate(['/admintabs/tab6']);
  }

  drilDownHighways(wing)
  {
    console.log("THW WING OF HIGHWAY IS", wing);
    localStorage.setItem('highwaydet', JSON.stringify(wing));
    this.router.navigate(['/admintabs/tab7']);
  }

  async loginDetails() {
    //console.log("RTO values",i);

    const modalped = await this.modalctrl.create({
      component: LogindetailsComponent,
      componentProps: { 'selection': this.selection }
      /* componentProps: {
         'visibility':this.data.accinfo.visibilty,
         'refhp':'test',
       }*/

    });

    modalped.onWillDismiss().then(dataReturned => {
      //   this.histroyreturn = dataReturned.data;
      console.log('Receive: ', dataReturned.data);

    });
    return await modalped.present().then(_ => {
      //  console.log('Sending: ', this.phyopnion);
    });

  }

  async openFilter() {
    const modalped = await this.modalctrl.create({
      component: FilterdetailsComponent,
      componentProps: { 'selection': this.selection }
      /* componentProps: {
         'visibility':this.data.accinfo.visibilty,
         'refhp':'test',
       }*/
    });

    modalped.onWillDismiss().then(dataReturned => {
      //   this.histroyreturn = dataReturned.data;
      console.log('Receive: ', dataReturned.data);

      if (dataReturned.data != undefined) {
        this.selection = dataReturned.data
       // this.loadDashboard();
       let dtl=localStorage.getItem('dtl');
       this.timeLine(dtl);
      }
    });
    return await modalped.present().then(_ => {
      //  console.log('Sending: ', this.phyopnion);
    });

  }
  cancelmodal() 
  {
    this.modalctrl.dismiss();
    this.greedhosstate = true;
  }


  

  toggleSection(i)
   {
    this.clicked[i] = !this.clicked[i];
  }
  
 

  public accclick()
  {
    console.log("jdbjhasvdjkahsvc")
     this.greeed= false;
     this.greedhosstate=true;
     

  }
  public accclickState()
  {

     this.checked = !this.checked;
     if(!this.checked)
     {
       
       this.greeed= true;
       this.greedaccstate= false;
       this.greedhosstate= true;
   
     }
     else
     {
       this.greeed= true;
       this.greedaccstate= true;
       this.greedhosstate= true;
     }

  }

  public accclickDistrict()
  {
    console.log("jdbjhasvdjkahsvc")
    this.greeed= true;
    this.greedaccstate= true;
    this.greeddistrict= false;
    this.greedhosstate= true;
    this.greedhosdistrict= true;
  }

  public hosclickState()
  {
    this.checked = !this.checked;
  if(!this.checked)
  {
    console.log("TTTTTTTTTTTTTTTTTTTTTTTT",);
    console.log("jdbjhasvdjkahsvc")
    this.greeed= true;
    this.greedaccstate= true;
    this.greedhosstate= false;

  }
  else
  {
    console.log("FFFFFFFFFFFFFFFFFFFFFFFFFF");
    console.log("jdbjhasvdjkahsvc")
    this.greeed= true;
    this.greedaccstate= true;
    this.greedhosstate= true;
  }


    
    
  }

  public hosclickDistrict()
  {
    console.log("jdbjhasvdjkahsvc")
    this.greeed= true;
    this.greedaccstate= true;
    this.greeddistrict= true;
    this.greedhosstate= true;
    this.greedhosdistrict= false;
  }

  closeModal()
   {
    
    this.modalctrl.dismiss();
    
  }

}