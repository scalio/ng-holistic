import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

const inputContainerConfig1 = `
    export const inputContainerConfig: InputContainerConfig = {
        return {
            showRequiredHint: 'optional',
            optionalLabel: 'optional'
        };
    }

    @NgModule({
        declarations: [AppComponent],
        imports: [
        ],
        providers: [{

        }]
    })
    export class AppModule {
        constructor() {}
    }

`;

@Component({
    selector: 'hlc-form-field-wrapper',
    templateUrl: './form-field-wrapper.component.html',
    styleUrls: ['./form-field-wrapper.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormFieldWrapperComponent implements OnInit {
    inputContainerConfig1 = inputContainerConfig1;

    constructor() {}

    ngOnInit() {}
}
