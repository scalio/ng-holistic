import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

const installPackages = `
    npm install @angular/cdk angular2-hotkeys property-watch-decorator ramda typescript-memoize @ng-holistic/clr-common @ng-holistic/forms @ng-holistic/clr-controls @ng-holistic/clr-forms @ng-holistic/ng-select @ng-holistic/typeahead --save

    yarn add @angular/cdk angular2-hotkeys property-watch-decorator ramda typescript-memoize date-fns @ng-holistic/clr-common @ng-holistic/forms @ng-holistic/clr-controls @ng-holistic/clr-forms @ng-holistic/ng-select @ng-holistic/typeahead -S        
`;


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
    installPackages = installPackages;
    
    constructor() {}

    ngOnInit() {}
}
