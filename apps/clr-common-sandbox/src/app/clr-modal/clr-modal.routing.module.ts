import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModalPageModule } from './modal-page/modal-page.module';
import { ModalPageComponent } from './modal-page/modal-page.component';

export const routes: Routes = [
    {
        path: 'modal',
        component: ModalPageComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), ModalPageModule],
    exports: [RouterModule],
    entryComponents: []
})
export class ClrModalRoutingModule {}
