import { Observable, of } from 'rxjs';

export type EmailUserRole = 'Admin' | 'Manager' | 'User';

export class WizardPageService {
    checkEmailUserRole(email: string): Observable<EmailUserRole | undefined> {
        let role: EmailUserRole | undefined;
        if (email === 'admin@m') {
            role = 'Admin';
        } else if (email === 'manager@m') {
            role = 'Manager';
        } else if (email === 'user@m') {
            role = 'User';
        }

        return of(role);
    }
}
