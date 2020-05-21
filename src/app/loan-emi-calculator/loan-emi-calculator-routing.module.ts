import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoanEmiCalculatorComponent } from './loan-emi-calculator.component';

const routes: Routes = [{ path: '', component: LoanEmiCalculatorComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoanEmiCalculatorRoutingModule { }
