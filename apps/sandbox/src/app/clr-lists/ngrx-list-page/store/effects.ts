import { Injectable } from '@angular/core';
import { subListEffects } from '@ng-holistic/ngrx-lists';
import { Actions, Effect } from '@ngrx/effects';
import { DataAccessService, pair } from './utils';

@Injectable()
export class Effects {
    constructor(private readonly actions$: Actions, private readonly dataAccess: DataAccessService) {}

    @Effect() subActions = this.actions$.pipe(subListEffects(this.dataAccess, pair));
}
