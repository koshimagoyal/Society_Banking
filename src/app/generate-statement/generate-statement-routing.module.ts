import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GenerateStatementComponent } from './generate-statement.component';

const routes: Routes = [{ path: '', component: GenerateStatementComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GenerateStatementRoutingModule { }
