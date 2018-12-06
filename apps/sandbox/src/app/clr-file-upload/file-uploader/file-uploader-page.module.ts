import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FileUploaderPageComponent } from './file-uploader-page.component';
import { FileUploaderModule } from '@ng-holistic/clr-file-upload';

@NgModule({
    declarations: [FileUploaderPageComponent],
    imports: [CommonModule, FileUploaderModule],
    exports: [FileUploaderPageComponent]
})
export class FileUploaderPageModule {}
