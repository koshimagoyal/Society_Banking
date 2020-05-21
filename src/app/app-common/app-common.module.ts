import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import * as appCommonComponents from '@app/app-common/components';
import * as service from '@app/app-common/services';
import { IconsModule } from '@app/icons/icons.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';

const thirdParty = [IconsModule, NgbModule];

@NgModule({
    imports: [CommonModule, RouterModule, ...thirdParty, TranslateModule, FormsModule],
    providers: [...service.services],
    declarations: [...appCommonComponents.components],
    exports: [...appCommonComponents.components, ...thirdParty],
})
export class AppCommonModule {}
