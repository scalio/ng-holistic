import { CommonModule } from '@angular/common';
import { Injectable, ModuleWithProviders, NgModule } from '@angular/core';
import { Hotkey, HotkeyModule, HotkeysService } from 'angular2-hotkeys';
import { Observable } from 'rxjs';

@Injectable()
export class HlcHotKeysService {
    constructor(private readonly hotkeys: HotkeysService) {}

    add(keys: string | string[], prevent = true) {
        return new Observable<KeyboardEvent>(subscriber => {
            const hotkeyHandler = new Hotkey(keys, event => {
                if (subscriber.closed) {
                    this.hotkeys.remove(hotkeyHandler);
                    return false;
                } else {
                    subscriber.next(event);
                    if (prevent) {
                        event.preventDefault();
                    }
                    return prevent;
                }
            });
            this.hotkeys.add(hotkeyHandler);
            return () => {
                this.hotkeys.remove(hotkeyHandler);
            };
        });
    }
}

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
