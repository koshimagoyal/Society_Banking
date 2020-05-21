import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmpDashboardComponent } from './emp-dashboard.component';

const routes: Routes = [{ path: '', component: EmpDashboardComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpDashboardRoutingModule { }
