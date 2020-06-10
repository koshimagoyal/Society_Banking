import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MiscellaneousPageRoutingModule } from './miscellaneous-page-routing.module';
import { MiscellaneousPageComponent } from './miscellaneous-page/miscellaneous-page.component';
import { NavigationModule } from '@app/navigation/navigation.module';
import { AppCommonModule } from '@app/app-common/app-common.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [MiscellaneousPageComponent],
    imports: [
        CommonModule,
        MiscellaneousPageRoutingModule,
        NavigationModule,
        AppCommonModule,
        TranslateModule,
        FormsModule,
    ],
})
export class MiscellaneousPageModule { }
