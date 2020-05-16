import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { logging } from 'selenium-webdriver';
import Entry = logging.Entry;
import { SBRouteData } from '@modules/navigation/models';
import { LoanComponent } from '@modules/credit-entry/loan/loan.component';
import { CreditEntryModule } from '@modules/credit-entry/credit-entry.module';


/* Routes */
export const ROUTES: Routes = [
    {
        path: '',
        canActivate: [],
        component: LoanComponent,
        data: {
            title: 'Credit Entry',
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
  imports: [CreditEntryModule,RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class CreditEntryRoutingModule { }
