import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FileUploadPageComponent } from './file-upload/file-upload-page.component';
import { FileUploadPageModule } from './file-upload/file-upload-page.module';
import { FileUploaderPageComponent } from './file-uploader/file-uploader-page.component';
import { FileUploaderPageModule } from './file-uploader/file-uploader-page.module';

export const routes: Routes = [
    {
        path: 'file-upload',
        component: FileUploaderPageComponent
    },
    {
        path: 'file-uploader',
        component: FileUploadPageComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), FileUploadPageModule, FileUploaderPageModule],
    exports: [RouterModule],
    entryComponents: []
})
export class ClrFileUploadRoutingModule {}
