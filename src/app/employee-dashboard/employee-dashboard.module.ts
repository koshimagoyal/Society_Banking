import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeDashboardRoutingModule } from './employee-dashboard-routing.module';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';
import { LayoutEmpDashboardModule } from '@app/layout-emp-dashboard/layout-emp-dashboard.module';
import { NavigationModule } from '@app/navigation/navigation.module';
import { AppCommonModule } from '@app/app-common/app-common.module';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


@NgModule({
  declarations: [EmployeeDashboardComponent],
    imports: [
        CommonModule,
        EmployeeDashboardRoutingModule,
        LayoutEmpDashboardModule,
        NavigationModule,
        AppCommonModule,
        FormsModule,
        TranslateModule,
        NgxPaginationModule,
        Ng2SearchPipeModule,
    ],
})
export class EmployeeDashboardModule { }
