import { Reducer } from 'redux';
import { SinonStub } from 'sinon';
import * as sinon from 'sinon';
import { SpeciesListControllerStateOptions } from '../components/Species/SpeciesList/controller';
import Specie from '../domain/Specie';
import { MainState } from '../state/MainState';

export function createMainStateReducersFixtures(): (Reducer<MainState> & SinonStub)[] {
    return [
        sinon.stub().returns({
            speciesListState: {
                state: SpeciesListControllerStateOptions.NotFetched,
                list: []
            }
        }),
        sinon.stub().returns({
            speciesListState: {
                state: SpeciesListControllerStateOptions.Loading,
                list: []
            }
        }),
        sinon.stub().returns({
            speciesListState: {
                state: SpeciesListControllerStateOptions.Fetched,
                list: [new Specie(1, 'Bubasauro')]
            }
        })
    ];
}