import { DomPortalHost } from '@angular/cdk/portal';
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
    ViewContainerRef
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as R from 'ramda';
import 'reflect-metadata';
import { Subject } from 'rxjs';
import { IFormGroup } from '../models';

/*

const PROP_METADATA = '__prop__metadata__';
const NG_METADATA_NAME = 'ngMetadataName';
const NG_METADATA_NAME_INPUT = 'Input';
const NG_METADATA_NAME_OUTPUT = 'Output';

const getMeta = (comp: any) => {
    const constructor = comp['constructor'];
    return R.has(PROP_METADATA, constructor) && constructor[PROP_METADATA];
};

const getPropMeta = (comp: any, propName: string) => {
    const meta = getMeta(comp);
    if (!meta) {
        return undefined;
    }
    return R.has(propName, meta) && meta[propName];
};

const isPropInput = (comp: any, propName: string) => {
    const meta = getPropMeta(comp, propName);
    return meta && R.find(R.propEq(NG_METADATA_NAME, NG_METADATA_NAME_INPUT), meta);
};

const isPropOutput = (comp: any, propName: string) => {
    const meta = getPropMeta(comp, propName);
    return meta && R.find(R.propEq(NG_METADATA_NAME, NG_METADATA_NAME_OUTPUT), meta);
};

const setComponentProperty = (cdr: ChangeDetectorRef, destroy$: Observable<any>, comp: any) => (
    val: any,
    key: string
) => {
    if (isPropOutput(comp, key)) {
        if (!(comp[key] instanceof EventEmitter)) {
            throw new Error('Output property must have EventEmitter type');
        }
        if (!(val instanceof Subject)) {
            throw new Error('For Output properties, field property must have Subject type');
        }
        // dispatch from output to subject
        (comp[key] as EventEmitter<any>)
            .asObservable()
            .pipe(takeUntil(destroy$))
            .subscribe(x => {
                (val as Subject<any>).next(x);
            });
        return;
    }

    if (isPropInput(comp, key)) {
        if (val instanceof Observable) {
            val.pipe(takeUntil(destroy$)).subscribe(x => {
                comp[key] = x;
                cdr.markForCheck();
            });
            return;
        }

        comp[key] = val;
        return;
    }
};

const setComponentProperties = (
    cdr: ChangeDetectorRef,
    destroy$: Observable<any>,
    component: any,
    field: IFormGroup<any>
) => {
    R.pipe(
        R.omit(['$content', 'kind']),
        R.forEachObjIndexed(setComponentProperty(cdr, destroy$, component))
    )(field);
};
*/

export interface GroupsLayoutMap {
    [key: string]: Type<any>;
}

export const HLC_GROUPS_LAYOUT = new InjectionToken<GroupsLayoutMap>('HLC_GROUPS_LAYOUT');

@Directive({
    selector: '[hlcGroupLayoutHost]'
})
export class GroupLayoutHostDirective implements OnInit, OnDestroy {
    private destroy$ = new Subject();
    private portalHosts: DomPortalHost[] = [];
    private groupsLayoutMap: GroupsLayoutMap;

    // tslint:disable-next-line:no-input-rename
    @Input('hlcGroupLayoutHost') group: IFormGroup<any>;

    // tslint:disable-next-line:no-input-rename
    @Input('hlcGroupLayoutHostForm') form: FormGroup;

    // tslint:disable-next-line:no-input-rename

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
        this.init(this.vcr, this.group);
        // setTimeout(() => this.init(), 0);
    }

    init(container: ViewContainerRef, group: IFormGroup<any>) {
        const factory = this.componentFactoryResolver.resolveComponentFactory(this.groupsLayoutMap[group.kind]);
        const componentRef = factory.create(this.injector);
        const view = componentRef.hostView;
        container.insert(view);

        // setComponentProperties(this.cdr, this.destroy$, this.componentRef.instance, this.group);

        for (const child of group.$content) {
            // console.log(this.componentRef);
            this.init(componentRef.instance['vc'], child);
        }
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.portalHosts.forEach(host => host.detach());
    }
}
