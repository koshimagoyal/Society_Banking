import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoanComponent } from './loan/loan.component';
import { NavigationModule } from '@modules/navigation/navigation.module';
import { TranslateModule } from '@ngx-translate/core';
import { AppCommonModule } from '@common/app-common.module';


@NgModule({
  declarations: [LoanComponent],
    imports: [
        CommonModule,
        NavigationModule,
        TranslateModule,
        AppCommonModule,
    ],
})
export class ApplyLoanModule { }
