import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppCommonModule } from '@app/app-common/app-common.module';
import { NavigationModule } from '@app/navigation/navigation.module';
import { TranslateModule } from '@ngx-translate/core';

import { DebitEntryRoutingModule } from './debit-entry-routing.module';
import { DebitEntryComponent } from './debit-entry.component';

@NgModule({
    declarations: [DebitEntryComponent],
    imports: [
        CommonModule,
        DebitEntryRoutingModule,
        TranslateModule,
        FormsModule,
        AppCommonModule,
        NavigationModule,
    ],
})
export class DebitEntryModule {}
