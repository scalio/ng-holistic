import { ChangeDetectionStrategy, Component, forwardRef, Input, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { QuillEditorComponent } from 'ngx-quill';
import Quill from 'quill';
//@ts-ignore
import ImageResize from 'quill-image-resize-module';
//@ts-ignore
import ImageUpload from 'quill-plugin-image-upload';

Quill.register('modules/imageUpload', ImageUpload);
Quill.register('modules/imageResize', ImageResize);

/**
 * Small wrapper around https://github.com/KillerCodeMonkey/ngx-quill
 *
 */
@Component({
    selector: 'hlc-rich-text',
    templateUrl: './rich-text.component.html',
    styleUrls: ['./rich-text.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => HlcClrRichTextComponent),
            multi: true
        }
    ]
})
export class HlcClrRichTextComponent implements OnInit, ControlValueAccessor {
    @Input() style: { [key: string]: any };
    @Input() placeholder: string;

    @Input()
    value: string | undefined;

    @Input()
    readonly: boolean;

    @ViewChild(QuillEditorComponent) editor: QuillEditorComponent;

    readonly modules: any;
    propagateChange = (_: any) => {};

    constructor() {
        const imageUpload = {
            upload: () => {
                // return a Promise that resolves in a link to the uploaded image
                return new Promise(resolve => {
                    // tslint:disable-next-line:max-line-length
                    setTimeout(() => {
                        // tslint:disable-next-line:max-line-length
                        resolve('https://pbs.twimg.com/media/DuEkvqTW0AIlTSo.jpg'); // Must resolve as a link to the image
                    }, 1000);
                });
            }
        };

        this.modules = {
            imageResize: true,
            imageUpload,
            toolbar: [
                [{ header: [1, 2, 3, 4, 5, 6, false] }],
                ['bold', 'italic', 'link', { list: 'ordered' }, { list: 'bullet' }, 'image', 'blockquote']
            ]
        };
    }

    ngOnInit() {}

    onModelChange(event: any) {
        this.value = event;
        this.propagateChange(this.value);
    }

    //

    writeValue(obj: any) {
        this.value = obj;
    }

    registerOnChange(fn: any) {
        this.propagateChange = fn;
    }

    registerOnTouched(_: any) {}
}
