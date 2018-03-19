import { shallow } from 'enzyme';
import * as React from 'react';
import Specie from '../../../domain/Specie';
import { SpeciesListView } from './view';

describe('<SpeciesListView>', () => {
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