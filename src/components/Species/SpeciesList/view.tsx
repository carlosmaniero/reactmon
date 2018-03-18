import * as React from 'react';
import './style.css';
import Specie from '../../../domain/Specie';
import SpeciesDetail from '../SpeciesDetailLink/view';

export interface SpeciesListProps {
    list: Specie[];
}

export default class SpeciesListView extends React.Component<SpeciesListProps> {
    render () {
        return (
            <div className="SpeciesList">
                {this.content()}
            </div>
        );
    }

    private content() {
        if (this.props.list.length === 0) {
            return this.emptyStage();
        }

        return this.list();
    }

    private emptyStage() {
        return <div className="SpeciesListView-empty-stage">There is no specie to show!</div>;
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