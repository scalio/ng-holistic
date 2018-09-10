import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { DataAccessService, pair } from './utils';
import { subFormEffects } from '@ng-holistic/ngrx-forms';

@Injectable()
export class Effects {
    constructor(private readonly actions$: Actions, private readonly dataAccess: DataAccessService) {}

    @Effect() subActions = this.actions$.pipe(subFormEffects(this.dataAccess, pair));
}
