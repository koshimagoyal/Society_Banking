import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SBRouteData } from '@modules/navigation/models';
import { UploadComponent } from '@modules/upload-all/upload/upload.component';
import { UploadAllModule } from '@modules/upload-all/upload-all.module';


/* Routes */
export const ROUTES: Routes = [
    {
        path: '',
        canActivate: [],
        component: UploadComponent,
        data: {
            title: 'Upload All',
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
  imports: [UploadAllModule,RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class UploadAllRoutingModule { }
