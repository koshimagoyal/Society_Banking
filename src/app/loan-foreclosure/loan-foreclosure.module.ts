import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { AppCommonModule } from '@app/app-common/app-common.module';
import { NavigationModule } from '@app/navigation/navigation.module';
import { TranslateModule } from '@ngx-translate/core';

import { DialogComponent } from './dialog/dialog.component';
import { LoanForeclosureRoutingModule } from './loan-foreclosure-routing.module';
import { LoanForeclosureComponent } from './loan-foreclosure.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { LayoutDashboardModule } from '@app/layout-dashboard/layout-dashboard.module';

@NgModule({
    declarations: [LoanForeclosureComponent, DialogComponent],
    imports: [
        CommonModule,
        LoanForeclosureRoutingModule,
        NavigationModule,
        AppCommonModule,
        TranslateModule,
        FormsModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatMomentDateModule,
        MatDialogModule,
        MatButtonModule,
        LayoutDashboardModule,
        ReactiveFormsModule,
    ],
    exports: [DialogComponent],
    entryComponents: [DialogComponent],
})
export class LoanForeclosureModule {}
