import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppCommonModule } from '@app/app-common/app-common.module';
import { NavigationModule } from '@app/navigation/navigation.module';
import * as service from '@app/upload-all/services';
import { TranslateModule } from '@ngx-translate/core';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DialogComponent } from './dialog/dialog.component';
import { UploadAllRoutingModule } from './upload-all-routing.module';
import { UploadAllComponent } from './upload-all.component';
import { LayoutDashboardModule } from '@app/layout-dashboard/layout-dashboard.module';

@NgModule({
    declarations: [UploadAllComponent, DialogComponent],
    imports: [
        CommonModule,
        UploadAllRoutingModule,
        NavigationModule,
        AppCommonModule,
        TranslateModule,
        FormsModule,
        MatButtonModule,
        MatDialogModule,
        MatSnackBarModule,
        LayoutDashboardModule,
        ReactiveFormsModule,
    ],
    providers: [...service.services],
    entryComponents: [DialogComponent],
})
export class UploadAllModule {}
