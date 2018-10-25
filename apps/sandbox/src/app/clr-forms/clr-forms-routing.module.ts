import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PRELOAD_ITEM_CONFIG, resolvePreloadItem } from '@ng-holistic/ngrx-forms';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { FormGroupsPageComponent } from './form-groups-page/form-groups-page.component';
import { FormGroupsPageModule } from './form-groups-page/form-groups-page.module';
import { FormPageComponent } from './form-page/form-page.component';
import { FormPageModule } from './form-page/form-page.module';
import { pair } from './ngrx-form-page/store';
import { FormRecalcPageComponent } from './form-recalc-page/form-recalc-page.component';
import { FormReclcPageModule } from './form-recalc-page/form-recalc-page.module';

export const routes: Routes = [
    {
        path: 'form',
        component: FormPageComponent
    },
    {
        path: 'form-groups',
        component: FormGroupsPageComponent
    },
    {
        path: 'form-recalc',
        component: FormRecalcPageComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), FormPageModule, FormGroupsPageModule, FormReclcPageModule],
    exports: [RouterModule],
    providers: [
        {
            provide: 'itemResolver',
            useFactory: resolvePreloadItem(pair),
            deps: [Store, Actions, PRELOAD_ITEM_CONFIG]
        }
    ]
})
export class ClrFormsRoutingModule {}
