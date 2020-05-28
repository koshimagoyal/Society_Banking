import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppCommonModule } from '@app/app-common/app-common.module';
import * as service from '@app/loan-entry/services';
import { NavigationModule } from '@app/navigation/navigation.module';
import { TranslateModule } from '@ngx-translate/core';

import { LoanEntryRoutingModule } from './loan-entry-routing.module';
import { LoanEntryComponent } from './loan-entry.component';

@NgModule({
    declarations: [LoanEntryComponent],
    imports: [
        CommonModule,
        LoanEntryRoutingModule,
        TranslateModule,
        FormsModule,
        AppCommonModule,
        NavigationModule,
    ],
    providers: [...service.services],
})
export class LoanEntryModule {}
