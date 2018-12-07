import {
    ApplicationRef,
    ComponentFactoryResolver,
    ComponentRef,
    Directive,
    EmbeddedViewRef,
    Inject,
    InjectionToken,
    Injector,
    Input,
    OnDestroy,
    OnInit,
    Optional,
    Type,
    ViewContainerRef,
    ViewRef
} from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil, filter } from 'rxjs/operators';
import { FormFields } from '../models/form-fields.type';
import { setComponentProperties } from '../set-component-properties';
import { CustomFieldDirective } from './custom-field.directive';
import { getViewComponent } from './get-view-component';

export const HLC_FORM_FIELD_WRAPPER = new InjectionToken<Type<any>>('HLC_FORM_FIELD_WRAPPER');

@Directive({
    selector: '[hlcFormFieldHost]'
})
export class FormFieldHostDirective implements OnInit, OnDestroy {
    private componentRef: ComponentRef<any> | undefined;
    private wrapperRef: ComponentRef<any> | undefined;
    private destroy$ = new Subject();

    // tslint:disable-next-line:no-input-rename
    @Input('hlcFormFieldHost')
    field: FormFields.FormField<any>;
    // tslint:disable-next-line:no-input-rename
    @Input('hlcFormFieldHostComponentType')
    componentType: Type<any>;
    // tslint:disable-next-line:no-input-rename
    @Input('hlcFormFieldHostControl')
    control: FormControl;
    // tslint:disable-next-line:no-input-rename
    @Input('hlcFormFieldHostCustomField')
    customField: CustomFieldDirective | undefined;

    constructor(
        private readonly componentFactoryResolver: ComponentFactoryResolver,
        private readonly injector: Injector,
        private readonly vcr: ViewContainerRef,
        private readonly appRef: ApplicationRef,
        @Optional()
        @Inject(HLC_FORM_FIELD_WRAPPER)
        private readonly wrapper: Type<any>
    ) {}

    ngOnInit() {
        this.init();
    }

    private init() {
        if (this.customField) {
            this.initCustomField();
            return;
        }
        const factory = this.componentFactoryResolver.resolveComponentFactory(this.componentType);
        this.componentRef = factory.create(this.injector);
        const view = this.componentRef.hostView as EmbeddedViewRef<any>;

        if (this.wrapper) {
            // Insert generated component inside wrapper content
            const wrapperFactory = this.componentFactoryResolver.resolveComponentFactory(this.wrapper);
            this.wrapperRef = this.vcr.createComponent(wrapperFactory, undefined, this.injector, [
                [view.rootNodes[view.rootNodes.length - 1]]
            ]);

            setComponentProperties(
                ['kind'],
                wrapperFactory,
                this.wrapperRef.changeDetectorRef,
                this.destroy$,
                this.wrapperRef.instance,
                this.field
            );

            // control view is not attached directly to viewcontainerref, we need to attach it to CD manually
            this.appRef.attachView(view);

            this.wrapperRef.changeDetectorRef.detectChanges();
        } else {
            this.vcr.insert(view);
        }

        const controlValueAccessor = this.componentRef.injector.get<ControlValueAccessor>(NG_VALUE_ACCESSOR)
            ? (this.componentRef.instance as ControlValueAccessor)
            : null;

        if (controlValueAccessor) {
            // If component implements ValueAccessor interface use one to sync values
            // between form control and the component
            this.syncValueChanges(view, controlValueAccessor);
            // Set initial component value from `form value`
            controlValueAccessor.writeValue(this.control.value);
        }

        this.syncControlValue();

        // Sync component visibility
        // Show / hide container component
        this.syncVisibility(this.wrapperRef ? this.wrapperRef.hostView : view);

        setComponentProperties(
            ['kind'],
            factory,
            this.componentRef.changeDetectorRef,
            this.destroy$,
            this.componentRef.instance,
            this.field
        );

        view.detectChanges();

        // when form rebuilt we need update control's value
        // this.control.updateValueAndValidity({ onlySelf: true, emitEvent: false });
    }

    ngOnDestroy() {
        this.destroy$.next();
        if (this.componentRef) {
            this.componentRef.destroy();
        }
        if (this.wrapperRef) {
            this.wrapperRef.destroy();
        }
    }

    private syncVisibility(view: ViewRef) {
        if (this.field && this.field.$hidden) {
            this.field.$hidden
                .pipe(
                    takeUntil(this.destroy$),
                    distinctUntilChanged()
                )
                .subscribe(hidden => {
                    const i = this.vcr.indexOf(view);

                    if (hidden && i !== -1) {
                        this.vcr.detach(i);
                    } else if (!hidden && i === -1) {
                        this.vcr.insert(view, 0);
                    }
                });
        }
    }

    private syncValueChanges(view: ViewRef, valueAccessor: ControlValueAccessor) {
        // TODO: reactive
        let valueAccessorVal: any = null;
        // when component value changed reflect one to the form control
        valueAccessor.registerOnChange((val: any) => {
            valueAccessorVal = val;
            this.control.setValue(val);
            this.control.markAsDirty({ onlySelf: false });
        });
        // when form control value changed reflect one to the component
        this.control.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(val => {
            // update component value only if it wasn't sourced from itself (component -> control -> component)
            if (val !== valueAccessorVal) {
                valueAccessor.writeValue(val);
                view.markForCheck();
            }
        });
    }

    /**
     * Set form's control value from field $value property.
     * It updates both form control value and component value, in contrast with just `value` property update
     * which will update only component value.
     */
    private syncControlValue() {
        if (this.field.$value) {
            this.field.$value
                .pipe(
                    takeUntil(this.destroy$),
                    distinctUntilChanged(),
                    filter(val => this.control.value !== val)
                )
                .subscribe(val => {
                    this.control.setValue(val || '');
                });
        }
    }

    private initCustomField() {
        if (!this.customField) {
            return;
        }

        const view = this.vcr.createEmbeddedView(this.customField.templateRef, { control: this.control });

        if (this.field && this.field.kind === 'CustomField') {
            const field = this.field as FormFields.CustomFormField;
            if (field.valueAccessor) {
                const valueAccessorComponent = getViewComponent(field.valueAccessor, view);
                this.syncValueChanges(view, valueAccessorComponent);
            }
            this.syncVisibility(view);
        }
    }
}
