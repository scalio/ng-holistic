import {
    ChangeDetectionStrategy,
    Component,
    forwardRef,
    Inject,
    InjectionToken,
    Input,
    OnInit,
    Optional
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as R from 'ramda';
import { Observable } from 'rxjs';
import { AttachmentType } from './model';

export interface FileUploadConfig {
    downloadFunction: (file: AttachmentType) => void;
}

export const FILE_UPLOAD_CONFIG = new InjectionToken('FILE_UPLOAD_CONFIG');

export type UploadFileFun = (file: File) => Observable<any>;

@Component({
    selector: 'hlc-file-upload',
    templateUrl: './file-upload.component.html',
    styleUrls: ['./file-upload.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => FileUploadComponent),
            multi: true
        }
    ]
})
export class FileUploadComponent implements OnInit, ControlValueAccessor {
    @Input() files: any[] | undefined;

    @Input() accept: string | undefined;
    @Input() readonly: boolean;

    propagateChange = (_: any) => {};

    constructor(
        @Optional()
        @Inject(FILE_UPLOAD_CONFIG)
        private readonly config: FileUploadConfig | undefined
    ) {}

    ngOnInit() {}

    get filesObjects() {
        return (this.files || []).filter(file => file instanceof File);
    }

    onFileRemove(index: number) {
        if (!this.files) {
            return;
        }
        this.files = R.remove(index, 1, this.files);
        this.onChange();
    }

    onAddFiles(files: File[]) {
        this.files = [...files, ...(this.files || [])];
        console.log('+++', files);
    }

    isFileUploading(file: any) {
        return file instanceof File;
    }

    isFileUploaded(file: any) {
        return !this.isFileUploading(file);
    }

    //

    writeValue(obj: any) {
        this.files = obj;
    }

    registerOnChange(fn: any) {
        this.propagateChange = fn;
    }

    registerOnTouched(_: any) {}

    private onChange() {
        this.propagateChange(this.files || []);
    }

    onClick(file: AttachmentType) {
        if (this.config) {
            this.config.downloadFunction(file);
        }
    }
}
