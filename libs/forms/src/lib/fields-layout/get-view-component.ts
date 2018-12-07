import { ViewRef } from '@angular/core';
import { FormFields } from '../models/form-fields.type';

/**
 * Hackish way to retrieve components from View created by template projection.
 * TODO: find a correct way
 */

const getViewComponentNodes = (view: ViewRef) => {
    return (view as any)['_view']['nodes'].filter((x: any) => {
        return x && x['renderElement'] && x['componentView'];
    });
};

const getViewComponentNode = (viewNodeSelector: FormFields.ViewNodeSelector, view: ViewRef) => {
    const componentNodes = getViewComponentNodes(view);

    if (viewNodeSelector === 'self') {
        return componentNodes[0];
    } else if (viewNodeSelector === 'first-child') {
        return componentNodes[1];
    } else {
        return componentNodes.find((node: any) => node['renderElement'].id === viewNodeSelector);
    }
};

export const getViewComponent = (viewNodeSelector: FormFields.ViewNodeSelector, view: ViewRef) => {
    const node = getViewComponentNode(viewNodeSelector, view);
    return node && node.componentView.component;
};
