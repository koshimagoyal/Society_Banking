import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppCommonModule } from '@app/app-common/app-common.module';
import * as service from '@app/top-nav/services';
import { TranslateModule } from '@ngx-translate/core';

import { TopNavRoutingModule } from './top-nav-routing.module';
import { TopNavComponent } from './top-nav/top-nav.component';

@NgModule({
    declarations: [TopNavComponent],
    imports: [CommonModule, TopNavRoutingModule, TranslateModule, FormsModule, AppCommonModule],
    exports: [TopNavComponent],
    providers: [...service.services],
})
export class TopNavModule {}
