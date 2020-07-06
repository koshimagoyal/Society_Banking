import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';

import { GenerateEmiRoutingModule } from './generate-emi-routing.module';
import { GenerateEmiComponent } from './generate-emi.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppCommonModule } from '@app/app-common/app-common.module';
import { NavigationModule } from '@app/navigation/navigation.module';
import { TranslateModule } from '@ngx-translate/core';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { LayoutDashboardModule } from '@app/layout-dashboard/layout-dashboard.module';


@NgModule({
  declarations: [GenerateEmiComponent],
    imports: [
        CommonModule,
        GenerateEmiRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        AppCommonModule,
        NavigationModule,
        TranslateModule,
        Ng2SearchPipeModule,
        NgxPaginationModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        LayoutDashboardModule,
    ],
    providers: [
        DecimalPipe,
    ],
    exports: [],
})
export class GenerateEmiModule { }
