import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppCommonModule } from '@app/app-common/app-common.module';
import { NavigationModule } from '@app/navigation/navigation.module';
import { TranslateModule } from '@ngx-translate/core';

import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CloseAccountRoutingModule } from './close-account-routing.module';
import { CloseAccountComponent } from './close-account.component';
import { DialogComponent } from './dialog/dialog.component';

@NgModule({
    declarations: [CloseAccountComponent, DialogComponent],
    imports: [
        CommonModule,
        CloseAccountRoutingModule,
        NavigationModule,
        AppCommonModule,
        TranslateModule,
        FormsModule,
        MatDialogModule,
        MatSnackBarModule,
    ],
    exports: [DialogComponent],
    entryComponents: [DialogComponent],
})
export class CloseAccountModule {}
