import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'hlc-file-uploader-page',
    templateUrl: './file-uploader-page.component.html',
    styleUrls: ['./file-uploader-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileUploaderPageComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
