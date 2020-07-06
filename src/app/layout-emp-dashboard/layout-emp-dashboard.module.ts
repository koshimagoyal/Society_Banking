import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavigationModule } from '@app/navigation/navigation.module';
import { TopNavModule } from '@app/top-nav/top-nav.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';

import { LayoutEmpDashboardRoutingModule } from './layout-emp-dashboard-routing.module';
import { LayoutEmpDashboardComponent } from './layout-emp-dashboard.component';

@NgModule({
    declarations: [LayoutEmpDashboardComponent],
    imports: [
        CommonModule,
        LayoutEmpDashboardRoutingModule,
        TranslateModule,
        TopNavModule,
        FontAwesomeModule,
        NavigationModule,
        FormsModule,
    ],
    exports: [LayoutEmpDashboardComponent],
})
export class LayoutEmpDashboardModule {}
