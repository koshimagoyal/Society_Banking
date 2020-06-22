import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppCommonModule } from '@app/app-common/app-common.module';
import * as service from '@app/miscellaneous-page/services';
import { NavigationModule } from '@app/navigation/navigation.module';
import { TranslateModule } from '@ngx-translate/core';

import { MiscellaneousPageRoutingModule } from './miscellaneous-page-routing.module';
import { MiscellaneousPageComponent } from './miscellaneous-page/miscellaneous-page.component';

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
    providers: [...service.services],
})
export class MiscellaneousPageModule {}
