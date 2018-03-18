import * as React from 'react';
import './style.css';
import Specie from '../../../domain/Specie';

export interface SpeciesDetailLinkProp {
    specie: Specie;
}

export default class SpeciesDetailLink extends React.Component<SpeciesDetailLinkProp> {
    render() {
        return (
            <a id={this.linkId()} className="SpeciesDetailLink" href="#">{this.props.specie.name}</a>
        );
    }

    linkId(): string {
        return 'SpeciesDetailLink-link-' + this.props.specie.id;
    }
}