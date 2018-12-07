import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ClrIconModule } from '@clr/angular';
import { InputContainerComponent } from './input-container.component';
import { InputErrorComponent } from './input-error/input-error.component';
import { ValidationErrorsComponent } from './validation-errors/validation-errors.component';


import {
    ValidationErrorsMapConfig,
    VALIDATION_ERRORS_MAP_CONFIG
} from './validation-errors/validation-errors-map-config';

@NgModule({
    imports: [CommonModule, ReactiveFormsModule, ClrIconModule],
    declarations: [InputContainerComponent, InputErrorComponent, ValidationErrorsComponent],
    exports: [InputContainerComponent, InputErrorComponent],
    entryComponents: [InputContainerComponent]
})
export class InputContainerModule {
    static forRoot({ validationErrorsMap }: { validationErrorsMap: ValidationErrorsMapConfig }): ModuleWithProviders {
        return {
            ngModule: InputContainerModule,
            providers: [
                {
                    provide: VALIDATION_ERRORS_MAP_CONFIG,
                    useValue: validationErrorsMap
                }
            ]
        };
    }
}
