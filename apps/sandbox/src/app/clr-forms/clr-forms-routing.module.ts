import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PRELOAD_ITEM_CONFIG, resolvePreloadItem } from '@ng-holistic/ngrx-forms';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { BaseFormPageComponent } from './base-form-page/base-form-page.component';
import { BaseFormPageModule } from './base-form-page/base-form-page.module';
import { pair } from './ngrx-form-page/store';
import { WrappedFiedlsLayoutComponent } from './wrapped-fields-layout-page/wrapped-fields-layout-page.component';
import { WrappedFiedlsLayoutModule } from './wrapped-fields-layout-page/warpped-fields-layout-page.module';

export const routes: Routes = [
    {
        path: 'base',
        component: BaseFormPageComponent
    },
    {
        path: 'wrapped-fields-layout',
        component: WrappedFiedlsLayoutComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), BaseFormPageModule, WrappedFiedlsLayoutModule],
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
