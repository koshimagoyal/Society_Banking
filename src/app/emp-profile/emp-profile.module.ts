import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppCommonModule } from '@app/app-common/app-common.module';
import { NavigationModule } from '@app/navigation/navigation.module';
import * as service from '@app/upload-all/services';
import { TranslateModule } from '@ngx-translate/core';

import { EmpProfileRoutingModule } from './emp-profile-routing.module';
import { EmpProfileComponent } from './emp-profile/emp-profile.component';

@NgModule({
    declarations: [EmpProfileComponent],
    imports: [
        CommonModule,
        EmpProfileRoutingModule,
        NavigationModule,
        AppCommonModule,
        TranslateModule,
        FormsModule,
    ],
    providers: [...service.services],
})
export class EmpProfileModule {}
