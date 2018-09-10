import { createFeatureSelector } from '@ngrx/store';
import { ItemStateModel } from './models';

export const selectTemplateList = createFeatureSelector<ItemStateModel>('ngrxForm');
