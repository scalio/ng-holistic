import { ChangeDetectionStrategy, Component, forwardRef, Input, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
    selector: 'hlc-image-upload',
    templateUrl: './image-upload.component.html',
    styleUrls: ['./image-upload.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ImageUploadComponent),
            multi: true
        }
    ]
})
export class ImageUploadComponent implements OnInit, ControlValueAccessor {
    @Input() image: string | File | undefined | null;

    propagateChange = (_: any) => {};

    constructor() {}

    get isImageUrl() {
        return this.image instanceof String;
    }

    get isImageFile() {
        return this.image instanceof File;
    }

    get isImageEmpty() {
        return !this.image;
    }

    ngOnInit() {}

    onImageRemove() {
        this.image = null;
        this.propagateChange(null);
    }

    onImageChange(file: File) {
        this.image = file;
        this.propagateChange(file);
    }

    //
    onChange(val: string | null) {
        this.writeValue(val);
        this.propagateChange(val);
    }

    writeValue(obj: any) {
        this.image = obj;
    }

    registerOnChange(fn: any) {
        this.propagateChange = fn;
    }
    registerOnTouched(_: any) {}
}
