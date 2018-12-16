import {
    ComponentFactoryResolver,
    ComponentRef,
    Directive,
    EmbeddedViewRef,
    Injector,
    Input,
    OnDestroy,
    OnInit,
    Type,
    ViewContainerRef
} from '@angular/core';
import { setComponentProperties } from '@ng-holistic/forms';
import { Subject } from 'rxjs';
import { Table } from './table.types';
import * as R from 'ramda';

@Directive({
    selector: '[hlcTableCellHost]'
})
export class TableCellHostDirective implements OnInit, OnDestroy {
    private componentRef: ComponentRef<any> | undefined;
    private destroy$ = new Subject();

    // tslint:disable-next-line:no-input-rename
    @Input('hlcTableCellHost')
    cell: Table.MapColumns.MapColumn;
    // tslint:disable-next-line:no-input-rename
    @Input('hlcTableCellHostComponentType')
    componentType: Type<any>;
    // tslint:disable-next-line:no-input-rename
    @Input('hlcTableCellHostRow')
    row: any;

    constructor(
        private readonly componentFactoryResolver: ComponentFactoryResolver,
        private readonly injector: Injector,
        private readonly vcr: ViewContainerRef
    ) {}

    ngOnInit() {
        this.init();
    }

    ngOnDestroy() {
        this.destroy$.next();
        if (this.componentRef) {
            this.componentRef.destroy();
        }
    }

    private init() {
        const factory = this.componentFactoryResolver.resolveComponentFactory(this.componentType);
        this.componentRef = factory.create(this.injector);
        const view = this.componentRef.hostView as EmbeddedViewRef<any>;

        /**
         * Convert possible (row) => propVal properties definition into scalar ones
         */
        const props = R.pipe(
            R.toPairs,
            R.map(([k, v]) => {
                if (typeof v === 'function') {
                    return [k, v(this.row)];
                } else {
                    return [k, v];
                }
            }),
            R.fromPairs
        )(this.cell.props);

        this.vcr.insert(view);

        setComponentProperties(
            [],
            factory,
            this.componentRef.changeDetectorRef,
            this.destroy$,
            this.componentRef.instance,
            props
        );
    }
}
