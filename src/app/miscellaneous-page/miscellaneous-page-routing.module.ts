import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MiscellaneousPageComponent } from '@app/miscellaneous-page/miscellaneous-page/miscellaneous-page.component';


const routes: Routes = [{ path: '', component: MiscellaneousPageComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MiscellaneousPageRoutingModule { }
