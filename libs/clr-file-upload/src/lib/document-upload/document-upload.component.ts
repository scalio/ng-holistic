import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    forwardRef,
    Input,
    OnInit,
    Output,
    ViewChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ImageState } from '@ng-holistic/clr-common';
import { finalize } from 'rxjs/operators';
import { HlcClrFileUploadComponent, RemoveFileFun, UploadFileFun } from '../file-upload/file-upload.component';
import docImage64 from './doc-image';

@Component({
    selector: 'hlc-clr-document-upload',
    templateUrl: './document-upload.component.html',
    styleUrls: ['./document-upload.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => HlcClrDocumentUploadComponent),
            multi: true
        }
    ]
})
export class HlcClrDocumentUploadComponent implements OnInit, ControlValueAccessor {
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

    @Input() accept: string;

    @Input() dragLabel = 'Drag document here';
    @Input() buttonLabel: string;
    @Input() allowUpload = true;
    @Input() allowRemove = true;
    @Input() allowPreview = true;
    @Input() state: ImageState | undefined;
    @Input() emptySrc: string;
    @Input() title: string;
    @Input() height: number;
    @Input() width: number;
    @Input() value: string | File | null;
    @Input() readonly: boolean;

    @Output() click = new EventEmitter();
    @Output() removeClick = new EventEmitter();
    @Output() uploadClick = new EventEmitter();
    @Output() previewClick = new EventEmitter();

    @ViewChild(HlcClrFileUploadComponent, { static: false }) fileUploadComponent: HlcClrFileUploadComponent;
    processing = false;

    propagateChange = (_: any) => {};

    constructor(private readonly cdr: ChangeDetectorRef) {}

    ngOnInit() {}

    get src() {
        return this.value ? docImage64 : undefined;
    }

    async onFilesChanged(files: any[]) {
        const file = files[0];
        if (!file) {
            this.value = null;
            this.propagateChange(this.value);
            return;
        }
        if (file instanceof File) {
            this.value = file;
            this.cdr.detectChanges();
            this.propagateChange(this.value);
        } else {
            this.value = file.src;
            this.propagateChange(this.value);
        }
    }

    onRemoveFile() {
        this.fileUploadComponent.onRemoveFile(this.file);
    }

    onUploadFile(file: any) {
        this.fileUploadComponent.onSetFiles([file]);
    }

    _uploadFileFun = (file: any) => {
        if (!this.uploadFileFun) {
            return undefined;
        }

        this.cdr.markForCheck();

        this.processing = true;

        return this.uploadFileFun(file).pipe(
            finalize(() => {
                this.processing = false;
                this.cdr.detectChanges();
            })
        );
    };

    _removeFileFun = (file: any) => {
        if (!this.removeFileFun) {
            return undefined;
        }

        this.processing = true;

        return this.removeFileFun(file).pipe(finalize(() => (this.processing = false)));
    };

    get _buttonLabel() {
        return this.buttonLabel && (this.uploadFileFun ? 'Click for upload' : 'Click for add');
    }

    get file() {
        return this.fileUploadComponent && this.fileUploadComponent.files && this.fileUploadComponent.files[0];
    }

    get fileName() {
        if (this.file instanceof File) {
            return this.file.name;
        }
        return this.file && typeof this.file === 'string' && this.file.substr(this.file.indexOf('/'));
    }

    get isSrcUploaded() {
        return !(this.value instanceof File);
    }

    //

    writeValue(obj: any) {
        this.value = obj;
    }

    registerOnChange(fn: any) {
        this.propagateChange = fn;
    }

    registerOnTouched(_: any) {}
}
