import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
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
import { AttachmentType } from './model';

export interface FileUploadConfig {
    downloadFunction: (file: AttachmentType) => void;
}

export const FILE_UPLOAD_CONFIG = new InjectionToken('FILE_UPLOAD_CONFIG');

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

    showAllNew = false;
    showAllOld = false;

    _files: (AttachmentType | File)[] | undefined | null;
    @Input()
    set files(val: (AttachmentType | File)[] | undefined | null) {
        if (val) {
            this._files = [...val];
            this.cd.markForCheck();
        }
    }
    get files() {
        return this._files;
    }
    @Input() single: boolean | undefined;
    @Input() accept: string | undefined;
    @Input() readonly: boolean;
    @Input() url: string | undefined;
    propagateChange = (_: any) => {};


    constructor(
        private cd: ChangeDetectorRef,
        @Optional()
        @Inject(FILE_UPLOAD_CONFIG)
        private readonly config: FileUploadConfig | undefined
    ) {}

    ngOnInit() {}

    get filesObjects() {
        return (this.files || []).filter(file => file instanceof File);
    }

    get attachmentObjects() {
        return (this.files || []).filter(this.isAttachment);
    }

    isAttachment(file: File | AttachmentType) {
        return !(file instanceof File);
    }

    onFileRemove(index: number) {
        if (!this.files) {
            return;
        }
        this.files = R.remove(index, 1, this.files);
        this.onChange();
    }

    onFilesChange(files: File[]) {
        this.files = [...this.attachmentObjects, ...files];
        this.onChange();
    }

    //

    writeValue(obj: any) {
        this.files = this.single ? (obj ? [obj] : []) : obj;
    }

    registerOnChange(fn: any) {
        this.propagateChange = fn;
    }

    registerOnTouched(_: any) {}

    private onChange() {
        this.propagateChange(this.single ? (this.files || []).pop() : this.files);
    }

    onClick(file: AttachmentType) {
        if (this.config) {
            this.config.downloadFunction(file);
        }
    }

    isUrl(file: AttachmentType) {
        return file && file.url && file.url.startsWith('http');
    }

    toggleRows(prop: string) {
        switch (prop) {
            case 'new':
                this.showAllNew = !this.showAllNew;
                break;
            case 'old':
                this.showAllOld = !this.showAllOld;
                break;
        }
    }
}
