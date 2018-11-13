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
    ViewContainerRef
} from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormFields } from '../models';
import { setComponentProperties } from '../set-component-properties';
import { CustomFieldDirective } from './custom-field.directive';

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
    field: FormFields.BaseField<any>;
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

        if (this.componentRef.injector.get<ControlValueAccessor>(NG_VALUE_ACCESSOR)) {
            // If component implements ValueAccessor interface use one to sync values
            // between form control and the component
            this.syncValueChanges(view);
        }

        setComponentProperties(
            ['kind'],
            factory,
            this.componentRef.changeDetectorRef,
            this.destroy$,
            this.componentRef.instance,
            this.field
        );

        view.detectChanges();
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

    private syncValueChanges(view: EmbeddedViewRef<any>) {
        if (!this.componentRef) {
            return;
        }
        // TODO: reactive
        let valueAccessorVal: any = null;
        const valueAccessor = (this.componentRef.instance as any) as ControlValueAccessor;
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

    private initCustomField() {
        if (!this.customField) {
            return;
        }
        const view = this.vcr.createEmbeddedView(this.customField.templateRef);
        this.vcr.insert(view);
    }
}
