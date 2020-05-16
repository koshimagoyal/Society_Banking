import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SBRouteData } from '@modules/navigation/models';
import { CloseAccountModule } from '@modules/close-account/close-account.module';
import { CloseComponent } from '@modules/close-account/close/close.component';



/* Routes */
export const ROUTES: Routes = [
    {
        path: '',
        canActivate: [],
        component: CloseComponent,
        data: {
            title: 'Close Account',
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
  imports: [CloseAccountModule,RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class CloseAccountRoutingModule { }
