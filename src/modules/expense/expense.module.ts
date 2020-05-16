import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExpenseComponent } from './expense/expense.component';
import { NavigationModule } from '@modules/navigation/navigation.module';
import { AppCommonModule } from '@common/app-common.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [ExpenseComponent],
  imports: [CommonModule,
      NavigationModule,
      AppCommonModule,
      TranslateModule,
      FormsModule,
  ]
})
export class ExpenseModule { }
