import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { HlcClrWizard } from '@ng-holistic/clr-wizard';
import { map } from 'rxjs/operators';
import { WizardPageService } from './wizard-base-page.service';

const pages = (dataAccess: WizardPageService): HlcClrWizard.WizardStepLayout[] => {
    let adminExists = false;
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
            commit(vals: any[]) {
                return dataAccess.checkEmailUserRole(vals[0].adminEmail).pipe(
                    map(role => {
                        if (role === 'Manager' || role === 'User') {
                            // tslint:disable-next-line:no-string-throw
                            throw `User with email already refistered in system but has role different
                                from manager. We could not register new manager with this email.
                                Plaese choose another one.`;
                        } else {
                            adminExists = role === 'Admin';
                            return role;
                        }
                    })
                );
            }
        },
        {
            title: 'Admin Info A',
            navTitle: 'Admin Info A',
            fields: [
                {
                    id: 'adminExistsHint',
                    kind: 'TextField',
                    label: 'Lol'
                }
            ],
            skip() {
                return !adminExists;
            }
        },
        {
            title: 'Admin Info',
            navTitle: 'Admin Info',
            fields: [
                {
                    id: 'firstName',
                    kind: 'TextField',
                    label: 'First Name',
                    $validators: [Validators.required]
                },
                {
                    id: 'lastName',
                    kind: 'TextField',
                    label: 'Last Name',
                    $validators: [Validators.required]
                }
            ],
            commit(val: any) {
                return dataAccess.validateAdmin(val.adminEmail);
            },
            skip() {
                return adminExists;
            }
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
