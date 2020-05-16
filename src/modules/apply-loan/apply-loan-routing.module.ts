import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoanComponent } from '@modules/apply-loan/loan/loan.component';
import { SBRouteData } from '@modules/navigation/models';
import { ApplyLoanModule } from '@modules/apply-loan/apply-loan.module';


/* Routes */
export const ROUTES: Routes = [
    {
        path: '',
        canActivate: [],
        component: LoanComponent,
        data: {
            title: 'Apply Loan',
        } as SBRouteData,
    },
];
@NgModule({
  imports: [ApplyLoanModule,RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class ApplyLoanRoutingModule {}
