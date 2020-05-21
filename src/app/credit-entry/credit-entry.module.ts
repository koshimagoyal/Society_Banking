import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppCommonModule } from '@app/app-common/app-common.module';
import { NavigationModule } from '@app/navigation/navigation.module';
import { TranslateModule } from '@ngx-translate/core';

import { CreditEntryRoutingModule } from './credit-entry-routing.module';
import { CreditEntryComponent } from './credit-entry.component';


@NgModule({
    declarations: [CreditEntryComponent],
    imports: [
        CommonModule,
        CreditEntryRoutingModule,
        TranslateModule,
        FormsModule,
        AppCommonModule,
        NavigationModule,
    ],
})
export class CreditEntryModule {}
