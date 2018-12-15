import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TablePageComponent } from './table-page/table-page.component';
import { TablePageModule } from './table-page/table-page.module';

export const routes: Routes = [
    {
        path: 'table',
        component: TablePageComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), TablePageModule],
    exports: [RouterModule],
    entryComponents: []
})
export class ClrTableRoutingModule {}
