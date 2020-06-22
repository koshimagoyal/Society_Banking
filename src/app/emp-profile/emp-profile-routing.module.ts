import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpProfileComponent } from '@app/emp-profile/emp-profile/emp-profile.component';

const routes: Routes = [{ path: '', component: EmpProfileComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class EmpProfileRoutingModule {}
