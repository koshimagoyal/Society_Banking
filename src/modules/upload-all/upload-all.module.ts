import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UploadComponent } from './upload/upload.component';
import { NavigationModule } from '@modules/navigation/navigation.module';
import { AppCommonModule } from '@common/app-common.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [UploadComponent],
  imports: [
      CommonModule,
      NavigationModule,
      AppCommonModule,
      TranslateModule,
      FormsModule,
  ]
})
export class UploadAllModule { }
