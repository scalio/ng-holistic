import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ClrIconModule } from '@clr/angular';
import { InputContainerComponent } from './input-container.component';
import { InputErrorComponent } from './input-error/input-error.component';
import {
    InputErrorDisplayStartegy,
    INPUT_ERROR_DISPLAY_STRATEGY,
    defaulInputErrorDisplayStartegy
} from './input-error/input-error-display-strategy';

@NgModule({
    imports: [CommonModule, ReactiveFormsModule, ClrIconModule],
    declarations: [InputContainerComponent, InputErrorComponent],
    exports: [InputContainerComponent, InputErrorComponent],
    entryComponents: [InputContainerComponent]
})
export class InputContainerModule {
    static forRoot(strategy?: InputErrorDisplayStartegy): ModuleWithProviders {
        return {
            ngModule: InputContainerModule,
            providers: [
                {
                    provide: INPUT_ERROR_DISPLAY_STRATEGY,
                    useValue: strategy || defaulInputErrorDisplayStartegy
                }
            ]
        };
    }
}
