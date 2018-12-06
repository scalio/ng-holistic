import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    forwardRef,
    Inject,
    Input,
    OnDestroy,
    OnInit
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as R from 'ramda';
import { empty, merge, Observable, Subject } from 'rxjs';
import { catchError, debounceTime, take, takeUntil } from 'rxjs/operators';
import { FileUploadConfig, HLC_FILE_UPLOAD_CONFIG } from '../file-upload.config';
import { AttachmentType } from './model';

export type UploadFileFun = (file: File) => Observable<any>;
export type RemoveFileFun = (file: any) => Observable<any>;

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

    removingFiles: any[] = [];

    @Input() files: any[] | undefined;

    @Input() accept: string | undefined;
    @Input() readonly: boolean;

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

    propagateChange = (_: any) => {};

    constructor(
        private readonly cdr: ChangeDetectorRef,
        @Inject(HLC_FILE_UPLOAD_CONFIG)
        readonly config: FileUploadConfig
    ) {}

    ngOnInit() {}

    ngOnDestroy() {
        this.destroy$.next();
    }

    get filesObjects() {
        return (this.files || []).filter(file => file instanceof File);
    }

    get uploadedFiles() {
        return (this.files || []).filter(file => this.isFileUploaded(file));
    }

    getFileName(file: any) {
        return file instanceof File ? file.name : this.config.getName(file);
    }

    //

    onAddFiles(files: File[]) {
        this.files = [...files, ...(this.files || [])];
        if (this.uploadFileFun) {
            this.uploadFiles(files);
        } else {
            this.onChange();
        }
    }

    onRemoveFile(file: any) {
        // use specific component function or form config by default
        const removeFileFun = this.removeFileFun || this.config.remove.bind(this.config);
        if (removeFileFun) {
            this.setFileAsRemoving(file);
            const res$ = removeFileFun(file).pipe(
                take(1),
                takeUntil(this.destroy$)
            );
            res$.subscribe(
                _ => {
                    this.resetFileAsRemoving(file);
                    this.removeFile(file);
                    this.onChange();
                    this.cdr.detectChanges();
                },
                _ => {
                    this.resetFileAsRemoving(file);
                }
            );
            // TODO: Error handle
        } else {
            this.removeFile(file);
            this.onChange();
        }
    }

    isFileUploading(file: any) {
        return file instanceof File;
    }

    isFileRemoving(file: any) {
        return this.getFileIndex(file, this.removingFiles) !== -1;
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

    onDownload(file: AttachmentType) {
        if (this.config) {
            this.config.download(file);
        }
    }

    private onChange() {
        // TODO : !!! Handle uploadFileFun & removeFileFun (see description)
        this.propagateChange(this.uploadFiles);
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

    private getFileIndex(file: any, files: any[]) {
        return files.findIndex(f => this.config.getId(file) === this.config.getId(f));
    }

    private setFileAsRemoving(file: any) {
        const files = this.removingFiles;
        const index = this.getFileIndex(file, files);
        if (index === -1) {
            this.removingFiles = [file, ...files];
        }
    }

    private resetFileAsRemoving(file: any) {
        const files = this.removingFiles;
        const index = this.getFileIndex(file, files);
        if (index !== -1) {
            this.removingFiles = R.remove(index, 1, files);
        }
    }

    private removeFile(file: any) {
        const files = this.uploadedFiles;
        const index = this.getFileIndex(file, files);
        this.files = R.remove(index, 1, files);
    }
}
