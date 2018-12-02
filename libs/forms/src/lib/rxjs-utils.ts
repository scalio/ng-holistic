import { Observable } from 'rxjs';
import { eqProps, prop } from 'ramda';
import { map, distinctUntilChanged } from 'rxjs/operators';

export const distinctPropChanged = <P extends keyof T, T>(propName: P) => ($: Observable<T>): Observable<T> =>
    $.pipe(
        distinctUntilChanged(eqProps(propName as string) as any)
    ) as any;

export const propChanged = <P extends keyof T, T>(propName: P) => ($: Observable<T>): Observable<T[P]> =>
    $.pipe(
        distinctPropChanged(propName),
        map(prop(propName as any) as any)
    ) as any;
