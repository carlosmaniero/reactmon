import { Actions } from '../actions';
import {
    FetchedSpeciesListAction, SPECIES_LIST_FETCH_ERROR_ACTION,
    SPECIES_LIST_FETCHED_ACTION,
    SPECIES_LIST_LOADING_ACTION
} from '../actions/SpeciesList';
import { SpeciesListControllerStateOptions } from '../components/Species/SpeciesList/controller';
import { MainState } from '../state/MainState';

export function loadingReducer(state: MainState, action: Actions): MainState {
    if (action.type === SPECIES_LIST_LOADING_ACTION) {
        return {
            ...state,
            speciesListState: {
                state: SpeciesListControllerStateOptions.Loading,
                list: []
            }
        };
    }

    return state;
}

export function fetchedReducer(state: MainState, action: Actions): MainState {
    if (action.type === SPECIES_LIST_FETCHED_ACTION) {
        return {
            ...state,
            speciesListState: {
                state: SpeciesListControllerStateOptions.Fetched,
                list: (<FetchedSpeciesListAction> action).data
            }
        };
    }
    return state;
}

export function fetchErrorReducer(state: MainState, action: Actions): MainState {
    if (action.type === SPECIES_LIST_FETCH_ERROR_ACTION) {
        return {
            ...state,
            speciesListState: {
                state: SpeciesListControllerStateOptions.FetchError,
                list: []
            }
        };
    }

    return state;
}