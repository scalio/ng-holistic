import { Component, ChangeDetectionStrategy } from '@angular/core';

const column_format = `
interface ColumnFormat {
    val?: string;
    cls?: string;
}
`;

const custom_column = `
{
    id: 'custom',
    title: 'Status',
    sort: true,
    customCell: true
}`;

const custom_column_template = `
<ng-template hlcClrCustomCell="custom" let-row="row" let-val [status]="val"></ng-template>
`;

const code_col_def_1 = `
HlcClrTableModule.forRoot( { appCustomComponent: AppCustomComponent } );
entryComponents: [AppCustomComponent]
`;

const code_col_def_2 = `
export interface AppCustomCellProps {
    // beware here AppCustomcomponent has someProp Input property
    someProp: string;
    // here AppCustomcomponent has click Output property
    click: Subject<any>;
}

export interface AppCusomColumn extends MapColumn<AppCustomCellProps> {
    kind: 'AppCusomColumn';
}
`;

const code_col_def_3 = `
import { TableDefinition } from '@ng-holistic/hlc-list';

// default column component maps + custom ones
export type AppTableDefinition = TableDefinition<Table.MapColumns.Column | AppCusomColumn>;
`;

const code_col_def_4 = `
import { TableDefinition } from '@ng-holistic/hlc-list';

// default column component maps + custom ones
const tableDefiniiton: AppTableDefinition = [
    // this is one of the dafult component maps from inside the library
    {
        id: 'link',
        kind: 'LinkColumn',
        title: 'Link',
        props: {
            title(_, row) {
                return row['title'];
            },
            link: 'some link',
            clicked: subject
        }
    },
    // this one is custom map
    {
        id: 'custom',
        // must correspond to 'kind' property from column type definition.
        kind: 'AppCustomColumn',
        title: 'Some custom',
        props: {
            // Now '@Input() someProp: string' of the AppCustomComponent will be initialized
            // with value taken from row 'custom' property or if it empty from the row 'title' property.
            someProp(val, row) {
                return val || row['title'];
            },
            // This subject instance will emit event every time when
            // 'AppCustomComponent @Output() click = new EventEmitter() will be emitted'
            clicked: subject
        }
    }
]
`;

const sort_column = `
    export interface SortColumn {
        name: string;
        direction: 'asc' | 'desc';
    }
`;

@Component({
    selector: 'hlc-clr-sandbox-table-column-definition-page',
    templateUrl: './table-column-definition-page.component.html',
    styleUrls: ['./table-column-definition-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableColumnDefinitionPageComponent {
    custom_column = custom_column;
    custom_column_template = custom_column_template;
    column_format = column_format;
    code_col_def_1 = code_col_def_1;
    code_col_def_2 = code_col_def_2;
    code_col_def_3 = code_col_def_3;
    code_col_def_4 = code_col_def_4;
    sort_column = sort_column;
}
