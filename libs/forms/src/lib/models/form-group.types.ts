export interface IFormGroup<T extends string, TContent extends IFormGroup<string, any> = any> {
    kind: T;
    $content?: TContent[];
}
