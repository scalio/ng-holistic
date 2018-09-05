import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormLayout } from '@ng-holistic/forms';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'hlc-tabs-layout',
    templateUrl: './tabs-layout.component.html',
    styleUrls: ['./tabs-layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabsLayoutComponent {
    @Input() formGroup: FormGroup;
    @Input() items: FormLayout.FormTab[] | undefined;
}
