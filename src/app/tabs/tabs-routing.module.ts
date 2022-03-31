import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { AuthGuard } from '../commonpages/login/auth.guard';

const routes: Routes = [
  
  {
    path: 'home', canActivate: [AuthGuard],
    loadChildren: () => import('../commonpages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('../commonpages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'victim',
    loadChildren: () => import('./view/victimtabs/victimtabs.module').then( m => m.VictimtabsPageModule)
  },
  {
    path: 'profile', canActivate: [AuthGuard],
    loadChildren: () => import('../commonpages/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'hospitalprofile', canActivate: [AuthGuard],
    loadChildren: () => import('../commonpages/hospitaljur/hospitaljur.module').then( m => m.HospitaljurPageModule)
  },
  {
    path: 'settings', //canActivate: [AuthGuard],
    loadChildren: () => import('../commonpages/settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'releasenotes',
    loadChildren: () => import('../commonpages/releasenotes/releasenotes.module').then( m => m.ReleasenotesPageModule)
  },
  {
    path: 'about',
    loadChildren: () => import('../commonpages/about/about.module').then( m => m.AboutPageModule)
  },    
  {
    path: 'usermanagement',
    loadChildren: () => import('../commonpages/usermanagement/usermanagement.module').then( m => m.UsermanagementPageModule)
  },
  {
    path: 'master',
    loadChildren: () => import('../commonpages/master/master.module').then( m => m.MasterPageModule)
  },
  {
    path: 'rolepersonalization',
    loadChildren: () => import('../commonpages/rolepersonalization/rolepersonalization.module').then( m => m.RolepersonalizationPageModule)
  },
  {
    path: 'feedback',
    loadChildren: () => import('../commonpages/feedback/feedback.module').then( m => m.FeedbackPageModule)
  },
  {
    path: 'listfeedback',
    loadChildren: () => import('../commonpages/listfeedback/feedbackview/feedbackview.module').then( m => m.FeedbackviewPageModule)
  },
  
  {
    path: 'help',
    loadChildren: () => import('../commonpages/help/help.module').then( m => m.HelpPageModule)
  },
  {
    path: 'accview', canActivate: [AuthGuard],
    loadChildren: () => import('./view/accview/accview.module').then( m => m.AccviewPageModule)
  },
  // {
  //   path: 'patview', canActivate: [AuthGuard],
  //   loadChildren: () => import('./view/patientview/patientview.module').then( m => m.PatientviewPageModule)
  // },
  {
    path: 'viewaccloc', canActivate: [AuthGuard],
    loadChildren: () => import('./view/map/map.module').then( m => m.MapPageModule)
  },
  {
    path: 'list', canActivate: [AuthGuard],
    loadChildren: () => import('./view/list/list.module').then( m => m.ListPageModule)
  },
  {
    path: 'listpatient', canActivate: [AuthGuard],
    loadChildren: () => import('./view/listpatient/listpatient.module').then( m => m.ListpatientPageModule)
  },
  {
    path: 'listrequest', canActivate: [AuthGuard],
    loadChildren: () => import('./view/listrequest/listrequest.module').then( m => m.ListrequestPageModule)
  },
  // {
  //   path: 'patientview',
  //   loadChildren: () => import('./view/patientview/patientview.module').then( m => m.PatientviewPageModule)
  // },
  {
    path: 'accimg',
    loadChildren: () => import('./view/accimg/accimg.module').then( m => m.AccimgPageModule)
  },
  {
    path: 'hospitalrequest',
    loadChildren: () => import('./view/hospitalrequest/hospitalrequest.module').then( m => m.HospitalrequestPageModule)
  },
  {
    path: 'mvi',
    loadChildren: () => import('./view/mvi/mvi.module').then( m => m.MviPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('../commonpages/dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'courtprofile', canActivate: [AuthGuard],
    loadChildren: () => import('../commonpages/courtprofile/courtprofile.module').then( m => m.CourtprofilePageModule)
  },
  {
    path: 'dreports', canActivate: [AuthGuard],
    loadChildren: () => import('../commonpages/darreports/darreports.module').then( m => m.DarreportsPageModule)
  },
  {
    path: 'insuranceprofile', canActivate: [AuthGuard],
    loadChildren: () => import('../commonpages/insuranceprofile/insuranceprofile.module').then( m => m.InsuranceprofilePageModule)
  },
  {
    path: 'legalprofile', canActivate: [AuthGuard],
    loadChildren: () => import('../commonpages/legalprofile/legalprofile.module').then( m => m.LegalprofilePageModule)
  },
  {
    path: 'acctabs', canActivate: [AuthGuard],
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./acctabs/tab1/tab1.module').then(m => m.Tab1PageModule)
          },
          {
            path: 'location',
            children: [
              {
                path: '',
                loadChildren: () => import('./acctabs/tab1/location/location.module').then( m => m.LocationPageModule)
              },
              {
                path: 'map',
                loadChildren: () => import('./acctabs/tab1/map/map.module').then( m => m.MapPageModule)
              }
            ]
            //loadChildren: () => import('./acctabs/tab1/location/location.module').then( m => m.LocationPageModule)
          },
          {
            path: 'offline',
            children: [
              {
                path: '',
                loadChildren: () => import('./acctabs/tab1/offline/offline.module').then(m=>m.OfflinePageModule)
              },
              {
                path: 'map',
                loadChildren: () => import('./acctabs/tab1/map/map.module').then( m => m.MapPageModule)
              }
            ]
            //loadChildren: () => import('./acctabs/tab1/location/location.module').then( m => m.LocationPageModule)
          },
          {
            path: 'map',
            loadChildren: () => import('./acctabs/tab1/map/map.module').then( m => m.MapPageModule)
          },
          {
            path: 'accident',
            loadChildren: () => import('./acctabs/tab1/accident/accident.module').then( m => m.AccidentPageModule)
          },
          {
            path: 'vehicle',
            loadChildren: () => import('./acctabs/tab1/vehicle/vehicle.module').then( m => m.VehiclePageModule)
          },
          {
            path: 'passenger',
            loadChildren: () => import('./acctabs/tab1/passenger/passenger.module').then( m => m.PassengerPageModule)
          },
          {
            path: 'pedestrian',
            loadChildren: () => import('./acctabs/tab1/pedestrian/pedestrian.module').then( m => m.PedestrianPageModule)
          },
          {
            path: 'witness',
            loadChildren: () => import('./acctabs/tab1/witness/witness.module').then( m => m.WitnessPageModule)
          },
          {
            path: 'envroad',
            loadChildren: () => import('./acctabs/tab1/envroad/envroad.module').then( m => m.EnvroadPageModule)
          },{
            path: 'transport',
            loadChildren: () => import('./acctabs/tab1/transport/transport.module').then( m => m.TransportPageModule)
          },
          {
            path: 'hospital',
            loadChildren: () => import('./acctabs/tab1/hospital/hospital.module').then( m => m.HospitalPageModule)
          },
          {
            path: 'patientregister',
            loadChildren: () => import('./acctabs/tab1/patientregister/patientregister.module').then( m => m.PatientregisterPageModule)
          },
          {
            path: 'media',
            loadChildren: () => import('./acctabs/tab1/media/media.module').then( m => m.MediaPageModule)
          },
          {
            path: 'offmedia',
            loadChildren: () => import('./acctabs/tab1/offlinemedia/offlinemedia.module').then( m => m.OfflinemediaPageModule)
          },
          {
            path: 'audio',
            loadChildren: () => import('./acctabs/tab1/audio/audio.module').then( m => m.AudioPageModule)
          },
          {
            path: 'video',
            loadChildren: () => import('./acctabs/tab1/video/video.module').then( m => m.VideoPageModule)
          },
          {
            path: 'ingeneral',
            loadChildren: () => import('./acctabs/tab1/ingeneral/ingeneral.module').then( m => m.IngeneralPageModule)
          },
          {
            path: 'invehicle',
            loadChildren: () => import('./acctabs/tab1/invehicle/invehicle.module').then( m => m.InvehiclePageModule)
          },
          {
            path: 'inowner',
            loadChildren: () => import('./acctabs/tab1/inowner/inowner.module').then( m => m.InownerPageModule)
          },
          {
            path: 'indriver',
            loadChildren: () => import('./acctabs/tab1/indriver/indriver.module').then( m => m.IndriverPageModule)
          },
          {
            path: 'inpassenger',
            loadChildren: () => import('./acctabs/tab1/inpassenger/inpassenger.module').then( m => m.InpassengerPageModule)
          },
          {
            path: 'inpedestrian',
            loadChildren: () => import('./acctabs/tab1/inpedestrian/inpedestrian.module').then( m => m.InpedestrianPageModule)
          },
          {
            path: 'inchecklist',
            loadChildren: () => import('./acctabs/tab1/inchecklist/inchecklist.module').then( m => m.InchecklistPageModule)
          },
        ]
      },
      {
        path: 'tab2',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./acctabs/tab2/tab2.module').then(m => m.Tab2PageModule)
          }
        ]
      },
      {
        path: 'tab3',
        children: [
          {
            path: '',
            loadChildren: () => import('./view/list/list.module').then( m => m.ListPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/acctabs/tab1',
        pathMatch: 'full'
      }
    ]
  },
  
  {
    path: 'admintabs', canActivate: [AuthGuard],
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./admintabs/tab1/tab1.module').then(m => m.Tab1PageModule)
          }
        ]
      },
      {
        path: 'dar',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../tabs/view/darlist/darlist.module').then(m => m.DarlistPageModule)
          }
        ]
      },
      {
        path: 'legal',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../tabs/view/legallist/legallist.module').then(m => m.LegallistPageModule)
          }
        ]
      },
      {
        path: 'insurance',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../tabs/view/insurancelist/insurancelist.module').then(m => m.InsurancelistPageModule)
          }
        ]
      },
      {
        path: 'tab2',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./admintabs/tab2/tab2.module').then(m => m.Tab2PageModule)
          }
        ]
      },
      {
        path: 'tab3',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./admintabs/tab3/tab3.module').then(m => m.Tab3PageModule)
          }
        ]
      },      {
        path: 'tab4',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./admintabs/tab4/tab4.module').then(m => m.Tab4PageModule)
          }
        ]
      },{
        path: 'tab5',
        children: [
          {
            path: '',
            //redirectTo: 'list',
            loadChildren: () => import('./view/list/list.module').then( m => m.ListPageModule)
          }
        ]
                 
      },   {
        path: 'tab6',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./admintabs/tab5/tab5.module').then(m => m.Tab5PageModule)
          }
        ]
      },
      {
        path: 'tab7',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./admintabs/tab7/tab7.module').then(m => m.Tab7PageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/admintabs/tab1',
        pathMatch: 'full'
      }
    ]
  },
  
  {
    path: '', canActivate: [AuthGuard],
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'offline',
    loadChildren: () => import('./acctabs/tab1/offline/offline.module').then( m => m.OfflinePageModule)
  },
  {
    path: 'offlinemedia',
    loadChildren: () => import('./acctabs/tab1/offlinemedia/offlinemedia.module').then( m => m.OfflinemediaPageModule)
  },
  {
    path: 'indriver',
    loadChildren: () => import('./acctabs/tab1/indriver/indriver.module').then( m => m.IndriverPageModule)
  },
  {
    path: 'inchecklist',
    loadChildren: () => import('./acctabs/tab1/inchecklist/inchecklist.module').then( m => m.InchecklistPageModule)
  },
  {
    path: 'hospitalrequest',
    loadChildren: () => import('./view/hospitalrequest/hospitalrequest.module').then( m => m.HospitalrequestPageModule)
  },
  {
    path: 'victimtabs',
    loadChildren: () => import('./view/victimtabs/victimtabs.module').then( m => m.VictimtabsPageModule)
  },
  {
    path: 'patientregister',
    loadChildren: () => import('./acctabs/tab1/patientregister/patientregister.module').then( m => m.PatientregisterPageModule)
  },
  {
    path: 'stationinfo',
    loadChildren: () => import('../commonpages/stationinfo/stationinfo.module').then( m => m.StationinfoPageModule)
  },{
    path: 'notification',
    loadChildren: () => import('./../commonpages/notification/notification.module').then( m => m.NotificationPageModule)
  },
  {
    path: 'investigation',
    loadChildren: () => import('./policeinvestigation/investigation/investigation.module').then( m => m.InvestigationPageModule)
  },
  {
    path: 'darview',
    loadChildren: () => import('./view/darview/darview.module').then( m => m.DarviewPageModule)
  },
  {
    path: 'reportsview',
    loadChildren: () => import('./view/reportsview/reportsview.module').then( m => m.ReportsviewPageModule)
  },
  {
    path: 'notification',
    loadChildren: () => import('./../commonpages/notification/notification.module').then( m => m.NotificationPageModule)
  },
  {
    path: 'witness',
    loadChildren: () => import('./acctabs/tab1/witness/witness.module').then( m => m.WitnessPageModule)
  },

 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
