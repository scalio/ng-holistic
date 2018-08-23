import { ChangeDetectionStrategy, Component, forwardRef, Input, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
    selector: 'hlc-file-upload',
    templateUrl: './file-upload.component.html',
    styleUrls: ['./file-upload.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => HlcFileUploadComponent),
            multi: true
        }
    ]
})
export class HlcFileUploadComponent implements OnInit, ControlValueAccessor {
    @Input() file: string | File | undefined | null;
    @Input() accept: string | undefined;
    propagateChange = (_: any) => {};

    constructor() {}

    ngOnInit() {}

    get isFileObject() {
        return this.file instanceof File;
    }

    get isFileEmpty() {
        return !this.file;
    }

    onFileRemove() {
        this.file = null;
        this.propagateChange(null);
    }

    onFileChange(file: File) {
        this.file = file;
        this.propagateChange(file);
    }

    //
    onChange(val: string | null) {
        this.writeValue(val);
        this.propagateChange(val);
    }

    writeValue(obj: any) {
        this.file = obj;
    }

    registerOnChange(fn: any) {
        this.propagateChange = fn;
    }
    registerOnTouched(_: any) {}
}
