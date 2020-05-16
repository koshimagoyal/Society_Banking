import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GenerateEmiModule } from '@modules/generate-emi/generate-emi.module';


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
            title: 'Generate EMI',
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
  imports: [GenerateEmiModule,RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class GenerateEmiRoutingModule { }
