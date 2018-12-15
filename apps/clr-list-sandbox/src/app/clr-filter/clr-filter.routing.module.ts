import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilterPageComponent } from './filter-page/filter-page.component';
import { FilterPageModule } from './filter-page/filter-page.module';

export const routes: Routes = [
    {
        path: 'filter',
        component: FilterPageComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), FilterPageModule],
    exports: [RouterModule],
    entryComponents: []
})
export class ClrTableRoutingModule {}
