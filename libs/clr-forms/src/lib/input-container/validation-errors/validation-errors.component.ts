import { Component, Optional } from '@angular/core';
import * as R from 'ramda';
import { InputContainerComponent } from '../input-container.component';
import { InputErrorDisplayStartegy } from '../input-error-display-strategy';

/**
 * Displays list of the errors for the container element;
 * if they exists and InputErrorDisplayStartegy condition is passed
 */
@Component({
    selector: 'hlc-validation-errors',
    templateUrl: './validation-errors.component.html',
    styleUrls: ['./validation-errors.component.scss'],
})
export class ValidationErrorsComponent {

    constructor(
        private readonly container: InputContainerComponent,
        @Optional()
        private readonly strategy: InputErrorDisplayStartegy,
    ) {}

    get validationErrors(): string[] {

        const control = this.container.control;

        if (!control) {
            return [];
        }

        // console.log(control);

        if (this.strategy && !this.strategy.shouldDisplayError(control)) {
            return [];
        }

        const errors = control.errors;

        if (!errors) {
            return [];
        }
        return R.pipe(
            R.toPairs,
            R.map(([k]) =>
                R.propOr(k, k, this.container.validatorsErrorsMap)
            )
        )(errors) as any;
    }
}
