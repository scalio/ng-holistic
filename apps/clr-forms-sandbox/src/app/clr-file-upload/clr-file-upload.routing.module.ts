import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FileUploadPageComponent } from './file-upload/file-upload-page.component';
import { FileUploadPageModule } from './file-upload/file-upload-page.module';
import { FileUploaderPageComponent } from './file-uploader/file-uploader-page.component';
import { FileUploaderPageModule } from './file-uploader/file-uploader-page.module';

export const routes: Routes = [
    {
        path: 'file-upload',
        component: FileUploadPageComponent
    },
    {
        path: 'file-uploader',
        component: FileUploaderPageComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), FileUploadPageModule, FileUploaderPageModule],
    exports: [RouterModule],
    entryComponents: []
})
export class ClrFileUploadRoutingModule {}
