import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { concat, Observable, timer } from 'rxjs';
import { mapTo } from 'rxjs/operators';

const items1 = [{ key: 0, label: 'zero' }, { key: 1, label: 'one' }, { key: 2, label: 'two' }];
const items2 = [{ key: 0, label: 'zero1' }, { key: 1, label: 'one1' }, { key: 2, label: 'two1' }];

@Component({
    selector: 'hlc-select-page',
    templateUrl: './select-page.component.html',
    styleUrls: ['./select-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectPageComponent implements OnInit {
    value = 1;
    readonly items$: Observable<any[]>;

    constructor() {
        const s1 = timer(1000).pipe(mapTo(items1));
        const s2 = timer(3000).pipe(mapTo(items2));
        this.items$ = concat(s1, s2);
    }

    ngOnInit() {}
}
