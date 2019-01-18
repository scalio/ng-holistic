import { Observable, timer } from 'rxjs';
import { mapTo } from 'rxjs/operators';

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

        return timer(1000).pipe(mapTo(role));
    }

    validateAdmin(_: any): Observable<any> {
        return timer(1000).pipe(mapTo(true));
    }

    validateCopmany(_: any): Observable<any> {
        return timer(1000).pipe(mapTo(true));
    }
}
