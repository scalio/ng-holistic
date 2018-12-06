import { NgModule } from '@angular/core';
// tslint:disable
import { config, initialConfig, INITIAL_CONFIG, NEW_CONFIG, optionsConfig } from './config';
import { MaskApplierService } from './mask-applier.service';
import { MaskDirective } from './mask.directive';
import { MaskPipe } from './mask.pipe';

@NgModule({
    exports: [MaskDirective, MaskPipe],
    declarations: [MaskDirective, MaskPipe],
    providers: [
        {
            provide: NEW_CONFIG,
            useValue: undefined
        },
        {
            provide: INITIAL_CONFIG,
            useValue: initialConfig
        },
        {
            provide: config,
            useFactory: _configFactory,
            deps: [INITIAL_CONFIG, NEW_CONFIG]
        },
        MaskApplierService
    ]
})
export class NgxMaskModule {}

/**
 * @internal
 */
export function _configFactory(
    initConfig: optionsConfig,
    configValue: optionsConfig | (() => optionsConfig)
): Function | optionsConfig {
    return typeof configValue === 'function' ? configValue() : { ...initConfig, ...configValue };
}
