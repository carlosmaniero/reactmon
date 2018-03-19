import { onFetchErrorSpeciesList, onLoadingSpeciesList, SPECIES_LIST_FETCHED_ACTION } from '../actions/SpeciesList';
import { SpeciesListControllerStateOptions } from '../components/Species/SpeciesList/controller';
import Specie from '../domain/Specie';
import { initialMainState, MainState } from '../state/MainState';
import * as SpeciesListReducer from './SpeciesListReducer';

describe('speciesListReducer', () => {
    describe('Changing to fetched', () => {
        it('change the state to fetched given a fetched action', () => {
            const finalState: MainState = SpeciesListReducer.fetchedReducer(initialMainState, {
                type: SPECIES_LIST_FETCHED_ACTION,
                data: [new Specie(1, 'Bubasauro')]
            });

            const expectedState = {
                ...initialMainState,
                speciesListState: {
                    state: SpeciesListControllerStateOptions.Fetched,
                    list: [new Specie(1, 'Bubasauro')]
                }
            };

            expect(finalState).toEqual(expectedState);
        });

        it('keeps state given any other action', () => {
            const finalState: MainState = SpeciesListReducer.fetchedReducer(initialMainState, onLoadingSpeciesList());

            expect(finalState).toEqual(initialMainState);
        });
    });

    describe('Changing to loading', () => {
        it('changes the state to loading given a loading action', () => {
            const finalState: MainState = SpeciesListReducer.loadingReducer(initialMainState, onLoadingSpeciesList());

            const expectedState = {
                ...initialMainState,
                speciesListState: {
                    state: SpeciesListControllerStateOptions.Loading,
                    list: []
                }
            };
            expect(finalState).toEqual(expectedState);
        });

        it('keeps state given any other action', () => {
            const finalState: MainState = SpeciesListReducer.loadingReducer(initialMainState, {
                type: SPECIES_LIST_FETCHED_ACTION,
                data: []
            });

            expect(finalState).toEqual(initialMainState);
        });
    });

    describe('Changing to fetch error', () => {
        it('changes the state to error given an error action', () => {
            const finalState: MainState = SpeciesListReducer.fetchErrorReducer(
                initialMainState,
                onFetchErrorSpeciesList()
            );

            const expectedState = {
                ...initialMainState,
                speciesListState: {
                    state: SpeciesListControllerStateOptions.FetchError,
                    list: []
                }
            };

            expect(finalState).toEqual(expectedState);
        });

        it('keeps state given any other action', () => {
            const finalState: MainState = SpeciesListReducer.fetchErrorReducer(
                initialMainState,
                onLoadingSpeciesList()
            );

            expect(finalState).toEqual(initialMainState);
        });
    });
});