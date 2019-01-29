import { ChangeDetectionStrategy, Component } from '@angular/core';
import { InputErrorDisplayStartegy } from '@ng-holistic/clr-forms';
import { group } from '../form-groups-page/form-groups-page.component';

@Component({
    selector: 'hlc-form-in-aside-page',
    templateUrl: './form-in-aside-page.component.html',
    styleUrls: ['./form-in-aside-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [InputErrorDisplayStartegy]
})
export class FormInAsidePageComponent {
    isOpen = false;
    group = group;
}
