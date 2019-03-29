import { ChangeDetectionStrategy, Component, NgModule, OnDestroy, OnInit } from '@angular/core';
import { ClrFormLayouts, HlcClrFormModule } from '@ng-holistic/clr-forms';
import { interval, Subject } from 'rxjs';
import { map, take, takeUntil } from 'rxjs/operators';

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

// SampleOutputForm

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'page-sample-output-form',
    template: '<hlc-clr-form [group]="group"></hlc-clr-form>'
})
export class PageSampleOutputComponent implements OnDestroy {
    readonly destroy$ = new Subject();
    readonly subj = new Subject<string>();

    readonly group: ClrFormLayouts.ClrFormLayout;

    constructor() {
        this.group = {
            kind: 'fields',
            fields: [
                {
                    id: 'name',
                    kind: 'TextField',
                    props: {
                        label: 'Name',
                        valueChange: this.subj
                    }
                }
            ]
        };

        this.subj.pipe(takeUntil(this.destroy$)).subscribe(val => {
            console.log('Text value changed : ' + val);
        });
    }

    ngOnDestroy() {
        this.destroy$.next();
    }
}

@NgModule({
    declarations: [PageSampleOutputComponent],
    exports: [PageSampleOutputComponent],
    imports: [HlcClrFormModule]
})
export class PageSampleOutputFormModule {}

const pageSampleOutputForm = `
@Component({
    // tslint:disable-next-line:component-selector
    selector: 'page-sample-output-form',
    template: '<hlc-clr-form [group]="group"></hlc-clr-form>'
})
export class PageSampleOutputComponent implements OnDestroy {
    readonly destroy$ = new Subject();
    readonly subj = new Subject<string>();

    readonly group: ClrFormLayouts.ClrFormLayout;

    constructor() {
        this.group = {
            kind: 'fields',
            fields: [
                {
                    id: 'name',
                    kind: 'TextField',
                    props: {
                        label: 'Name',
                        valueChange: this.subj
                    }
                }
            ]
        };

        this.subj.pipe(takeUntil(this.destroy$)).subscribe(val => {
            console.log('Text value changed : ' + val);
        });
    }

    ngOnDestroy() {
        this.destroy$.next();
    }
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
    pageSampleOutputForm = pageSampleOutputForm;

    constructor() {}

    ngOnInit() {}
}
