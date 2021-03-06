import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DebitEntryComponent } from './debit-entry.component';

const routes: Routes = [{ path: '', component: DebitEntryComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DebitEntryRoutingModule { }
