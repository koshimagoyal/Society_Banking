import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalculateComponent } from './calculate/calculate.component';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AppCommonModule } from '@common/app-common.module';
import { NavigationModule } from '@modules/navigation/navigation.module';


@NgModule({
  declarations: [CalculateComponent],
    imports: [
        CommonModule,
        TranslateModule,
        FormsModule,
        AppCommonModule,
        NavigationModule,
    ],
})
export class FyDividendCalculateModule { }
