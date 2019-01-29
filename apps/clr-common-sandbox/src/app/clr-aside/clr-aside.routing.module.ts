import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AsidePageComponent } from './aside-page/aside-page.component';
import { AsidePageModule } from './aside-page/aside-page.module';

export const routes: Routes = [
    {
        path: 'aside',
        component: AsidePageComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), AsidePageModule],
    exports: [RouterModule],
    entryComponents: []
})
export class ClrModalRoutingModule {}
