import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { mapTo } from 'rxjs/operators';

@Component({
    selector: 'hlc-image-upload-page',
    templateUrl: './image-upload-page.component.html',
    styleUrls: ['./image-upload-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageUploadPageComponent implements OnInit {
    uploadFileFun = (file: any) => timer(1000).pipe(mapTo({ id: file.name, name: file.name }));
    removeFileFun = (file: any) => timer(1000).pipe(mapTo({ id: file.name, name: file.name }));

    constructor() {}

    ngOnInit() {}
}
