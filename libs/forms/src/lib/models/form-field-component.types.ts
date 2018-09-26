export namespace FormFieldComponent {
    export interface IFieldComponent<T extends string> {
        kind: T;
    }

    export interface ITextFieldComponent extends IFieldComponent<'TextField'> {
        readonly?: boolean;
    }
}
