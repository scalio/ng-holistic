import { Injectable } from '@angular/core';
import { HlcClrModalService } from '@ng-holistic/clr-common';
import { of } from 'rxjs';
import { ConfigFormComponent } from './config-form.component';

@Injectable()
export class AppConfigModalService {
    constructor(private readonly modalService: HlcClrModalService) {}

    show() {
        this.modalService.showForm({
            title: 'Configuration',
            componentFormField: 'form',
            contentComponentType: ConfigFormComponent,
            dataAccess: {
                update() {
                    return of(true);
                }
            }
        });
    }
}
