import { HlcClrOptionsViewType } from '@ng-holistic/clr-controls';
import { ClrFormLayouts, HlcClrFormLayoutType } from '@ng-holistic/clr-forms';
import { Subject } from 'rxjs';

export interface FormLayoutOptions {
    useKeys: boolean;
    formLayout: string;
    useKeysChanged: Subject<boolean>;
    formLayoutChanged: Subject<HlcClrFormLayoutType>;
}

export const formLayout = (opts: FormLayoutOptions): ClrFormLayouts.ClrFormLayout => ({
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
                            props: {
                                label: 'Use Hotkeys',
                                value: opts.useKeys,
                                valueChange: opts.useKeysChanged
                            }
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
                                ],
                                value: opts.formLayout,
                                valueChange: opts.formLayoutChanged
                            }
                        }
                    ]
                }
            ]
        }
    ]
});
