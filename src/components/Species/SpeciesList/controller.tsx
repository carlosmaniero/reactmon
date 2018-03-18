import * as React from 'react';
import Specie from '../../../domain/Specie';
import SpeciesList from './view';

export const SpeciesListLoading = 'SpeciesListLoading';
export type SpeciesListLoading = typeof SpeciesListLoading;

export enum SpeciesListControllerStateOptions {
    NotFetched = 'NotFetched',
    Fetched = 'Fetched',
    Loading = 'Loading'
}

export interface SpeciesListControllerState {
    state: SpeciesListControllerStateOptions;
    list: Specie[];
}

export const speciesListControllerStateInitial: SpeciesListControllerState = {
    state: SpeciesListControllerStateOptions.NotFetched,
    list: []
};

export interface SpeciesListControllerActions {
    fetchService(): void;
}

export type SpeciesListControllerProps = SpeciesListControllerState & SpeciesListControllerActions;

export class SpeciesListController extends React.Component<SpeciesListControllerProps> {
    constructor(props: SpeciesListControllerProps) {
        super(props);

        if (props.state === SpeciesListControllerStateOptions.NotFetched) {
            props.fetchService();
        }
    }

    render() {
        if (this.props.state === SpeciesListControllerStateOptions.Fetched) {
            return (
                <SpeciesList list={this.props.list} />
            );
        }

        return this.renderLoading();
    }

    private renderLoading() {
        return (
            <div id="SpeciesListController-loading">
                Loading... Please, wait!
            </div>
        );
    }
}