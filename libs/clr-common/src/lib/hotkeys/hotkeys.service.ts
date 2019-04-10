import { Injectable } from '@angular/core';
import { Hotkey, HotkeysService } from 'angular2-hotkeys';
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
