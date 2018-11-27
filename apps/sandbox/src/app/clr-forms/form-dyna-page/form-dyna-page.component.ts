import { ChangeDetectionStrategy, Component, forwardRef, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { ClrFormLayouts } from '@ng-holistic/clr-forms';
import { FormRebuidProvider, HLC_FORM_REBUILD_PROVIDER, FormFields } from '@ng-holistic/forms';
import * as R from 'ramda';
import { Subject } from 'rxjs';

const rebuildGroup = ({ groupsCount, fieldsCount }: { fieldsCount: number; groupsCount: number }, _: any) => (
    __: FormGroup
): ClrFormLayouts.ClrFormLayout => {
    console.log('+++', groupsCount, fieldsCount);
    const x = {
        kind: 'group',
        title: 'Root',
        $content: R.range(0, groupsCount).map(i => ({
            kind: 'group',
            title: `Group ${i}`,
            $content: [
                {
                    kind: 'fields',
                    fields: R.range(0, fieldsCount).map(
                        k =>
                            ({
                                id: `${i}.$text.${k}`,
                                kind: 'TextField' as 'TextField',
                                label: `Field ${i} ${k}`,
                                $validators: [Validators.required]
                            } as FormFields.Field)
                    )
                }
            ]
        }))
    };

    return x as any;
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

    filedsCount = 1;
    groupsCount = 1;

    group = rebuildGroup({ fieldsCount: this.filedsCount, groupsCount: this.groupsCount }, null);

    constructor() {}

    rebuildFormLayoutConfig(data: any, val: any) {
        return rebuildGroup(data, val);
    }

    ngOnInit() {}

    onAddField() {
        this.rebuildForm$.next({ fieldsCount: ++this.filedsCount, groupsCount: this.groupsCount });
    }

    onAddGroup() {
        this.rebuildForm$.next({ fieldsCount: this.filedsCount, groupsCount: ++this.groupsCount });
    }
}
