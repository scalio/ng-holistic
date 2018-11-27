import { ChangeDetectionStrategy, Component, forwardRef, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ClrFormLayouts } from '@ng-holistic/clr-forms';
import { FormRebuidProvider, HLC_FORM_REBUILD_PROVIDER } from '@ng-holistic/forms';
import * as R from 'ramda';
import { Subject } from 'rxjs';

const rebuildGroup = (rebuildData: string | undefined, formVal: any) => (
    _: FormGroup
): ClrFormLayouts.ClrFormLayout => {
    const controlsLength = R.keys(formVal).length;
    const genFieldsLength = rebuildData === 'addField' ? controlsLength + 1 : controlsLength;
    const x = {
        kind: 'group',
        title: 'Group',
        $content: [
            {
                kind: 'fields',
                fields:
                    genFieldsLength === 0
                        ? []
                        : R.range(0, genFieldsLength).map(i => ({
                              id: `$text.${i}`,
                              kind: 'TextField' as 'TextField',
                              label: `Field ${i}`
                          }))
            }
        ]
    };

    console.log('===', x, rebuildData);
    return x as any;
};

const group = (formGroup: FormGroup): ClrFormLayouts.ClrFormLayout => {
    return rebuildGroup(undefined, null)(formGroup);
};

@Component({
    selector: 'hlc-form-dyna-page',
    templateUrl: './form-dyna-page.component.html',
    styleUrls: ['./form-dyna-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: HLC_FORM_REBUILD_PROVIDER,
            useExisting: forwardRef(() => FormDynaPageComponent)
        }
    ]
})
export class FormDynaPageComponent implements OnInit, FormRebuidProvider {
    rebuildForm$ = new Subject<any>();

    group = group;

    constructor() {}

    rebuildFormLayoutConfig(data: any, val: any) {
        console.log('+++', val);
        return rebuildGroup(data, val);
    }

    ngOnInit() {}

    onAddField() {
        this.rebuildForm$.next('addField');
    }
}
