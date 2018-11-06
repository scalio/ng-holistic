import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
    DateComponent,
    DateModule,
    SelectComponent,
    SelectModule,
    TextAreaComponent,
    TextAreaModule,
    TextComponent,
    TextModule
} from '@ng-holistic/clr-controls';

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
        component: SelectComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), TextModule, TextAreaModule, DateModule, SelectModule],
    exports: [RouterModule],
    entryComponents: []
})
export class ClrControlsRoutingModule {}
