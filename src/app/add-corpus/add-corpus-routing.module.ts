import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddCorpusComponent } from './add-corpus/add-corpus.component';

const routes: Routes = [{ path: '', component: AddCorpusComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AddCorpusRoutingModule {}
