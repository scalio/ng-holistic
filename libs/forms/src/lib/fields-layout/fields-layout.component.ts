import { ChangeDetectionStrategy, Component, Inject, InjectionToken, Input, OnInit, Type } from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as R from 'ramda';
import { FormField } from '../models';

export interface FieldsLayoutMap {
    [key: string]: Type<any>;
}

export const HLC_FIELDS_LAYOUT_MAP = new InjectionToken<FieldsLayoutMap>('HLC_FIELDS_LAYOUT_MAP');

@Component({
    selector: 'hlc-fields-layout',
    templateUrl: './fields-layout.component.html',
    styleUrls: ['./fields-layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FieldsLayoutComponent implements OnInit {
    private readonly fieldLayoutMap: FieldsLayoutMap;
    @Input() formGroup: FormGroup;
    @Input() fields: FormField.Field[];

    constructor(@Inject(HLC_FIELDS_LAYOUT_MAP) fieldLayoutMaps: FieldsLayoutMap[]) {
        this.fieldLayoutMap = R.mergeAll(fieldLayoutMaps);
    }

    ngOnInit() {}

    getComponentType(field: FormField.Field) {
        return this.fieldLayoutMap[field.kind];
    }

    getControl(id: string) {
        return this.formGroup.controls[id];
    }
}
