import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { IFormGroup } from '../models';

@Component({
    selector: 'hlc-form-layout',
    templateUrl: './form-layout.component.html',
    styleUrls: ['./form-layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormLayoutComponent implements OnInit, OnDestroy {
    private destroy$ = new Subject();
    form: FormGroup;
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
