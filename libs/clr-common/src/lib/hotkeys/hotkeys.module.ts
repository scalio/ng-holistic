import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { HotkeyModule } from 'angular2-hotkeys';
import { HlcHotKeysService } from './hotkeys.service';

/**
 * Facade for key bindings
 */

@NgModule({
    imports: [CommonModule, HotkeyModule],
    exports: [HotkeyModule],
    providers: [HlcHotKeysService]
})
export class HlcHotKeysModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: HlcHotKeysModule,
            providers: HotkeyModule.forRoot().providers
        };
    }
}
