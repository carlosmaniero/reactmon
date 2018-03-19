import { Dispatch } from 'react-redux';
import Specie from '../domain/Specie';
import SpeciesServices from '../services/SpeciesService';

export const SPECIES_LIST_LOADING_ACTION = 'SPECIES_LIST_LOADING_ACTION';
export type SPECIES_LIST_LOADING_ACTION = typeof SPECIES_LIST_LOADING_ACTION;

export const SPECIES_LIST_FETCHED_ACTION = 'SPECIES_LIST_FETCHED_ACTION';
export type SPECIES_LIST_FETCHED_ACTION = typeof SPECIES_LIST_FETCHED_ACTION;

export const SPECIES_LIST_FETCH_ERROR_ACTION = 'SPECIES_LIST_FETCH_ERROR_ACTION';
export type SPECIES_LIST_FETCH_ERROR_ACTION = typeof SPECIES_LIST_FETCH_ERROR_ACTION;

export interface LoadingSpeciesListAction {
    type: SPECIES_LIST_LOADING_ACTION;
}

export interface FetchErrorSpeciesListAction {
    type: SPECIES_LIST_FETCH_ERROR_ACTION;
}

export interface FetchedSpeciesListAction {
    type: SPECIES_LIST_FETCHED_ACTION;
    data: Specie[];
}

export type SpeciesListActions = LoadingSpeciesListAction | FetchedSpeciesListAction | FetchErrorSpeciesListAction;

export function onLoadingSpeciesList(): LoadingSpeciesListAction {
    return {
        type: SPECIES_LIST_LOADING_ACTION
    };
}

export function onFetchErrorSpeciesList(): FetchErrorSpeciesListAction {
    return {
        type: SPECIES_LIST_FETCH_ERROR_ACTION
    };
}

export function onFetchedSpeciesList(species: Specie[]): FetchedSpeciesListAction {
    return {
        type: SPECIES_LIST_FETCHED_ACTION,
        data: species
    };
}

export function fetchServiceAction(dispatch: Dispatch<SpeciesListActions>) {
    dispatch(onLoadingSpeciesList());
    SpeciesServices.getSpecies()
        .then(species => {
            dispatch(onFetchedSpeciesList(species));
        })
        .catch(() => {
            dispatch(onFetchErrorSpeciesList());
        });
}