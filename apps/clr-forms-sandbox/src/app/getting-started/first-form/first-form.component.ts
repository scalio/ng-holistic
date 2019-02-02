import { ChangeDetectionStrategy, Component, NgModule, OnInit } from '@angular/core';
import { ClrFormLayouts, HlcClrFormModule } from '@ng-holistic/clr-forms';
import { interval } from 'rxjs';
import { map, take } from 'rxjs/operators';

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

// SampleFormObservableProp

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'page-sample-obs-prop-form',
    template: '<hlc-clr-form [group]="group"></hlc-clr-form>'
})
export class PageSampleFormObsPropComponent {
    readonly group: ClrFormLayouts.ClrFormLayout = {
        kind: 'fields',
        fields: [
            {
                id: 'name',
                kind: 'TextField',
                props: {
                    label: 'Name',
                    placeholder: interval(1000).pipe(
                        take(100),
                        map(m => `enter : ${m}`)
                    )
                }
            }
        ]
    };
}

@NgModule({
    declarations: [PageSampleFormObsPropComponent],
    exports: [PageSampleFormObsPropComponent],
    imports: [HlcClrFormModule]
})
export class PageSampleFormObsPropModule {}

const pageSampleFormObservableProp = `
@Component({
    // tslint:disable-next-line:component-selector
    selector: 'page-sample-obs-prop-form',
    template: '<hlc-clr-form [group]="group"></hlc-clr-form>'
})
export class PageSampleFormObsPropComponent {
    readonly group: ClrFormLayouts.ClrFormLayout = {
        kind: 'fields',
        fields: [
            {
                id: 'name',
                kind: 'TextField',
                props: {
                    label: 'Name',
                    placeholder: interval(1000).pipe(
                        take(100),
                        map(m => 'enter : ' + m)
                    )
                }
            }
        ]
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
    pageSampleFormObservableProp = pageSampleFormObservableProp;

    constructor() {}

    ngOnInit() {}
}
