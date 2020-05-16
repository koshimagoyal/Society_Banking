/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* Module */
import { LoanEligibilityTableModule } from './loan-eligibility-table.module';

/* Containers */
import * as tablesContainers from './containers';

/* Guards */
import * as tablesGuards from './guards';
import { SBRouteData } from '@modules/navigation/models';

/* Routes */
export const ROUTES: Routes = [
    {
        path: '',
        canActivate: [],
        component: tablesContainers.TablesComponent,
        data: {
            title: 'Loan Eligibility',
            breadcrumbs: [
                {
                    text: 'Dashboard',
                    link: '/dashboard',
                },
                {
                    text: 'Loan Eligibility Table',
                    active: true,
                },
            ],
        } as SBRouteData,
    },
];
@NgModule({
    imports: [LoanEligibilityTableModule, RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class LoanEligibilityTableRoutingModule {}
