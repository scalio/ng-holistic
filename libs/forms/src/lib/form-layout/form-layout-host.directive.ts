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
import * as R from 'ramda';
import 'reflect-metadata';
import { Subject } from 'rxjs';
import { IFormGroup } from '../models';
import { setComponentProperties } from '../set-component-properties';

/**
 * Map of key - group  pairs which could be possible generated on form layout
 */
export interface GroupsLayoutMap {
    [key: string]: Type<any>;
}

export const HLC_GROUPS_LAYOUT = new InjectionToken<GroupsLayoutMap>('HLC_GROUPS_LAYOUT');

@Directive({
    selector: '[hlcFormLayoutHost]'
})
export class GroupLayoutHostDirective implements OnInit, OnDestroy {
    private componentRefs: ComponentRef<any>[];
    private destroy$ = new Subject();
    private groupsLayoutMap: GroupsLayoutMap;

    // tslint:disable-next-line:no-input-rename
    @Input('hlcFormLayoutHost')
    group: IFormGroup<any>;

    constructor(
        private readonly componentFactoryResolver: ComponentFactoryResolver,
        private readonly injector: Injector,
        @Inject(HLC_GROUPS_LAYOUT) groupsLayoutMaps: GroupsLayoutMap[],
        private readonly vcr: ViewContainerRef
    ) {
        this.groupsLayoutMap = R.mergeAll(groupsLayoutMaps);
    }

    ngOnInit() {
        if (!this.group) {
            return;
        }
        // init components from roout group
        this.componentRefs = this.init(this.vcr, this.group, 0);
    }

    init(container: ViewContainerRef, group: IFormGroup<any>, index: number): ComponentRef<any>[] {
        console.log('+++', group, index);
        const groupLayoutType = this.groupsLayoutMap[group.kind];
        if (!groupLayoutType) {
            throw new Error(`Group layout type ${group.kind} is not found`);
        }
        const factory = this.componentFactoryResolver.resolveComponentFactory(this.groupsLayoutMap[group.kind]);
        const componentRef = factory.create(this.injector);
        const view = componentRef.hostView;
        container.insert(view, index);
        view.detach();

        setComponentProperties(
            ['kind', '$content'],
            factory,
            componentRef.changeDetectorRef,
            this.destroy$,
            componentRef.instance,
            group
        );

        view.detectChanges();

        const crfs = R.addIndex(R.chain)(
            (child: IFormGroup<any>, i) => this.init(componentRef.instance['vc'], child, i),
            group.$content || []
        ) as any as ComponentRef<any>[];

        return [...crfs, componentRef];
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.componentRefs.forEach(crf => crf.destroy());
    }
}
