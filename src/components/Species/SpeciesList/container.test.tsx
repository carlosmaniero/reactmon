import { shallow } from 'enzyme';
import * as React from 'react';
import createMockStore from 'redux-mock-store';
import * as SpeciesListActions from '../../../actions/SpeciesList';
import { SPECIES_LIST_LOADING_ACTION } from '../../../actions/SpeciesList';
import Specie from '../../../domain/Specie';
import { initialMainState } from '../../../state/MainState';
import { SpeciesList } from './container';
import { speciesListControllerStateInitial, SpeciesListControllerStateOptions } from './controller';

describe('<SpeciesListView>', () => {

    const mockStore = createMockStore();

    describe('Configure the <SpeciesListController> based on the main state', () => {

        describe('Using the speciesListState to configure <SpeciesListController>', () => {
            it('is well configured given the initialMainState', () => {
                const store = mockStore(initialMainState);
                const wrapper = shallow(<SpeciesList/>, {context: {store}});

                expect(wrapper.prop('state')).toEqual(speciesListControllerStateInitial.state);
                expect(wrapper.prop('list')).toEqual(speciesListControllerStateInitial.list);
            });

            it('is well configured given a custom state', () => {
                const givenCustomEvent = {
                    state: SpeciesListControllerStateOptions.Fetched,
                    list: [new Specie(1, 'Bubasauro')]
                };
                const store = mockStore({...initialMainState, speciesListState: givenCustomEvent});
                const wrapper = shallow(<SpeciesList/>, {context: {store}});

                expect(wrapper.prop('state')).toEqual(givenCustomEvent.state);
                expect(wrapper.prop('list')).toEqual(givenCustomEvent.list);
            });
        });

        it('renders the SpeciesListController with the fetch service action', () => {
            const spyFetch = spyOn(SpeciesListActions, 'fetchServiceAction').and.returnValues({
                type: SPECIES_LIST_LOADING_ACTION
            });
            const store = mockStore(initialMainState);
            const wrapper = shallow(<SpeciesList/>, {context: {store}});

            const fetchService = wrapper.prop('fetchService');
            fetchService();
            expect(spyFetch.calls.count()).toEqual(1);
        });
    });
});