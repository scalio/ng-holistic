import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormFields } from '@ng-holistic/forms';

@Component({
    selector: 'hlc-fields-layout',
    templateUrl: './fields-layout.component.html',
    styleUrls: ['./fields-layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FieldsLayoutComponent implements OnInit {
    @Input() items: FormFields.FormField[] | undefined;

    constructor() {}

    ngOnInit() {}
}
