import {
    ComponentFactoryResolver,
    Directive,
    Inject,
    InjectionToken,
    Injector,
    Input,
    OnDestroy,
    OnInit,
    Type,
    ViewContainerRef,
    ComponentRef
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as R from 'ramda';
import 'reflect-metadata';
import { Subject } from 'rxjs';
import { IFormGroup } from '../models';
import { setComponentProperties } from '../set-component-properties';

export interface GroupsLayoutMap {
    [key: string]: Type<any>;
}

export const HLC_GROUPS_LAYOUT = new InjectionToken<GroupsLayoutMap>('HLC_GROUPS_LAYOUT');

@Directive({
    selector: '[hlcGroupLayoutHost]'
})
export class GroupLayoutHostDirective implements OnInit, OnDestroy {
    private componentRefs: ComponentRef<any>[];
    private destroy$ = new Subject();
    private groupsLayoutMap: GroupsLayoutMap;

    // tslint:disable-next-line:no-input-rename
    @Input('hlcGroupLayoutHost') group: IFormGroup<any>;
    // tslint:disable-next-line:no-input-rename
    @Input('hlcGroupLayoutHostForm') form: FormGroup;

    constructor(
        private readonly componentFactoryResolver: ComponentFactoryResolver,
        private readonly injector: Injector,
        @Inject(HLC_GROUPS_LAYOUT) groupsLayoutMaps: GroupsLayoutMap[],
        private readonly vcr: ViewContainerRef
    ) {
        this.groupsLayoutMap = R.mergeAll(groupsLayoutMaps);
    }

    ngOnInit() {
        // Create a portalHost from a DOM element

        // Attach portal to host
        if (!this.group) {
            return;
        }
        this.componentRefs = this.init(this.vcr, this.group);
    }

    init(container: ViewContainerRef, group: IFormGroup<any>): ComponentRef<any>[] {
        const factory = this.componentFactoryResolver.resolveComponentFactory(this.groupsLayoutMap[group.kind]);
        const componentRef = factory.create(this.injector);
        const view = componentRef.hostView;
        container.insert(view);
        view.detach();

        setComponentProperties(
            ['kind', '$content'],
            factory,
            componentRef.changeDetectorRef,
            this.destroy$,
            componentRef.instance,
            this.group
        );

        view.detectChanges();

        const crfs = R.chain(child => this.init(componentRef.instance['vc'], child), group.$content);

        return [...crfs, componentRef];
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.componentRefs.forEach(crf => crf.destroy());
    }
}
