import { Observable } from 'rxjs';
import { eqProps, prop } from 'ramda';
import { map, distinctUntilChanged } from 'rxjs/operators';

/**
    Emits object only if property on object was changed
    @param propName - name of teh property
*/
export const distinctPropChanged = <P extends keyof T, T>(propName: P) => ($: Observable<T>): Observable<T> =>
    $.pipe(
        distinctUntilChanged(eqProps(propName as string) as any)
    ) as any;

/**
 * Emits property value only if property on object was changed
 * @param propName - name of the property
 */
export const propChanged = <P extends keyof T, T>(propName: P) => ($: Observable<T>): Observable<T[P]> =>
    $.pipe(
        distinctPropChanged(propName),
        map(prop(propName as any) as any)
    ) as any;
