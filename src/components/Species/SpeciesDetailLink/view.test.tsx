import { shallow } from 'enzyme';
import * as React from 'react';
import Specie from '../../../domain/Specie';
import SpecieDetail from './view';

describe('<SpeciesDetailLink>', () => {
   describe('Rendering a specie', () => {
       it('renders the link with the specie id', () => {
           const givenSpecie: Specie = new Specie(1, 'Pikachu');
           const wrapper = shallow(<SpecieDetail specie={givenSpecie} />);
           expect(wrapper.find('a').prop('id')).toEqual('SpeciesDetailLink-link-1');
       });

       it('renders the specie name inside a link', () => {
           const givenSpecie: Specie = new Specie(1, 'Pikachu');
           const wrapper = shallow(<SpecieDetail specie={givenSpecie} />);
           const linkText = wrapper.find('#SpeciesDetailLink-link-1').text();
           expect(linkText).toEqual(givenSpecie.getName());
       });
   });
});