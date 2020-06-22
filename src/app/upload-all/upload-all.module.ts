import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppCommonModule } from '@app/app-common/app-common.module';
import { NavigationModule } from '@app/navigation/navigation.module';
import * as service from '@app/upload-all/services';
import { TranslateModule } from '@ngx-translate/core';

import { DialogComponent } from './dialog/dialog.component';
import { UploadAllRoutingModule } from './upload-all-routing.module';
import { UploadAllComponent } from './upload-all.component';

@NgModule({
    declarations: [UploadAllComponent, DialogComponent],
    imports: [
        CommonModule,
        UploadAllRoutingModule,
        NavigationModule,
        AppCommonModule,
        TranslateModule,
        FormsModule,
    ],
    providers: [...service.services],
    entryComponents: [DialogComponent],
})
export class UploadAllModule {}
