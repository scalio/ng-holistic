import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

const addModuleCode = `
    import { HlcClrFormModule } from '@ng-holistic/clr-forms';

    @NgModule({
        imports: [
            ...
            HlcClrFormModule.forRoot()
        ],
        bootstrap: [AppComponent]
    })
    export class AppModule {
        constructor() {}
    }
`;

@Component({
    selector: 'hlc-install-packages',
    templateUrl: './install-packages.component.html',
    styleUrls: ['./install-packages.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class InstallPackagesComponent implements OnInit {
    addModuleCode = addModuleCode;

    constructor() {}

    ngOnInit() {}
}
