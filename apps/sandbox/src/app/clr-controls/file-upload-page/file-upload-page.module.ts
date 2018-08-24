import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FileUploadModule } from '@ng-holistic/clr-controls';
import { FileUploadPageComponent } from './file-upload-page.component';

@NgModule({
    declarations: [FileUploadPageComponent],
    imports: [CommonModule, FileUploadModule],
    exports: [FileUploadPageComponent]
})
export class FileUploadPageModule {}
