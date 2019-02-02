import { ChangeDetectionStrategy, Component, NgModule, OnInit } from '@angular/core';
import { ClrFormLayouts, HlcClrFormModule } from '@ng-holistic/clr-forms';

// SampleForm

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'page-sample-form',
    template: '<hlc-clr-form [group]="group"></hlc-clr-form>'
})
export class PageSampleFormComponent {
    readonly group: ClrFormLayouts.ClrFormLayout = {
        kind: 'fields',
        fields: [{ id: 'name', kind: 'TextField', props: { label: 'Name', placeholder: 'enter person name' } }]
    };
}

@NgModule({
    declarations: [PageSampleFormComponent],
    exports: [PageSampleFormComponent],
    imports: [HlcClrFormModule]
})
export class PageSampleFormModule {}

const pageSampleFormCode = `
    @Component({
        selector: 'page-sample-form',
        template: '<hlc-clr-form [group]="group"></hlc-clr-form>'
    })
    export class PageSampleFormComponent {
        readonly group: ClrFormLayouts.ClrFormLayout = {
            kind: 'fields',
            fields: [{ id: 'name', kind: 'TextField', props: { label: 'Name', placeholder: 'enter person name' } }]
        };
    }
`;
//

@Component({
    selector: 'hlc-first-form',
    templateUrl: './first-form.component.html',
    styleUrls: ['./first-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FirstFormComponent implements OnInit {
    pageSampleFormCode = pageSampleFormCode;

    constructor() {}

    ngOnInit() {}
}
