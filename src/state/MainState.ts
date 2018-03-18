import { RouterState } from 'react-router-redux';
import {
    SpeciesListControllerState,
    speciesListControllerStateInitial
} from '../components/Species/SpeciesList/controller';

export interface AppState {
    speciesListState: SpeciesListControllerState;
}

export type MainState = AppState & RouterState;
export type MainPartState = AppState | RouterState;

export const initialMainState: MainState = {
    speciesListState: speciesListControllerStateInitial,
    location: null
};