import { createFeatureSelector } from '@ngrx/store';
import { NgrxPageStateModel } from './models';

export const selectPage = createFeatureSelector<NgrxPageStateModel>('ngrxForm');
