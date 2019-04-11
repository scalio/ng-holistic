import { Injectable } from '@angular/core';
import { HlcClrModalService } from '@ng-holistic/clr-common';
import { ConfigFormComponent } from './config-form.component';

@Injectable()
export class AppConfigModalService {
    constructor(private readonly modalService: HlcClrModalService) {}

    show() {
        this.modalService.show({
            title: 'Configuration',
            contentComponentType: ConfigFormComponent,
            hideFooter: true
        });
    }
}
