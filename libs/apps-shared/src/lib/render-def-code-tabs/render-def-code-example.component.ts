import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

const code = (html = '<hlc-clr-form [group]="group"></hlc-clr-form>') => `
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HlcClrFormModule } from '@ng-holistic/clr-forms';
import { group } from './form-definition.ts';

@Component({
    selector: 'hlc-form-page',
    template: \`${html}\`,
})
export class FormPageComponent {
    group = group;
}

@NgModule({
    declarations: [FormPageComponent],
    imports: [
        CommonModule,
        HlcClrFormModule,
    ],
    exports: []
})
export class FormPageModule {}
`;

@Component({
    selector: 'hlc-sbx-render-def-code-example',
    templateUrl: './render-def-code-example.component.html',
    styleUrls: ['./render-def-code-example.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HlcSbxRenderDefCodeComponent implements OnInit {
    @Input() html: string;

    get code() {
        return code(this.html);
    }

    constructor() {}

    ngOnInit() {}
}
