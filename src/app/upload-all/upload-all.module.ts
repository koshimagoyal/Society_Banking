import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UploadAllRoutingModule } from './upload-all-routing.module';
import { UploadAllComponent } from './upload-all.component';
import { NavigationModule } from '@app/navigation/navigation.module';
import { AppCommonModule } from '@app/app-common/app-common.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [UploadAllComponent],
  imports: [
    CommonModule,
    UploadAllRoutingModule,
      NavigationModule,
      AppCommonModule,
      TranslateModule,
      FormsModule,
  ]
})
export class UploadAllModule { }
