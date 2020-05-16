/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* Module */
import { LoanEmiCalculatorModule } from './loan-emi-calculator.module';

/* Containers */
import * as loanEmiCalculatorContainers from './containers';

/* Guards */
import * as loanEmiCalculatorGuards from './guards';
import { SBRouteData } from '@modules/navigation/models';

/* Routes */
export const ROUTES: Routes = [
    {
        path: '',
        canActivate: [],
        component: loanEmiCalculatorContainers.LoanCalculatorComponent,
        data: {
            title: 'Loan EMI Calculator',
            breadcrumbs: [
                {
                    text: 'Dashboard',
                    link: '/dashboard',
                },
                {
                    text: 'Loan EMI Calculator',
                    active: true,
                },
            ],
        } as SBRouteData,
    },
];
@NgModule({
    imports: [LoanEmiCalculatorModule, RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class LoanEmiCalculatorRoutingModule {}
