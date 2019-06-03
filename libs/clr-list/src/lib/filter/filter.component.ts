import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    EventEmitter,
    Inject,
    Input,
    OnDestroy,
    OnInit,
    Optional,
    Output,
    Renderer2,
    ViewChild
} from '@angular/core';
import { HlcHotkeysContainerService } from '@ng-holistic/clr-common';
import { ClrFormFields, ClrFormLayouts, HlcClrFormComponent } from '@ng-holistic/clr-forms';
import {
    HlcFormComponent,
    HLC_FIELDS_LAYOUT_FOCUSABLE_INPUTS_SELECTOR,
    HLC_FORM_FIELD_WRAPPER
} from '@ng-holistic/forms';
import * as R from 'ramda';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { HlcClrFilterInputWrapperComponent } from '../filter-input-wrapper/filter-input-wrapper.component';
import { FilterService } from '../filter.service';
import { defaultFilterLabelsConfig, FilterLabelsConfig, HLC_CLR_FILTER_LABELS_CONFIG } from './filter.config';
import { HlcFilterKeysManagerService } from './utils/filter-keys-manager';

@Component({
    selector: 'hlc-clr-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: HLC_FORM_FIELD_WRAPPER,
            useValue: HlcClrFilterInputWrapperComponent
        },
        HlcHotkeysContainerService,
        HlcFilterKeysManagerService
    ]
})
export class HlcClrFilterComponent implements OnInit, OnDestroy, AfterViewInit {
    private destroy$ = new Subject<any>();
    private _fields: ClrFormFields.FormField[];
    group: ClrFormLayouts.FieldsLayout;
    labelsConfig: FilterLabelsConfig;

    @Output() filter = new EventEmitter<any>();

    @ViewChild(HlcClrFormComponent, { static: false }) clrForm: HlcClrFormComponent;

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
        filterKeysManager: HlcFilterKeysManagerService,
        private readonly hotkeysContainer: HlcHotkeysContainerService,
        private readonly elementRef: ElementRef,
        private readonly renderer: Renderer2,
        @Optional() private readonly filterService?: FilterService,
        @Optional() @Inject(HLC_CLR_FILTER_LABELS_CONFIG) labelsConfig?: FilterLabelsConfig
    ) {
        this.labelsConfig = labelsConfig || defaultFilterLabelsConfig;

        filterKeysManager.refresh$.pipe(takeUntil(this.destroy$)).subscribe(() => {
            this.onFilter();
        });

        filterKeysManager.reset$.pipe(takeUntil(this.destroy$)).subscribe(() => {
            this.onReset();
        });
    }

    ngOnInit() {}

    ngAfterViewInit() {
        if (this.filterService) {
            this.filterService.setForm(this.form.formGroup);
        }

        // when children component recieve focus filter component must be focused too
        const all = this.nativeElement.querySelectorAll(HLC_FIELDS_LAYOUT_FOCUSABLE_INPUTS_SELECTOR);

        all.forEach(el => {
            this.renderer.listen(el, 'focus', () => this.onFocus());
            this.renderer.listen(el, 'blur', () => this.onBlur());
        });

        const childHasFocus = this.nativeElement.querySelector('*:focus');
        if (childHasFocus) {
            this.onFocus();
        }
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.hotkeysContainer.destroy$.next();
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

    onFocus() {
        console.log('filter:onFocus');
        if (this.form.hasFocusedElement) {
            this.hotkeysContainer.focus$.next(true);
        } else {
            this.form.focusFirstInput();
        }
    }

    onBlur() {
        console.log('filter:onBlur');
        this.hotkeysContainer.focus$.next(false);
    }

    private get nativeElement() {
        return this.elementRef.nativeElement as HTMLElement;
    }
}
