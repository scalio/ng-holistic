import { eqProps, prop, equals } from 'ramda';
import { combineLatest, Observable, merge } from 'rxjs';
import { distinctUntilChanged, map, take, delay, skip } from 'rxjs/operators';

/**
 * When field is recallculated and this is fisrt calculation after form init,
 * there could be value changed after check exception
 * since [init value changed] -> [layout fisrt detectChanges] -> recalc -> new value on component.
 * Delay first recalc with this method.
 */
export const delayFirst = <T>($: Observable<T>): Observable<T> => {
    const head$ = $.pipe(
        take(1),
        delay(0)
    );
    const tail$ = $.pipe(skip(1));
    return merge(head$, tail$);
};

/**
    Emits object only if property on object was changed
    @param propName - name of teh property
*/
export const distinctPropChanged = <P extends keyof T, T>(propName: P) => ($: Observable<T>): Observable<T> =>
    $.pipe(
        delayFirst,
        distinctUntilChanged(eqProps(propName as string) as any)
    ) as any;

/**
 * Emits property value only if property on object was changed
 * @param propName - name of the property
 */
export const propChanged = <P extends keyof T, T>(propName: P) => ($: Observable<T>): Observable<T[P]> =>
    $.pipe(
        delayFirst,
        distinctPropChanged(propName),
        map(prop(propName as any) as any)
    ) as any;

/**
 * Emits property values only if properties on object was changed
 * @param propNames - name of the property
 */
export const propsChanged = (...propNames: string[]) => ($: Observable<any>): Observable<any[]> =>
    combineLatest(...propNames.map(p => propChanged<any, any>(p)($))).pipe(distinctUntilChanged(equals)) as any;
