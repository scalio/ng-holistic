import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
    DateComponent,
    HlcClrDateModule,
    HlcClrTextAreaModule,
    HlcClrTextModule,
    TextAreaComponent,
    TextComponent
} from '@ng-holistic/clr-controls';
import { SelectPageComponent } from './select-page/select-page.component';
import { SelectPageModule } from './select-page/select-page.module';

export const routes: Routes = [
    {
        path: 'text',
        component: TextComponent
    },
    {
        path: 'text-area',
        component: TextAreaComponent
    },
    {
        path: 'date',
        component: DateComponent
    },
    {
        path: 'select',
        component: SelectPageComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        HlcClrTextModule,
        HlcClrTextAreaModule,
        HlcClrDateModule,
        SelectPageModule
    ],
    exports: [RouterModule],
    entryComponents: []
})
export class ClrControlsRoutingModule {}
