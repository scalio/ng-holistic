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
import { HlcClrImageComponent, ImageState, ImageUtilsService } from '@ng-holistic/clr-common';
import { finalize } from 'rxjs/operators';
import { HlcClrFileUploadComponent, RemoveFileFun, UploadFileFun } from '../file-upload/file-upload.component';
import { isFileInstance } from '../is-file-instance';

@Component({
    selector: 'hlc-clr-image-upload',
    templateUrl: './image-upload.component.html',
    styleUrls: ['./image-upload.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => HlcClrImageUploadComponent),
            multi: true
        }
    ]
})
export class HlcClrImageUploadComponent implements OnInit, ControlValueAccessor {
    isCropOn = false;
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

    @Input() dragLabel = 'Drag image here';
    @Input() buttonLabel: string;
    @Input() allowUpload = true;
    @Input() allowRemove = true;
    @Input() allowPreview = true;
    @Input() state: ImageState | undefined;
    @Input() src: string | undefined;
    @Input() emptySrc: string;
    @Input() title: string;
    @Input() height: number;
    @Input() width: number;
    @Input() allowCrop = true;
    @Input() acceptWithAspectRatioOnly = false;
    @Input() aspectRatio = 1;
    @Input() maintainAspectRatio = false;
    @Input() alignImage: 'center' | 'left' = 'center';
    @Input() set value(val: string | File | null) {
        this._value = val;
        if (typeof val === 'string') {
            // when value is string, consider it image url and update src automaticaly
            this.src = val;
        } else if (!val) {
            this.src = undefined;
        }
        // File value shouldn't update src property
    }

    @Output() click = new EventEmitter();
    @Output() removeClick = new EventEmitter();
    @Output() uploadClick = new EventEmitter();
    @Output() previewClick = new EventEmitter();

    // @ts-ignore
    @ViewChild(HlcClrFileUploadComponent, { static: false }) fileUploadComponent: HlcClrFileUploadComponent;
    // @ts-ignore
    @ViewChild(HlcClrImageComponent, { static: false }) imageComponent: HlcClrImageComponent;
    processing = false;

    private _value: string | File | null;

    propagateChange = (_: any) => {};

    constructor(private readonly cdr: ChangeDetectorRef, private readonly imageUtilsService: ImageUtilsService) {}

    ngOnInit() {
        this.isCropOn = this.acceptWithAspectRatioOnly;
    }

    async onFilesChanged(files: any[]) {
        const file = files[0];
        if (!file) {
            this.value = null;
            this.propagateChange(this._value);
            return;
        }
        if (isFileInstance(file)) {
            const fileSrc = await this.imageUtilsService.encodeFile64(file);
            this.src = fileSrc;
            this.value = file;
            if (this.allowCrop && this.acceptWithAspectRatioOnly) {
                this.imageComponent.onCropOn();
            }
            this.cdr.detectChanges();
            this.propagateChange(this._value);
        } else {
            this.value = file.src;
            this.propagateChange(this._value);
        }
    }

    onRemoveFile() {
        this.fileUploadComponent.onRemoveFile(this.file);
    }

    onUploadFile(file: any) {
        this.fileUploadComponent.onSetFiles([file]);
    }

    onSrcChanged(src: string) {
        const blob = this.imageUtilsService.dataURItoBlob(src);
        const file = new File([blob], this.file.name);
        this.src = src;
        this.value = file;
        this.cdr.detectChanges();
        this.propagateChange(this._value);
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
        if (isFileInstance(this.file)) {
            return this.file.name;
        }
        return this.src && typeof this.src === 'string' ? this.src.substr(this.src.lastIndexOf('/') + 1) : null;
    }

    //

    writeValue(obj: any) {
        this.src = obj;
        this.cdr.markForCheck();
    }

    registerOnChange(fn: any) {
        this.propagateChange = fn;
    }

    registerOnTouched(_: any) {}
}
