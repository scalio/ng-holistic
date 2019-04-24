import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { HlcFormComponent } from '@ng-holistic/forms';
import { timer } from 'rxjs';
import { mapTo } from 'rxjs/operators';
import { FormLayouts } from '../../shared';

const uploadFileFun = (file: File) =>
    timer(1000).pipe(mapTo({ id: file.name, name: file.name, src: 'https://pbs.twimg.com/media/DuEkvqTW0AIlTSo.jpg' }));

const removeFileFun = (file: File) => timer(1000).pipe(mapTo({ id: file.name, name: file.name }));

const group: FormLayouts.FormLayout = {
    kind: 'fields',
    fields: [
        {
            id: 'docUpload',
            kind: 'DocumentUploadField',
            props: {
                label: 'Document upload',
                accept: '.doc, .docx, .pdf'
            }
        },
        {
            id: 'richText',
            kind: 'RichTextField',
            props: {
                label: 'Rich text',
                placeholder: 'Type something',
                style: { height: '150px' }
            }
        },
        {
            id: 'image',
            kind: 'ImageUploadField',
            props: {
                label: 'Image'
            }
        },
        {
            id: 'imageUpload',
            kind: 'ImageUploadField',
            props: {
                label: 'Image with upload',
                uploadFileFun,
                removeFileFun
            }
        }
    ]
};

const definition = `
const group: FormLayouts.FormLayout = {
    kind: 'fields',
    fields: [
        {
            id: 'docUpload',
            kind: 'DocumentUploadField',
            props: {
                label: 'Document upload',
                accept: '.doc, .docx, .pdf'
            }
        },
        {
            id: 'richText',
            kind: 'RichTextField',
            props: {
                label: 'Rich text',
                placeholder: 'Type something',
                style: { height: '150px' }
            }
        },
        {
            id: 'image',
            kind: 'ImageUploadField',
            props: {
                label: 'Image'
            }
        },
        {
            id: 'imageUpload',
            kind: 'ImageUploadField',
            props: {
                label: 'Image with upload',
                uploadFileFun,
                removeFileFun
            }
        }
    ]
};`;

@Component({
    selector: 'hlc-form-extra-page',
    templateUrl: './form-extra-page.component.html',
    styleUrls: ['./form-extra-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormExtraPageComponent implements AfterViewInit {
    definition = definition;
    group = group;

    @ViewChild(HlcFormComponent) form: HlcFormComponent;

    constructor(readonly cdr: ChangeDetectorRef) {}

    ngAfterViewInit() {
        // in order to correctly display formGroup.value on init
        this.cdr.detectChanges();
    }
}
