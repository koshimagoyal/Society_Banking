import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BankAccountRoutingModule } from './bank-account-routing.module';
import { BankAccountComponent } from './bank-account/bank-account.component';
import { NavigationModule } from '@app/navigation/navigation.module';
import { AppCommonModule } from '@app/app-common/app-common.module';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [BankAccountComponent],
    imports: [
        CommonModule,
        BankAccountRoutingModule,
        NavigationModule,
        AppCommonModule,
        FormsModule,
        TranslateModule,
    ],
})
export class BankAccountModule { }
