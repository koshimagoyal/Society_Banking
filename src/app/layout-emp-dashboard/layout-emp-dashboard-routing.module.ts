import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutEmpDashboardComponent } from '@app/layout-emp-dashboard/layout-emp-dashboard.component';

const routes: Routes = [{ path: '', component: LayoutEmpDashboardComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class LayoutEmpDashboardRoutingModule {}
