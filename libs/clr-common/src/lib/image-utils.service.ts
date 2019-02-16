import { Injectable } from '@angular/core';

@Injectable()
export class ImageUtilsService {
    async encodeFile64(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader: any = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
        }) as any;
    }

    async loadFile(_: string) {
        throw new Error('not implemented');
    }

    async getFileSize(_: File) {
        throw new Error('not implemented');
    }
}
