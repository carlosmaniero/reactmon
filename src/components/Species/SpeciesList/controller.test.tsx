import { mount, shallow } from 'enzyme';
import * as React from 'react';
import Specie from '../../../domain/Specie';
import SpeciesList from './view';
import { SpeciesListController, SpeciesListControllerStateOptions } from './controller';
import * as sinon from 'sinon';
import EmptyFunction = jest.EmptyFunction;

describe('<SpeciesListController>', () => {
    const emptyFastService: EmptyFunction = () => null;

    describe('Fetching data', () => {
        it('calls the fetchData method given the no fetch state', () => {
            const stubFetchService = sinon.stub();
            mount(
                <SpeciesListController
                    state={SpeciesListControllerStateOptions.NotFetched}
                    fetchService={stubFetchService}
                    list={[]}
                />
            );
            expect(stubFetchService.called).toBeTruthy();
        });

        describe('does not fetch data when', () => {
            it('is in the loading state', () => {
                const stubFetchService = sinon.stub();
                mount(
                    <SpeciesListController
                        state={SpeciesListControllerStateOptions.Loading}
                        fetchService={stubFetchService}
                        list={[]}
                    />
                );
                expect(stubFetchService.called).toBeFalsy();
            });

            it('is in the fetched state', () => {
                const stubFetchService = sinon.stub();
                mount(
                    <SpeciesListController
                        state={SpeciesListControllerStateOptions.Fetched}
                        fetchService={stubFetchService}
                        list={[]}
                    />
                );
                expect(stubFetchService.called).toBeFalsy();
            });
        });
    });

    describe('Show loading', () => {
        it('renders a loading message given the loading state', () => {
            const wrapper = shallow(
                <SpeciesListController
                    state={SpeciesListControllerStateOptions.Loading}
                    fetchService={emptyFastService}
                    list={[]}
                />
            );
            expect(wrapper.find('#SpeciesListController-loading').length).toEqual(1);
        });

        it('hide the loading message given a species list', () => {
            const wrapper = shallow(
                <SpeciesListController
                    state={SpeciesListControllerStateOptions.Fetched}
                    fetchService={emptyFastService}
                    list={[]}
                />
            );
            expect(wrapper.find('#SpeciesListController-loading').length).toEqual(0);
        });
    });

    describe('Show list', () => {
       it('renders the list when it is given', () => {
           const givenSpecies = [
               new Specie(1, 'Bubasauro')
           ];

           const wrapper = shallow(
               <SpeciesListController
                   state={SpeciesListControllerStateOptions.Fetched}
                   fetchService={emptyFastService}
                   list={givenSpecies}
               />);
           expect(wrapper.find(SpeciesList).prop('list')).toEqual(givenSpecies);
       });
    });
});