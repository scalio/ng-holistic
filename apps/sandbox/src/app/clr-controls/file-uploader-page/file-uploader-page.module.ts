import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FileMultiUploaderModule } from '@ng-holistic/clr-controls';
import { FileUploaderPageComponent } from './file-uploader-page.component';

@NgModule({
    declarations: [FileUploaderPageComponent],
    imports: [CommonModule, FileMultiUploaderModule],
    exports: [FileUploaderPageComponent]
})
export class FileUploaderPageModule {}
