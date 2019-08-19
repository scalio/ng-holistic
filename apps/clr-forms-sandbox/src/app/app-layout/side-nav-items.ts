import { SideNavItem } from '@ng-holistic/clr-common';

export default [
    {
        title: 'Getting started',
        icon: 'home',
        children: [
            {
                title: 'Overview',
                path: ['/getting-started', 'overview']
            },
            {
                title: 'Install packages',
                path: ['/getting-started', 'install-packages']
            },
            {
                title: 'Create first form',
                path: ['/getting-started', 'first-form']
            },
            {
                title: 'Form values',
                path: ['/getting-started', 'form-values']
            },
            {
                title: 'Form field',
                path: ['/getting-started', 'form-field-props']
            },
            {
                title: 'Form field wrapper',
                path: ['/getting-started', 'form-field-wrapper']
            },
            {
                title: 'Form layout',
                path: ['/getting-started', 'form-layout']
            },
            {
                title: 'Custom form field',
                path: ['/getting-started', 'custom-form-field']
            },
            {
                title: 'Custom form field warpper',
                path: ['/getting-started', 'custom-form-field-wrapper']
            },
            {
                title: 'Custom layout',
                path: ['/getting-started', 'custom-layout']
            },
            {
                title: 'Inline custom component',
                path: ['/getting-started', 'custom-inline-component']
            }
        ]
    },
    {
        title: 'Clr Forms',
        icon: 'align-left-text',
        children: [
            {
                title: 'Base Form',
                path: ['/clr-forms', 'form']
            },
            {
                title: 'Validation Errors Display Strategy',
                path: ['/clr-forms', 'form-error-display-strategy']
            },
            {
                title: 'Read / Write Form Value',
                path: ['/clr-forms', 'form-read-write-value']
            },
            {
                title: 'Save with Form Footer',
                path: ['/clr-forms', 'form-footer']
            },
            {
                title: 'Form Extra Controls',
                path: ['/clr-forms', 'form-extra']
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
            },
            {
                title: 'Form In Aside',
                path: ['/clr-forms', 'form-in-aside']
            },
            {
                title: 'Custom field wrapper',
                path: ['/clr-forms', 'form-custom-wrapper']
            }            
        ]
    },
    {
        title: 'Clr Wizard',
        icon: 'wand',
        children: [
            {
                title: 'Base Wizard',
                path: ['/clr-wizard', 'wizard-base']
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
            },
            {
                title: 'Typeahead',
                path: ['/clr-controls', 'typeahead']
            },
            {
                title: 'Tags',
                path: ['/clr-controls', 'tags']
            },
            {
                title: 'Pairs List',
                path: ['/clr-controls', 'pairs-list']
            }
        ]
    },
    {
        title: 'Clr File Upload',
        icon: 'upload-cloud',
        children: [
            {
                title: 'Image Upload',
                path: ['/clr-file-upload', 'image-upload']
            },
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
