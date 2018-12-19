import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewChild
} from '@angular/core';
import { ClrFormComponent, ClrFormFields, ClrFormLayouts } from '@ng-holistic/clr-forms';
import { FilterService } from '../filter.service';
import { HLC_FORM_FIELD_WRAPPER } from '@ng-holistic/forms';
import { FilterInputWrapperComponent } from '../filter-input-wrapper/filter-input-wrapper.component';

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

    constructor(private readonly filterService: FilterService) {}

    ngOnInit() {}

    ngAfterViewInit() {
        this.filterService.setForm(this.form.formGroup);
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

    get form() {
        return this.clrForm.form;
    }

    get value() {
        return this.form.formGroup.value;
    }
}
