import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DateRangePageComponent } from './date-range-page/date-range-page.component';
import { DateRangePageModule } from './date-range-page/date-range-page.module';
import { DateTimePageComponent } from './date-time-page/date-time-page.component';
import { DateTimePageModule } from './date-time-page/date-time-page.module';
import { FileUploadPageComponent } from './file-upload-page/file-upload-page.component';
import { FileUploadPageModule } from './file-upload-page/file-upload-page.module';
import { FileUploaderPageComponent } from './file-uploader-page/file-uploader-page.component';
import { FileUploaderPageModule } from './file-uploader-page/file-uploader-page.module';
import { ImageUploadPageComponent } from './image-upload-page/image-upload-page.component';
import { ImageUploaderPageModule } from './image-upload-page/image-upload-page.module';
import { OrderedListPageComponent } from './oredred-list-page/ordered-list-page.component';
import { OrderedListPageModule } from './oredred-list-page/ordered-list-page.module';
import { SelectPageComponent } from './select-page/select-page.component';
import { SelectPageModule } from './select-page/select-page.module';

export const routes: Routes = [
    {
        path: 'date-range',
        component: DateRangePageComponent
    },
    {
        path: 'date-time',
        component: DateTimePageComponent
    },
    {
        path: 'file-upload',
        component: FileUploadPageComponent
    },
    {
        path: 'file-uploader',
        component: FileUploaderPageComponent
    },
    {
        path: 'image-upload',
        component: ImageUploadPageComponent
    },
    {
        path: 'select',
        component: SelectPageComponent
    },
    {
        path: 'ordered-list',
        component: OrderedListPageComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        DateRangePageModule,
        DateTimePageModule,
        FileUploadPageModule,
        FileUploaderPageModule,
        ImageUploaderPageModule,
        SelectPageModule,
        OrderedListPageModule
    ],
    exports: [RouterModule],
    entryComponents: []
})
export class ClrControlsRoutingModule {}
