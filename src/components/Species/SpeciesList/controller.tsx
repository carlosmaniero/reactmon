import * as React from 'react';
import Specie from '../../../domain/Specie';
import { SpeciesListEmptyStageView, SpeciesListFetchErrorView, SpeciesListLoadingView, SpeciesListView } from './view';

export const SpeciesListLoading = 'SpeciesListLoading';
export type SpeciesListLoading = typeof SpeciesListLoading;

export enum SpeciesListControllerStateOptions {
    NotFetched = 'NotFetched',
    Fetched = 'Fetched',
    FetchError = 'FetchError',
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
            return this.renderList();
        }

        if (this.props.state === SpeciesListControllerStateOptions.FetchError) {
            return <SpeciesListFetchErrorView fetchService={this.props.fetchService}/>;
        }

        return <SpeciesListLoadingView/>;
    }

    private renderList() {
        if (this.props.list.length === 0) {
            if (this.props.list.length === 0) {
                return <SpeciesListEmptyStageView/>;
            }
        }
        return (
            <SpeciesListView list={this.props.list}/>
        );
    }
}