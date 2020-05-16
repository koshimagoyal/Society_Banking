import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoanComponent } from './loan/loan.component';
import { FormsModule } from '@angular/forms';
import { AppCommonModule } from '@common/app-common.module';
import { TranslateModule } from '@ngx-translate/core';
import { NavigationModule } from '@modules/navigation/navigation.module';


@NgModule({
  declarations: [LoanComponent],
    imports: [
        CommonModule,
        TranslateModule,
        FormsModule,
        AppCommonModule,
        NavigationModule,
    ],
})
export class CreditEntryModule { }
