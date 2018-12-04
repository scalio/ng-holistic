import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FileUploadPageComponent } from './file-upload-page.component';
import { FileUploadModule } from '@ng-holistic/clr-file-upload';

@NgModule({
    declarations: [FileUploadPageComponent],
    imports: [CommonModule, FileUploadModule],
    exports: [FileUploadPageComponent]
})
export class FileUploadPageModule {}
