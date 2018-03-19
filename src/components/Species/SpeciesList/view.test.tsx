import { shallow } from 'enzyme';
import * as React from 'react';
import Specie from '../../../domain/Specie';
import { SpeciesListFetchErrorView, SpeciesListView } from './view';
import * as sinon from 'sinon';

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

describe('<SpeciesListFetchErrorView>', () => {
    describe('clicking in try again button', () => {
        it('calls the given reload action', () => {
            const givenAction = sinon.stub();
            const wrapper = shallow(<SpeciesListFetchErrorView fetchService={givenAction} />);
            wrapper.find('a').simulate('click');

            expect(givenAction.called).toBeTruthy();
        });
    });
});
