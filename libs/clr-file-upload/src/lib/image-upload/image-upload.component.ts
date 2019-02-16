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
import { ImageState, ImageUtilsService } from '@ng-holistic/clr-common';
import { finalize } from 'rxjs/operators';
import { HlcClrFileUploadComponent, RemoveFileFun, UploadFileFun } from '../file-upload/file-upload.component';

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
    @Input() value: string | File | null;
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

    propagateChange = (_: any) => {};

    constructor(private readonly cdr: ChangeDetectorRef, private readonly imageUtilsService: ImageUtilsService) {}

    ngOnInit() {}

    async onFilesChanged(files: any[]) {
        const file = files[0];
        if (!file) {
            this.src = undefined;
            this.value = null;
            this.propagateChange(this.value);
            return;
        }
        if (file instanceof File) {
            this.src = await this.imageUtilsService.encodeFile64(file);
            this.value = file;
            this.cdr.detectChanges();
            this.propagateChange(this.value);
        } else {
            this.src = file.src;
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
        return this.file && typeof this.file === 'string' && this.file.substr(this.file.indexOf('/'));
    }

    //

    writeValue(obj: any) {
        this.src = obj;
    }

    registerOnChange(fn: any) {
        this.propagateChange = fn;
    }

    registerOnTouched(_: any) {}
}
