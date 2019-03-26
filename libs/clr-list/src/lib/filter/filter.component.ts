import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Inject,
    Input,
    OnInit,
    Optional,
    Output,
    ViewChild
} from '@angular/core';
import { ClrFormFields, ClrFormLayouts, HlcClrFormComponent } from '@ng-holistic/clr-forms';
import { HlcFormComponent, HLC_FORM_FIELD_WRAPPER } from '@ng-holistic/forms';
import * as R from 'ramda';
import { HlcClrFilterInputWrapperComponent } from '../filter-input-wrapper/filter-input-wrapper.component';
import { FilterService } from '../filter.service';
import { defaultFilterLabelsConfig, FilterLabelsConfig, HLC_CLR_FILTER_LABELS_CONFIG } from './filter.config';

@Component({
    selector: 'hlc-clr-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: HLC_FORM_FIELD_WRAPPER,
            useValue: HlcClrFilterInputWrapperComponent
        }
    ]
})
export class HlcClrFilterComponent implements OnInit, AfterViewInit {
    _fields: ClrFormFields.FormField[];
    group: ClrFormLayouts.FieldsLayout;
    labelsConfig: FilterLabelsConfig;

    @Output() filter = new EventEmitter<any>();

    @ViewChild(HlcClrFormComponent) clrForm: HlcClrFormComponent;

    @Input() set fields(val: ClrFormFields.FormField[]) {
        if (val === this._fields) {
            return;
        }
        this._fields = val;
        this.group =
            this._fields &&
            ({
                kind: 'fields',
                fields: this._fields
            } as ClrFormLayouts.FieldsLayout);
    }

    constructor(
        @Optional() private readonly filterService?: FilterService,
        @Optional() @Inject(HLC_CLR_FILTER_LABELS_CONFIG) labelsConfig?: FilterLabelsConfig
    ) {
        this.labelsConfig = labelsConfig || defaultFilterLabelsConfig;
    }

    ngOnInit() {}

    ngAfterViewInit() {
        if (this.filterService) {
            this.filterService.setForm(this.form.formGroup);
        }
    }

    get hasChanges() {
        return this.form.hasChanges;
    }

    onFilter() {
        this.filter.emit(this.value);
    }

    onReset() {
        /**
         * TODO
         * If form filter value was set (restored) on list initialization, reset stops to reset displayed
         * values in inputs, though form value is actually reset.
         * Just set all forms value to '' and then immediately reset them - this will update input's displayed values
         */
        const initValue = this.form.initialValue;
        const initValueHack =
            initValue &&
            R.pipe(
                R.toPairs,
                R.map(([k]) => [k, '']),
                R.fromPairs
            )(initValue);
        this.form.formGroup.patchValue(initValueHack);

        this.form.resetValue();
        this.filter.emit(this.value);
    }

    get form(): HlcFormComponent {
        return this.clrForm.form;
    }

    get value() {
        return this.form.formGroup.value;
    }
}
