import { ChangeDetectionStrategy, Component, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'hlc-tabs-layout',
    templateUrl: './tabs-layout.component.html',
    styleUrls: ['./tabs-layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabsLayoutComponent {
    @Input() form: FormGroup;
    @Input() title: string;
    @ViewChild('vc', { read: ViewContainerRef })
    vc: ViewContainerRef;
}
