import { ChangeDetectionStrategy, Component, forwardRef, Input, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import * as R from 'ramda';

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
    // ControlValueAccessor - expect value to be single item (also emit value as single item), array otherwice
    @Input() single: boolean | undefined;
    @Input() images: (string | File)[] | undefined | null;

    isStr(file: File | string) {
        return !(file instanceof File);
    }

    propagateChange = (_: any) => {};

    constructor() {}

    ngOnInit() {}

    get imagesObjects() {
        return (this.images || []).filter(file => file instanceof File);
    }

    onImageRemove(index: number) {
        if (!this.images) {
            return;
        }
        this.images = R.remove(index, 1, this.images);
        this.onChange();
    }

    onImagesChange(files: File[]) {
        this.images = files;
        this.onChange();
    }

    //
    writeValue(obj: any) {
        this.images = this.single ? [obj] : obj;
    }

    registerOnChange(fn: any) {
        this.propagateChange = fn;
    }

    registerOnTouched(_: any) {}

    private onChange() {
        this.propagateChange(this.single ? (this.images || [])[0] : this.images);
    }
}
