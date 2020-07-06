import { CommonModule, DecimalPipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppCommonModule } from '@app/app-common/app-common.module';
import { NavigationModule } from '@app/navigation/navigation.module';
import { TranslateModule } from '@ngx-translate/core';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { ExcelTableRoutingModule } from './excel-table-routing.module';
import { ExcelTableComponent } from './excel-table.component';
import * as tablesServices from './services';
import { LayoutDashboardModule } from '@app/layout-dashboard/layout-dashboard.module';

@NgModule({
    declarations: [ExcelTableComponent],
    imports: [
        CommonModule,
        ExcelTableRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        AppCommonModule,
        NavigationModule,
        TranslateModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatInputModule,
        NgxPaginationModule,
        Ng2SearchPipeModule,
        LayoutDashboardModule,
    ],
    providers: [DecimalPipe, ...tablesServices.services],
})
export class ExcelTableModule {}
