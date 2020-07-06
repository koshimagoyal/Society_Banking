import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as service from '@app/add-corpus/services';
import { AppCommonModule } from '@app/app-common/app-common.module';
import { NavigationModule } from '@app/navigation/navigation.module';
import { TranslateModule } from '@ngx-translate/core';

import { AddCorpusRoutingModule } from './add-corpus-routing.module';
import { AddCorpusComponent } from './add-corpus/add-corpus.component';
import { LayoutDashboardModule } from '@app/layout-dashboard/layout-dashboard.module';

@NgModule({
    declarations: [AddCorpusComponent],
    imports: [
        CommonModule,
        AddCorpusRoutingModule,
        TranslateModule,
        FormsModule,
        NavigationModule,
        AppCommonModule,
        LayoutDashboardModule,
    ],
    providers: [...service.services],
})
export class AddCorpusModule {}
