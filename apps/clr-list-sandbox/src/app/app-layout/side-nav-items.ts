import { SideNavItem } from '@ng-holistic/clr-common';

export default [
    {
        title: 'Table documentation',
        icon: 'view-list',
        path: ['/clr-table-definition']
    },
    {
        title: 'Clr Filter Example',
        icon: 'filter',
        children: [
            {
                title: 'Filter',
                path: ['/clr-filter', 'filter']
            }
        ]
    },
    {
        title: 'Clr Table Example',
        icon: 'view-list',
        children: [
            {
                title: 'Table',
                path: ['/clr-table', 'table']
            },
            {
                title: 'Table expand row',
                path: ['/clr-table', 'table-expand-row']
            },
            {
                title: 'Table expand row card',
                path: ['/clr-table', 'table-expand-row-card']
            },
            {
                title: 'Table select rows',
                path: ['/clr-table', 'table-select-rows']
            },
            {
                title: 'Table row actions',
                path: ['/clr-table', 'table-row-actions']
            },
            {
                title: 'Table (redux)',
                path: ['/clr-table', 'table-redux']
            }
        ]
    },
    {
        title: 'Clr List Example',
        icon: 'list',
        children: [
            {
                title: 'List',
                path: ['/clr-list', 'list']
            }
        ]
    }
] as SideNavItem[];
