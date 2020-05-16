/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { RouterModule } from '@angular/router';

/* Modules */
import { AppCommonModule } from '@common/app-common.module';
import { NavigationModule } from '@modules/navigation/navigation.module';

/* Components */
import * as loanEmiCalculatorComponents from './components';

/* Containers */
import * as loanEmiCalculatorContainers from './containers';

/* Guards */
import * as loanEmiCalculatorGuards from './guards';

/* Services */
import * as loanEmiCalculatorServices from './services';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        AppCommonModule,
        NavigationModule,
        TranslateModule,
    ],
    providers: [
        DecimalPipe,
        ...loanEmiCalculatorServices.services,
        ...loanEmiCalculatorGuards.guards,
    ],
    declarations: [
        ...loanEmiCalculatorContainers.containers,
        ...loanEmiCalculatorComponents.components,
    ],
    exports: [...loanEmiCalculatorContainers.containers, ...loanEmiCalculatorComponents.components],
})
export class LoanEmiCalculatorModule {}
