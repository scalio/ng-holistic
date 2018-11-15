import { Observable } from 'rxjs';

export interface IFormGroup<T extends string, TContent extends IFormGroup<string, any> = any> {
    kind: T;
    $content?: TContent[];
    /**
     * Hide group and disbale all components on it
     */
    $hidden?: Observable<boolean>;
}
