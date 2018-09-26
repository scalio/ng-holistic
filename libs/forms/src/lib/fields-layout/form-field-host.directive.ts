import { ComponentPortal, DomPortalHost } from '@angular/cdk/portal';
import {
    ApplicationRef,
    ComponentFactoryResolver,
    ComponentRef,
    Directive,
    ElementRef,
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
import { FormField, FormFieldComponent } from '../models';
import * as R from 'ramda';
import 'reflect-metadata';

export const HLC_FORM_FIELD_WRAPPER = new InjectionToken<Type<any>>('HLC_FORM_FIELD_WRAPPER');

const setComponentProperty = (comp: any) => (val: any, key: string) => {
    // TODO : check property Input attribute

    if (Reflect.getMetadata('design:type', comp, key)) {
        comp[key] = val;
    }
};

@Directive({
    selector: '[hlcFormFieldHost]'
})
export class FormFieldHostDirective implements OnInit, OnDestroy {
    private destroy$ = new Subject();
    private portalHost: DomPortalHost;
    private portal: ComponentPortal<FormFieldComponent.IFieldComponent<any>>;
    private componentRef: ComponentRef<FormFieldComponent.IFieldComponent<any>>;

    // tslint:disable-next-line:no-input-rename
    @Input('hlcFormFieldHost') field: FormField.BaseField<any>;
    // tslint:disable-next-line:no-input-rename
    @Input('hlcFormFieldHostComponentType') componentType: any;

    // tslint:disable-next-line:no-input-rename
    @Input('hlcFormFieldHostContainer') container: ElementRef;

    // tslint:disable-next-line:no-input-rename
    @Input('hlcFormFieldHostControl') control: FormControl;

    constructor(
        private readonly componentFactoryResolver: ComponentFactoryResolver,
        private readonly injector: Injector,
        private readonly appRef: ApplicationRef,
        private vcr: ViewContainerRef,
        @Optional()
        @Inject(HLC_FORM_FIELD_WRAPPER)
        private readonly wrapper: Type<any>
    ) {}

    ngOnInit() {
        // Create a portalHost from a DOM element
        this.portalHost = new DomPortalHost(
            this.container as any,
            this.componentFactoryResolver,
            this.appRef,
            this.injector
        );

        // Locate the component factory for the HeaderComponent
        this.portal = new ComponentPortal(this.componentType) as any;

        // Attach portal to host
        this.init();
        // setTimeout(() => this.init(), 0);
    }

    init() {
        this.componentRef = this.portalHost.attach(this.portal);

        if (this.wrapper) {
            // Insert generated component inside wrapper content
            const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.wrapper);
            const children = this.portalHost.outletElement.childNodes;
            this.vcr.createComponent(componentFactory, undefined, this.injector, [
                [children.item(children.length - 1)]
            ]);
        }

        // If component implements ValueAccessor interface use one to update it value

        if (this.componentRef.injector.get<ControlValueAccessor>(NG_VALUE_ACCESSOR)) {
            const valueAccessor = (this.componentRef.instance as any) as ControlValueAccessor;
            valueAccessor.registerOnChange((val: any) => {
                this.control.setValue(val);
            });
            this.control.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(val => valueAccessor.writeValue(val));
        }

        this.initComponentProperties();
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.portalHost.detach();
    }

    private initComponentProperties() {
        R.pipe(
            R.omit(['id', 'kind']),
            R.forEachObjIndexed(setComponentProperty(this.componentRef.instance))
        )(this.field);
    }
}
