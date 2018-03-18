import { shallow } from 'enzyme';
import * as React from 'react';
import Specie from '../../../domain/Specie';
import SpeciesListView from './view';

describe('<SpeciesListView>', () => {
    describe('empty stage', () => {
        it('renders an empty stage given no data', () => {
            const emptyStage = shallow(<SpeciesListView list={[]} />).children();
            expect(emptyStage.prop('className')).toEqual('SpeciesListView-empty-stage');
            expect(emptyStage.text()).toContain('There is no specie to show!');
        });

        it('hides the empty stage given an non empty species list', () => {
            const wrapper = shallow(<SpeciesListView list={[new Specie(1, 'Bulbasaur')]} />);
            expect(wrapper.children().prop('className')).not.toEqual('SpeciesListView-empty-stage');
        });
    });

    describe('listing species', () => {
        it('renders all species using specie link', () => {
            const givenList: Specie[] = [new Specie(1, 'Bulbasaur'), new Specie(6, 'Squirtle')];
            const wrapper = shallow(<SpeciesListView list={givenList} />);
            const renderedList = wrapper.find('.SpeciesListView-list')
                .children().map(specieLink => specieLink.prop('specie'));

            expect(renderedList).toEqual(givenList);
        });
    });
});