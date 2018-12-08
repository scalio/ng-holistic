import { SideNavItem } from '@ng-holistic/clr-layout';

export default [
    {
        title: 'Clr Forms',
        icon: 'align-left-text',
        children: [
            {
                title: 'Base Form',
                path: ['/clr-forms', 'form']
            },
            {
                title: 'Form With Groups',
                path: ['/clr-forms', 'form-groups']
            },
            {
                title: 'Form Recalc',
                path: ['/clr-forms', 'form-recalc']
            },
            {
                title: 'Form Custom Fields',
                path: ['/clr-forms', 'form-custom-fields']
            },
            {
                title: 'Form Hide Elements',
                path: ['/clr-forms', 'form-full']
            },
            {
                title: 'Form Rebuild',
                path: ['/clr-forms', 'form-dyna']
            },
            {
                title: 'Form In Modal',
                path: ['/clr-forms', 'form-in-modal']
            }
        ]
    },
    {
        title: 'Clr Controls',
        icon: 'blocks-group',
        children: [
            {
                title: 'Text',
                path: ['/clr-controls', 'text']
            },
            {
                title: 'Text Area',
                path: ['/clr-controls', 'text-area']
            },
            {
                title: 'Date',
                path: ['/clr-controls', 'date']
            },
            {
                title: 'Select',
                path: ['/clr-controls', 'select']
            }
        ]
    },
    {
        title: 'Clr File Upload',
        icon: 'upload-cloud',
        children: [
            {
                title: 'File Upload',
                path: ['/clr-file-upload', 'file-upload']
            },
            {
                title: 'File Uploader',
                path: ['/clr-file-upload', 'file-uploader']
            }
        ]
    }
] as SideNavItem[];
