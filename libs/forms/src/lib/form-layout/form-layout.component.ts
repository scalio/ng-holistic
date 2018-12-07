import { ChangeDetectionStrategy, Component, forwardRef, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HLC_FORM_GROUP_PROVIDER, FormGroupProvider } from '../fields-layout/fields-layout.component';
import { IFormGroup } from '../models/form-layouts.types';

@Component({
    selector: 'hlc-form-layout',
    templateUrl: './form-layout.component.html',
    styleUrls: ['./form-layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: HLC_FORM_GROUP_PROVIDER,
            useExisting: forwardRef(() => FormLayoutComponent)
        }
    ]
})
export class FormLayoutComponent implements OnInit, OnDestroy, FormGroupProvider {
    @Input()
    form: FormGroup;
    @Input()
    group: IFormGroup<any> | undefined;

    ngOnInit() {}

    ngOnDestroy() {}
}
