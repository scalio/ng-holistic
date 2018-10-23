import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

const group = {
    kind: 'groups',
    $content: [
        {
            title: 'Group A',
            kind: 'tabs',
            $content: [
                {
                    kind: 'fields',
                    fields: [
                        {
                            id: 'text1',
                            kind: 'TextField',
                            label: 'Text1'
                        }
                    ]
                }
            ]
        },
        {
            title: 'Group B',
            kind: 'tabs',
            $content: [
                {
                    kind: 'fields',
                    fields: [
                        {
                            id: 'text2',
                            kind: 'TextField',
                            label: 'Text2'
                        }
                    ]
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
