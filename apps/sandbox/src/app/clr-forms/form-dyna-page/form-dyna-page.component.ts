import { ChangeDetectionStrategy, Component, forwardRef, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { ClrFormLayouts } from '@ng-holistic/clr-forms';
import { FormRebuidProvider, HLC_FORM_REBUILD_PROVIDER, FormFields } from '@ng-holistic/forms';
import * as R from 'ramda';
import { Subject } from 'rxjs';

const rebuildGroup = (
    { tabsCount, groupsCount, fieldsCount }: { tabsCount: number; fieldsCount: number; groupsCount: number },
    _: any
) => (__: FormGroup): ClrFormLayouts.ClrFormLayout => {
    return {
        kind: 'tabs',
        $content: R.range(0, tabsCount).map(t => ({
            kind: 'tab',
            title: `Tab ${t}`,
            $content: R.range(0, groupsCount).map(i => ({
                kind: 'group',
                title: `Group ${i}`,
                $content: [
                    {
                        kind: 'fields',
                        fields: R.range(0, fieldsCount).map(
                            k =>
                                ({
                                    id: `${t}.${i}.$text.${k}`,
                                    kind: 'TextField' as 'TextField',
                                    label: `Field ${t} ${i} ${k}`,
                                    $validators: [Validators.required]
                                } as FormFields.Field)
                        )
                    }
                ]
            }))
        }))
    } as any;
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

    tabsCount = 1;
    groupsCount = 1;
    filedsCount = 1;

    group = rebuildGroup(
        { tabsCount: this.tabsCount, groupsCount: this.groupsCount, fieldsCount: this.filedsCount },
        null
    );

    constructor() {}

    rebuildFormLayoutConfig(data: any, val: any) {
        return rebuildGroup(data, val);
    }

    ngOnInit() {}

    onAddTab() {
        this.rebuildForm$.next({
            tabsCount: ++this.tabsCount,
            fieldsCount: this.filedsCount,
            groupsCount: this.groupsCount
        });
    }

    onAddGroup() {
        this.rebuildForm$.next({
            tabsCount: this.tabsCount,
            fieldsCount: this.filedsCount,
            groupsCount: ++this.groupsCount
        });
    }

    onAddField() {
        this.rebuildForm$.next({
            tabsCount: this.tabsCount,
            fieldsCount: ++this.filedsCount,
            groupsCount: this.groupsCount
        });
    }
}
