import { CommonModule, DecimalPipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppCommonModule } from '@app/app-common/app-common.module';
import * as loanEmiCalculatorServices from '@app/loan-emi-calculator/services';
import { NavigationModule } from '@app/navigation/navigation.module';
import { TranslateModule } from '@ngx-translate/core';

import { LoanEmiCalculatorRoutingModule } from './loan-emi-calculator-routing.module';
import { LoanEmiCalculatorComponent } from './loan-emi-calculator.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        AppCommonModule,
        NavigationModule,
        TranslateModule,
        LoanEmiCalculatorRoutingModule,
    ],
    providers: [...loanEmiCalculatorServices.services,
    ],
    declarations: [LoanEmiCalculatorComponent],
    exports: [],
})
export class LoanEmiCalculatorModule { }
