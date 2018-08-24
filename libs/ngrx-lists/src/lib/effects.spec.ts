import { List } from '@ng-holistic/lists';
import { cold, hot } from 'jasmine-marbles';
import { SubListActions } from './actions';
import { subListEffects } from './effects';
import { ListDataProvider, SubActionContainer, SubActionContainerPair } from './store.types';

export class SubListAction implements SubActionContainer {
    static Type = '[Test] SubListAction';
    type = SubListAction.Type;

    constructor(public subAction: SubListActions.SubListAction) {}
}

export const pair: SubActionContainerPair = {
    ctr: act => new SubListAction(act),
    pred: (act): act is SubActionContainer => act.type === SubListAction.Type
};

const createDataProvider = ($: any) => ({ load: (_: any) => $ } as ListDataProvider);

const result: List.SearchResult = {
    items: [],
    paginator: null
};

describe('ngrx-list-effects', () => {
    describe('when load action dispatched', () => {
        describe('and immediate load success', () => {
            it('should be dispattched LoadSuccess action', () => {
                const actions = hot('x-|', { x: new SubListAction(new SubListActions.Load(null as any)) });

                const dataProvider = createDataProvider(cold('x|', { x: result }));

                const results$ = subListEffects(dataProvider, pair)(actions as any);

                expect(results$).toBeObservable(
                    cold('a-|', { a: new SubListAction(new SubListActions.LoadSuccess(result)) })
                );
            });
        });

        describe('and server returns error', () => {
            it('should be dispattched LoadError action', () => {
                const actions = hot('x-|', { x: new SubListAction(new SubListActions.Load(null as any)) });

                const dataProvider = createDataProvider(cold('---#|'));

                const results$ = subListEffects(dataProvider, pair)(actions as any);

                expect(results$).toBeObservable(
                    hot('---(a|)', { a: new SubListAction(new SubListActions.LoadError('error')) })
                );
            });
        });
    });

    describe('when 2 consecutive load action dispatched', () => {
        describe('and load success is delayed', () => {
            it('should be dispattched single LoadSuccess action', () => {
                const actions = hot('x-x|', { x: new SubListAction(new SubListActions.Load(null as any)) });

                const dataProvider = createDataProvider(cold('--x-|', { x: result }));

                const results$ = subListEffects(dataProvider, pair)(actions as any);

                expect(results$).toBeObservable(
                    cold('----a-|', { a: new SubListAction(new SubListActions.LoadSuccess(result)) })
                );
            });
        });

        describe('and load success is fast enough', () => {
            it('should be dispattched single LoadSuccess action', () => {
                const actions = hot('--x-x---|', { x: new SubListAction(new SubListActions.Load(null as any)) });

                const dataProvider = createDataProvider(cold('-(x|)', { x: result }));

                const results$ = subListEffects(dataProvider, pair)(actions as any);

                expect(results$).toBeObservable(
                    cold('---a-a--|', { a: new SubListAction(new SubListActions.LoadSuccess(result)) })
                );
            });
        });
    });
});
