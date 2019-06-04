import { ChangeDetectorRef, ComponentFactory, EventEmitter } from '@angular/core';
import * as R from 'ramda';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

/**
 * Given name of the `template` input property name returns real property name if one exists
 * @param factory Factory of the component with property
 * @param propName Temaplate name of the property
 */
const inputPropName = (factory: ComponentFactory<any>, propName: string) => {
    //const meta = getPropMeta(comp, propName);
    //return meta && R.find(R.propEq(NG_METADATA_NAME, NG_METADATA_NAME_INPUT), meta);
    const prop = factory.inputs.find(R.propEq('templateName', propName));
    return prop && prop.propName;
};

/**
 * Given name of the `template` output property name returns real property name if one exists
 * @param factory Factory of the component with property
 * @param propName Temaplate name of the property
 */
const outputPropName = (factory: ComponentFactory<any>, propName: string) => {
    const prop = factory.outputs.find(R.propEq('templateName', propName));
    return prop && prop.propName;
};

/**
 * Set property value, event if property is as `set` method
 * @param propName property name
 * @param obj object with property
 * @param val value to set
 */
const setPropValue = (propName: string, obj: any, val: any) => {
    if (typeof obj[propName] === 'function') {
        // property is `set` method
        obj[propName](val);
    } else {
        obj[propName] = val;
    }
};

const setComponentOutputProperty = (factory: ComponentFactory<any>, destroy$: Observable<any>, comp: any) => (
    val: any,
    key: string
) => {
    const outPropName = outputPropName(factory, key);
    if (outPropName) {
        if (!(comp[outPropName] instanceof EventEmitter)) {
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
};

const setComponentInputProperty = (
    factory: ComponentFactory<any>,
    cdr: ChangeDetectorRef,
    destroy$: Observable<any>,
    comp: any
) => (val: any, key: string) => {
    const inPropName = inputPropName(factory, key);
    if (inPropName) {
        // Input property could be bound to observable, this case update property every time observable emit new value
        if (val instanceof Observable) {
            val.pipe(takeUntil(destroy$)).subscribe(x => {
                comp[inPropName] = x;
                cdr.markForCheck();
            });
            return;
        }
        setPropValue(inPropName, comp, val);
        return;
    }
};

const setComponentProperty = (
    factory: ComponentFactory<any>,
    cdr: ChangeDetectorRef,
    destroy$: Observable<any>,
    comp: any
) => (val: any, key: string) => {
    setComponentOutputProperty(factory, destroy$, comp)(val, key);
    setComponentInputProperty(factory, cdr, destroy$, comp)(val, key);
};

export const setComponentProperties = (
    omitProps: string[],
    componentFactory: ComponentFactory<any>,
    cdr: ChangeDetectorRef,
    destroy$: Observable<any>,
    component: any,
    propsBag: any
) => {
    R.pipe(
        R.omit(omitProps),
        R.forEachObjIndexed(setComponentProperty(componentFactory, cdr, destroy$, component))
    )(propsBag);
};
