import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FyDividendCalculateComponent } from './fy-dividend-calculate.component';

const routes: Routes = [{ path: '', component: FyDividendCalculateComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FyDividendCalculateRoutingModule { }
