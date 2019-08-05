import { ChangeDetectionStrategy, Component, NgModule, OnInit } from '@angular/core';
import { ClrFormLayouts, HlcClrFormModule } from '@ng-holistic/clr-forms';

// SampleForm

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'page-sample-form',
    template: '<hlc-clr-form [definition]="definition"></hlc-clr-form>'
})
export class PageSampleFormComponent {
    readonly definition: ClrFormLayouts.ClrFormLayout = {
        kind: 'fields',
        fields: [{ id: 'name', kind: 'TextField', props: { label: 'Name' } }]
    };
}

@NgModule({
    declarations: [PageSampleFormComponent],
    exports: [PageSampleFormComponent],
    imports: [HlcClrFormModule]
})
export class SampleFormModule {}

const pageSampleFormCode = `
    @Component({
        selector: 'page-sample-form',
        template: '<hlc-clr-form [definition]="definition"></hlc-clr-form>'
    })
    export class PageSampleFormComponent {
        readonly definition: ClrFormLayouts.ClrFormLayout = {
            kind: 'fields',
            fields: [{ id: 'name', kind: 'TextField', props: { label: 'Name' } }]
        };
    }
`;
//

@Component({
    selector: 'hlc-overview',
    templateUrl: './overview.component.html',
    styleUrls: ['./overview.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OverviewComponent implements OnInit {
    pageSampleFormCode = pageSampleFormCode;

    constructor() {}

    ngOnInit() {}
}
