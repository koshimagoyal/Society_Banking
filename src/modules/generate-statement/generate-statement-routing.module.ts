import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SBRouteData } from '@modules/navigation/models';
import { GenerateStatementModule } from '@modules/generate-statement/generate-statement.module';
import { GenerateComponent } from '@modules/generate-statement/generate/generate.component';


/* Routes */
export const ROUTES: Routes = [
    {
        path: '',
        canActivate: [],
        component: GenerateComponent,
        data: {
            title: 'Generate Statement',
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
  imports: [GenerateStatementModule,RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class GenerateStatementRoutingModule { }
