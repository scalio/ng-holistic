import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

const group = {
    kind: 'tabs',
    $content: [
        {
            tabTitle: 'Tab A',
            kind: 'fields',
            fields: []
        },
        {
            tabTitle: 'Tab B',
            kind: 'fields',
            fields: [
                {
                    kind: 'TextField',
                    id: 'text2',
                    label: 'Text 2',
                    placeholder: 'Type something'
                }
            ]
        }
    ]
};

@Component({
    selector: 'hlc-form-groups-page',
    templateUrl: './form-groups-page.component.html',
    styleUrls: ['./form-groups-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormGroupsPageComponent implements OnInit {
    group = group;

    constructor() {}

    ngOnInit() {}
}
