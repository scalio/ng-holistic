import { SideNavItem } from '@ng-holistic/clr-layout';

export default [
    {
        title: 'Clr Modal',
        icon: 'pop-out',
        children: [
            {
                title: 'Modal',
                path: ['/clr-modal', 'modal']
            },
            {
                title: 'Images',
                path: ['/images', 'img-overlay']
            }
        ]
    }
] as SideNavItem[];
