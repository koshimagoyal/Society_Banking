import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TopNavComponent } from '@app/top-nav/top-nav/top-nav.component';


const routes: Routes = [{ path: '', component: TopNavComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TopNavRoutingModule { }
