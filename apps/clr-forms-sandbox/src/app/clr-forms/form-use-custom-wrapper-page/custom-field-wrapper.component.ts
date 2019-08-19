import { Input, Component } from '@angular/core';
import { FormControl } from '@angular/forms';

const template = `
<div class="clr-form-control">
    <label>        
        {{ label }}
        <clr-icon shape="help"></clr-icon>
    </label>
    <ng-content></ng-content>
</div>
`;

@Component({
    selector: 'hlc-custom-field-wrapper',
    template
})
export class CustomFieldWrapperComponent {
    @Input()
    label: string;

    @Input()
    formControl: FormControl;
}
