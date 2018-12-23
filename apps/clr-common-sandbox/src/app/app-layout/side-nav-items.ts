import { SideNavItem } from '@ng-holistic/clr-common';

export default [
    {
        title: 'Clr Modal',
        icon: 'pop-out',
        children: [
            {
                title: 'Modal',
                path: ['/clr-modal', 'modal']
            }
        ]
    },
    {
        title: 'Images',
        icon: 'image',
        children: [
            {
                title: 'Image Overlay',
                path: ['/images', 'img-overlay']
            }
        ]
    }
] as SideNavItem[];
