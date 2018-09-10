import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BaseFormPageModule } from './ngrx-form-page/ngrx-form-page.module';
import { NgrxFormPageComponent } from './ngrx-form-page/ngrx-form-page.component';
import { resolvePreloadItem, PRELOAD_ITEM_CONFIG } from '@ng-holistic/ngrx-forms';
import { Store } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { pair } from './ngrx-form-page/store';

export const routes: Routes = [
    {
        path: 'base',
        component: NgrxFormPageComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), BaseFormPageModule],
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
