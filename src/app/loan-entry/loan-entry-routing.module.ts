import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoanEntryComponent } from './loan-entry.component';

const routes: Routes = [{ path: '', component: LoanEntryComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoanEntryRoutingModule { }
