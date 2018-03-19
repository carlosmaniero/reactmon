import Specie from '../domain/Specie';
import SpeciesService from '../services/SpeciesService';
import {
    onFetchedSpeciesList, onFetchErrorSpeciesList, SPECIES_LIST_FETCH_ERROR_ACTION,
    SPECIES_LIST_FETCHED_ACTION
} from './SpeciesList';
import { fetchServiceAction, onLoadingSpeciesList } from './SpeciesList';
import * as sinon from 'sinon';

describe('SpeciesListActions', () => {
    describe('fetchServiceAction', () => {
        it('calls the dispatcher with the loading state', () => {
            const dispatcher = sinon.stub();
            fetchServiceAction(dispatcher);

            expect(dispatcher.firstCall.args[0]).toEqual(onLoadingSpeciesList());
        });

        it('calls the dispatcher with the given species list when performed', async () => {
            const dispatcher = sinon.stub();
            const givenList = [
               new Specie(1, 'Bubasauro')
            ];
            const givenPromise = Promise.resolve(givenList);
            const spyFetch = spyOn(SpeciesService, 'getSpecies').and.returnValues(givenPromise);

            fetchServiceAction(dispatcher);

            expect(spyFetch.calls.count()).toEqual(1);

            await givenPromise;
            expect(dispatcher.secondCall.args[0]).toEqual(onFetchedSpeciesList(givenList));
        });

        it('calls the dispatcher with fetch error action on promise rejection', async () => {
            const dispatcher = sinon.stub();
            const givenList = [
                new Specie(1, 'Bubasauro')
            ];
            const givenPromise = Promise.reject(givenList);
            spyOn(SpeciesService, 'getSpecies').and.returnValues(givenPromise);

            fetchServiceAction(dispatcher);

            await givenPromise.catch(() => true);
            expect(dispatcher.secondCall.args[0]).toEqual(onFetchErrorSpeciesList());
        });
    });

    describe('onFetchedSpeciesList', () => {
        it('should fetched state with the given empty list', () => {
            expect(onFetchedSpeciesList([])).toEqual({
                type: SPECIES_LIST_FETCHED_ACTION,
                data: []
            });
        });

        it('should fetched state with the given a specie list', () => {
            const givenList = [
                new Specie(1, 'Bubasauro')
            ];
            expect(onFetchedSpeciesList(givenList)).toEqual({
                type: SPECIES_LIST_FETCHED_ACTION,
                data: givenList
            });
        });
    });

    describe('onFetchErrorSpeciesList', () => {
        it('returns the write action', () => {
            expect(onFetchErrorSpeciesList()).toEqual({
                type: SPECIES_LIST_FETCH_ERROR_ACTION,
            });
        });
    });
});