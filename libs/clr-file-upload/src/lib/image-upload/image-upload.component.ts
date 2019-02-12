import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ImageState } from '@ng-holistic/clr-common';
import { finalize } from 'rxjs/operators';
import { HlcClrFileUploadComponent, RemoveFileFun, UploadFileFun } from '../file-upload/file-upload.component';

@Component({
    selector: 'hlc-clr-image-upload',
    templateUrl: './image-upload.component.html',
    styleUrls: ['./image-upload.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HlcClrImageUploadComponent implements OnInit {
    /**
     * If this function is not provided, control value will be changed immmediately after new file is added,
     * so in value could be both `domain` files and `raw` just uploaded files.
     * In case of `domain` files control value will be changed only if file was successfully uploaded, this case value
     * will always contains only `domain` file objects.
     * In case of raw uploaded files user should upload them along with other data when request is send to server.
     */
    @Input() uploadFileFun: UploadFileFun | undefined;
    /**
     * The same as for uploadFileFun
     */
    @Input() removeFileFun: RemoveFileFun | undefined;

    @Input() allowUpload = true;
    @Input() allowRemove = true;
    @Input() allowPreview = true;
    @Input() state: ImageState | undefined;
    @Input() src: string | undefined;
    @Input() emptySrc: string;
    @Input() title: string;
    @Input() height: number;
    @Input() width: number;

    @Output() click = new EventEmitter();
    @Output() removeClick = new EventEmitter();
    @Output() uploadClick = new EventEmitter();
    @Output() previewClick = new EventEmitter();

    @ViewChild(HlcClrFileUploadComponent) fileUploadComponent: HlcClrFileUploadComponent;
    processing = false;

    constructor() {}

    ngOnInit() {}

    onFilesChanged(files: any[]) {
        console.log('111', files);
        const file = files[0];
        this.src = file && file.src;
    }

    onRemoveFile() {
        this.fileUploadComponent.onRemoveFile(this.file);
    }

    onUploadFile(file: any) {
        console.log('2222', file);
        this.fileUploadComponent.onSetFiles([file]);
    }

    _uploadFileFun = (file: any) => {
        if (!this.uploadFileFun) {
            return undefined;
        }

        this.processing = true;

        return this.uploadFileFun(file).pipe(finalize(() => (this.processing = false)));
    };

    _removeFileFun = (file: any) => {
        if (!this.removeFileFun) {
            return undefined;
        }

        this.processing = true;

        return this.removeFileFun(file).pipe(finalize(() => (this.processing = false)));
    };

    get file() {
        return this.fileUploadComponent && this.fileUploadComponent.files && this.fileUploadComponent.files[0];
    }
}