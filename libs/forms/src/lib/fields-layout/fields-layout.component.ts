import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    Inject,
    InjectionToken,
    Input,
    OnInit,
    Optional,
    Renderer2,
    Type
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as R from 'ramda';
import { Observable, of } from 'rxjs';
import { FormFields } from '../models/form-fields.type';
import { CustomFieldDirective } from './custom-field.directive';

/**
 * Map of key - type fields which could be possible generated on form layout
 */
export interface FieldsLayoutMap {
    [key: string]: Type<any>;
}

export const HLC_FIELDS_LAYOUT_MAP = new InjectionToken<FieldsLayoutMap>('HLC_FIELDS_LAYOUT_MAP');

export interface FormGroupProvider {
    form: FormGroup;
}

export const HLC_FORM_GROUP_PROVIDER = new InjectionToken<FormGroupProvider>('HLC_FORM_GROUP_PROVIDER');

export interface CustomFieldsProvider {
    customFields: CustomFieldDirective[] | undefined;
}

export const HLC_FORM_CUSTOM_FIELDS_PROVIDER = new InjectionToken<CustomFieldsProvider>(
    'HLC_FORM_CUSTOM_FIELDS_PROVIDER'
);

export interface FieldsLayoutConfig {
    formClass: string | Observable<string>;
}

export const HLC_FIELDS_LAYOUT_CONFIG = new InjectionToken<FieldsLayoutConfig>('HLC_FIELDS_LAYOUT_CONFIG');

const inputElementSelectors = ['focusable', 'select', 'input', 'textarea', 'button'];

const inputElementSelectorsWithSpecificity = (spec: string) => inputElementSelectors.map(m => `${spec} ${m}`);

export const HLC_FIELDS_LAYOUT_FOCUSABLE_INPUTS_SELECTOR = inputElementSelectorsWithSpecificity('.hlc-form-input').join(
    ','
);

const getInputsSelector = (specificity?: string) => {
    specificity = specificity ? specificity + ' .hlc-form-input' : '.hlc-form-input';
    return inputElementSelectorsWithSpecificity(specificity);
};


const getFirstInput = (elementRef: ElementRef, specificity?: string) => {
    const nativeElement = elementRef.nativeElement;
    const selector = getInputsSelector(specificity);
    return nativeElement.querySelector(selector) as HTMLElement;
};

export const getAllInputs = (elementRef: ElementRef, specificity?: string) => {
    const nativeElement = elementRef.nativeElement;
    const selector = getInputsSelector(specificity);
    return nativeElement.querySelectorAll(selector) as HTMLElement[];
};

export const focusFirstInput = (elementRef: ElementRef, specificity?: string) => {
    const firstInput = getFirstInput(elementRef, specificity);
    if (firstInput) {
        (firstInput as HTMLElement).focus();
    }
};

@Component({
    selector: 'hlc-fields-layout',
    templateUrl: './fields-layout.component.html',
    styleUrls: ['./fields-layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HlcFieldsLayoutComponent implements OnInit, AfterViewInit {
    readonly formClass$: Observable<string | undefined>;
    private readonly fieldLayoutMap: FieldsLayoutMap;

    @Input()
    fields: FormFields.Field[];

    constructor(
        @Inject(HLC_FIELDS_LAYOUT_MAP) fieldLayoutMaps: FieldsLayoutMap[],
        @Inject(HLC_FORM_GROUP_PROVIDER) private readonly formGroupProvider: FormGroupProvider,
        @Inject(HLC_FORM_CUSTOM_FIELDS_PROVIDER) private readonly customFieldsProvider: CustomFieldsProvider,
        @Optional() @Inject(HLC_FIELDS_LAYOUT_CONFIG) private readonly fieldsLayoutConfig: FieldsLayoutConfig,
        private readonly elementRef: ElementRef,
        private readonly renderer: Renderer2
    ) {
        this.fieldLayoutMap = R.mergeAll(fieldLayoutMaps);

        this.formClass$ =
            this.fieldsLayoutConfig && this.fieldsLayoutConfig.formClass
                ? this.fieldsLayoutConfig.formClass instanceof Observable
                    ? this.fieldsLayoutConfig.formClass
                    : of(this.fieldsLayoutConfig.formClass)
                : of(undefined);
    }

    ngOnInit() {}

    ngAfterViewInit() {
        this.focusFirstInput();
    }

    focusFirstInput() {
        // Set focus on first input element on the form
        // Each generated element has hlc-form-input class if component
        // has many potentially focusable elements it could be defined explicilty by using hlc-element-focusable class
        const firstInput = getFirstInput(this.elementRef);

        if (firstInput) {
            this.renderer.setAttribute(firstInput, 'autofocus', 'autofocus');
            firstInput.focus();
        }
    }

    get formGroup() {
        return this.formGroupProvider && this.formGroupProvider.form;
    }

    getComponentType(field: FormFields.Field) {
        return this.fieldLayoutMap[field.kind];
    }

    getControl(id: string) {
        return this.formGroup.controls[id];
    }

    getCustomField(id: string) {
        return (
            this.customFieldsProvider.customFields &&
            this.customFieldsProvider.customFields.find(x => x.hlcCustomField === id)
        );
    }

    trackByFields(_: number, field: FormFields.Field) {
        return field.id;
    }
}
