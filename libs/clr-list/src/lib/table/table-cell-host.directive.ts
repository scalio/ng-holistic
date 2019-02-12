import {
    ComponentFactory,
    ComponentFactoryResolver,
    ComponentRef,
    Directive,
    EmbeddedViewRef,
    Injector,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    SimpleChanges,
    Type,
    ViewContainerRef
} from '@angular/core';
import { setComponentProperties } from '@ng-holistic/forms';
import * as R from 'ramda';
import { Subject } from 'rxjs';
import { Table } from './table.types';

@Directive({
    selector: '[hlcTableCellHost]'
})
export class TableCellHostDirective implements OnInit, OnDestroy, OnChanges {
    private factory: ComponentFactory<any>;
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

    // tslint:disable-next-line:no-input-rename
    @Input('hlcTableCellHostParentRow')
    parentRow: any;

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

    ngOnChanges(changes: SimpleChanges) {
        if (
            changes['row'] &&
            // component not created on first ptop change
            !changes['row'].firstChange &&
            changes['row'].previousValue !== changes['row'].currentValue
        ) {
            this.updateComponentProps();
            this.instanceDetectChanges();
        }
    }

    private get props() {
        /**
         * Convert possible (row) => propVal properties definition into scalar ones
         */
        return R.pipe(
            R.toPairs,
            R.map(([k, v]) => {
                if (typeof v === 'function') {
                    return [k, v(this.row[this.cell.id], this.row, this.parentRow)];
                } else {
                    return [k, v];
                }
            }),
            R.fromPairs
        )(this.cell.props);
    }

    private instanceDetectChanges() {
        if (this.componentRef && this.componentRef.instance['cdr']) {
            this.componentRef.instance['cdr'].markForCheck();
        } else {
            // TODO !
            console.warn(
                // tslint:disable-next-line:max-line-length
                'In order to correctly handle changes in mapped table-cell components they should provide own ChangeDecetionRef via cdr property !'
            );
        }
    }

    private updateComponentProps() {
        if (this.factory && this.componentRef) {
            setComponentProperties(
                [],
                this.factory,
                this.componentRef.changeDetectorRef,
                this.destroy$,
                this.componentRef.instance,
                this.props
            );
        }
    }

    private init() {
        this.factory = this.componentFactoryResolver.resolveComponentFactory(this.componentType);
        this.componentRef = this.factory.create(this.injector);
        const view = this.componentRef.hostView as EmbeddedViewRef<any>;

        this.vcr.insert(view);

        this.updateComponentProps();
    }
}
