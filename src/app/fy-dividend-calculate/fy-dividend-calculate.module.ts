import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FyDividendCalculateRoutingModule } from './fy-dividend-calculate-routing.module';
import { FyDividendCalculateComponent } from './fy-dividend-calculate.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { AppCommonModule } from '@app/app-common/app-common.module';
import { NavigationModule } from '@app/navigation/navigation.module';
import { LayoutDashboardModule } from '@app/layout-dashboard/layout-dashboard.module';


@NgModule({
  declarations: [FyDividendCalculateComponent],
    imports: [
        CommonModule,
        FyDividendCalculateRoutingModule,
        TranslateModule,
        FormsModule,
        AppCommonModule,
        NavigationModule,
        LayoutDashboardModule,
    ],
})
export class FyDividendCalculateModule { }
