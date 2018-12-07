import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

///

export interface FileUploadConfig {
    download?: (item: any) => void;
    remove?: (item: any) => Observable<any>;
    getId(item: any): any;
    getName(item: any): any;
}

export const HLC_CLR_FILE_UPLOAD_CONFIG = new InjectionToken<FileUploadConfig>('HLC_CLR_FILE_UPLOAD_CONFIG');
