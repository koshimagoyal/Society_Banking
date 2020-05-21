import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UploadAllComponent } from './upload-all.component';

const routes: Routes = [{ path: '', component: UploadAllComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UploadAllRoutingModule { }
