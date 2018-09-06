import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileMultiUploaderComponent } from './file-multi-uploader.component';
import { FileDropModule } from 'ngx-file-drop';
import { ClrIconModule } from '@clr/angular';

@NgModule({
    imports: [CommonModule, FileDropModule, ClrIconModule],
    declarations: [FileMultiUploaderComponent],
    exports: [FileMultiUploaderComponent]
})
export class FileMultiUploaderModule {}
