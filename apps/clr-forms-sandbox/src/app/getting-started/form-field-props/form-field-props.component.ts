import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

// tslint:disable-next-line:max-line-length
const classDef = `
    export interface BaseField<T extends string> {
        id: string;
        kind: T;
        value?: any;
    }

    export interface FormField<T extends string = any, TProps = { [key: string]: any }> extends BaseField<T> {
        validators?: FormFieldProp<ValidatorFn[]>;
        /**
        * Hide field and disable asscoited form control
        */
        hidden?: Observable<boolean>;
        value?: Observable<any>;
        /**
        * Convention property, the same as props.label, since supposenly
        * each field definition will have 'label' property
        * and it would be inconvinient to define each time { props : { label : 'Label' } }
        */
        label?: string;
        props?: TProps;
    }
}

`;

@Component({
    selector: 'hlc-form-field-props',
    templateUrl: './form-field-props.component.html',
    styleUrls: ['./form-field-props.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormFieldPropsComponent implements OnInit {

    classDef = classDef;

    constructor() {}

    ngOnInit() {}
}
