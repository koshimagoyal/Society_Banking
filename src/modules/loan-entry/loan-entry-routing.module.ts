import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoanComponent } from '@modules/loan-entry/loan/loan.component';
import { SBRouteData } from '@modules/navigation/models';
import { LoanEntryModule } from '@modules/loan-entry/loan-entry.module';

/* Routes */
export const ROUTES: Routes = [
    {
        path: '',
        canActivate: [],
        component: LoanComponent,
        data: {
            title: 'Loan Entry',
            breadcrumbs: [
                {
                    text: 'Dashboard',
                    link: '/dashboard',
                },
                {
                    text: 'Tables',
                    active: true,
                },
            ],
        } as SBRouteData,
    },
];

@NgModule({
  imports: [LoanEntryModule,RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class LoanEntryRoutingModule { }
