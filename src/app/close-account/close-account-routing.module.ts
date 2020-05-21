import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CloseAccountComponent } from './close-account.component';

const routes: Routes = [{ path: '', component: CloseAccountComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CloseAccountRoutingModule { }
