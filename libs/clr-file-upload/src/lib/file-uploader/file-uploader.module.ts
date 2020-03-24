import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HlcClrFileUploaderComponent } from './file-uploader.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import { ClrIconModule } from '@clr/angular';

@NgModule({
    imports: [CommonModule, NgxFileDropModule, ClrIconModule],
    declarations: [HlcClrFileUploaderComponent],
    exports: [HlcClrFileUploaderComponent],
})
export class HlcClrFileUploaderModule {}
