import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SBRouteData } from '@modules/navigation/models';
import { ClosureComponent } from '@modules/loan-foreclosure/closure/closure.component';
import { LoanForeclosureModule } from '@modules/loan-foreclosure/loan-foreclosure.module';



/* Routes */
export const ROUTES: Routes = [
    {
        path: '',
        canActivate: [],
        component: ClosureComponent,
        data: {
            title: 'Loan Foreclosure',
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
  imports: [LoanForeclosureModule,RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class LoanForeclosureRoutingModule { }
