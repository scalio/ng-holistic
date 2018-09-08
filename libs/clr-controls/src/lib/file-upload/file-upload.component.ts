import { ChangeDetectionStrategy, Component, forwardRef, Input, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import * as R from 'ramda';

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
    @Input() files: (string | File)[] | undefined | null;
    @Input() single: boolean | undefined;
    @Input() accept: string | undefined;
    @Input() readonly: boolean;
    propagateChange = (_: any) => {};

    constructor() {}

    ngOnInit() {}

    get filesObjects() {
        return (this.files || []).filter(file => file instanceof File);
    }

    isStr(file: File | string) {
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
        this.files = files;
        this.onChange();
    }

    //

    writeValue(obj: any) {
        this.files = this.single ? [obj] : obj;
    }

    registerOnChange(fn: any) {
        this.propagateChange = fn;
    }

    registerOnTouched(_: any) {}

    private onChange() {
        this.propagateChange(this.single ? (this.files || [])[0] : this.files);
    }
}
