import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoanEligibilityTableComponent } from './loan-eligibility-table.component';

const routes: Routes = [{ path: '', component: LoanEligibilityTableComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class LoanEligibilityTableRoutingModule {}
