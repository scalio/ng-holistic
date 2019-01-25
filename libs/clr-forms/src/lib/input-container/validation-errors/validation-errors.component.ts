import { Component, Optional, Inject } from '@angular/core';
import * as R from 'ramda';
import { HlcClrInputContainerComponent } from '../input-container.component';
import { InputErrorDisplayStartegy } from '../input-error-display-strategy';
import { ValidationErrorsMapConfig, VALIDATION_ERRORS_MAP_CONFIG } from './validation-errors-map-config';

/**
 * Displays list of the errors for the container element;
 * if they exists and InputErrorDisplayStartegy condition is passed
 */
@Component({
    selector: 'hlc-validation-errors',
    templateUrl: './validation-errors.component.html',
    styleUrls: ['./validation-errors.component.scss']
})
export class ValidationErrorsComponent {
    constructor(
        private readonly container: HlcClrInputContainerComponent,
        @Optional() private readonly strategy?: InputErrorDisplayStartegy,
        @Optional()
        @Inject(VALIDATION_ERRORS_MAP_CONFIG)
        private readonly validationErrorsMapConfig?: ValidationErrorsMapConfig
    ) {
    }

    /**
     * Get error text from `container.validatorsErrorsMap` or global config `ValidationErrorsMapConfig`
     * @param validationName
     */
    private getErrorTextFromMap(validationName: string): string | undefined {


        const err = R.propOr(undefined, validationName, this.container.validatorsErrorsMap);

        if (err) {
            return err as string;
        }

        const validation = this.validationErrorsMapConfig && this.validationErrorsMapConfig[validationName];

        if (validation) {
            return typeof validation === 'string' ? validation : validation(this.container);
        }

        return validationName;
    }

    get validationErrors(): string[] {
        const control = this.container.control;

        if (!control) {
            return [];
        }

        if (this.strategy && !this.strategy.shouldDisplayError(control)) {
            return [];
        }

        const errors = control.errors;

        if (!errors) {
            return [];
        }
        return R.pipe(
            R.toPairs,
            R.map(([k]) => this.getErrorTextFromMap(k))
        )(errors) as any;
    }
}
