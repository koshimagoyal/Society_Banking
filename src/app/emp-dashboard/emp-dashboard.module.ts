import { CommonModule, DecimalPipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppCommonModule } from '@app/app-common/app-common.module';
import { NavigationModule } from '@app/navigation/navigation.module';
import { TranslateModule } from '@ngx-translate/core';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';

import { EmpDashboardRoutingModule } from '@app/emp-dashboard/emp-dashboard-routing.module';
import { EmpDashboardComponent} from '@app/emp-dashboard/emp-dashboard.component';
import * as dashboardComponents from './components';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule,
        AppCommonModule,
        TranslateModule,
        NavigationModule,
        Ng2SearchPipeModule,
        NgxPaginationModule,
        EmpDashboardRoutingModule,
    ],
    providers: [DecimalPipe],
    declarations: [...dashboardComponents.components, EmpDashboardComponent],
    exports: [...dashboardComponents.components],
})
export class EmpDashboardModule {}
