import { Injectable } from '@angular/core';
import { timer } from 'rxjs';
import { mapTo } from 'rxjs/operators';

@Injectable()
export class InvoicesService {

    load() {
        return timer(0).pipe(
            mapTo({
                rows: [
                    {
                        id: 0,
                        customer: { id: 1, name: 'Homer Simpson', avatar: 'http://lol' },
                        order: { id: 'ABCD', image: 'http://lol', date: new Date().toISOString() },
                        card: '12890-***-77',
                        address: 'Toronto',
                        amount: 1000,
                        currency: 'USD'
                    }
                ]
            })
        );
    }
}