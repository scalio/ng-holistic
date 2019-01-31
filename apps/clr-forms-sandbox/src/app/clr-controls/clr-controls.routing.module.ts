import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
    HlcClrDateComponent,
    HlcClrDateModule,
    HlcClrPairsListComponent,
    HlcClrPairsListModule,
    HlcClrTextAreaComponent,
    HlcClrTextAreaModule,
    HlcClrTextComponent,
    HlcClrTextModule
} from '@ng-holistic/clr-controls';
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
        component: HlcClrPairsListComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        HlcClrTextModule,
        HlcClrTextAreaModule,
        HlcClrDateModule,
        HlcClrPairsListModule,
        SelectPageModule
    ],
    exports: [RouterModule],
    entryComponents: []
})
export class ClrControlsRoutingModule {}
