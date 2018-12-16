import { SideNavItem } from '@ng-holistic/clr-layout';

export default [
    {
        title: 'Clr Filter',
        icon: 'filter',
        children: [
            {
                title: 'Filter',
                path: ['/clr-filter', 'filter']
            }
        ]
    },
    {
        title: 'Clr Table',
        icon: 'view-list',
        children: [
            {
                title: 'Table',
                path: ['/clr-table', 'table']
            },
            {
                title: 'Table (redux)',
                path: ['/clr-table', 'table-redux']
            }
        ]
    },
    {
        title: 'Clr List',
        icon: 'list',
        children: [
            {
                title: 'List',
                path: ['/clr-list', 'list']
            }
        ]
    }
] as SideNavItem[];
