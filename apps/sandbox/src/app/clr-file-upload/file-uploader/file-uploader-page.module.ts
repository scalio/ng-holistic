import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FileUploaderPageComponent } from './file-uploader-page.component';
import { HlcClrFileUploaderModule } from '@ng-holistic/clr-file-upload';

@NgModule({
    declarations: [FileUploaderPageComponent],
    imports: [CommonModule, HlcClrFileUploaderModule],
    exports: [FileUploaderPageComponent]
})
export class FileUploaderPageModule {}
