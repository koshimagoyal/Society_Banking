import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppCommonModule } from '@app/app-common/app-common.module';
import { NavigationModule } from '@app/navigation/navigation.module';
import { TranslateModule } from '@ngx-translate/core';

import { ApplyLoanRoutingModule } from './apply-loan-routing.module';
import { ApplyLoanComponent } from './apply-loan.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [ApplyLoanComponent],
    imports: [
        CommonModule,
        ApplyLoanRoutingModule,
        NavigationModule,
        TranslateModule,
        AppCommonModule,
        FormsModule,
    ],
})
export class ApplyLoanModule {}
