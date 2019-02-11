import { SideNavItem } from '@ng-holistic/clr-common';

export default [
    {
        title: 'Clr Modal / Aside',
        icon: 'pop-out',
        children: [
            {
                title: 'Modal',
                path: ['/clr-modal', 'modal']
            },
            {
                title: 'Aside',
                path: ['/clr-aside', 'aside']
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
            },
            {
                title: 'Image Preview',
                path: ['/images', 'img-preview']
            },
            {
                title: 'Image',
                path: ['/images', 'image']
            }
        ]
    }
] as SideNavItem[];
