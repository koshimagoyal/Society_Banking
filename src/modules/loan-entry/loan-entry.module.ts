import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoanComponent } from './loan/loan.component';
import { NavigationModule } from '@modules/navigation/navigation.module';
import { AppCommonModule } from '@common/app-common.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';


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
export class LoanEntryModule { }
