export interface IFormGroup<T extends string> {
    kind: T;
    $content: IFormGroup<T>[];
}
