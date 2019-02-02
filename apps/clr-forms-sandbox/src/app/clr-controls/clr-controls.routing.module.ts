import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
    HlcClrDateComponent,
    HlcClrDateModule,
    HlcClrTextAreaComponent,
    HlcClrTextAreaModule,
    HlcClrTextComponent,
    HlcClrTextModule
} from '@ng-holistic/clr-controls';
import { PairsListPageComponent } from './pairs-list/pairs-list-page.component';
import { PairsListPageModule } from './pairs-list/pairs-list-page.module';
import { SelectPageComponent } from './select-page/select-page.component';
import { SelectPageModule } from './select-page/select-page.module';

export const routes: Routes = [
    {
        path: 'text',
        component: HlcClrTextComponent
    },
    {
        path: 'text-area',
        component: HlcClrTextAreaComponent
    },
    {
        path: 'date',
        component: HlcClrDateComponent
    },
    {
        path: 'select',
        component: SelectPageComponent
    },
    {
        path: 'pairs-list',
        component: PairsListPageComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        HlcClrTextModule,
        HlcClrTextAreaModule,
        HlcClrDateModule,
        PairsListPageModule,
        SelectPageModule
    ],
    exports: [RouterModule],
    entryComponents: []
})
export class ClrControlsRoutingModule {}
