/**
 * When ng-packagr build library with imports from @angular/router or @angular/cdk-some it will break build of the
 * library which includes the build, here we get rid of all modules which may cause this problem.
 * The normally build @ng-holistic/clr-common may only be included in application projects not in another libraries !
 * TODO: Create github issue.
 */
export * from './lib/alert/alert.component';
export * from './lib/alert/alert.module';
export * from './lib/aside-panel/aside-panel.component';
export * from './lib/aside-panel/aside-panel.module';
export * from './lib/aside/aside.directive';
export * from './lib/aside/aside.module';
export * from './lib/aside/aside.service';
export * from './lib/common.types';
export * from './lib/file-preview-overlay/file-preview-overlay.module';
export * from './lib/file-preview-overlay/file-preview-overlay.service';
export * from './lib/form-error/form-error.component';
export * from './lib/form-error/form-error.module';
export * from './lib/form-footer/form-footer.component';
export * from './lib/form-footer/form-footer.module';
export * from './lib/image/image.component';
export * from './lib/image/image.module';
export * from './lib/img-overlay/img-overlay.component';
export * from './lib/img-overlay/img-overlay.module';
/*
export * from './lib/main-header/main-header.component';
export * from './lib/main-header/main-header.module';

export * from './lib/main-layout/main-layout.component';
export * from './lib/main-layout/main-layout.module';
export * from './lib/modal/alert-modal/alert-modal.component';
export * from './lib/modal/modal.module';

export * from './lib/modal/modal.service';
export * from './lib/modal/modal/modal.config';
*/

export * from './lib/pipes/common-pipes.module';
export * from './lib/pipes/number.pipe';
export * from './lib/pipes/phone.pipe';

/*
export * from './lib/side-nav/side-nav.component';
export * from './lib/side-nav/side-nav.module';
*/
