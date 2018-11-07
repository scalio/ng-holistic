import { ChangeDetectionStrategy, Component, Inject, InjectionToken, Input, OnInit, Type } from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as R from 'ramda';
import { FormFields } from '../models';

/**
 * Map of key - type fields which could be possible generated on form layout
 */
export interface FieldsLayoutMap {
    [key: string]: Type<any>;
}

export const HLC_FIELDS_LAYOUT_MAP = new InjectionToken<FieldsLayoutMap>('HLC_FIELDS_LAYOUT_MAP');

export interface FormGroupProvider {
    form: FormGroup;
}

export const HLC_FORM_GROUP_PROVIDER = new InjectionToken<FormGroupProvider>('HLC_FORM_GROUP_PROVIDER');

@Component({
    selector: 'hlc-fields-layout',
    templateUrl: './fields-layout.component.html',
    styleUrls: ['./fields-layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FieldsLayoutComponent implements OnInit {
    private readonly fieldLayoutMap: FieldsLayoutMap;

    @Input()
    fields: FormFields.Field[];

    constructor(
        @Inject(HLC_FIELDS_LAYOUT_MAP) fieldLayoutMaps: FieldsLayoutMap[],
        @Inject(HLC_FORM_GROUP_PROVIDER) private readonly formGroupProvider: FormGroupProvider
    ) {
        this.fieldLayoutMap = R.mergeAll(fieldLayoutMaps);
    }

    ngOnInit() {}

    get formGroup() {
        return this.formGroupProvider && this.formGroupProvider.form;
    }

    getComponentType(field: FormFields.Field) {
        return this.fieldLayoutMap[field.kind];
    }

    getControl(id: string) {
        return this.formGroup.controls[id];
    }
}
