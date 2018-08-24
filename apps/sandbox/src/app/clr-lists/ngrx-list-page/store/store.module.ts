import { NgModule } from '@angular/core';
import { reducer } from './reducer';
import { EffectsModule } from '@ngrx/effects';
import { Effects } from './effects';
import { StoreModule as NgrxStoreModule } from '@ngrx/store';
import { DataAccessService } from './utils/data-access.service';

@NgModule({
    imports: [NgrxStoreModule.forFeature('ngrxListPage', reducer), EffectsModule.forFeature([Effects])],
    providers: [DataAccessService]
})
export class StoreModule {}
