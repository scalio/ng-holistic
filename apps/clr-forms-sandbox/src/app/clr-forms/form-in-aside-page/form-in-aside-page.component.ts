import { ChangeDetectionStrategy, Component } from '@angular/core';
import { InputErrorDisplayStartegy } from '@ng-holistic/clr-forms';
import { group } from '../form-groups-page/form-groups-page.component';


const definition = `
export const group: ClrFormLayouts.ClrFormLayout = {
    kind: 'tabs',
    $content: [
        {
            kind: 'tab',
            title: 'Personal Info',
            $content: [
                {
                    kind: 'group',
                    title: 'Person Name',
                    $content: [
                        {
                            kind: 'fields',
                            fields: [
                                {
                                    kind: 'TextField',
                                    id: 'firstName',
                                    label: 'First Name'
                                },
                                {
                                    kind: 'TextField',
                                    id: 'lastName',
                                    label: 'Last Name'
                                }
                            ]
                        }
                    ]
                },
                {
                    kind: 'group',
                    title: 'Family',
                    $content: [
                        {
                            kind: 'fields',
                            fields: [
                                {
                                    kind: 'SelectField',
                                    id: 'maritalStatus',
                                    props: {
                                        label: 'Marital Status',
                                        items: [
                                            { key: 'single', label: 'Single' },
                                            { key: 'married', label: 'Married' }
                                        ]
                                    }
                                },
                                {
                                    kind: 'SelectField',
                                    id: 'childrenNumber',
                                    props: {
                                        label: 'Children Number',
                                        items: [
                                            { key: '1', label: '1' },
                                            { key: '2', label: '2' },
                                            { key: '3', label: '3' },
                                            { key: '3+', label: '3+' }
                                        ]
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            kind: 'tab',
            title: 'Address',
            $content: [
                {
                    kind: 'fields',
                    fields: [
                        {
                            kind: 'TextField',
                            id: 'country',
                            label: 'Country',
                            validators: [Validators.required]
                        },
                        {
                            kind: 'TextField',
                            id: 'city',
                            label: 'City'
                        },
                        {
                            kind: 'TextField',
                            id: 'street',
                            label: 'Street'
                        }
                    ]
                }
            ]
        }
    ]
};
`;

const code = `
    import { CommonModule } from '@angular/common';
    import { NgModule } from '@angular/core';
    import { HlcClrFormModule } from '@ng-holistic/clr-forms';
    import { group } from './form-definition.ts';

    const template = \`
        <hlc-clr-aside-panel *ngIf="isOpen" (close)="isOpen = false">
            <hlc-clr-form content [group]="group" #clrForm></hlc-clr-form>
            <div footer>
                <hlc-clr-form-footer [form]="clrForm.form.formGroup" (save)="isOpen = false" (cancel)="isOpen = false">
                </hlc-clr-form-footer>
            </div>
        </hlc-clr-aside-panel>
        <button class="btn" (click)="isOpen = true">Show Aside</button>
    \`;

    @Component({
        selector: 'hlc-form-page',
        template: template,
    })
    export class FormPageComponent {
        isOpen = false;
        group = group;
    }

    @NgModule({
        declarations: [FormPageComponent],
        imports: [
            CommonModule,
            HlcClrFormModule,
            HlcClrAsidePanelModule,
            HlcClrFormFooterModule
        ],
        exports: []
    })
    export class FormPageModule {}

`;
@Component({
    selector: 'hlc-form-in-aside-page',
    templateUrl: './form-in-aside-page.component.html',
    styleUrls: ['./form-in-aside-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [InputErrorDisplayStartegy]
})
export class FormInAsidePageComponent {
    definition = definition;
    code = code;

    isOpen = false;
    group = group;
}
