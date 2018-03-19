import * as React from 'react';
import Specie from '../../../domain/Specie';
import SpeciesDetail from '../SpeciesDetailLink/view';
import './style.css';

export class SpeciesListEmptyStageView extends React.Component {
    render() {
        return <div className="SpeciesListEmptyStageView">There is no specie to show!</div>;
    }
}

export interface SpeciesListFetchErrorProps {
    fetchService(): void;
}

export class SpeciesListFetchErrorView extends React.Component<SpeciesListFetchErrorProps> {
    render() {
        return (
            <div className="SpeciesListFetchError">
                Something is wrong <a onClick={this.props.fetchService}>Try again</a>
            </div>
        );
    }
}

export interface SpeciesListProps {
    list: Specie[];
}

export class SpeciesListLoadingView extends React.Component {
    render() {
        return (
            <div id="SpeciesListController-loading">
                Loading... Please, wait!
            </div>
        );
    }
}

export class SpeciesListView extends React.Component<SpeciesListProps> {
    render() {
        return (
            <div className="SpeciesList">
                {this.content()}
            </div>
        );
    }

    private content() {
        return this.list();
    }

    private list() {
        return (
            <div className="SpeciesListView-body">
                <h1>Species List</h1>

                <div className="SpeciesListView-list">
                    {this.speciesToList()}
                </div>
            </div>
        );
    }

    private speciesToList() {
        return this.props.list.map((specie, index) => {
            return <SpeciesDetail key={index} specie={specie}/>;
        });
    }
}