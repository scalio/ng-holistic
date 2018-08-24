import { createFeatureSelector } from '@ngrx/store';
import { NgrxListStateModel } from '../models';

export const selectNgrxListPage = createFeatureSelector<NgrxListStateModel>('ngrxListPage');
