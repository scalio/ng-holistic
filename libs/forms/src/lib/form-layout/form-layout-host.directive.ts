import {
    ComponentFactoryResolver,
    ComponentRef,
    Directive,
    Inject,
    InjectionToken,
    Injector,
    Input,
    OnDestroy,
    OnInit,
    QueryList,
    Type,
    ViewContainerRef,
    ViewRef
} from '@angular/core';
import * as R from 'ramda';
import 'reflect-metadata';
import { Subject, Observable } from 'rxjs';
import { IFormGroup } from '../models';
import { setComponentProperties } from '../set-component-properties';
import { takeUntil, distinctUntilChanged } from 'rxjs/operators';

/**
 * Map of key - group  pairs which could be possible generated on form layout
 */
export interface GroupsLayoutMap {
    [key: string]: Type<any>;
}

export const HLC_GROUPS_LAYOUT = new InjectionToken<GroupsLayoutMap>('HLC_GROUPS_LAYOUT');

const syncVisibility = (destroy$: Observable<any>, vcr: ViewContainerRef, view: ViewRef, group: IFormGroup<any>) => {
    // Group is always visible on init
    if (group && group.$hidden) {
        const index = vcr.indexOf(view);
        group.$hidden
            .pipe(
                takeUntil(destroy$),
                distinctUntilChanged()
            )
            .subscribe(hidden => {
                const i = vcr.indexOf(view);
                if (hidden && i !== -1) {
                    vcr.detach(i);
                } else if (!hidden && i === -1) {
                    vcr.insert(view, index);
                }
            });
    }
};

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

        this.componentRefs = this.init(this.vcr, this.group);
    }

    init(container: ViewContainerRef, group: IFormGroup<any>): ComponentRef<any>[] {
        if (!container) {
            console.log('Group exists but container not found !', group);
            return [];
        }
        const groupLayoutType = this.groupsLayoutMap[group.kind];
        if (!groupLayoutType) {
            throw new Error(`Group layout type ${group.kind} is not found`);
        }
        const factory = this.componentFactoryResolver.resolveComponentFactory(this.groupsLayoutMap[group.kind]);

        const componentRef = container.createComponent(factory, undefined, this.injector);

        setComponentProperties(
            [],
            factory,
            componentRef.changeDetectorRef,
            this.destroy$,
            componentRef.instance,
            group
        );

        componentRef.changeDetectorRef.detectChanges();

        syncVisibility(this.destroy$, container, componentRef.hostView, group);

        const $content = group.$content || [];

        /**
         * View Container could be QueryList or just item, convert single item to array for usage convenience bellow
         */
        const _vc = componentRef.instance['vc'];
        const vc = _vc instanceof QueryList ? _vc.toArray() : R.repeat(_vc, $content.length);

        const crfs = R.addIndex(R.chain)((child: IFormGroup<any>, index) => {
            return this.init(vc[index], child);
        }, $content || []);

        return [...crfs, componentRef] as any;
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.componentRefs.forEach(crf => crf.destroy());
    }
}
