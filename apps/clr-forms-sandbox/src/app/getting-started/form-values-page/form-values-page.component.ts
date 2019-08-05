import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { ClrFormLayouts, HlcClrFormModule } from '@ng-holistic/clr-forms';

// SampleForm

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'page-sample-form',
    template: '<hlc-clr-form [definition]="definition" #form></hlc-clr-form>{{ form.formGroup?.value | json }}'
})
export class PageSampleFormComponent {
    readonly definition: ClrFormLayouts.ClrFormLayout = {
        kind: 'fields',
        fields: [{ id: 'name', kind: 'TextField', props: { label: 'Name', placeholder: 'enter person name' } }]
    };
}

@NgModule({
    declarations: [PageSampleFormComponent],
    exports: [PageSampleFormComponent],
    imports: [HlcClrFormModule, CommonModule]
})
export class PageSampleFormModule {}

const pageSampleFormCode = `
    @Component({
        selector: 'page-sample-form',
        template: '<hlc-clr-form [definition]="definition" #form></hlc-clr-form>{{ form.formGroup?.value | json }}'
    })
    export class PageSampleFormComponent {
        readonly definition: ClrFormLayouts.ClrFormLayout = {
            kind: 'fields',
            fields: [{ id: 'name', kind: 'TextField', props: { label: 'Name', placeholder: 'enter person name' } }]
        };
    }
`;
//

@Component({
    selector: 'hlc-form-values-page',
    templateUrl: './form-values-page.component.html',
    styleUrls: ['./form-values-page.component.scss']
    // changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormValuesPageComponent implements OnInit {
    pageSampleFormCode = pageSampleFormCode;

    constructor() {}

    ngOnInit() {}
}
