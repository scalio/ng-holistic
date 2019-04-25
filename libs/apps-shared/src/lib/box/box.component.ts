import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'hlc-box',
    templateUrl: './box.component.html',
    styleUrls: ['./box.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FmBoxComponent {}
