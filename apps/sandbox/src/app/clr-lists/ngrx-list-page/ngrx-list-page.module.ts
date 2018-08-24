import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgrxListPageComponent } from './ngrx-list-page.component';
import { ListLayoutModule } from '@ng-holistic/clr-lists';
import { StoreModule } from './store';

@NgModule({
    declarations: [NgrxListPageComponent],
    imports: [CommonModule, ListLayoutModule, StoreModule],
    exports: [NgrxListPageComponent]
})
export class NgrxListPageModule {}
