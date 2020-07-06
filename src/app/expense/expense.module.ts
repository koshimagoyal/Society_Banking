import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppCommonModule } from '@app/app-common/app-common.module';
import { NavigationModule } from '@app/navigation/navigation.module';
import { TranslateModule } from '@ngx-translate/core';

import { ExpenseRoutingModule } from './expense-routing.module';
import { ExpenseComponent } from './expense.component';
import * as service from './services';
import { LayoutDashboardModule } from '@app/layout-dashboard/layout-dashboard.module';

@NgModule({
    declarations: [ExpenseComponent],
    imports: [
        CommonModule,
        ExpenseRoutingModule,
        NavigationModule,
        AppCommonModule,
        TranslateModule,
        FormsModule,
        LayoutDashboardModule,
        ReactiveFormsModule,
    ],
    providers: [...service.services],
})
export class ExpenseModule {}
