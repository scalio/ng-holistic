import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HlcClrFileUploaderComponent } from './file-uploader.component';
import { FileDropModule } from 'ngx-file-drop';
import { ClrIconModule } from '@clr/angular';

@NgModule({
    imports: [CommonModule, FileDropModule, ClrIconModule],
    declarations: [HlcClrFileUploaderComponent],
    exports: [HlcClrFileUploaderComponent]
})
export class HlcClrFileUploaderModule {}
