import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { timer } from 'rxjs';
import { mapTo } from 'rxjs/operators';

@Component({
    selector: 'hlc-file-upload-page',
    templateUrl: './file-upload-page.component.html',
    styleUrls: ['./file-upload-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileUploadPageComponent implements OnInit {
    uploadFileFun = (file: any) => timer(1000).pipe(mapTo({id: file.name, name: file.name}));
    removeFileFun = (file: any) => timer(1000).pipe(mapTo({id: file.name, name: file.name}));

    constructor() {}

    ngOnInit() {}
}
