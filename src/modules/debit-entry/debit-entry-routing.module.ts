import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoanComponent } from '@modules/debit-entry/loan/loan.component';
import { SBRouteData } from '@modules/navigation/models';
import { DebitEntryModule } from '@modules/debit-entry/debit-entry.module';


/* Routes */
export const ROUTES: Routes = [
    {
        path: '',
        canActivate: [],
        component: LoanComponent,
        data: {
            title: 'Debit Entry',
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
  imports: [DebitEntryModule,RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class DebitEntryRoutingModule { }
