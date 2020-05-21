import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreditEntryComponent } from './credit-entry.component';

const routes: Routes = [{ path: '', component: CreditEntryComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreditEntryRoutingModule { }
