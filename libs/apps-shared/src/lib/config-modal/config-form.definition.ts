import { HlcClrOptionsViewType } from '@ng-holistic/clr-controls';
import { ClrFormLayouts } from '@ng-holistic/clr-forms';

export const formLayout: ClrFormLayouts.ClrFormLayout = {
    kind: 'tabs',
    $content: [
        {
            kind: 'tab',
            title: 'Keyboard',
            $content: [
                {
                    kind: 'fields',
                    fields: [
                        {
                            id: 'useKeys',
                            kind: 'ToggleField',
                            label: 'Use Hotkeys'
                        }
                    ]
                }
            ]
        },
        {
            kind: 'tab',
            title: 'Forms',
            $content: [
                {
                    kind: 'fields',
                    fields: [
                        {
                            id: 'formLayout',
                            kind: 'OptionsField',
                            label: 'Form Layout',
                            props: {
                                viewType: HlcClrOptionsViewType.Buttons,
                                items: [
                                    { key: 'vertical', label: 'Vertical' },
                                    { key: 'horizontal', label: 'Horizontal' },
                                    { key: 'compact', label: 'Compact' }
                                ]
                            }
                        }
                    ]
                }
            ]
        }
    ]
};
