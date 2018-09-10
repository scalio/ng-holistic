import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BaseFormPageModule } from './base-form-page/base-form-page.module';
import { BaseFormPageComponent } from './base-form-page/base-form-page.component';
import { resolvePreloadItem, PRELOAD_ITEM_CONFIG } from '@ng-holistic/ngrx-forms';
import { Store } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { pair } from './ngrx-form-page/store';
import { NgrxFormPageComponent } from './ngrx-form-page/ngrx-form-page.component';
import { NgrxFormPageModule } from './ngrx-form-page/ngrx-form-page.module';

export const routes: Routes = [
    {
        path: 'base',
        component: BaseFormPageComponent
    },
    {
        path: 'ngrx',
        component: NgrxFormPageComponent,
        resolve: { item: 'itemResolver' }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), BaseFormPageModule, NgrxFormPageModule],
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
