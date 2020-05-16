import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GenerateComponent } from './generate/generate.component';
import { NavigationModule } from '@modules/navigation/navigation.module';
import { AppCommonModule } from '@common/app-common.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [GenerateComponent],
    imports: [
        CommonModule,
        NavigationModule,
        AppCommonModule,
        TranslateModule,
        FormsModule,
    ],
})
export class GenerateStatementModule { }
