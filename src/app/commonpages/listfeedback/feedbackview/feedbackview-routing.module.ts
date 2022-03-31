import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FeedbackviewPage } from './feedbackview.page';

const routes: Routes = [
  {
    path: '',
    component: FeedbackviewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeedbackviewPageRoutingModule {}
