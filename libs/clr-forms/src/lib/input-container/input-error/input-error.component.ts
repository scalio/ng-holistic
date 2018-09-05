import { Component, Input, Optional, Inject } from '@angular/core';
import { InputContainerComponent } from '../input-container.component';
import { INPUT_ERROR_DISPLAY_STRATEGY, InputErrorDisplayStartegy } from './input-error-display-strategy';

@Component({
    selector: 'hlc-input-error',
    templateUrl: './input-error.component.html',
    styleUrls: ['./input-error.component.scss'],
})
export class InputErrorComponent {
    @Input()
    for: string;

    constructor(
        private readonly container: InputContainerComponent,
        @Optional()
        @Inject(INPUT_ERROR_DISPLAY_STRATEGY)
        private readonly strategy: InputErrorDisplayStartegy,
    ) {}

    get error() {
        if (!this.container.control) {
            return null;
        }
        // display errors only when allowed by display error strategy
        if (this.strategy && !this.strategy.shouldDisplayError(this.container.control)) {
            return;
        }
        const err = this.container.control.errors && this.container.control.errors[this.for];
        if (!err) {
            return null;
        }
        return err;
    }
}
