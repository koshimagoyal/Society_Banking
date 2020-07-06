import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavigationModule } from '@app/navigation/navigation.module';
import { TopNavModule } from '@app/top-nav/top-nav.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';

import { LayoutDashboardRoutingModule } from './layout-dashboard-routing.module';
import { LayoutDashboardComponent } from './layout-dashboard.component';

@NgModule({
    declarations: [LayoutDashboardComponent],
    imports: [
        CommonModule,
        LayoutDashboardRoutingModule,
        TranslateModule,
        TopNavModule,
        FontAwesomeModule,
        NavigationModule,
        FormsModule,
    ],
    exports: [LayoutDashboardComponent],
})
export class LayoutDashboardModule {}
