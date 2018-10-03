import { ChangeDetectorRef, ComponentFactory, EventEmitter } from '@angular/core';
import * as R from 'ramda';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

const isPropInput = (factory: ComponentFactory<any>, propName: string) => {
    //const meta = getPropMeta(comp, propName);
    //return meta && R.find(R.propEq(NG_METADATA_NAME, NG_METADATA_NAME_INPUT), meta);
    return !!factory.inputs.find(R.propEq('propName', propName));
};

const isPropOutput = (factory: ComponentFactory<any>, propName: string) => {
    return !!factory.outputs.find(R.propEq('propName', propName));
};

const setComponentProperty = (
    factory: ComponentFactory<any>,
    cdr: ChangeDetectorRef,
    destroy$: Observable<any>,
    comp: any
) => (val: any, key: string) => {
    if (isPropOutput(factory, key)) {
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

    if (isPropInput(factory, key)) {
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
