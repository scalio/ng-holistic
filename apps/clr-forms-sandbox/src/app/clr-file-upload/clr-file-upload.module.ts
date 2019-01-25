import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes, ClrFileUploadRoutingModule } from './clr-file-upload.routing.module';

@NgModule({
    declarations: [],
    imports: [CommonModule, RouterModule.forChild(routes), ClrFileUploadRoutingModule]
})
export class ClrFileUploadModule {}
