import * as React from 'react';
import './style.css';
import Specie from '../../../domain/Specie';
import SpeciesDetail from '../SpeciesDetailLink/view';

export interface SpeciesListProps {
    list: Specie[];
}

export class SpeciesListEmptyStageView extends React.Component {
    render() {
        return <div className="SpeciesListView-empty-stage">There is no specie to show!</div>;
    }
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
    render () {
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