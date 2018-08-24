import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'hlc-file-upload-page',
    templateUrl: './file-upload-page.component.html',
    styleUrls: ['./file-upload-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileUploadPageComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
