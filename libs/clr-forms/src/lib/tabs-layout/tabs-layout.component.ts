import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormLayout } from '@ng-holistic/forms';

@Component({
    selector: 'hlc-tabs-layout',
    templateUrl: './tabs-layout.component.html',
    styleUrls: ['./tabs-layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabsLayoutComponent {
    @Input() items: FormLayout.FormTab[] | undefined;
}
