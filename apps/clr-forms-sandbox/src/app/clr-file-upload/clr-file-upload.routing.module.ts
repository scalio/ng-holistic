import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FileUploadPageComponent } from './file-upload/file-upload-page.component';
import { FileUploadPageModule } from './file-upload/file-upload-page.module';
import { FileUploaderPageComponent } from './file-uploader/file-uploader-page.component';
import { FileUploaderPageModule } from './file-uploader/file-uploader-page.module';
import { ImageUploadPageComponent } from './image-upload/image-upload-page.component';
import { ImageUploadPageModule } from './image-upload/image-upload-page.module';

export const routes: Routes = [
    {
        path: 'image-upload',
        component: ImageUploadPageComponent
    },
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
    imports: [RouterModule.forChild(routes), FileUploadPageModule, FileUploaderPageModule, ImageUploadPageModule],
    exports: [RouterModule],
    entryComponents: []
})
export class ClrFileUploadRoutingModule {}
