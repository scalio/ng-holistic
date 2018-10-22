import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PRELOAD_ITEM_CONFIG, resolvePreloadItem } from '@ng-holistic/ngrx-forms';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { FormPageComponent } from './form-page/form-page.component';
import { FormPageModule } from './form-page/form-page.module';
import { pair } from './ngrx-form-page/store';
import { WrappedFiedlsLayoutModule } from './wrapped-fields-layout-page/warpped-fields-layout-page.module';
import { WrappedFiedlsLayoutComponent } from './wrapped-fields-layout-page/wrapped-fields-layout-page.component';

export const routes: Routes = [
    {
        path: 'wrapped-fields-layout',
        component: WrappedFiedlsLayoutComponent
    },
    {
        path: 'form',
        component: FormPageComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), WrappedFiedlsLayoutModule, FormPageModule],
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
