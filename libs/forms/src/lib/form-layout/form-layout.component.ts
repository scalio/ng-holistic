import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit, forwardRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { IFormGroup } from '../models';
import { FormGroupProvider, HLC_FORM_GROUP_PROVIDER } from '../fields-layout';

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
    private destroy$ = new Subject();
    @Input() form: FormGroup;
    @Input() group: IFormGroup<any> | undefined;

    ngOnInit() {
        if (!this.group) {
            return;
        }
    }

    ngOnDestroy() {
        this.destroy$.next();
    }
}
