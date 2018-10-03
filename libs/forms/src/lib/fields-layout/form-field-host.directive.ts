import {
    ChangeDetectorRef,
    ComponentFactoryResolver,
    Directive,
    EmbeddedViewRef,
    EventEmitter,
    Inject,
    InjectionToken,
    Injector,
    Input,
    OnDestroy,
    OnInit,
    Optional,
    Type,
    ViewContainerRef,
    ComponentRef
} from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as R from 'ramda';
import 'reflect-metadata';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormField } from '../models';

export const HLC_FORM_FIELD_WRAPPER = new InjectionToken<Type<any>>('HLC_FORM_FIELD_WRAPPER');

const PROP_METADATA = '__prop__metadata__';
const NG_METADATA_NAME = 'ngMetadataName';
const NG_METADATA_NAME_INPUT = 'Input';
const NG_METADATA_NAME_OUTPUT = 'Output';

const getMeta = (comp: any) => {
    const constructor = comp['constructor'];
    return R.has(PROP_METADATA, constructor) && constructor[PROP_METADATA];
};

const getPropMeta = (comp: any, propName: string) => {
    const meta = getMeta(comp);
    if (!meta) {
        return undefined;
    }
    return R.has(propName, meta) && meta[propName];
};

const isPropInput = (comp: any, propName: string) => {
    const meta = getPropMeta(comp, propName);
    return meta && R.find(R.propEq(NG_METADATA_NAME, NG_METADATA_NAME_INPUT), meta);
};

const isPropOutput = (comp: any, propName: string) => {
    const meta = getPropMeta(comp, propName);
    return meta && R.find(R.propEq(NG_METADATA_NAME, NG_METADATA_NAME_OUTPUT), meta);
};

const setComponentProperty = (cdr: ChangeDetectorRef, destroy$: Observable<any>, comp: any) => (
    val: any,
    key: string
) => {
    if (isPropOutput(comp, key)) {
        if (!(comp[key] instanceof EventEmitter)) {
            throw new Error('Output property must have EventEmitter type');
        }
        if (!(val instanceof Subject)) {
            throw new Error('For Output properties, field property must have Subject type');
        }
        // dispatch from output to subject
        (comp[key] as EventEmitter<any>)
            .asObservable()
            .pipe(takeUntil(destroy$))
            .subscribe(x => {
                (val as Subject<any>).next(x);
            });
        return;
    }

    if (isPropInput(comp, key)) {
        if (val instanceof Observable) {
            val.pipe(takeUntil(destroy$)).subscribe(x => {
                comp[key] = x;
                cdr.detectChanges();
            });
            return;
        }

        comp[key] = val;
        return;
    }
};

const setComponentProperties = (
    cdr: ChangeDetectorRef,
    destroy$: Observable<any>,
    component: any,
    field: FormField.BaseField<any>
) => {
    R.pipe(
        R.omit(['id', 'kind']),
        R.forEachObjIndexed(setComponentProperty(cdr, destroy$, component))
    )(field);
};

@Directive({
    selector: '[hlcFormFieldHost]'
})
export class FormFieldHostDirective implements OnInit, OnDestroy {
    private componentRef: ComponentRef<any>;
    private wrapperRef: ComponentRef<any> | undefined;
    private destroy$ = new Subject();

    // tslint:disable-next-line:no-input-rename
    @Input('hlcFormFieldHost') field: FormField.BaseField<any>;
    // tslint:disable-next-line:no-input-rename
    @Input('hlcFormFieldHostComponentType') componentType: Type<any>;
    // tslint:disable-next-line:no-input-rename
    @Input('hlcFormFieldHostControl') control: FormControl;

    constructor(
        private readonly componentFactoryResolver: ComponentFactoryResolver,
        private readonly injector: Injector,
        private vcr: ViewContainerRef,
        @Optional()
        @Inject(HLC_FORM_FIELD_WRAPPER)
        private readonly wrapper: Type<any>
    ) {}

    ngOnInit() {
        this.init();
    }

    init() {
        const factory = this.componentFactoryResolver.resolveComponentFactory(this.componentType);
        this.componentRef = factory.create(this.injector);
        const view = this.componentRef.hostView as EmbeddedViewRef<any>;

        this.componentRef.changeDetectorRef.detach();

        if (this.wrapper) {
            // Insert generated component inside wrapper content
            const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.wrapper);
            this.wrapperRef = this.vcr.createComponent(componentFactory, undefined, this.injector, [
                [view.rootNodes[view.rootNodes.length - 1]]
            ]);

            this.wrapperRef.changeDetectorRef.detach();

            setComponentProperties(
                this.wrapperRef.changeDetectorRef,
                this.destroy$,
                this.wrapperRef.instance,
                this.field
            );

            this.wrapperRef.changeDetectorRef.detectChanges();
        } else {
            this.vcr.insert(view);
        }

        // If component implements ValueAccessor interface use one to update it value

        if (this.componentRef.injector.get<ControlValueAccessor>(NG_VALUE_ACCESSOR)) {
            const valueAccessor = (this.componentRef.instance as any) as ControlValueAccessor;
            valueAccessor.registerOnChange((val: any) => {
                this.control.setValue(val);
            });
            this.control.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(val => {
                valueAccessor.writeValue(val);
                view.detectChanges();
            });
        }

        setComponentProperties(
            this.componentRef.changeDetectorRef,
            this.destroy$,
            this.componentRef.instance,
            this.field
        );

        view.detectChanges();
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.componentRef.destroy();
        if (this.wrapperRef) {
            this.wrapperRef.destroy();
        }
    }
}
