import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppCommonModule } from '@app/app-common/app-common.module';
import { TranslateModule } from '@ngx-translate/core';

import * as navigationComponents from './components';
import * as navigationContainers from './containers';
import * as appCommonLayouts from './layouts';
import { TopNavModule } from '@app/top-nav/top-nav.module';

@NgModule({
    imports: [CommonModule, RouterModule, AppCommonModule, TranslateModule, TopNavModule],
    providers: [],
    declarations: [
        ...navigationContainers.containers,
        ...navigationComponents.components,
        ...appCommonLayouts.layouts,
    ],
    exports: [
        ...navigationContainers.containers,
        ...navigationComponents.components,
        ...appCommonLayouts.layouts,
    ],
})
// @ts-ignore
export class NavigationModule {}
