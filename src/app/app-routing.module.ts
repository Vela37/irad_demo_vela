import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './commonpages/login/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./commonpages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./commonpages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./commonpages/about/about.module').then( m => m.AboutPageModule)
  },
  {
    path: 'acctabs', canActivate: [AuthGuard],
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
 
  {
    path: 'admintabs', canActivate: [AuthGuard],
    redirectTo: '/admintabs/tab1',
  },
 
  {
    path: 'register',
    loadChildren: () => import('./commonpages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'profile', canActivate: [AuthGuard],
    loadChildren: () => import('./commonpages/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'settings', canActivate: [AuthGuard],
    loadChildren: () => import('./commonpages/settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: '**',
    loadChildren: () => import('./commonpages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'feedback',
    loadChildren: () => import('./commonpages/feedback/feedback.module').then( m => m.FeedbackPageModule)
  },
  {
    path: 'hospitaljur',
    loadChildren: () => import('./commonpages/hospitaljur/hospitaljur.module').then( m => m.HospitaljurPageModule)
  }, 
  {
    path: 'dashboard',
    loadChildren: () => import('./commonpages/dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'stationinfo',
    loadChildren: () => import('./commonpages/stationinfo/stationinfo.module').then( m => m.StationinfoPageModule)
  },{
    path: 'notification',
    loadChildren: () => import('./commonpages/notification/notification.module').then( m => m.NotificationPageModule)
  },

 
  
  
 
  
  
 
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, {useHash: true, preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
