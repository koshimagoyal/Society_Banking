import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppCommonModule } from '@app/app-common/app-common.module';
import * as service from '@app/loan-entry/services';
import { NavigationModule } from '@app/navigation/navigation.module';
import { TranslateModule } from '@ngx-translate/core';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { LoanEntryRoutingModule } from './loan-entry-routing.module';
import { LoanEntryComponent } from './loan-entry.component';
import { LayoutDashboardModule } from '@app/layout-dashboard/layout-dashboard.module';

@NgModule({
    declarations: [LoanEntryComponent],
    imports: [
        CommonModule,
        LoanEntryRoutingModule,
        TranslateModule,
        FormsModule,
        AppCommonModule,
        NavigationModule,
        NgxPaginationModule,
        Ng2SearchPipeModule,
        LayoutDashboardModule,
        ReactiveFormsModule,
    ],
    providers: [...service.services],
})
export class LoanEntryModule {}
