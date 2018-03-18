import { Reducer } from 'redux';
import { Actions } from '../actions';
import { MainPartState, MainState } from '../state/MainState';

export function partialReducer(reducer: Reducer<MainPartState>) {
    return function (state: MainState, action: Actions): MainState {
        return {...state, ...reducer(state, action)};
    };
}

export function combineMainReducers(reducers: Reducer<MainState>[]) {
    return function (state: MainState, action: Actions): MainState {
        let newState: MainState = {...state};

        for (let reducer of reducers) {
            newState = reducer(newState, action);
        }

        return newState;
    };
}