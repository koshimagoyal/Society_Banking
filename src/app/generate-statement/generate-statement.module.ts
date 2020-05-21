import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppCommonModule } from '@app/app-common/app-common.module';
import { NavigationModule } from '@app/navigation/navigation.module';
import { TranslateModule } from '@ngx-translate/core';

import { DialogComponent } from './dialog.component';
import { GenerateStatementRoutingModule } from './generate-statement-routing.module';
import { GenerateStatementComponent } from './generate-statement.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
    declarations: [GenerateStatementComponent, DialogComponent],
    imports: [
        CommonModule,
        GenerateStatementRoutingModule,
        NavigationModule,
        AppCommonModule,
        TranslateModule,
        FormsModule,
        MatButtonModule,
        MatDialogModule,
        MatSnackBarModule,
    ],
    entryComponents: [DialogComponent],
})
export class GenerateStatementModule {}
