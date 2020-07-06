import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppCommonModule } from '@app/app-common/app-common.module';
import { LayoutEmpDashboardModule } from '@app/layout-emp-dashboard/layout-emp-dashboard.module';
import { NavigationModule } from '@app/navigation/navigation.module';
import { TranslateModule } from '@ngx-translate/core';

import { LoanEligibilityTableRoutingModule } from './loan-eligibility-table-routing.module';
import { LoanEligibilityTableComponent } from './loan-eligibility-table.component';

@NgModule({
    declarations: [LoanEligibilityTableComponent],
    imports: [
        CommonModule,
        LoanEligibilityTableRoutingModule,
        NavigationModule,
        TranslateModule,
        AppCommonModule,
        LayoutEmpDashboardModule,
    ],
})
export class LoanEligibilityTableModule {}
