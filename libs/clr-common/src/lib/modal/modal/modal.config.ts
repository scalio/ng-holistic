import { InjectionToken } from '@angular/core';

export interface HlcClrModalConfigLabels {
    okText: string;
    cancelText: string;
}

export interface HlcClrModalConfig {
    labels: HlcClrModalConfigLabels;
}

export const hlcClrDefaultModalConfig: HlcClrModalConfig = {
    labels: {
        okText: 'OK',
        cancelText: 'Cancel'
    }
};

export const HLC_CLR_MODAL_CONFIG = new InjectionToken<HlcClrModalConfig>('HLC_CLR_MODAL_CONFIG');
