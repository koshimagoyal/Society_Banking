import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SBRouteData } from '@modules/navigation/models';
import { ExpenseComponent } from '@modules/expense/expense/expense.component';
import { ExpenseModule } from '@modules/expense/expense.module';


/* Routes */
export const ROUTES: Routes = [
    {
        path: '',
        canActivate: [],
        component: ExpenseComponent,
        data: {
            title: 'Expense',
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
  imports: [ExpenseModule,RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class ExpenseRoutingModule { }
