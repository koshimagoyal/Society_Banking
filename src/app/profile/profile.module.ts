import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppCommonModule } from '@app/app-common/app-common.module';
import { NavigationModule } from '@app/navigation/navigation.module';
import * as service from '@app/upload-all/services';
import { TranslateModule } from '@ngx-translate/core';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
    declarations: [ProfileComponent],
    imports: [
        CommonModule,
        ProfileRoutingModule,
        NavigationModule,
        AppCommonModule,
        TranslateModule,
        FormsModule,
    ],
    providers: [...service.services],
})
export class ProfileModule {}
