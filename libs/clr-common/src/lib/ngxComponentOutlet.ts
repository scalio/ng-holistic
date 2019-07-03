/// SEE DISCUSSION HERE https://github.com/angular/angular/issues/15360
// We need access to created instance inside componentOutlet

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/* tslint:disable */

import {
    ComponentFactoryResolver,
    ComponentRef,
    Directive,
    Injector,
    Input,
    NgModuleFactory,
    NgModuleRef,
    OnChanges,
    OnDestroy,
    SimpleChanges,
    Type,
    ViewContainerRef,
    AfterViewInit
} from '@angular/core';
import { Subject } from 'rxjs';

/**
 * Instantiates a single {@link Component} type and inserts its Host View into current View.
 * `NgComponentOutlet` provides a declarative approach for dynamic component creation.
 *
 * `NgComponentOutlet` requires a component type, if a falsy value is set the view will clear and
 * any existing component will get destroyed.
 *
 * @usageNotes
 *
 * ### Fine tune control
 *
 * You can control the component creation process by using the following optional attributes:
 *
 * * `ngComponentOutletInjector`: Optional custom {@link Injector} that will be used as parent for
 * the Component. Defaults to the injector of the current view container.
 *
 * * `ngComponentOutletContent`: Optional list of projectable nodes to insert into the content
 * section of the component, if exists.
 *
 * * `ngComponentOutletNgModuleFactory`: Optional module factory to allow dynamically loading other
 * module, then load a component from that module.
 *
 * ### Syntax
 *
 * Simple
 * ```
 * <ng-container *ngComponentOutlet="componentTypeExpression"></ng-container>
 * ```
 *
 * Customized injector/content
 * ```
 * <ng-container *ngComponentOutlet="componentTypeExpression;
 *                                   injector: injectorExpression;
 *                                   content: contentNodesExpression;">
 * </ng-container>
 * ```
 *
 * Customized ngModuleFactory
 * ```
 * <ng-container *ngComponentOutlet="componentTypeExpression;
 *                                   ngModuleFactory: moduleFactory;">
 * </ng-container>
 * ```
 *
 * ### A simple example
 *
 * {@example common/ngComponentOutlet/ts/module.ts region='SimpleExample'}
 *
 * A more complete example with additional options:
 *
 * {@example common/ngComponentOutlet/ts/module.ts region='CompleteExample'}

 * A more complete example with ngModuleFactory:
 *
 * {@example common/ngComponentOutlet/ts/module.ts region='NgModuleFactoryExample'}
 *
 * @experimental
 */
// tslint:disable-next-line:directive-selector
@Directive({ selector: '[ngxComponentOutlet]' })
// tslint:disable-next-line:directive-class-suffix
export class NgxComponentOutlet implements OnChanges, OnDestroy, AfterViewInit {
    // TODO(issue/24571): remove '!'.
    @Input('ngxComponentOutlet') ngComponentOutlet!: Type<any>;
    // TODO(issue/24571): remove '!'.
    @Input('ngxComponentOutletInjector') ngComponentOutletInjector!: Injector;
    // TODO(issue/24571): remove '!'.
    @Input('ngxComponentOutletContent') ngComponentOutletContent!: any[][];
    // TODO(issue/24571): remove '!'.
    @Input('ngxComponentOutletNgModuleFactory') ngComponentOutletNgModuleFactory!: NgModuleFactory<any>;

    @Input('ngxComponentOutletCreate$') create$: Subject<any>;

    private _componentRef: ComponentRef<any> | null = null;
    private _moduleRef: NgModuleRef<any> | null = null;

    constructor(private _viewContainerRef: ViewContainerRef) {}

    ngOnChanges(changes: SimpleChanges) {
        this.cleanup();

        if (this.ngComponentOutlet) {
            const elInjector = this.ngComponentOutletInjector || this._viewContainerRef.parentInjector;

            if (changes['ngComponentOutletNgModuleFactory']) {
                if (this._moduleRef) {
                    this._moduleRef.destroy();
                }

                if (this.ngComponentOutletNgModuleFactory) {
                    const parentModule = elInjector.get(NgModuleRef);
                    this._moduleRef = this.ngComponentOutletNgModuleFactory.create(parentModule.injector);
                } else {
                    this._moduleRef = null;
                }
            }

            const componentFactoryResolver = this._moduleRef
                ? this._moduleRef.componentFactoryResolver
                : elInjector.get(ComponentFactoryResolver);

            const componentFactory = componentFactoryResolver.resolveComponentFactory(this.ngComponentOutlet);

            this._componentRef = this._viewContainerRef.createComponent(
                componentFactory,
                this._viewContainerRef.length,
                elInjector,
                this.ngComponentOutletContent
            );
        }
    }

    ngAfterViewInit() {
        if (this._componentRef) {
            this.create$.next(this._componentRef.instance);
        }
    }

    ngOnDestroy() {
        if (this._moduleRef) {
            this._moduleRef.destroy();
        }
    }

    private cleanup(): void {
        if (this._componentRef) {
            this._viewContainerRef.clear();
            this._componentRef = null;
        }
    }
}
