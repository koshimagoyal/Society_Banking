import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoanForeclosureComponent } from './loan-foreclosure.component';

const routes: Routes = [{ path: '', component: LoanForeclosureComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoanForeclosureRoutingModule { }
