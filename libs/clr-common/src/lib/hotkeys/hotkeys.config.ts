import { InjectionToken } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface HlcHotkeysConfig {
    useKeys$: Observable<boolean>;
}

export const HLC_HOTKEYS_CONFIG = new InjectionToken<HlcHotkeysConfig>('HLC_HOTKEYS_CONFIG');

export class HlcHotkeysConfigService implements HlcHotkeysConfig {
    private readonly _useKeys$ = new BehaviorSubject(true);

    get useKeys() {
        return this._useKeys$.getValue();
    }

    set useKeys(val: boolean) {
        this._useKeys$.next(val);
    }

    get useKeys$() {
        return this._useKeys$.asObservable();
    }
}
