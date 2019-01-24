import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploaderComponent } from './file-uploader.component';
import { FileDropModule } from 'ngx-file-drop';
import { ClrIconModule } from '@clr/angular';

@NgModule({
    imports: [CommonModule, FileDropModule, ClrIconModule],
    declarations: [FileUploaderComponent],
    exports: [FileUploaderComponent]
})
export class HlcClrFileUploaderModule {}
