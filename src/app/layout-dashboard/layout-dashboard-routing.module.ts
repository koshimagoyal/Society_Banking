import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutDashboardComponent } from '@app/layout-dashboard/layout-dashboard.component';

const routes: Routes = [{ path: '', component: LayoutDashboardComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class LayoutDashboardRoutingModule {}
