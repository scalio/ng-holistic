import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    forwardRef,
    Inject,
    InjectionToken,
    Input,
    OnDestroy,
    OnInit,
    Optional
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as R from 'ramda';
import { empty, merge, Observable, Subject } from 'rxjs';
import { catchError, debounceTime, take, takeUntil } from 'rxjs/operators';
import { AttachmentType } from './model';

export interface FileUploadConfig {
    downloadFunction: (file: AttachmentType) => void;
}

export const FILE_UPLOAD_CONFIG = new InjectionToken('FILE_UPLOAD_CONFIG');

export type UploadFileFun = (file: File) => Observable<any>;

const UPLOAD_DEBOUNCE_TIME = 1000;

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
export class FileUploadComponent implements OnInit, OnDestroy, ControlValueAccessor {
    private readonly destroy$ = new Subject();

    value: any[];

    @Input() files: any[] | undefined;

    @Input() accept: string | undefined;
    @Input() readonly: boolean;

    @Input() uploadFileFun: UploadFileFun | undefined;

    propagateChange = (_: any) => {};

    constructor(
        private readonly cdr: ChangeDetectorRef,
        @Optional()
        @Inject(FILE_UPLOAD_CONFIG)
        private readonly config: FileUploadConfig | undefined
    ) {}

    ngOnInit() {}

    ngOnDestroy() {
        this.destroy$.next();
    }

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
        this.uploadFiles(files);
    }

    private uploadFiles(files: File[]) {
        if (this.uploadFileFun) {
            const res$ = files.map(file => this.uploadFile(file).pipe(catchError(() => empty())));
            merge(...res$)
                .pipe(debounceTime(UPLOAD_DEBOUNCE_TIME))
                .subscribe(() => {
                    this.cdr.detectChanges();
                    this.onChange();
                });
        }
    }

    private uploadFile(file: File) {
        const res$ = (this.uploadFileFun as UploadFileFun)(file).pipe(
            take(1),
            takeUntil(this.destroy$)
        );
        res$.subscribe(res => {
            const files = this.files as any[];
            const index = files.indexOf(file);
            this.files = R.update(index, res, files);
        });
        return res$;
        // TODO: handle error
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
        const files = (this.files || []).filter(file => this.isFileUploaded(file));
        this.propagateChange(files);
    }

    onClick(file: AttachmentType) {
        if (this.config) {
            this.config.downloadFunction(file);
        }
    }
}
