import { Reducer } from 'redux';
import { Actions } from '../actions';
import { SPECIES_LIST_LOADING_ACTION } from '../actions/SpeciesList';
import { SpeciesListControllerStateOptions } from '../components/Species/SpeciesList/controller';
import Specie from '../domain/Specie';
import { AppState, initialMainState, MainState } from '../state/MainState';
import * as sinon from 'sinon';
import { combineMainReducers, partialReducer } from './configure';
import { createMainStateReducersFixtures } from './configure.testFixtures';

describe('Configuring the reducers', () => {
    const givenAction: Actions = {
        type: SPECIES_LIST_LOADING_ACTION
    };

    describe('combineMainReducers', () => {
        describe('it call all reducers once', () => {
            const reducers = createMainStateReducersFixtures();
            const reducer = combineMainReducers(reducers);

            reducer(initialMainState, givenAction);

            const allCalled: boolean = reducers
                .map(stubReducer => stubReducer.callCount === 1)
                .every(isCalled => isCalled);

            expect(allCalled).toBeTruthy();
        });

        describe('it call all reducers with the given action', () => {
            const reducers = createMainStateReducersFixtures();
            const reducer = combineMainReducers(reducers);

            reducer(initialMainState, givenAction);

            const allCalled: boolean = reducers
                .map(stubReducer => stubReducer.lastCall.args[1] === givenAction)
                .every(isCalled => isCalled);

            expect(allCalled).toBeTruthy();
        });

        describe('it call all with the previous state', () => {
            const reducers = createMainStateReducersFixtures();
            const reducer = combineMainReducers(reducers);

            reducer(initialMainState, givenAction);
            expect(reducers[0].lastCall.args[0]).toEqual(initialMainState);
            expect(reducers[1].lastCall.args[0]).toEqual(reducers[0]());
            expect(reducers[2].lastCall.args[0]).toEqual(reducers[1]());
        });
    });

    describe('partialReducer', () => {
        const givenSpeciesListState = {
           state: SpeciesListControllerStateOptions.Fetched,
           list: [new Specie(1, 'Bubasauro')]
        };

        it('apply the given partial state in tha main state', () => {
           const appReducer: Reducer<AppState> = sinon.stub().returns({
               speciesListState: givenSpeciesListState
           });

           const reducer: Reducer<MainState> = partialReducer(appReducer);
           const expectedState: MainState = {...initialMainState, speciesListState: givenSpeciesListState};
           expect(reducer(initialMainState, givenAction)).toEqual(expectedState);
        });

        describe('Delegating call', () => {
            const givenState: MainState = {...initialMainState, speciesListState: givenSpeciesListState};

            const subject = (appReducer) => {
                const reducer: Reducer<MainState> = partialReducer(appReducer);
                reducer(givenState, givenAction);
            };

            it('calls the give reducer with the given state', () => {
                const appReducer = sinon.stub().returns(initialMainState);
                subject(appReducer);
                expect(appReducer.lastCall.args[0]).toEqual(givenState);
            });

            it('calls the give reducer with the given action', () => {
                const appReducer = sinon.stub().returns(initialMainState);
                subject(appReducer);
                expect(appReducer.lastCall.args[1]).toEqual(givenAction);
            });
        });
    });
});