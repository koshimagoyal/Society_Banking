import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { AppCommonModule } from '@app/app-common/app-common.module';
import { NavigationModule } from '@app/navigation/navigation.module';
import { TranslateModule } from '@ngx-translate/core';

import { LoanForeclosureRoutingModule } from './loan-foreclosure-routing.module';
import { LoanForeclosureComponent } from './loan-foreclosure.component';

@NgModule({
    declarations: [LoanForeclosureComponent],
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
    ],
})
export class LoanForeclosureModule {}
