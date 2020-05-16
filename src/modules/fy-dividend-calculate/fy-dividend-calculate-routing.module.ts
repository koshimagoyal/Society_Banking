import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CalculateComponent } from '@modules/fy-dividend-calculate/calculate/calculate.component';
import { SBRouteData } from '@modules/navigation/models';
import { FyDividendCalculateModule } from '@modules/fy-dividend-calculate/fy-dividend-calculate.module';


/* Routes */
export const ROUTES: Routes = [
    {
        path: '',
        canActivate: [],
        component: CalculateComponent,
        data: {
            title: 'FY & Dividend Calculation',
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
  imports: [FyDividendCalculateModule,RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class FyDividendCalculateRoutingModule { }
