import { InjectionToken } from '@angular/core';

export interface FileUploaderLabels {
    dragLabel: string;
    orLabel: string;
    clickForUploadLabel: string;
    acceptFilesLabel: string;
}

export interface FileUploaderConfig {
    labels?: FileUploaderLabels;
}

export const HLC_CLR_FILE_UPLOADER_CONFIG = new InjectionToken<FileUploaderConfig>('HLC_CLR_FILE_UPLOADER_CONFIG');
