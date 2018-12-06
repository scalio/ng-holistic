import { InjectionToken } from '@angular/core';

///

export interface FileUploadConfig {
    download: (item: any) => void;
    getId(item: any): any;
    getName(item: any): any;
}

export const HLC_FILE_UPLOAD_CONFIG = new InjectionToken<FileUploadConfig>('HLC_FILE_UPLOAD_CONFIG');

/*
@Injectable({ providedIn: 'root' })
export class FileUploadMapperService implements FileUploadMapper {
    getId(item: any) {
        return item['id'];
    }

    getName(item: any) {
        return item['name'];
    }

}
*/
