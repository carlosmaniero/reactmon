import { SPECIES_LIST_FETCHED_ACTION, loadingSpeciesList } from '../actions/SpeciesList';
import { SpeciesListControllerStateOptions } from '../components/Species/SpeciesList/controller';
import Specie from '../domain/Specie';
import * as SpeciesListReducer from './SpeciesListReducer';
import { initialMainState, MainState } from '../state/MainState';

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
            const finalState: MainState = SpeciesListReducer.fetchedReducer(initialMainState, loadingSpeciesList());

            expect(finalState).toEqual(initialMainState);
        });
    });

    describe('Changing to loading', () => {
        it('changes the state to loading given a loading action', () => {
            const finalState: MainState = SpeciesListReducer.loadingReducer(initialMainState, loadingSpeciesList());

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
});