import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { HlcClrWizard } from '@ng-holistic/clr-wizard';
import { map } from 'rxjs/operators';
import { WizardPageService } from './wizard-base-page.service';

const pages = (dataAccess: WizardPageService): HlcClrWizard.WizardStepLayout[] => {
    return [
        {
            title: 'Admin Email',
            navTitle: 'Admin Email',
            fields: [
                {
                    id: 'adminEmail',
                    kind: 'TextField',
                    label: 'Admin Email',
                    $validators: [Validators.required, Validators.email]
                }
            ],
            commit(val: any) {
                return dataAccess.checkEmailUserRole(val.adminEmail).pipe(
                    map(role => {
                        if (role === 'Manager' || role === 'User') {
                            // tslint:disable-next-line:no-string-throw
                            throw `User with email already refistered in system but has role different
                                from manager. We could not register new manager with this email.
                                Plaese choose another one.`;
                        } else {
                            return role;
                        }
                    })
                );
            }
        },
        {
            title: 'Admin Info',
            navTitle: 'Admin Info',
            fields: [
                {
                    id: 'firstName',
                    kind: 'TextField',
                    label: 'First Name'
                },
                {
                    id: 'lastName',
                    kind: 'TextField',
                    label: 'Last Name'
                }
            ]
        }
    ];
};

@Component({
    selector: 'hlc-wizard-base-page',
    templateUrl: './wizard-base-page.component.html',
    styleUrls: ['./wizard-base-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WizardBasePageComponent {
    readonly pages: HlcClrWizard.WizardStepLayout[];
    constructor(dataAccess: WizardPageService) {
        this.pages = pages(dataAccess);
    }
}
