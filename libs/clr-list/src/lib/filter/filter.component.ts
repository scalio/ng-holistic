import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewChild,
    Optional,
    Inject
} from '@angular/core';
import { ClrFormComponent, ClrFormFields, ClrFormLayouts } from '@ng-holistic/clr-forms';
import { FilterService } from '../filter.service';
import { HLC_FORM_FIELD_WRAPPER, FormComponent } from '@ng-holistic/forms';
import { FilterInputWrapperComponent } from '../filter-input-wrapper/filter-input-wrapper.component';
import { HLC_CLR_FILTER_LABELS_CONFIG, FilterLabelsConfig, defaultFilterLabelsConfig } from './filter.config';

@Component({
    selector: 'hlc-clr-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: HLC_FORM_FIELD_WRAPPER,
            useValue: FilterInputWrapperComponent
        }
    ]
})
export class FilterComponent implements OnInit, AfterViewInit {
    _fields: ClrFormFields.FormField[];
    group: ClrFormLayouts.FieldsLayout;
    labelsConfig: FilterLabelsConfig;

    @Output() filter = new EventEmitter<any>();

    @ViewChild(ClrFormComponent) clrForm: ClrFormComponent;

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
        this.form.resetValue();
        this.filter.emit(this.value);
    }

    get form(): FormComponent {
        return this.clrForm.form;
    }

    get value() {
        return this.form.formGroup.value;
    }
}
