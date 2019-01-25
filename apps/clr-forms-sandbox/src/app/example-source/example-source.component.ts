import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

// TODO : to config
const EXAMPLE_SRC_BASE_PATH = 'https://baio.visualstudio.com/_git/ng-holistic?path=%2Fapps%2Fsandbox%2Fsrc%2Fapp%2F';
const EXAMPLE_SRC_SEARCH_BRANCH = 'version=GBdev';

@Component({
    selector: 'hlc-sandbox-example-source',
    templateUrl: './example-source.component.html',
    styleUrls: ['./example-source.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleSourceComponent implements OnInit {
    @Input() path: string;

    constructor() {}

    ngOnInit() {}

    get link() {
        return `${EXAMPLE_SRC_BASE_PATH}${encodeURIComponent(this.path)}&${EXAMPLE_SRC_SEARCH_BRANCH}`;
    }
}
