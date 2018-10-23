import { SideNavItem } from '@ng-holistic/clr-layout';

export default [
    {
        title: 'Clr-Controls',
        path: ['/clr-controls'],
        icon: 'blocks-group',
        children: [
            {
                title: 'date-range',
                path: ['/clr-controls', 'date-range']
            },
            {
                title: 'date-time',
                path: ['/clr-controls', 'date-time']
            },
            {
                title: 'file-upload',
                path: ['/clr-controls', 'file-upload']
            },
            {
                title: 'file-uploader',
                path: ['/clr-controls', 'file-uploader']
            },
            {
                title: 'image-upload',
                path: ['/clr-controls', 'image-upload']
            },
            {
                title: 'select',
                path: ['/clr-controls', 'select']
            },
            {
                title: 'ordered-list',
                path: ['/clr-controls', 'ordered-list']
            }
        ]
    },
    {
        title: 'Clr-Lists',
        path: ['/clr-lists'],
        icon: 'list',
        children: [
            {
                title: 'base',
                path: ['/clr-lists', 'base']
            },
            {
                title: 'ngrx',
                path: ['/clr-lists', 'ngrx']
            }
        ]
    },
    {
        title: 'Clr-Forms',
        icon: 'list',
        children: [
            {
                title: 'base form',
                path: ['/clr-forms', 'form']
            },
            {
                title: 'form with groups',
                path: ['/clr-forms', 'form-groups']
            }
        ]
    }
] as SideNavItem[];
