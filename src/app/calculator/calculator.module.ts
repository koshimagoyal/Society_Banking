import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalculatorRoutingModule } from './calculator-routing.module';
import { CalculatorComponent } from './calculator/calculator.component';
import { LayoutEmpDashboardModule } from '@app/layout-emp-dashboard/layout-emp-dashboard.module';
import { TranslateModule } from '@ngx-translate/core';
import { AppCommonModule } from '@app/app-common/app-common.module';
import { NavigationModule } from '@app/navigation/navigation.module';


@NgModule({
  declarations: [CalculatorComponent],
    imports: [
        CommonModule,
        CalculatorRoutingModule,
        LayoutEmpDashboardModule,
        TranslateModule,
        AppCommonModule,
        NavigationModule,
    ],
})
export class CalculatorModule { }
