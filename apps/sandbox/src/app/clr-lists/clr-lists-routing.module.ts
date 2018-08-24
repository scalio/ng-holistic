import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClrListsModule } from '@ng-holistic/clr-lists';

const routes: Routes = [];

@NgModule({
    imports: [RouterModule.forChild(routes), ClrListsModule],
    exports: [RouterModule]
})
export class ClrListsRoutingModule {}
