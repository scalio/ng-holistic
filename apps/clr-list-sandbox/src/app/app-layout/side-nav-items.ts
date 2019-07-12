import { SideNavItem } from '@ng-holistic/clr-common';

export default [
    {
        title: 'FAQ',
        icon: 'help',
        path: '/faq'
    },
    {
        title: 'Documentation',
        icon: 'view-list',
        children: [
            {
                title: 'Table',
                path: ['/docs', 'table']
            },
            {
                title: 'Data Provider',
                path: ['/docs', 'data-provider']
            },
            {
                title: 'Data Provider Config',
                path: ['/docs', 'data-provider-config']
            },
            {
                title: 'Table Definition',
                path: ['/docs', 'table-definition']
            },
            {
                title: 'Column Definition',
                path: ['/docs', 'column-definition']
            },
            {
                title: 'Custom Column Definition',
                path: ['/docs', 'custom-column-definition']
            },
            {
                title: 'Configure Column Definition Map',
                path: ['/docs', 'configure-column-definition-map']
            }
        ]
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
