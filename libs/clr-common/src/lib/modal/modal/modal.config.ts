import { InjectionToken } from '@angular/core';

export interface ModalConfigLabels {
    okText: string;
    cancelText: string;
}

export interface ModalConfig {
    labels: ModalConfigLabels;
}

export const defaultModalConfig: ModalConfig = {
    labels: {
        okText: 'OK',
        cancelText: 'Cancel'
    }
};

export const HLC_CLR_MODAL_CONFIG = new InjectionToken<ModalConfig>('HLC_CLR_MODAL_CONFIG');
