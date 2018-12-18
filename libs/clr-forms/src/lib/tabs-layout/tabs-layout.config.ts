import { InjectionToken } from '@angular/core';

export interface TabsLayoutConfig {
    tabErrorHint: string;
}

export const HLC_CLR_TABS_LAYOUT_CONFIG = new InjectionToken<TabsLayoutConfig>('HLC_CLR_TABS_LAYOUT_CONFIG');

export const defaultTabsLayoutConfig: TabsLayoutConfig = {
    tabErrorHint: 'Either some required fields are not set or there is valiadtion errors.'
};
