import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { HlcFormComponent } from '@ng-holistic/forms';
import { FormLayouts } from '../../shared';

const group: FormLayouts.FormLayout = {
    kind: 'fields',
    fields: [
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
            id: 'imageUpload',
            kind: 'ImageUploadField',
            props: {
                label: 'Image'
            }
        }
    ]
};

@Component({
    selector: 'hlc-form-extra-page',
    templateUrl: './form-extra-page.component.html',
    styleUrls: ['./form-extra-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormExtraPageComponent implements AfterViewInit {
    group = group;

    @ViewChild(HlcFormComponent) form: HlcFormComponent;

    constructor(readonly cdr: ChangeDetectorRef) {}

    ngAfterViewInit() {
        // in order to correctly display formGroup.value on init
        this.cdr.detectChanges();
    }
}
