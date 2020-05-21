import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppCommonModule } from '@app/app-common/app-common.module';
import { NavigationModule } from '@app/navigation/navigation.module';
import { TranslateModule } from '@ngx-translate/core';

import { ExpenseRoutingModule } from './expense-routing.module';
import { ExpenseComponent } from './expense.component';

@NgModule({
    declarations: [ExpenseComponent],
    imports: [
        CommonModule,
        ExpenseRoutingModule,
        NavigationModule,
        AppCommonModule,
        TranslateModule,
        FormsModule,
    ],
})
export class ExpenseModule {}
