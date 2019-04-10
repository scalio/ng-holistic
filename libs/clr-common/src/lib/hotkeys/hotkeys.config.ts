import { Observable } from 'rxjs';
import { InjectionToken } from '@angular/core';

export interface HlcHotkeysConfig {
    useKeys$: Observable<boolean>;
}

export const HLC_HOTKEYS_CONFIG = new InjectionToken<HlcHotkeysConfig>('HLC_HOTKEYS_CONFIG');