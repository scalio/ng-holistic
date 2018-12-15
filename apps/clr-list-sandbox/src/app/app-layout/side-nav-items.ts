import { SideNavItem } from '@ng-holistic/clr-layout';

export default [
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
    }
] as SideNavItem[];
