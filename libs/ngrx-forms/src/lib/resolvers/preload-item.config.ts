import { ActivatedRouteSnapshot } from '@angular/router';
import { InjectionToken } from '@angular/core';

export interface PreloadItemConfig {
    getItemId(route: ActivatedRouteSnapshot): any | null;
}

export const PRELOAD_ITEM_CONFIG = new InjectionToken<PreloadItemConfig>('PRELOAD_ITEM_CONFIG');
